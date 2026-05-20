"use client";

import AdminDashboard from "@/components/ui/Dshboard/AdminDashboard";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { useEffect } from "react";
import {
  fetchActivitiesAction,
  fetchIssuesAction,
  fetchTeamsDataAction,
  fetchWorkspaceMambersAction,
  fetchWorkspaceStatusAction,
} from "@/Store/actions/workspace.action";
import MemberDashboard from "./Memberdashboard";

export default function Dashboard({ workspaceId }: { workspaceId: string }) {
  const dispatch = useAppDispatch();
  const {
    workspaceData: {
      workspaceData,
      workspaceMembers,
      workspaceActivities,
      workspaceStatus,
      issuesData,
      teamsData,
    },
    userData,
  } = useAppSelector((store: any) => store);

  useEffect(() => {
    const init = async () => {
      await Promise.all([
        dispatch(fetchIssuesAction(workspaceId)),
        dispatch(fetchTeamsDataAction(workspaceId)),
        dispatch(fetchWorkspaceStatusAction(workspaceId)),
        dispatch(fetchWorkspaceMambersAction(workspaceId)),
        dispatch(fetchActivitiesAction(workspaceId)),
      ]);
    };

    init();
  }, [dispatch, workspaceId]);

  const isAdmin = workspaceData?.adminList?.includes(workspaceId);

  const selectedWorkspace = workspaceData?.workspaces?.find(
    (ws: any) => ws?.workspace?.id === workspaceId,
  )?.workspace;

  const issues = Array.isArray(issuesData) ? issuesData : [];
  const statuses = Array.isArray(workspaceStatus) ? workspaceStatus : [];
  const teams = Array.isArray(teamsData?.teamData) ? teamsData.teamData : [];
  const projects = teams?.flatMap((team: any) => team?.projects ?? []);
  const doneTaskStatus = statuses?.find(
    (status: any) => status?.name === "Done",
  );

  const memberIssues = issues.filter(
    (issue: any) => issue?.assigneeId === userData?.user?.id,
  );

  const myUrgentIssues = memberIssues.filter(
    (issue: any) => issue?.priority === "URGENT",
  );
  const myCompletedIssues = memberIssues.filter(
    (issue: any) => issue?.statusId === doneTaskStatus?.id,
  );

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-[#111827] px-6 pb-10 text-[#e5e7eb]">
        <AdminDashboard
          selectedWorkspace={selectedWorkspace}
          workspaceId={workspaceId}
          totalTeamCount={10}
          totalProjectsCount={10}
          totalMembers={workspaceMembers ?? []}
          totalMembersCount={workspaceMembers?.length ?? 0}
          totalIssuesCount={issues.length}
          activities={workspaceActivities}
          workspaceStatus={statuses}
        />
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-[#111827] px-6 pb-10 text-[#e5e7eb]">
        <MemberDashboard
          workspaceId={workspaceId}
          totalIssuesCount={issues.length}
          myIssues={memberIssues}
          myIssuesCount={memberIssues.length}
          urgentTasks={myUrgentIssues}
          urgentIssuesCount={myUrgentIssues.length}
          completedIssuesCount={myCompletedIssues.length}
          totalProjects={projects}
          teamData={teams}
          workspaceStatusList={statuses}
        />
      </div>
    );
  }
}
