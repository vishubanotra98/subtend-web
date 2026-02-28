import { IssuePageClient } from "@/components/ui/IssuePage/IssuePageClient";
import KanbanClient from "@/components/ui/KanbanBoard/KanbanClient";
import prisma from "@/lib/prisma";

export default async function IssuePage({ params }: any) {
  const { workspaceId, teamId, projectId, issueId } = await params;

  const statusList = await prisma.status.findMany({
    where: { workspaceId },
    include: {
      _count: {
        select: { issues: true },
      },
    },
  });

  const issueList = await prisma.issue.findMany({
    where: { projectId },
  });

  const workspaceMembers = await prisma.workspaceMembers.findMany({
    where: { workspaceId },
    include: { user: true },
  });

  const team = await prisma.team.findFirst({
    where: {
      id: teamId,
    },
  });

  return (
    <main>
      <IssuePageClient />
    </main>
  );
}
