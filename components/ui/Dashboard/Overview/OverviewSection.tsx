"use client";

import OverviewCard from "./OverviewCard";

export default function OverviewSection({ countData, statusCountList }: any) {
  const filteredIssues = statusCountList?.filter(
    (st: any) => !st.isCancelled && !st.isCompleted,
  );
  const openCount = filteredIssues?.reduce((acc: any, curr: any) => {
    acc += curr.count;
    return acc;
  }, 0);

  return (
    <section className="mt-10 space-y-4">
      <h2 className="text-lg font-semibold text-primary">Overview</h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewCard title="Teams" value={countData?.teamCount} />
        <OverviewCard title="Projects" value={countData?.projectCount} />
        <OverviewCard title="Members" value={countData?.memberCount} />
        <OverviewCard title="Open Issues" value={openCount} />
      </div>
    </section>
  );
}
