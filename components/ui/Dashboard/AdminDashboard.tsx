"use client";

import DashboardHeader from "../Dashboard/DashboardHeader/DashboardHeader";
import OverviewSection from "../Dashboard/Overview/OverviewSection";
import ActionRequiredSection from "../Dashboard/ActionRequired/ActionRequiredSection";
import StatusSummary from "../Dashboard/StatusSummary/StatusSummary";
import CompletionTrend from "../Dashboard/CompletionTrend/CompletionTrend";
import RecentActivity from "../Dashboard/RecentActivity/RecentActivity";
import { useParams } from "next/navigation";

export default function AdminDashboard({
  selectedWorkspace,
  attentionListData,
  statusCountList,
  userData,
  countData,
}: any) {
  const params = useParams();
  const wsId = params?.workspaceId as string;
  const completedIssueId = statusCountList?.find(
    (st: any) => st?.isCompleted,
  )?.id;

  return (
    <>
      <DashboardHeader
        selectedWorkspace={selectedWorkspace}
        userData={userData}
      />
      <OverviewSection
        countData={countData}
        statusCountList={statusCountList}
      />

      <div className="mt-10 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="h-[360px]">
          <ActionRequiredSection attentionListData={attentionListData} />
        </div>

        <div className="h-[360px]">
          <StatusSummary statusCountList={statusCountList} />
        </div>
      </div>

      <CompletionTrend completedTaskId={completedIssueId} workspaceId={wsId} />
      <RecentActivity />
    </>
  );
}
