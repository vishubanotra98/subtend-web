"use client";

import { DragDropProvider } from "@dnd-kit/react";
import KanbanDroppable from "@/components/ui/KanbanBoard/KanbanDroppable";
import { useEffect, useState } from "react";
import DraggableCard from "@/components/ui/KanbanBoard/DraggableCard";
import { moveCardAction } from "@/actions/workspace.actions";
import { useParams } from "next/navigation";

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

  useEffect(() => {
    setIssues(issueList);
  }, [issueList]);

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
                .filter((issue: any) => issue.statusId === status.id)
                .map((issue: any) => {
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
                      <DraggableCard key={issue.id} issueData={issueDataProp} />
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
