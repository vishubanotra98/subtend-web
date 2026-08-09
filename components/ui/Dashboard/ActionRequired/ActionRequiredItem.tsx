"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Paragraph } from "@/components/Common/Paragraph";
import { useParams } from "next/navigation";
import { badgeLabels, badgeVariants } from "@/utils/constants";

export default function ActionRequiredItem({ attentionIssueData }: any) {
  const { attentionReason, issue } = attentionIssueData;
  const { workspaceId } = useParams();

  const getSupportingText = () => {
    if (attentionReason?.status === "BLOCKED") {
      const blockedAt = attentionReason.blockedAt;

      const assigneeName =
        issue?.assignee?.name ||
        [issue?.assignee?.firstName, issue?.assignee?.lastName]
          .filter(Boolean)
          .join(" ");

      if (blockedAt && assigneeName) {
        return `Blocked ${blockedAt} • Assigned to ${assigneeName}`;
      }

      if (blockedAt) {
        return `Blocked ${blockedAt}`;
      }

      if (assigneeName) {
        return `Assigned to ${assigneeName}`;
      }

      return "Issue is blocked";
    }

    if (attentionReason?.checkStale) {
      return `No updates for ${attentionReason.checkStale.by}`;
    }

    if (attentionReason?.checkDue) {
      if (attentionReason.checkDue.overdue) {
        return `Overdue by ${attentionReason.checkDue.by}`;
      }

      if (attentionReason.checkDue.dueDay) {
        return `Due in ${attentionReason.checkDue.by}`;
      }
    }

    if (attentionReason?.priority === "HIGH") {
      return "High priority issue";
    }

    return "";
  };

  const redirectUrl = `/${workspaceId}/team/${issue?.project?.team?.id}/project/${issue?.project?.id}/issue/${issue?.id}?dashboard`;

  return (
    <Link
      href={redirectUrl}
      className="border-b group flex items-center justify-between gap-4 px-6 py-4 transition-normal hover-card"
    >
      <div className="min-w-0 flex-1">
        <span className="">
          <span className="flex items-center gap-2">
            {attentionReason.status && (
              <Paragraph
                className={badgeVariants[attentionReason.status]}
                innerText={badgeLabels[attentionReason.status]}
              />
            )}

            {attentionReason?.priority && (
              <Paragraph
                className={badgeVariants[attentionReason.priority]}
                innerText={badgeLabels[attentionReason.priority]}
              />
            )}

            {attentionReason?.checkDue && (
              <Paragraph
                className={badgeVariants[attentionReason.checkDue.overdue]}
                innerText={badgeLabels[attentionReason.checkDue.overdue]}
              />
            )}

            {attentionReason?.checkStale && (
              <Paragraph
                className={badgeVariants[attentionReason.checkStale.stale]}
                innerText={badgeLabels[attentionReason.checkDue.stale]}
              />
            )}
          </span>
        </span>

        <h3 className=" mt-1.5 truncate text-sm font-semibold leading-5 text-primary transition-normal group-hover:text-brand">
          {issue.title}
        </h3>

        <p className="mt-1.5 truncate text-xs text-secondary">
          {issue?.project?.team?.name}
          <span className="mx-2 text-border">•</span>
          {issue?.project?.name}
          <span className="mx-2 text-border">•</span>
          {getSupportingText()}
        </p>
      </div>

      <div className="flex items-center gap-1 text-xs text-secondary opacity-0 transition-normal group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-brand">
        <span>Open</span>
        <ChevronRight size={16} />
      </div>
    </Link>
  );
}
