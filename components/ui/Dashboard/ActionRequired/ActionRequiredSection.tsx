"use client";

import Link from "next/link";
import ActionRequiredItem from "./ActionRequiredItem";

export default function ActionRequiredSection({ attentionListData }: any) {
  return (
    <section className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary">Action Required</h2>

        {attentionListData?.length > 5 && (
          <Link
            href="/dashboard/action-required"
            className="text-sm font-medium text-secondary transition-normal hover:text-brand"
          >
            View All
          </Link>
        )}
      </div>

      <div className="h-full  overflow-hidden rounded-card border border-default bg-card shadow-card">
        {attentionListData?.length === 0 ? (
          <div className="flex h-full flex-1 items-center justify-center">
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
          <div className="flex flex-1 flex-col ">
            {attentionListData?.map((attIssue: any, idx: any) => (
              <div key={attIssue?.issue?.id} className="flex-1">
                <ActionRequiredItem
                  attentionIssueData={attIssue}
                  isLast={idx === attentionListData?.length - 1}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
