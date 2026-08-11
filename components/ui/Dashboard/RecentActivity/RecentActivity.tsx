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

      <div className="overflow-hidden rounded-xl border border-default bg-card shadow-card">
        {activities.length === 0 ? (
          <div className="flex h-56 items-center justify-center">
            <div className="text-center">
              <h3 className="text-sm font-medium text-primary">
                No recent activity
              </h3>

              <p className="mt-1.5 text-xs text-secondary">
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
