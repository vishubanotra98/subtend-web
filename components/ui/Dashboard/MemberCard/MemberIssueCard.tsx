"use client";

import { ArrowUpRight } from "lucide-react";

export function IssueStatCard({
  label,
  value,
  description,
  icon: Icon,
  onClick,
}: {
  label: string;
  value: number | string;
  description: string;
  icon: any;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      //   onClick={onClick}
      className="group relative overflow-hidden rounded-card border border-default bg-card p-5 text-left shadow-card transition-normal hover:border-brand/30 hover:shadow-md"
    >
      <div
        className="absolute left-0 top-0 h-px w-0 bg-brand transition-normal group-hover:w-full
        "
      />

      <div className="flex items-start justify-between">
        <div className="flex size-8 items-center justify-center rounded-lg bg-secondary">
          <Icon
            size={16}
            strokeWidth={2}
            className="text-secondary transition-normal group-hover:text-brand"
          />
        </div>

        {/* <ArrowUpRight
          size={15}
          className="text-secondary opacity-0 transition-normal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand group-hover:opacity-100"
        /> */}
      </div>

      <div className="mt-5">
        <p
          className="text-3xl font-semibold tracking-tight text-primary
          "
        >
          {value}
        </p>

        <p className="mt-1.5 text-sm font-medium text-primary">{label}</p>

        <p className="mt-0.5 text-xs text-secondary">{description}</p>
      </div>
    </button>
  );
}
