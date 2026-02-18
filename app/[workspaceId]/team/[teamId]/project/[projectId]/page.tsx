import KanbanClient from "@/components/ui/KanbanBoard/KanbanClient";
import prisma from "@/lib/prisma";

export default async function ProjectIssue({ params }: any) {
  const { workspaceId, teamId, projectId } = await params;

  const statusList = await prisma.status.findMany({
    where: { workspaceId },
    include: {
      _count: {
        select: { issues: true },
      },
    },
  });

  return (
    <main>
      <KanbanClient statusList={statusList} />
    </main>
  );
}
