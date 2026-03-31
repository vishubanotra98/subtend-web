"use client";

import { DragDropProvider } from "@dnd-kit/react";
import KanbanDroppable from "@/components/ui/KanbanBoard/KanbanDroppable";
import { useEffect, useState } from "react";
import DraggableCard from "@/components/ui/KanbanBoard/DraggableCard";
import { moveCardAction } from "@/actions/workspace.actions";
import { useParams, useRouter } from "next/navigation";
import { socket } from "@/lib/socket";

const KanbanClient = ({
  statusList,
  workspaceMembers,
  projectId,
  issueList,
  team,
}: any) => {
  const [issues, setIssues] = useState<any>([]);
  const params = useParams();
  const workspaceId = params.workspaceId;
  const teamId = params?.teamId;
  const router = useRouter();

  useEffect(() => {
    setIssues(issueList);
  }, [issueList]);

  useEffect(() => {
    const handleCreateIssue = (payload: any) => {
      const { issueData } = payload?.data;
      setIssues((prev: any) => {
        const safePrev = prev || [];

        const issueExists = safePrev?.some(
          (iss: any) => iss?.id === issueData?.id,
        );

        if (issueExists) {
          return safePrev;
        }

        return [...safePrev, payload?.data];
      });
    };

    const handleDeleteIssue = (payload: any) => {
      const { deletedIssueId } = payload?.data;
      setIssues((prev: any) => {
        const safePrev = prev || [];
        return safePrev?.filter((iss: any) => iss?.id !== deletedIssueId);
      });
    };

    const editHandler = (payload: any) => {
      const { issueData } = payload?.data;
      setIssues((prev: any) => {
        const safePrev = prev || [];

        const issueExists = safePrev?.some(
          (iss: any) => iss?.id === issueData?.id,
        );

        if (issueExists) {
          const filteredIsssues = safePrev.filter(
            (iss: any) => iss?.id !== issueData?.id,
          );

          return [...filteredIsssues, issueData];
        }

        return safePrev;
      });
    };

    const handleIssueMove = (payload: any) => {
      const { cardData } = payload?.data;
      setIssues((prev: any) => {
        const safePrev = prev || [];
        const filteredIssues = safePrev?.filter(
          (issue: any) => issue?.id !== cardData?.id,
        );
        return [...filteredIssues, cardData];
      });
    };

    socket.on("create_issue", handleCreateIssue);
    socket.on("delete_issue", handleDeleteIssue);
    socket.on("edit_issue", editHandler);
    socket.on("issue_moved", handleIssueMove);

    return () => {
      socket.off("create_issue", handleCreateIssue);
      socket.off("delete_issue", handleDeleteIssue);
      socket.off("edit_issue", editHandler);
      socket.off("issue_moved", handleIssueMove);
    };
  }, []);

  const handleDragOver = async (event: any) => {
    const sourceId = event.operation.source?.id as string;
    const targetId = event.operation.target?.id as string;

    if (!targetId || sourceId === targetId) return;

    const updatedIssues = issues.map((issue: any) => {
      if (issue.id === sourceId) {
        return { ...issue, statusId: targetId };
      }
      return issue;
    });

    setIssues(updatedIssues);

    const payload = {
      sourceId,
      targetId,
      workspaceId,
      teamId,
    };

    await moveCardAction(payload);
  };

  return (
    <DragDropProvider onDragEnd={handleDragOver}>
      <div className="flex items-center gap-4">
        {statusList?.map((status: any, id: any) => {
          return (
            <KanbanDroppable
              workspaceMembers={workspaceMembers}
              statusList={statusList}
              status={status}
              key={status?.id}
              id={status?.id}
              projectId={projectId}
            >
              {issues
                ?.filter((issue: any) => issue?.statusId === status?.id)
                ?.map((issue: any) => {
                  const findUser = workspaceMembers?.find(
                    (mem: any) => issue?.assigneeId === mem?.user?.id,
                  );
                  const user = findUser?.user;
                  const userName = !user?.name
                    ? user?.firstName + " " + user?.lastName
                    : user?.name;

                  const issueDataProp = {
                    name: userName,
                    issue,
                    team,
                  };
                  return (
                    status?.id === issue?.statusId && (
                      <span
                        key={issue?.id}
                        onClick={() =>
                          router.push(
                            `/${workspaceId}/team/${teamId}/project/${projectId}/issue/${issue?.id}`,
                          )
                        }
                      >
                        <DraggableCard
                          key={issue?.id}
                          issueData={issueDataProp}
                        />
                      </span>
                    )
                  );
                })}
            </KanbanDroppable>
          );
        })}
      </div>
    </DragDropProvider>
  );
};

export default KanbanClient;
