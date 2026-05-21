"use client";

import AdminDashboard from "@/components/ui/Dshboard/AdminDashboard";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { useEffect } from "react";
import {
  fetchActivitiesAction,
  fetchIssuesAction,
  fetchWorkspaceAction,
  fetchWorkspaceMambersAction,
  fetchWorkspaceStatusAction,
} from "@/Store/actions/workspace.action";
import MemberDashboard from "./Memberdashboard";
import DashboardLoading from "./DashboardLoading";

type WorkspaceItem = {
  workspace?: {
    id?: string;
    [key: string]: unknown;
  };
};

type WorkspaceListData = {
  adminList?: string[];
  workspaces?: WorkspaceItem[];
};

type Team = {
  projects?: unknown[];
  [key: string]: unknown;
};

type TeamsData = {
  teamData?: Team[];
};

type Status = {
  id?: string;
  name?: string;
  [key: string]: unknown;
};

type Issue = {
  assigneeId?: string;
  priority?: string;
  statusId?: string;
  [key: string]: unknown;
};

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
      teamsWorkspaceId,
      statusWorkspaceId,
      membersWorkspaceId,
      activitiesWorkspaceId,
      issuesWorkspaceId,
    },
    userData,
  } = useAppSelector((store) => store);

  const workspaceListData = workspaceData as WorkspaceListData | null;
  const workspaceList = workspaceListData?.workspaces ?? [];

  const selectedWorkspace = workspaceList.find(
    (ws) => ws?.workspace?.id === workspaceId,
  )?.workspace;

  useEffect(() => {
    const init = async () => {
      const requests: Promise<unknown>[] = [];

      if (issuesWorkspaceId !== workspaceId) {
        requests.push(dispatch(fetchIssuesAction(workspaceId)));
      }

      if (statusWorkspaceId !== workspaceId) {
        requests.push(dispatch(fetchWorkspaceStatusAction(workspaceId)));
      }

      if (membersWorkspaceId !== workspaceId) {
        requests.push(dispatch(fetchWorkspaceMambersAction(workspaceId)));
      }

      if (activitiesWorkspaceId !== workspaceId) {
        requests.push(dispatch(fetchActivitiesAction(workspaceId)));
      }

      await Promise.all(requests);
    };

    init();
  }, [
    activitiesWorkspaceId,
    dispatch,
    issuesWorkspaceId,
    membersWorkspaceId,
    statusWorkspaceId,
    workspaceId,
  ]);

  useEffect(() => {
    if (selectedWorkspace) return;

    dispatch(fetchWorkspaceAction());
  }, [dispatch, selectedWorkspace, workspaceId]);

  if (!selectedWorkspace) {
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
  const doneTaskStatus = statuses?.find(
    (status) => status?.name === "Done",
  );

  const memberIssues = issues.filter(
    (issue) => issue?.assigneeId === userData?.user?.id,
  );

  const myUrgentIssues = memberIssues.filter(
    (issue) => issue?.priority === "URGENT",
  );
  const myCompletedIssues = memberIssues.filter(
    (issue) => issue?.statusId === doneTaskStatus?.id,
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
