import KanbanClient from "@/components/ui/KanbanBoard/KanbanClient";

export default async function ProjectIssue({ params }: any) {
  const { workspaceId, teamId, projectId } = await params;

  return (
    <main>
      <KanbanClient
        workspaceId={workspaceId}
        teamId={teamId}
        projectId={projectId}
      />
    </main>
  );
}
