import prisma from "@/lib/prisma";
import MemberDashboard from "@/components/ui/Dshboard/Memberdashboard";
import AdminDashboard from "@/components/ui/Dshboard/AdminDashboard";
import { notFound } from "next/navigation";

export default async function Dashboard({ params }: any) {
  const { workspaceId } = await params;

  //   USing Only for name
  //  Fetching member to get the know if the user is Admin or normal member
  const [selectedWorkspace, member] = await Promise.all([
    prisma.workspace.findFirst({ where: { id: workspaceId } }),
    prisma.workspaceMembers.findFirst({
      where: { userId: "cmo4oanxc000297qg0ihqgzgz" },
    }),
  ]);

  if (member?.role === "ADMIN") {
    const [
      totalTeamCount,
      totalMembers,
      totalProjectsCount,
      totalIssues,
      activities,
      workspaceStatusList,
    ] = await Promise.all([
      prisma.team.count({ where: { workspaceId } }),
      prisma.workspaceMembers.findMany({
        where: { workspaceId },
        include: { user: true },
      }),
      prisma.project.count({ where: { team: { workspaceId } } }),
      prisma.issue.findMany({ where: { project: { team: { workspaceId } } } }),
      prisma.activity.findMany({
        where: { workspaceId },
        orderBy: { created_at: "desc" },
      }),
      prisma.status.findMany({ where: { workspaceId } }),
    ]);

    return (
      <div className="min-h-screen bg-[#111827] px-6 pb-10 text-[#e5e7eb]">
        <AdminDashboard
          selectedWorkspace={selectedWorkspace}
          workspaceId={workspaceId}
          totalTeamCount={totalTeamCount}
          totalProjectsCount={totalProjectsCount}
          totalMembers={totalMembers}
          totalMembersCount={totalMembers.length}
          totalIssues={totalIssues}
          totalIssuesCount={totalIssues.length}
          activities={activities}
          workspaceStatusList={workspaceStatusList}
        />
      </div>
    );
  }

  const [
    totalIssues,
    myIssues,
    urgentTasks,
    completedIssuesCount,
    totalProjects,
    teamData,
    workspaceStatusList,
  ] = await Promise.all([
    prisma.issue.findMany({ where: { project: { team: { workspaceId } } } }),
    prisma.issue.findMany({
      where: {
        assigneeId: "cmo4oanxc000297qg0ihqgzgz",
        project: { team: { workspaceId } },
      },
    }),
    prisma.issue.findMany({
      where: {
        priority: "URGENT",
        assigneeId: "cmo4oanxc000297qg0ihqgzgz",
        project: { team: { workspaceId } },
      },
    }),
    prisma.issue.count({
      where: { status: { name: "Done" }, project: { team: { workspaceId } } },
    }),
    prisma.project.findMany({ where: { team: { workspaceId } } }),
    prisma.team.findMany({ where: { workspaceId } }),
    prisma.status.findMany({ where: { workspaceId } }),
  ]);

  return (
    <div className="min-h-screen bg-[#111827] px-6 pb-10 text-[#e5e7eb]">
      <MemberDashboard
        workspaceId={workspaceId}
        totalIssues={totalIssues}
        totalIssuesCount={totalIssues.length}
        myIssues={myIssues}
        myIssuesCount={myIssues.length}
        urgentTasks={urgentTasks}
        urgentIssuesCount={urgentTasks.length}
        completedIssuesCount={completedIssuesCount}
        totalProjects={totalProjects}
        teamData={teamData}
        workspaceStatusList={workspaceStatusList}
      />
    </div>
  );
}
