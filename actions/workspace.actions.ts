"use server";

import { executeAction } from "@/lib/executeAction";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const addIssueAction = async (payload: any) => {
  const {
    title,
    description,
    userId,
    priority,
    status,
    projectId,
    workspaceId,
    teamId,
  } = payload;

  return executeAction({
    successMessage: "Issue Added",
    actionFn: async () => {
      const createIssue = await prisma.issue.create({
        data: {
          title,
          description,
          priority,
          statusId: status,
          assigneeId: userId,
          projectId: projectId,
        },
      });
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

  console.log(issueId);

  return executeAction({
    successMessage: "Issue Added",
    actionFn: async () => {
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
      await prisma.issue.delete({
        where: { id: issueId },
      });
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
      const card = await prisma.issue.update({
        where: { id: issueId },
        data: {
          statusId: statusId,
        },
      });
      const projectId = card.projectId;
      revalidatePath(`/${workspaceId}/team/${teamId}/project/${projectId}`);
      return card;
    },
  });
};
