"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

const badgeVariants: Record<string, string> = {
  BLOCKED: "text-red-400",
  TARGET_REACHED: "text-amber-400",
  URGENT: "text-orange-400",
  UNASSIGNED: "text-sky-400",
  NO_UPDATES: "text-secondary",
};

const badgeLabels: Record<string, string> = {
  BLOCKED: "Blocked",
  TARGET_REACHED: "Target Reached",
  URGENT: "Urgent",
  UNASSIGNED: "Unassigned",
  NO_UPDATES: "No Updates",
};

type Props = {
  issue: {
    id: string;
    reason: string;
    title: string;
    team: string;
    project: string;
    supportingText: string;
  };

  isLast: boolean;
};

export default function ActionRequiredItem({ issue }: Props) {
  return (
    <Link
      href="/"
      className="group flex items-center justify-between gap-4 px-6 py-4 transition-normal hover-card"
    >
      <div className="min-w-0 flex-1">
        <p
          className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${badgeVariants[issue.reason]}`}
        >
          {badgeLabels[issue.reason]}
        </p>

        <h3 className=" mt-1.5 truncate text-sm font-semibold leading-5 text-primary transition-normal group-hover:text-brand">
          {issue.title}
        </h3>

        <p className="mt-1.5 truncate text-xs text-secondary">
          {issue.team}
          <span className="mx-2 text-border">•</span>
          {issue.project}
          <span className="mx-2 text-border">•</span>
          {issue.supportingText}
        </p>
      </div>

      <div className="flex items-center gap-1 text-xs text-secondary opacity-0 transition-normal group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-brand">
        <span>Open</span>
        <ChevronRight size={16} />
      </div>
    </Link>
  );
}
