"use client";

import { FolderKanban, ListTodo, Users, UsersRound } from "lucide-react";
import OverviewCard from "./OverviewCard";

export default function OverviewSection({ countData, statusCountList }: any) {
  const filteredIssues = statusCountList?.filter(
    (st: any) => !st.isCancelled && !st.isCompleted,
  );

  const openCount = filteredIssues?.reduce((acc: number, curr: any) => {
    return acc + curr.count;
  }, 0);

  return (
    <section className="mt-10 space-y-4">
      <h2 className="text-base font-semibold text-primary">Overview</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          title="Teams"
          value={countData?.teamCount ?? 0}
          description="Active teams in workspace"
          icon={UsersRound}
        />

        <OverviewCard
          title="Projects"
          value={countData?.projectCount ?? 0}
          description="Projects across teams"
          icon={FolderKanban}
        />

        <OverviewCard
          title="Members"
          value={countData?.memberCount ?? 0}
          description="Workspace members"
          icon={Users}
        />

        <OverviewCard
          title="Open Issues"
          value={openCount ?? 0}
          description="Issues currently open"
          icon={ListTodo}
        />
      </div>
    </section>
  );
}
