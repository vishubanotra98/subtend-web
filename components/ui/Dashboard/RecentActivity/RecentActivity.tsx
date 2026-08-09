"use client";

import { ChevronRight } from "lucide-react";
import ActivityItem from "./ActivityTeam";

export default function RecentActivity({ workspaceActivities }: any) {
  // const activities = workspaceActivities?.slice(0, 5) ?? [];
  const activities = workspaceActivities;

  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-base font-semibold text-primary">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-secondary">
            Latest updates across your workspace.
          </p>
        </div>

        {/* <Link
          href="/dashboard/activity"
          className="group inline-flex items-center gap-1 text-sm font-medium text-secondary transition-normal hover:text-brand"
        >
          View All
          <ChevronRight
            size={16}
            className="transition-normal group-hover:translate-x-0.5"
          />
        </Link> */}
      </div>

      <div className="overflow-hidden rounded-card border border-default bg-card shadow-card">
        {activities.length === 0 ? (
          <div className="flex h-56 items-center justify-center">
            <div className="text-center">
              <h3 className="text-base font-medium text-primary">
                No recent activity
              </h3>

              <p className="mt-2 text-sm text-secondary">
                Workspace activity will appear here as your team collaborates.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-h-[360px] overflow-y-auto">
            {activities.map((activity: any, idx: number) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                isLast={idx === activities.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
