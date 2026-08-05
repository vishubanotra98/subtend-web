"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { completedIssueCountAction } from "@/Store/actions/workspace.action";
import CompletionChart from "./CompletionChart";

type Props = {
  workspaceId: string;
  completedTaskId: string;
};

export default function CompletionTrend({
  workspaceId,
  completedTaskId,
}: Props) {
  const dispatch = useAppDispatch();

  const {
    workspaceData: { dashboardCount },
  } = useAppSelector((store: any) => store);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!workspaceId || !completedTaskId) return;

    let mounted = true;

    (async () => {
      await dispatch(
        completedIssueCountAction({
          workspaceId,
          statusId: completedTaskId,
        }),
      );

      if (mounted) {
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [workspaceId, completedTaskId, dispatch]);

  const mockDashboardCount = [
    { day: "Mon", count: 18 },
    { day: "Tue", count: 21 },
    { day: "Wed", count: 19 },
    { day: "Thu", count: 26 },
    { day: "Fri", count: 30 },
    { day: "Sat", count: 11 },
    { day: "Sun", count: 5 },
  ];

  return (
    <section className="mt-10 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-primary">
            Completion Trend
          </h2>

          <p className="mt-1 text-sm text-secondary">
            Completed issues over the last 7 days.
          </p>
        </div>
      </div>

      <div className="rounded-card border border-default bg-card shadow-card p-6 h-[340px]">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-secondary">Loading completion data...</p>
          </div>
        ) : (
          <CompletionChart data={mockDashboardCount} />
        )}
      </div>
    </section>
  );
}
