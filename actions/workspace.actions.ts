"use server";

import { activityLogger } from "@/lib/activity-logger";
import { auth } from "@/lib/auth";
import { executeAction } from "@/lib/executeAction";
import prisma from "@/lib/prisma";
import { ActivityInterface } from "@/types/types";
import { revalidatePath } from "next/cache";
import dayjs from "dayjs";
import socketService from "@/lib/socket-api-service";

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
      await socketService("create_issue", createIssue);
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

      const baseData = {
        userId: currentUser,
        workspaceId,
        teamId,
        projectId,
        issueId,
      };

      if (
        oldIssue?.title !== editIssue?.title ||
        oldIssue?.description !== editIssue?.description
      ) {
        const loggerData = {
          ...baseData,
          action: "DETAILS_UPDATED",
          entityTitle: title,
        };
        await activityLogger(loggerData);
      }

      if (oldIssue?.priority !== editIssue?.priority) {
        const loggerData = {
          ...baseData,
          action: "PRIORITY_CHANGED",
          entityTitle: editIssue?.title,
          beforeState: {
            prev_priority: oldIssue?.priority,
          },
          afterState: {
            new_priority: priority,
          },
        };
        await activityLogger(loggerData);
      }

      if (oldIssue?.assigneeId !== editIssue?.assigneeId) {
        const loggerData = {
          ...baseData,
          action: "ASSIGNED",
          entityTitle: editIssue?.title,
          beforeState: {
            prev_assignee: oldIssue?.assigneeId,
          },
          afterState: {
            new_assignee: editIssue?.assigneeId,
          },
        };
        await activityLogger(loggerData);
      }

      if (oldIssue?.statusId !== editIssue?.statusId) {
        const loggerData = {
          ...baseData,
          action: "STATUS_CHANGED",
          entityTitle: editIssue?.title,
          beforeState: {
            previousStatusId: oldIssue?.statusId,
          },
          afterState: {
            newStatusId: editIssue?.statusId,
          },
        };
        await activityLogger(loggerData);
      }
      await socketService("edit_issue", editIssue);
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
          "Unauthorized: You must be logged in to delete an issue.",
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
      await socketService("delete_issue", issue?.id);
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
          previousStatusId: previousStatus,
        },
        afterState: {
          newStatusId: card.statusId,
        },
      };

      await activityLogger(loggerData);

      revalidatePath(`/${workspaceId}/team/${teamId}/project/${projectId}`);
      return card;
    },
  });
};

export const getCompletedTasksCount = async (payload: any) => {
  const statusId = payload.statusId;
  const workspaceId = payload.workspaceId;

  return executeAction({
    successMessage: "Data Fetched",
    actionFn: async () => {
      const session = await auth();
      const currentUser = session?.user?.id;

      if (!currentUser) {
        throw new Error(
          "Unauthorized: You must be logged in to fetch this data.",
        );
      }

      if (!statusId) {
        throw new Error("Missing status ID. Cannot filter completed tasks.");
      }
      if (!workspaceId) {
        throw new Error("Missing workspace ID.");
      }

      const startDate = dayjs().subtract(6, "day").startOf("day").toDate();

      const statusChangeActivities = await prisma.activity.findMany({
        where: {
          workspaceId,
          action: "STATUS_CHANGED",
          afterState: {
            path: ["newStatusId"],
            equals: statusId,
          },
          created_at: {
            gte: startDate,
          },
        },
        select: {
          created_at: true,
        },
      });

      const last7Days = Array.from({ length: 7 }).map((_, i) => {
        const date = dayjs().subtract(6 - i, "day");
        return {
          day: date.format("ddd"),
          date: date.format("YYYY-MM-DD"),
          count: 0,
        };
      });

      statusChangeActivities.forEach((activity) => {
        const activityDate = dayjs(activity.created_at).format("YYYY-MM-DD");
        const dayIndex = last7Days.findIndex((d) => d.date === activityDate);

        if (dayIndex !== -1) {
          last7Days[dayIndex].count += 1;
        }
      });

      return last7Days;
    },
  });
};
