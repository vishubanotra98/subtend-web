"use client";

import KanbanClient from "@/components/ui/KanbanBoard/KanbanClient";
import {
  fetchIssuesByProjectAction,
  fetchWorkspaceMambersAction,
  fetchWorkspaceStatusAction,
  moveCardAction,
} from "@/Store/actions/workspace.action";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectIssue() {
  const dispatch = useAppDispatch();
  const {
    workspaceData: {
      workspaceMembers,
      workspaceStatus,
      teamsData,
      projectIssues,
    },
  } = useAppSelector((store: any) => store);

  const [issues, setIssues] = useState<any>([]);
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const teamId = params?.teamId;
  const projectId = params?.projectId as string;

  useEffect(() => {
    if (!projectId || !workspaceId) return;

    let isMounted = true;

    const init = async () => {
      const [issuesRes] = await Promise.all([
        dispatch(fetchIssuesByProjectAction(projectId)).unwrap(),
        dispatch(fetchWorkspaceMambersAction(workspaceId)).unwrap(),
        dispatch(fetchWorkspaceStatusAction({ workspaceId, projectId })),
      ]);

      if (isMounted) {
        setIssues(issuesRes?.data?.issues ?? []);
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [dispatch, projectId, workspaceId]);

  const team = teamsData?.teamData?.find((team: any) => team?.id === teamId);

  const handleDragOver = async (event: any) => {
    const sourceId = event.operation.source?.id as string;
    const targetId = event.operation.target?.id as string;

    console.log("Source Id: ", sourceId);
    console.log("Target Id", targetId);

    if (!targetId || sourceId === targetId) return;

    const updatedIssues = issues.map((issue: any) => {
      if (issue.id === sourceId) {
        return { ...issue, statusId: targetId };
      }
      return issue;
    });

    setIssues(updatedIssues);

    const payload = {
      sourceId,
      targetId,
      workspaceId,
      teamId,
    };

    await dispatch(moveCardAction(payload));
    const issuesRes = await dispatch(
      fetchIssuesByProjectAction(projectId),
    ).unwrap();
    setIssues(issuesRes?.data?.issues ?? []);
    await dispatch(fetchWorkspaceStatusAction({ workspaceId, projectId }));
  };

  const data = {
    projectId,
    workspaceMembers,
    workspaceStatus,
    setIssues,
    issues,
    team,
    workspaceId,
    teamId,
  };

  if (!projectIssues) return "LOADING...";
  return (
    <main className="flex h-full flex-col bg-background">
      {/* Project Header */}
      <header className="border-b border-default">
        <div className="mx-auto flex w-full flex-col gap-6 px-8 py-6">
          {/* Project Info */}
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-primary">
              Authentication System
            </h1>

            <p className="max-w-3xl text-sm leading-6 text-secondary">
              OAuth, JWT authentication, refresh token rotation and user
              management.
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left Section */}
            <div className="flex flex-1 items-center gap-3">
              {/* Search */}
              <div className="h-11 w-full max-w-sm rounded-lg border border-default bg-card" />

              {/* Filters */}
              <div className="h-11 w-28 rounded-lg border border-default bg-card" />

              <div className="h-11 w-28 rounded-lg border border-default bg-card" />

              <div className="h-11 w-28 rounded-lg border border-default bg-card" />
            </div>

            {/* Right Section */}

            <div className="h-11 w-36 rounded-lg bg-brand" />
          </div>
        </div>
      </header>

      {/* Board */}

      <section className="min-h-0 flex-1 overflow-hidden">
        <div className="h-full px-8 py-6">
          <KanbanClient data={data} handleDragOver={handleDragOver} />
        </div>
      </section>
    </main>
  );
}
