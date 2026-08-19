"use client";

import { MemberIssue } from "@/types/types";
import { ArrowUpRight, Clock3 } from "lucide-react";

export function DashboardIssueRow({
  issue,
  urgent = false,
  isLast,
  onClick,
}: {
  issue: MemberIssue;
  urgent?: boolean;
  isLast: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-4 px-5 py-4 text-left transition-normal hover:bg-secondary/40 ${!isLast ? "border-b border-default" : ""}
      `}
    >
      <span
        className={`
          size-1.5
          shrink-0
          rounded-full
          ${urgent ? "bg-destructive" : "bg-secondary"}
        `}
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-primary transition-normal group-hover:text-brand">
          {issue.title}
        </p>

        <div className="mt-1 flex min-w-0 items-center gap-2 text-xs text-secondary">
          <span className="truncate">{issue.project?.team?.name}</span>

          <span className="text-border">•</span>

          <span className="truncate">{issue.project?.name}</span>
        </div>
      </div>

      {issue.targetDate && (
        <div className="hidden shrink-0 items-center gap-1.5 text-xs text-secondary sm:flex">
          <Clock3 size={13} />

          <span>
            {new Date(issue.targetDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      )}

      <ArrowUpRight
        size={15}
        className="shrink-0 text-secondary opacity-0 transition-normal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand group-hover:opacity-100
        "
      />
    </button>
  );
}
