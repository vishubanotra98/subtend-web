"use server";

import { executeAction } from "@/lib/executeAction";
import { WorkspaceNameType } from "@/lib/schema";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { v4 as uuid } from "uuid";
import UserInvitation from "@/VerificationEmail/UserInvitation";
import { resend } from "@/helpers/verificationEmail";
import { DEFAULT_STATUSES } from "@/utils/constants";

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
      const session = await auth();
      const user = session?.user;

      if (!user?.id) {
        throw new Error("Unauthorised");
      }

      const membership = await prisma.workspaceMembers?.findFirst({
        where: { userId: user?.id },
      });

      if (!membership) {
        throw new Error("You are not member of this workspace");
      }

      const team = await prisma.team.create({
        data: {
          name: teamName,
          workspaceId,
          members: {
            create: {
              userId: user?.id,
            },
          },
        },
      });

      revalidatePath(`${workspaceId}/dashboard`);
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
      const session = await auth();
      const user = session?.user;

      if (!user?.id) {
        throw new Error("Unauthorized");
      }

      const membership = await prisma.teamMembers.findFirst({
        where: {
          teamId: teamId,
          userId: user.id,
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

      const workspaceId = membership.team.workspaceId;

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
}: {
  email: string;
  workspaceId: string;
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
        from: "onboarding@resend.dev",
        to: ["banotravishu89@gmail.com"],
        subject: "TaskFlow Verification OTP",
        react: UserInvitation({
          email,
          token,
          workspaceId,
        }),
      });
    },
  });
};
