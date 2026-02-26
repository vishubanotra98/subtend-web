"use client";

import { DragDropProvider } from "@dnd-kit/react";
import KanbanDroppable from "@/components/ui/KanbanBoard/KanbanDroppable";
import { useState } from "react";
import DraggableCard from "@/components/ui/KanbanBoard/DraggableCard";
import { moveCardAction } from "@/actions/workspace.actions";
import { useParams } from "next/navigation";

const KanbanClient = ({
  statusList,
  workspaceMembers,
  projectId,
  issueList: initialIssues,
}: any) => {
  const [issues, setIssues] = useState(initialIssues);
  const params = useParams();
  const workspaceId = params.workspaceId;
  const teamId = params?.teamId;

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

    try {
      await moveCardAction(payload);
    } catch (error) {
      console.error("Failed to move card", error);
      setIssues(initialIssues);
    }
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
                .map((issue: any) => (
                  <DraggableCard key={issue.id} issueData={issue} />
                ))}
            </KanbanDroppable>
          );
        })}
      </div>
    </DragDropProvider>
  );
};

export default KanbanClient;
