"use client";

import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Eye,
  ListTodo,
  PlayCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardHeader from "./DashboardHeader/DashboardHeader";
import ActionRequiredSection from "./ActionRequired/ActionRequiredSection";
import { IssueStatCard } from "./MemberCard/MemberIssueCard";
import { getMyIssuesAction } from "@/Store/actions/workspace.action";
import { useAppDispatch } from "@/Store/hooks";
import { MemberIssue } from "@/types/types";
import { IssueGroup } from "./MemberCard/IssueGroup";

export default function MemberDashboard({
  selectedWorkspace,
  userData,
  isAdmin,
  attentionListData,
}: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const workspaceId = selectedWorkspace?.id;

  const [myIssues, setMyIssues] = useState<MemberIssue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!workspaceId) return;

    let mounted = true;

    const fetchMyIssues = async () => {
      setLoading(true);

      try {
        const response = await dispatch(
          getMyIssuesAction(workspaceId),
        ).unwrap();

        if (mounted) {
          setMyIssues(response?.data?.issues ?? []);
        }
      } catch (error) {
        console.error("Failed to fetch my issues:", error);

        if (mounted) {
          setMyIssues([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchMyIssues();

    return () => {
      mounted = false;
    };
  }, [workspaceId, dispatch]);

  const openIssues = myIssues.filter(
    (issue) => !issue.status?.isCompleted && !issue.status?.isCancelled,
  );

  const inProgressIssues = myIssues.filter(
    (issue) => issue.status?.isInProgress,
  );

  const inReviewIssues = myIssues.filter((issue) => issue.status?.isInReview);

  const completedIssues = myIssues.filter((issue) => issue.status?.isCompleted);

  const urgentIssues = myIssues.filter(
    (issue) => issue.priority === "URGENT" || issue.priority === "HIGH",
  );

  const normalIssues = myIssues.filter(
    (issue) => issue.priority !== "URGENT" && issue.priority !== "HIGH",
  );

  const navigateToIssues = (status?: string) => {
    if (!workspaceId) return;

    const url = status
      ? `/${workspaceId}/my-issues?status=${status}`
      : `/${workspaceId}/my-issues`;

    router.push(url);
  };

  const navigateToIssue = (issue: MemberIssue) => {
    const teamId = issue.project?.team?.id;
    const projectId = issue.project?.id;

    if (!workspaceId || !teamId || !projectId) return;

    router.push(
      `/${workspaceId}/team/${teamId}/project/${projectId}/issue/${issue.id}?dashboard=true`,
    );
  };

  return (
    <div className="space-y-8">
      <DashboardHeader
        selectedWorkspace={selectedWorkspace}
        userData={userData}
        isAdmin={isAdmin}
      />

      <section>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <IssueStatCard
            label="Open"
            value={loading ? "—" : openIssues.length}
            description="Across your projects"
            icon={ListTodo}
            onClick={() => navigateToIssues("OPEN")}
          />

          <IssueStatCard
            label="In Progress"
            value={loading ? "—" : inProgressIssues.length}
            description="Currently being worked on"
            icon={PlayCircle}
            onClick={() => navigateToIssues("IN_PROGRESS")}
          />

          <IssueStatCard
            label="In Review"
            value={loading ? "—" : inReviewIssues.length}
            description="Awaiting review"
            icon={Eye}
            onClick={() => navigateToIssues("IN_REVIEW")}
          />

          <IssueStatCard
            label="Completed"
            value={loading ? "—" : completedIssues.length}
            description="Completed issues"
            icon={CheckCircle2}
            onClick={() => navigateToIssues("COMPLETED")}
          />
        </div>
      </section>

      <div className="h-[360px]">
        <ActionRequiredSection attentionListData={attentionListData} />
      </div>

      <section>
        <div className="mb-4">
          <h2 className="text-base font-semibold text-primary">My Work</h2>

          <p className="mt-1 text-sm text-secondary">
            Your assigned issues across the workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <IssueGroup
            title="Urgent"
            description="High priority work"
            icon={AlertCircle}
            issues={urgentIssues}
            urgent
            loading={loading}
            onIssueClick={navigateToIssue}
            onViewAll={() => navigateToIssues("URGENT")}
          />

          <IssueGroup
            title="Normal"
            description="Other assigned work"
            icon={ListTodo}
            issues={normalIssues}
            loading={loading}
            onIssueClick={navigateToIssue}
            onViewAll={() => navigateToIssues()}
          />
        </div>
      </section>
    </div>
  );
}
