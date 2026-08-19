"use client";

import { ArrowRight, CirclePlus } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { colors, icons } from "@/utils/constants";
import { ErrorToast } from "../../Toast/ErrorToast";

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
    <span className="flex min-w-0 items-center gap-2">
      <span className="flex min-w-0 items-center gap-1.5">
        {colored && before?.color && (
          <span
            className="size-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: before.color }}
          />
        )}

        <span className="truncate">{beforeValue}</span>
      </span>

      <ArrowRight
        size={11}
        strokeWidth={1.8}
        className="shrink-0 text-secondary/40"
      />

      <span className="flex min-w-0 items-center gap-1.5">
        {colored && after?.color && (
          <span
            className="size-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: after.color }}
          />
        )}

        <span className="truncate">{afterValue}</span>
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
  if (!date) return "None";

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
      toast.custom((t) => (
        <ErrorToast
          t={t}
          title="Issue deleted"
          description="This issue is no longer available."
        />
      ));

      return;
    }

    router.push(getIssueUrl(activity));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    handleClick();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        group
        flex
        min-h-[72px]
        w-full
        items-center
        gap-4
        px-5
        py-3.5
        text-left
        transition-normal
        ${
          !isDeleted ? "cursor-pointer hover:bg-secondary/30" : "cursor-default"
        }
        ${!isLast ? "border-b border-default" : ""}
      `}
    >
      <div
        className={`
          flex
          size-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-secondary
          transition-normal
          ${!isDeleted ? "group-hover:bg-accent" : "opacity-50"}
        `}
      >
        <Icon
          size={15}
          strokeWidth={2}
          className={`
            transition-normal
            ${isDeleted ? "text-secondary" : iconColor}
            ${!isDeleted ? "group-hover:scale-105" : ""}
          `}
        />
      </div>

      <div
        className={`
          min-w-0
          flex-1
          ${isDeleted ? "opacity-60" : ""}
        `}
      >
        <p className="flex min-w-0 items-center text-sm leading-5">
          <span className="shrink-0 font-medium text-primary">
            {activity.actor?.name}
          </span>

          <span className="mx-1.5 shrink-0 text-secondary">{verb}</span>

          <span
            className="
              min-w-0
              truncate
              font-medium
              text-primary
              transition-normal
              group-hover:text-brand
            "
          >
            {activity.issue?.title}
          </span>
        </p>

        {subtitle && (
          <div className="mt-1 flex min-w-0 items-center truncate text-xs leading-4 text-secondary">
            {subtitle}
          </div>
        )}
      </div>

      <time
        className="
          shrink-0
          text-xs
          tabular-nums
          text-secondary
        "
        title={dayjs(activity.created_at).format("MMM D, YYYY h:mm A")}
      >
        {dayjs(activity.created_at).fromNow()}
      </time>
    </div>
  );
}
