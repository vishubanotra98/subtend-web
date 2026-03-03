import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CheckCircle2, PlusCircle } from "lucide-react";
import MemberDashboard from "@/components/ui/Dshboard/Memberdashboard";
import AdminDashboard from "@/components/ui/Dshboard/AdminDashboard";

const activities = [
  {
    id: 1,
    user: "Raj",
    action: "completed",
    task: "Fix login bug",
    time: "2m ago",
    icon: <CheckCircle2 size={12} className="text-green-400" />,
  },
  {
    id: 2,
    user: "Priya",
    action: "created",
    task: "Design homepage",
    time: "1h ago",
    icon: <PlusCircle size={12} className="text-blue-400" />,
  },
];

export default async function Dashboard({ params }: any) {
  const { workspaceId } = await params;
  const session = await auth();
  const currentUser = session?.user && session?.user.id;

  const selectedWorkspace = await prisma.workspace.findFirst({
    where: { id: workspaceId },
  });

  const totalTeamCount = await prisma.team.count({
    where: {
      workspaceId,
    },
  });

  const totalIssuesCount = await prisma.issue.count({
    where: {
      project: {
        team: {
          workspaceId,
        },
      },
    },
  });

  const totalIssues = await prisma.issue.findMany({
    where: {
      project: {
        team: {
          workspaceId,
        },
      },
    },
  });

  const totalMembers = await prisma.workspaceMembers.count({
    where: { workspaceId },
  });

  const totalProjectsCount = await prisma.project.count({
    where: {
      team: {
        workspaceId,
      },
    },
  });

  const totalProjects = await prisma.project.findMany({
    where: { team: { workspaceId } },
  });

  const member = await prisma.workspaceMembers.findFirst({
    where: { userId: currentUser },
  });

  const myIssuesCount = await prisma.issue.count({
    where: {
      assigneeId: currentUser,
      project: { team: { workspaceId } },
    },
  });

  const myIssues = await prisma.issue.findMany({
    where: {
      assigneeId: currentUser,
      project: { team: { workspaceId } },
    },
  });

  const urgentIssuesCount = await prisma.issue.count({
    where: {
      priority: "URGENT",
      assigneeId: currentUser,
      project: { team: { workspaceId } },
    },
  });

  const urgentTasks = await prisma.issue.findMany({
    where: {
      priority: "URGENT",
      assigneeId: currentUser,
      project: { team: { workspaceId } },
    },
  });

  const completedIssuesCount = await prisma.issue.count({
    where: {
      status: { name: "Done" },
      project: { team: { workspaceId } },
    },
  });

  const teamData = await prisma.team.findMany({
    where: { workspaceId },
  });

  return (
    <div className="min-h-screen bg-[#111827] px-6 pb-10 text-[#e5e7eb]">
      {member?.role === "ADMIN" ? (
        <AdminDashboard
          totalTeamCount={totalTeamCount}
          totalIssuesCount={totalIssuesCount}
          totalMembers={totalMembers}
          selectedWorkspace={selectedWorkspace}
          workspaceId={workspaceId}
          totalProjectsCount={totalProjectsCount}
          activities={activities}
        />
      ) : (
        <MemberDashboard
          myIssues={myIssues}
          myIssuesCount={myIssuesCount}
          urgentIssuesCount={urgentIssuesCount}
          urgentTasks={urgentTasks}
          completedIssuesCount={completedIssuesCount}
          totalIssues={totalIssues}
          totalIssuesCount={totalIssuesCount}
          totalProjects={totalProjects}
          teamData={teamData}
          workspaceId={workspaceId}
        />
      )}
    </div>
  );
}
