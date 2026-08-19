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
import {
  dashboardAttentionAction,
  dashboardCountAction,
} from "@/Store/actions/dashboard.action";
import SubtendLoader from "@/components/Loader/SubtendLoader";

export default function Dashboard({ workspaceId }: { workspaceId: string }) {
  const dispatch = useAppDispatch();
  const [dashboardLoad, setdashboardLoad] = useState(true);
  const [attentionList, setAttentionList] = useState(null);
  const [count, setCount] = useState(null);
  const [statusCount, setStatusCount] = useState(null);
  const [countData, setCountData] = useState(null);

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

  const selectedWorkspace = workspaceList?.find(
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

      const countRes = await dispatch(
        dashboardCountAction(workspaceId),
      ).unwrap();
      const countsData = countRes?.data;
      const statusCountData = countRes?.data?.statusCount;
      const data: any = {
        memberCount: countsData?.memberCount,
        projectCount: countsData?.projectCount,
        teamCount: countsData?.teamCount,
      };

      const attentionRes = await dispatch(
        dashboardAttentionAction(workspaceId),
      ).unwrap();
      const attentionListData = attentionRes?.data?.attentionIssues;

      await Promise.all(requests);

      setCountData(data);
      setAttentionList(attentionListData ?? []);
      setStatusCount(statusCountData);
      setdashboardLoad(false);
    };
    init();
  }, [dispatch]);

  useEffect(() => {
    if (selectedWorkspace) return;

    dispatch(fetchWorkspaceAction());
  }, [dispatch, selectedWorkspace, workspaceId]);

  if (dashboardLoad) {
    return (
      <div className="w-full h-[84vh] flex items-center justify-center">
        <SubtendLoader />
      </div>
    );
  }

  const isAdmin = workspaceListData?.adminList?.includes(workspaceId) ?? false;

  if (isAdmin) {
    return (
      <AdminDashboard
        selectedWorkspace={selectedWorkspace}
        attentionListData={attentionList}
        statusCountList={statusCount}
        userData={userData}
        countData={countData}
        workspaceActivities={workspaceActivities}
      />
    );
  } else
    return (
      <MemberDashboard
        selectedWorkspace={selectedWorkspace}
        userData={userData}
        isAdmin={isAdmin}
      />
    );
}
