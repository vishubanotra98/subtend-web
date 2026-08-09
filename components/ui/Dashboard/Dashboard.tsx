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
import { dashboardAttentionAction } from "@/Store/actions/dashboard.action";

export default function Dashboard({ workspaceId }: { workspaceId: string }) {
  const dispatch = useAppDispatch();
  const [dashboardLoad, setdashboardLoad] = useState(true);
  const [attentionList, setAttentionList] = useState(null);

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
      const attentionRes = await dispatch(
        dashboardAttentionAction(workspaceId),
      ).unwrap();

      const attentionListData = attentionRes?.data?.attentionIssues;
      setAttentionList(attentionListData ?? []);

      await Promise.all(requests);
      setdashboardLoad(false);
    };
    init();
  }, [dispatch]);

  useEffect(() => {
    if (selectedWorkspace) return;

    dispatch(fetchWorkspaceAction());
  }, [dispatch, selectedWorkspace, workspaceId]);

  if (dashboardLoad) {
    return <DashboardLoading />;
  }

  const isAdmin = workspaceListData?.adminList?.includes(workspaceId);

  if (isAdmin) {
    return <AdminDashboard attentionListData={attentionList} />;
  } else
    <MemberDashboard
    // workspaceId={workspaceId}
    // totalIssuesCount={issues.length}
    // myIssues={memberIssues}
    // myIssuesCount={memberIssues.length}
    // urgentTasks={myUrgentIssues}
    // urgentIssuesCount={myUrgentIssues.length}
    // completedIssuesCount={myCompletedIssues.length}
    // totalProjects={projects}
    // teamData={teams}
    // workspaceStatusList={statuses}
    />;
}
