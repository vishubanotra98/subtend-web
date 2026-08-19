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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!workspaceId || !completedTaskId) return;

    let mounted = true;

    const fetchData = async () => {
      setLoading(true);

      try {
        await dispatch(
          completedIssueCountAction({
            workspaceId,
            statusId: completedTaskId,
          }),
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [workspaceId, completedTaskId, dispatch]);

  return (
    <section className="mt-10 space-y-4">
      <div>
        <h2 className="text-base font-semibold text-primary">
          Completion Trend
        </h2>

        <p className="mt-1 text-sm text-secondary">
          Completed issues over the last 7 days.
        </p>
      </div>

      <div className="h-[340px] rounded-card border border-default bg-card p-5 shadow-card transition-normal hover:border-brand/20">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto size-5 animate-spin rounded-full border-2 border-default border-t-brand" />

              <p className="mt-3 text-xs text-secondary">
                Loading completion data...
              </p>
            </div>
          </div>
        ) : !dashboardCount?.length ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-medium text-primary">
                No completion data yet
              </p>

              <p className="mt-1 text-xs text-secondary">
                Completed issues will appear here.
              </p>
            </div>
          </div>
        ) : (
          <CompletionChart data={dashboardCount} />
        )}
      </div>
    </section>
  );
}
