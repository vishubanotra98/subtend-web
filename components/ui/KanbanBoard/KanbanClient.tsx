"use client";

import { DragDropProvider } from "@dnd-kit/react";
import { useRouter } from "next/navigation";
import KanbanDroppable from "@/components/ui/KanbanBoard/KanbanDroppable";
import DraggableCard from "@/components/ui/KanbanBoard/DraggableCard";

const KanbanClient = ({ data, handleDragOver }: any) => {
  const router = useRouter();

  const {
    projectId,
    workspaceMembers,
    workspaceStatus,
    setIssues,
    issues,
    team,
    workspaceId,
    teamId,
  } = data;

  const issuesByStatus = issues.reduce((acc: any, issue: any) => {
    if (!acc[issue.statusId]) {
      acc[issue.statusId] = [];
    }

    acc[issue.statusId].push(issue);

    return acc;
  }, {});

  return (
    <DragDropProvider onDragEnd={handleDragOver}>
      <section className="h-full overflow-hidden">
        <div className="h-full">
          <div className="flex h-full items-start gap-6 overflow-x-auto overflow-y-hidden pb-4[scrollbar-width:thin] [scrollbar-color:var(--border)_transparent]">
            {workspaceStatus?.map((status: any) => (
              <KanbanDroppable
                key={status.id}
                id={status.id}
                projectId={projectId}
                status={status}
                statusList={workspaceStatus}
                workspaceMembers={workspaceMembers}
                setIssues={setIssues}
              >
                {(issuesByStatus[status.id] ?? []).map((issue: any) => {
                  const member = workspaceMembers?.find(
                    (mem: any) => mem.user?.id === issue.assigneeId,
                  );
                  const user = member?.user;
                  const userName =
                    user?.name ??
                    `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();
                  return (
                    <div
                      key={issue.id}
                      className="w-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
                      onClick={() =>
                        router.push(
                          `/${workspaceId}/team/${teamId}/project/${projectId}/issue/${issue.id}`,
                        )
                      }
                    >
                      <DraggableCard
                        issueData={{
                          issue,
                          name: userName,
                          team,
                        }}
                      />
                    </div>
                  );
                })}
              </KanbanDroppable>
            ))}
          </div>
        </div>
      </section>
    </DragDropProvider>
  );
};

export default KanbanClient;
