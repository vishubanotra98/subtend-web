"use server";

import { executeAction } from "@/lib/executeAction";
import { WorkspaceNameType } from "@/lib/schema";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { auth } from "@/lib/auth";
import { v4 as uuid } from "uuid";
import UserInvitation from "@/VerificationEmail/UserInvitation";
import { resend } from "@/helpers/verificationEmail";
import { DEFAULT_STATUSES } from "@/utils/constants";
import socketService from "@/lib/socket-api-service";
import { Role } from "@/app/generated/prisma/enums";

export const createWorkspaceAction = async (
  data: WorkspaceNameType,
  userId: string,
) => {
  return executeAction({
    actionFn: async () => {
      const workspace = await prisma.workspace.create({
        data: {
          name: data.name,
          members: {
            create: {
              userId: userId,
              role: "ADMIN",
            },
          },
          statuses: {
            create: DEFAULT_STATUSES.map((status) => ({
              name: status.name,
              color: status.color,
              order: status.order,
              isDefault: status.isDefault,
            })),
          },
        },
        include: { statuses: true },
      });

      revalidatePath("/");
      redirect(`/${workspace.id}/dashboard`);
    },
    successMessage: "Workspace created successfully.",
  });
};

export const createTeamAction = async (
  teamName: string,
  workspaceId: string,
) => {
  return executeAction({
    actionFn: async () => {
      const session = {user: {id: "dasdadasdasdasdasd"}};
      const user = session?.user;

      if (!user?.id) {
        throw new Error("Unauthorised");
      }

      const membership = await prisma.workspaceMembers?.findFirst({
        where: { userId: user?.id, workspaceId },
      });

      if (!membership) {
        throw new Error("You are not member of this workspace");
      }

      const adminMembers = await prisma.workspaceMembers?.findMany({
        where: { workspaceId, role: "ADMIN" },
        select: { userId: true },
      });

      const adminIds = adminMembers?.map((admin) => admin?.userId);
      const teamMemberIds = Array.from(new Set([user?.id, ...adminIds]));

      const team = await prisma.team.create({
        data: {
          name: teamName,
          workspaceId,
          members: {
            create: teamMemberIds?.map((id) => ({
              userId: id,
            })),
          },
        },
      });

      await socketService("create_team", team);
      revalidatePath(`/${workspaceId}/dashboard`);
      return team;
    },
    successMessage: "Team created successfully.",
  });
};

export const createProjectAction = async (
  projectName: string,
  teamId: string,
) => {
  return executeAction({
    successMessage: "Project created successfully.",
    actionFn: async () => {
      const session = {user: {id: "dasdadasdasdasdasd"}};
      const user = session?.user;

      if (!user?.id) {
        throw new Error("Unauthorized");
      }

      const membership = await prisma.teamMembers.findFirst({
        where: {
          teamId: teamId,
          userId: user?.id,
        },
        include: {
          team: true,
        },
      });

      if (!membership) {
        throw new Error(
          "You must be a member of this team to create a project.",
        );
      }

      const workspaceId = membership?.team?.workspaceId;
      const workspaceUser = await prisma.workspaceMembers.findFirst({
        where: { workspaceId, userId: user?.id },
      });

      if (workspaceUser?.role !== "ADMIN") {
        throw new Error("You must be an admin to create a project.");
      }

      const project = await prisma.project.create({
        data: {
          name: projectName,
          teamId: teamId,
        },
      });

      revalidatePath(`/${workspaceId}/dashboard`);

      return project;
    },
  });
};

export const inviteUserAction = async ({
  email,
  workspaceId,
  role,
}: {
  email: string;
  workspaceId: string;
  role: string;
}) => {
  return executeAction({
    successMessage: "User Invited",
    actionFn: async () => {
      const isUserExists = await prisma.user.findUnique({
        where: { email },
      });

      if (isUserExists) {
        throw new Error("User is already registered.");
      }

      const token = uuid();
      const tokenExpiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      await prisma.invitation.upsert({
        where: {
          email_workspaceId: {
            email,
            workspaceId,
          },
        },
        update: {
          token,
          expires: tokenExpiryDate,
          status: "PENDING",
        },
        create: {
          email,
          token,
          workspaceId,
          expires: tokenExpiryDate,
          status: "PENDING",
        },
      });

      await resend.emails.send({
        from: "TaskFlow <onboarding@taskflow.vishubanotra.xyz>",
        to: [email],
        subject: "Join your team on Taskflow",
        react: UserInvitation({
          email,
          token,
          workspaceId,
          role,
        }),
      });
    },
  });
};

export const changRoleAction = async (
  workspaceId: string,
  userId: string,
  role: Role,
) => {
  return executeAction({
    successMessage: `Role Changed to ${role}`,
    actionFn: async () => {
      const session = {user: {id: "dasdadasdasdasdasd"}};
      if (!session?.user?.id) throw new Error("Unauthorised");

      const isAdmin = await prisma?.workspaceMembers?.findUnique({
        where: {
          userId_workspaceId: {
            userId: session?.user?.id,
            workspaceId,
          },
        },
      });

      if (!isAdmin || isAdmin?.role !== "ADMIN")
        throw new Error(
          "Only workspace administrators can change member roles.",
        );

      const correctRole = ["MEMBER", "ADMIN"].includes(role);
      if (!correctRole) throw new Error("Invalid Role.");

      const res = await prisma.workspaceMembers.update({
        where: {
          userId_workspaceId: {
            userId,
            workspaceId,
          },
        },
        data: {
          role,
        },
      });

      revalidatePath(`/${workspaceId}/settings`);
      revalidatePath(`/${workspaceId}/dashboard`);
      return res;
    },
  });
};
