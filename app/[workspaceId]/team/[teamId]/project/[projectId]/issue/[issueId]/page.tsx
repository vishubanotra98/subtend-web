import { IssuePageClient } from "@/components/ui/IssuePage/IssuePageClient";
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

  const selectedIssue = await prisma.issue.findFirst({
    where: { projectId, id: issueId },
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

  const issueData = {
    selectedIssue,
    statusList,
    workspaceMembers,
  };

  return (
    <main>
      <IssuePageClient issueData={issueData} />
    </main>
  );
}
