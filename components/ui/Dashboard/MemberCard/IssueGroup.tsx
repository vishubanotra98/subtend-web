"use client";

import { MemberIssue } from "@/types/types";
import { CheckCircle2 } from "lucide-react";
import { DashboardIssueRow } from "./DashboardIssueRow";

export function IssueGroup({
  title,
  description,
  icon: Icon,
  issues,
  urgent = false,
  loading,
  onIssueClick,
  onViewAll,
}: {
  title: string;
  description: string;
  icon: any;
  issues: MemberIssue[];
  urgent?: boolean;
  loading: boolean;
  onIssueClick: (issue: MemberIssue) => void;
  onViewAll: () => void;
}) {
  const visibleIssues = issues.slice(0, 5);

  return (
    <div className="overflow-hidden rounded-card border border-default bg-card shadow-card">
      <div className="flex items-center justify-between border-b border-default px-5 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex size-8 items-center justify-center rounded-lg ${
              urgent ? "bg-destructive/10" : "bg-secondary"
            }`}
          >
            <Icon
              size={16}
              className={urgent ? "text-destructive" : "text-secondary"}
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-primary">{title}</h3>

            <p className="mt-0.5 text-xs text-secondary">{description}</p>
          </div>
        </div>

        {!loading && issues.length > 5 && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-medium text-secondary transition-normal hover:text-brand"
          >
            View all
          </button>
        )}
      </div>

      {loading ? (
        <div className="space-y-0">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex h-[72px] items-center gap-4 border-b border-default px-5 last:border-0"
            >
              <div className="size-1.5 animate-pulse rounded-full bg-secondary" />

              <div className="flex-1 space-y-2">
                <div className="h-3 w-2/3 animate-pulse rounded bg-secondary" />
                <div className="h-2.5 w-1/3 animate-pulse rounded bg-secondary" />
              </div>
            </div>
          ))}
        </div>
      ) : visibleIssues.length === 0 ? (
        <div className="flex min-h-[180px] items-center justify-center px-5">
          <div className="text-center">
            <CheckCircle2 size={18} className="mx-auto text-secondary" />

            <p className="mt-2 text-sm font-medium text-primary">
              Nothing here
            </p>

            <p className="mt-1 text-xs text-secondary">You're all caught up.</p>
          </div>
        </div>
      ) : (
        <div>
          {visibleIssues.map((issue, index) => (
            <DashboardIssueRow
              key={issue.id}
              issue={issue}
              urgent={urgent}
              isLast={index === visibleIssues.length - 1}
              onClick={() => onIssueClick(issue)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
