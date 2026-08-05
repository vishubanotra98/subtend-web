"use client";

import Link from "next/link";
import ActionRequiredItem from "./ActionRequiredItem";

const issues = [
  {
    id: "1",
    reason: "BLOCKED",
    title: "Authentication API",
    team: "Backend",
    project: "Authentication",
    supportingText: "Assigned to Alex Johnson",
  },
  {
    id: "2",
    reason: "TARGET_REACHED",
    title: "Payment Gateway",
    team: "Platform",
    project: "Payments",
    supportingText: "Target · 8 Aug",
  },
  {
    id: "3",
    reason: "URGENT",
    title: "OAuth Login Flow",
    team: "Frontend",
    project: "Authentication",
    supportingText: "Updated 6 days ago",
  },
];

export default function ActionRequiredSection() {
  return (
    <section className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary">Action Required</h2>

        {issues.length > 5 && (
          <Link
            href="/dashboard/action-required"
            className="text-sm font-medium text-secondary transition-normal hover:text-brand"
          >
            View All
          </Link>
        )}
      </div>

      <div className="flex flex-1 flex-col overflow-hidden rounded-card border border-default bg-card shadow-card">
        {issues.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <h3 className="text-base font-medium text-primary">
                Everything looks good.
              </h3>

              <p className="mt-2 text-sm text-secondary">
                No issues require your attention right now.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col divide-y divide-default">
            {issues.map((issue, index) => (
              <div key={issue.id} className="flex-1">
                <ActionRequiredItem
                  issue={issue}
                  isLast={index === issues.length - 1}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
