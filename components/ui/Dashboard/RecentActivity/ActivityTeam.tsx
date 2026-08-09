"use client";

import {
  ArrowRight,
  CalendarDays,
  CircleCheckBig,
  CirclePlus,
  Flag,
  Pencil,
  Trash2,
  UserMinus,
  UserPlus,
} from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { colors, icons } from "@/utils/constants";

dayjs.extend(relativeTime);

type ChangeValueProps = {
  before: any;
  after: any;
  colored?: boolean;
};

function ChangeValue({ before, after, colored = false }: ChangeValueProps) {
  const beforeValue = before?.name ?? before ?? "None";
  const afterValue = after?.name ?? after ?? "None";

  return (
    <span className="flex min-w-0 items-center gap-1.5">
      <span
        className="min-w-0 truncate"
        style={colored && before?.color ? { color: before.color } : undefined}
      >
        {beforeValue}
      </span>

      <ArrowRight
        size={12}
        strokeWidth={2}
        className="shrink-0 text-secondary"
      />

      <span
        className="min-w-0 truncate"
        style={colored && after?.color ? { color: after.color } : undefined}
      >
        {afterValue}
      </span>
    </span>
  );
}

function getActivityContent(activity: any) {
  switch (activity.action) {
    case "STATUS_CHANGED":
      return {
        verb: "moved",
        subtitle: (
          <ChangeValue
            before={activity.beforeState?.status}
            after={activity.afterState?.status}
            colored
          />
        ),
      };

    case "CREATED":
      return {
        verb: "created",
        subtitle: null,
      };

    case "DELETED":
      return {
        verb: "deleted",
        subtitle: null,
      };

    case "COMPLETED":
      return {
        verb: "completed",
        subtitle: null,
      };

    case "ASSIGNED":
      return {
        verb: "assigned",
        subtitle: (
          <ChangeValue
            before={activity.beforeState?.assignee?.name ?? "Unassigned"}
            after={activity.afterState?.assignee?.name ?? "Unassigned"}
          />
        ),
      };

    case "UNASSIGNED":
      return {
        verb: "unassigned",
        subtitle: (
          <ChangeValue
            before={activity.beforeState?.assignee?.name ?? "Assigned"}
            after="Unassigned"
          />
        ),
      };

    case "PRIORITY_CHANGED":
      return {
        verb: "updated priority",
        subtitle: (
          <ChangeValue
            before={activity.beforeState?.priority ?? "None"}
            after={activity.afterState?.priority ?? "None"}
          />
        ),
      };

    case "TARGET_DATE_CHANGED":
      return {
        verb: "updated target date",
        subtitle: (
          <ChangeValue
            before={formatDate(activity.beforeState?.targetDate)}
            after={formatDate(activity.afterState?.targetDate)}
          />
        ),
      };

    case "DETAILS_UPDATED":
      return getDetailsUpdatedContent(activity);

    default:
      return {
        verb: "updated",
        subtitle: null,
      };
  }
}

function getDetailsUpdatedContent(activity: any) {
  const before = activity.beforeState ?? {};
  const after = activity.afterState ?? {};

  if (before.title !== after.title) {
    return {
      verb: "updated title",
      subtitle: <ChangeValue before={before.title} after={after.title} />,
    };
  }

  if (before.description !== after.description) {
    return {
      verb: "updated description",
      subtitle: "Description changed",
    };
  }

  if (before.blockedReason !== after.blockedReason) {
    return {
      verb: "updated blocked reason",
      subtitle: (
        <ChangeValue
          before={before.blockedReason ?? "None"}
          after={after.blockedReason ?? "None"}
        />
      ),
    };
  }

  return {
    verb: "updated",
    subtitle: null,
  };
}

function formatDate(date?: string | Date | null) {
  if (!date) {
    return "None";
  }

  return dayjs(date).format("MMM D, YYYY");
}

function getIssueUrl(activity: any) {
  return (
    `/${activity.workspaceId}` +
    `/team/${activity.team?.id}` +
    `/project/${activity.project?.id}` +
    `/issue/${activity.issue?.id}?dashboard=true`
  );
}

export default function ActivityItem({
  activity,
  isLast,
}: {
  activity: any;
  isLast: boolean;
}) {
  const router = useRouter();

  const isDeleted = activity.action === "DELETED";

  const Icon = icons[activity.action as keyof typeof icons] ?? CirclePlus;

  const iconColor =
    colors[activity.action as keyof typeof colors] ?? "text-secondary";

  const { verb, subtitle } = getActivityContent(activity);

  const handleClick = () => {
    if (isDeleted) {
      toast.error("Issue is deleted");
      return;
    }

    router.push(getIssueUrl(activity));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    handleClick();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`group flex h-[72px] w-full items-center gap-4 px-6 py-3 transition-normal ${
        !isDeleted ? "cursor-pointer" : "cursor-default"
      } hover-card ${!isLast ? "border-b border-default" : ""}`}
    >
      <div className="flex h-6 w-5 shrink-0 items-center justify-center">
        <Icon
          size={15}
          strokeWidth={2}
          className={`${iconColor} transition-normal ${
            !isDeleted ? "group-hover:scale-105" : ""
          }`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="flex h-5 min-w-0 items-center truncate text-sm leading-5">
          <span className="shrink-0 font-medium text-primary">
            {activity.actor?.name}
          </span>

          <span className="mx-1.5 shrink-0 text-secondary">{verb}</span>

          <span className="min-w-0 truncate font-medium text-primary transition-normal group-hover:text-brand">
            {activity.issue?.title}
          </span>
        </p>

        {subtitle ? (
          <div className="mt-1 flex h-4 min-w-0 items-center truncate text-xs leading-4 text-secondary">
            {subtitle}
          </div>
        ) : (
          <div className="mt-1 h-4" aria-hidden="true" />
        )}
      </div>

      <time
        className="w-[90px] shrink-0 truncate pt-0.5 text-right text-xs tabular-nums text-secondary"
        title={dayjs(activity.created_at).format("MMM D, YYYY h:mm A")}
      >
        {dayjs(activity.created_at).fromNow()}
      </time>
    </div>
  );
}
