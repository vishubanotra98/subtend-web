"use client";

import ActivityItem from "./ActivityTeam";

export default function RecentActivity({ workspaceActivities }: any) {
  const activities = workspaceActivities ?? [];

  return (
    <section className="mt-10">
      <div className="mb-4">
        <h2 className="text-base font-semibold tracking-tight text-primary">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-secondary">
          Latest updates across your workspace.
        </p>
      </div>

      <div className="overflow-hidden rounded-card border border-default bg-card shadow-card">
        {activities?.length === 0 ? (
          <div className="flex min-h-[240px] items-center justify-center px-6">
            <div className="text-center">
              <div className="mx-auto flex size-9 items-center justify-center rounded-lg bg-secondary">
                <span className="text-sm text-secondary">•</span>
              </div>

              <h3 className="mt-3 text-sm font-medium text-primary">
                No recent activity
              </h3>

              <p className="mt-1.5 max-w-sm text-xs leading-5 text-secondary">
                Activity from your workspace will appear here as your team works
                on issues.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-h-[420px] overflow-y-auto">
            {activities?.map((activity: any, idx: number) => (
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
