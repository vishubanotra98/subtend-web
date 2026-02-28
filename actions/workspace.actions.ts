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
