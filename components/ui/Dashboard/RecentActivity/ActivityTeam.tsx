"use client";

import {
  ArrowRight,
  CircleCheckBig,
  CirclePlus,
  Flag,
  UserPlus,
} from "lucide-react";

const icons = {
  STATUS_CHANGED: ArrowRight,
  ASSIGNED: UserPlus,
  PRIORITY_CHANGED: Flag,
  CREATED: CirclePlus,
  COMPLETED: CircleCheckBig,
};

const colors = {
  STATUS_CHANGED: "text-brand",
  ASSIGNED: "text-brand",
  PRIORITY_CHANGED: "text-orange-500",
  CREATED: "text-brand",
  COMPLETED: "text-green-500",
};

const verbs = {
  STATUS_CHANGED: "moved",
  ASSIGNED: "assigned",
  PRIORITY_CHANGED: "updated",
  CREATED: "created",
  COMPLETED: "completed",
};

export default function ActivityItem({
  activity,
  isLast,
}: {
  activity: any;
  isLast: boolean;
}) {
  const Icon = icons[activity.type as keyof typeof icons] ?? CirclePlus;

  const iconColor =
    colors[activity.type as keyof typeof colors] ?? "text-secondary";

  const verb = verbs[activity.type as keyof typeof verbs] ?? "updated";

  return (
    <div
      className={`group flex items-start gap-4 px-6 py-4 transition-normal hover-card ${
        !isLast ? "border-b border-default" : ""
      }`}
    >
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
        <Icon
          size={15}
          strokeWidth={2}
          className={`${iconColor} transition-normal group-hover:scale-105`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm leading-6">
          <span className="font-medium text-primary">{activity.user}</span>

          <span className="mx-1 text-secondary">{verb}</span>

          <span className="font-medium text-primary transition-normal group-hover:text-brand">
            {activity.issue}
          </span>
        </p>

        <p className="mt-0.5 text-xs leading-5 text-secondary">
          {activity.subtitle}
        </p>
      </div>

      <time className="shrink-0 text-xs tabular-nums text-secondary">
        {activity.time}
      </time>
    </div>
  );
}
