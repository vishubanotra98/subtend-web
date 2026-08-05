"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ActivityItem from "./ActivityTeam";

const activities = [
  {
    id: "1",
    type: "STATUS_CHANGED",
    user: "John Doe",
    issue: "Authentication API",
    subtitle: "Todo → In Progress",
    time: "5 min ago",
  },
  {
    id: "2",
    type: "ASSIGNED",
    user: "Sarah",
    issue: "OAuth Login",
    subtitle: "Assigned to Alex Johnson",
    time: "18 min ago",
  },
  {
    id: "3",
    type: "PRIORITY_CHANGED",
    user: "Mike",
    issue: "Payment Gateway",
    subtitle: "High → Urgent",
    time: "1 hour ago",
  },
  {
    id: "4",
    type: "CREATED",
    user: "Emily",
    issue: "Payment Gateway",
    subtitle: "Platform • Payments",
    time: "Yesterday",
  },
  {
    id: "5",
    type: "COMPLETED",
    user: "David",
    issue: "User Profile",
    subtitle: "Moved to Done",
    time: "2 days ago",
  },
];

export default function RecentActivity() {
  return (
    <section className="mt-10 space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-lg font-semibold text-primary">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-secondary">
            Latest updates across your workspace.
          </p>
        </div>

        <Link
          href="/dashboard/activity"
          className="group inline-flex items-center gap-1 text-sm font-medium text-secondary transition-normal hover:text-brand"
        >
          View All
          <ChevronRight
            size={16}
            className="transition-normal group-hover:translate-x-0.5"
          />
        </Link>
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
          <div className="divide-y divide-default">
            {activities.slice(0, 5).map((activity, index) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                isLast={index === activities.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
