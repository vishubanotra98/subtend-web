"use client";

import Link from "next/link";
import ActionRequiredItem from "./ActionRequiredItem";

export default function ActionRequiredSection({ attentionListData }: any) {
  return (
    <section className="flex h-full flex-col gap-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-base font-semibold text-primary">
            Action Required
          </h2>

          <p className="mt-1 text-sm text-secondary">
            Issues that may need your attention.
          </p>
        </div>

        {attentionListData?.length > 5 && (
          <Link
            href="/dashboard/action-required"
            className="
              text-xs
              font-medium
              text-secondary
              transition-normal
              hover:text-brand
            "
          >
            View all
          </Link>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-hidden rounded-card border border-default bg-card shadow-card">
        {attentionListData?.length === 0 ? (
          <div className="flex h-full min-h-[240px] items-center justify-center px-6">
            <div className="text-center">
              <div className="mx-auto flex size-9 items-center justify-center rounded-lg bg-secondary">
                <span className="text-sm text-secondary">✓</span>
              </div>

              <h3 className="mt-3 text-sm font-medium text-primary">
                Everything looks good
              </h3>

              <p className="mt-1.5 text-xs text-secondary">
                No issues require your attention right now.
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            {attentionListData.slice(0, 5).map((attIssue: any, idx: number) => (
              <ActionRequiredItem
                key={attIssue?.issue?.id}
                attentionIssueData={attIssue}
                isLast={idx === Math.min(attentionListData.length, 5) - 1}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
