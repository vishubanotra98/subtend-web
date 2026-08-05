"use client";

import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { useEffect, useState } from "react";
import {
  fetchActivitiesAction,
  fetchIssuesAction,
  fetchWorkspaceAction,
  fetchWorkspaceMambersAction,
  fetchWorkspaceStatusAction,
} from "@/Store/actions/workspace.action";
import MemberDashboard from "./Memberdashboard";
import DashboardLoading from "./DashboardLoading";
import { Issue, Status, TeamsData, WorkspaceListData } from "@/types/types";
import AdminDashboard from "./AdminDashboard";

export default function Dashboard({ workspaceId }: { workspaceId: string }) {
  const dispatch = useAppDispatch();
  const [dashboardLoad, setdashboardLoad] = useState(true);

  const {
    workspaceData: {
      workspaceData,
      workspaceMembers,
      workspaceActivities,
      workspaceStatus,
      issuesData,
      teamsData,
      teamsWorkspaceId,
    },
    userData,
  } = useAppSelector((store: any) => store);

  const workspaceListData = workspaceData as WorkspaceListData | null;
  const workspaceList = workspaceListData?.workspaces ?? [];

  const selectedWorkspace = workspaceList.find(
    (ws) => ws?.workspace?.id === workspaceId,
  )?.workspace;

  useEffect(() => {
    const init = async () => {
      setdashboardLoad(true);
      const requests: Promise<unknown>[] = [];
      requests.push(dispatch(fetchIssuesAction(workspaceId)));
      requests.push(dispatch(fetchWorkspaceStatusAction({ workspaceId })));
      requests.push(dispatch(fetchWorkspaceMambersAction(workspaceId)));
      requests.push(dispatch(fetchActivitiesAction(workspaceId)));
      await Promise.all(requests);
      setdashboardLoad(false);
    };
    init();
  }, [dispatch]);

  console.log("Workspcae Activites: ", workspaceActivities);

  useEffect(() => {
    if (selectedWorkspace) return;

    dispatch(fetchWorkspaceAction());
  }, [dispatch, selectedWorkspace, workspaceId]);

  if (dashboardLoad) {
    return <DashboardLoading />;
  }

  const isAdmin = workspaceListData?.adminList?.includes(workspaceId);

  const issues = Array.isArray(issuesData) ? (issuesData as Issue[]) : [];
  const statuses = Array.isArray(workspaceStatus)
    ? (workspaceStatus as Status[])
    : [];
  const teamsListData = teamsData as TeamsData | null;
  const teams =
    teamsWorkspaceId === workspaceId && Array.isArray(teamsListData?.teamData)
      ? teamsListData.teamData
      : [];
  const projects = teams?.flatMap((team) => team?.projects ?? []);
  const completedTaskStatus = statuses?.find(
    (status) => status?.name === "Done",
  );

  const memberIssues = issues.filter(
    (issue) => issue?.assigneeId === userData?.user?.id,
  );
  const myUrgentIssues = memberIssues.filter(
    (issue) => issue?.priority === "URGENT",
  );
  const myCompletedIssues = memberIssues.filter(
    (issue) => issue?.statusId === completedTaskStatus?.id,
  );

  if (isAdmin) {
    return (
      <AdminDashboard
        selectedWorkspace={selectedWorkspace}
        workspaceId={workspaceId}
        totalTeamCount={teams?.length ?? "No team found"}
        totalProjectsCount={projects?.length ?? "No project found"}
        totalMembers={workspaceMembers ?? []}
        totalMembersCount={workspaceMembers?.length ?? 0}
        totalIssuesCount={issues.length}
        activities={workspaceActivities}
        workspaceStatus={statuses}
        completedTaskStatus={completedTaskStatus}
      />
    );
  } else
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
    />;
}
