"use client";

import OverviewCard from "./OverviewCard";

export default function OverviewSection() {
  return (
    <section className="mt-10 space-y-4">
      <h2 className="text-lg font-semibold text-primary">Overview</h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewCard title="Teams" value={6} />
        <OverviewCard title="Projects" value={18} />
        <OverviewCard title="Members" value={24} />
        <OverviewCard title="Open Issues" value={41} />
      </div>
    </section>
  );
}
