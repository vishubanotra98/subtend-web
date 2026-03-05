"use server";

import { activityLogger } from "@/lib/activity-logger";
import { auth } from "@/lib/auth";
import { executeAction } from "@/lib/executeAction";
import prisma from "@/lib/prisma";
import { ActivityInterface } from "@/types/types";
import { revalidatePath } from "next/cache";

export const addIssueAction = async (payload: any) => {
  const {
    title,
    description,
    userId: assigneeId,
    priority,
    status,
    projectId,
    workspaceId,
    teamId,
  } = payload;

  return executeAction({
    successMessage: "Issue Added",
    actionFn: async () => {
      const session = await auth();
      const currentUser = session?.user?.id;

      if (!currentUser) {
        throw new Error(
          "Unauthorized: You must be logged in to create an issue.",
        );
      }

      const createIssue = await prisma.issue.create({
        data: {
          title,
          description,
          priority,
          statusId: status,
          assigneeId: assigneeId,
          projectId: projectId,
        },
      });
      const loggerData: ActivityInterface = {
        action: "CREATED",
        entityTitle: title,
        userId: currentUser,
        workspaceId: workspaceId,
        teamId: teamId,
        projectId: projectId,
        issueId: createIssue?.id,
        beforeState: null,
        afterState: null,
      };
      await activityLogger(loggerData);
      revalidatePath(`/${workspaceId}/team/${teamId}/project/${projectId}`);
      return createIssue;
    },
  });
};

export const editIssueAction = async (payload: any) => {
  const {
    workspaceId,
    teamId,
    projectId,
    issueId,
    title,
    description,
    assigneeId,
    priority,
    statusId,
  } = payload;

  return executeAction({
    successMessage: "Issue Edited",
    actionFn: async () => {
      const session = await auth();
      const currentUser = session?.user?.id;

      if (!currentUser) throw new Error("Unauthorized");

      const oldIssue = await prisma.issue.findFirst({
        where: { id: issueId },
      });

      if (!oldIssue) throw new Error("Issue not found.");

      const editIssue = await prisma.issue.update({
        where: { id: issueId },
        data: {
          title,
          description,
          priority,
          statusId,
          assigneeId,
          projectId,
        },
      });

      revalidatePath(`/${workspaceId}/team/${teamId}/project/${projectId}`);
      return editIssue;
    },
  });
};

export const deleteIssue = async (payload: any) => {
  const { workspaceId, issueId, projectId, teamId } = payload;
  return executeAction({
    successMessage: "Issue Deleted",
    actionFn: async () => {
      const session = await auth();
      const currentUser = session?.user?.id;

      if (!currentUser) {
        throw new Error(
          "Unauthorized: You must be logged in to create an issue.",
        );
      }

      const issue = await prisma.issue.delete({
        where: { id: issueId },
      });

      const loggerData: ActivityInterface = {
        action: "DELETED",
        entityTitle: issue.title,
        userId: currentUser,
        workspaceId: workspaceId,
        teamId: teamId,
        projectId: projectId,
        issueId,
        beforeState: null,
        afterState: null,
      };

      await activityLogger(loggerData);
      revalidatePath(`/${workspaceId}/dashboard`);
      revalidatePath(`/${workspaceId}/team/${teamId}/project/${projectId}`);
    },
  });
};

export const moveCardAction = async (payload: any) => {
  const {
    sourceId: issueId,
    targetId: statusId,
    workspaceId,
    teamId,
  } = payload;
  return executeAction({
    successMessage: "Card Moved",
    actionFn: async () => {
      const session = await auth();
      const currentUser = session?.user?.id;

      if (!currentUser) {
        throw new Error(
          "Unauthorized: You must be logged in to create an issue.",
        );
      }

      const fetchCard = await prisma.issue.findFirst({
        where: { id: issueId },
      });

      const previousStatus = fetchCard?.statusId;

      const card = await prisma.issue.update({
        where: { id: issueId },
        data: {
          statusId: statusId,
        },
      });

      const projectId = card.projectId;

      const loggerData: ActivityInterface = {
        action: "STATUS_CHANGED",
        entityTitle: card.title,
        userId: currentUser,
        workspaceId: workspaceId,
        teamId: teamId,
        projectId: projectId,
        issueId: card?.id,
        beforeState: {
          previousIssueId: previousStatus,
        },
        afterState: {
          newIssueId: card.statusId,
        },
      };

      await activityLogger(loggerData);

      revalidatePath(`/${workspaceId}/team/${teamId}/project/${projectId}`);
      return card;
    },
  });
};
