"use client";

import { DragDropProvider } from "@dnd-kit/react";
import KanbanDroppable from "@/components/ui/KanbanBoard/KanbanDroppable";
import { useEffect, useState } from "react";
import DraggableCard from "@/components/ui/KanbanBoard/DraggableCard";
import { useParams, useRouter } from "next/navigation";
import { socket } from "@/lib/socket";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import {
  fetchIssuesByProjectAction,
  fetchWorkspaceMambersAction,
  fetchWorkspaceStatusAction,
  moveCardAction,
} from "@/Store/actions/workspace.action";

const KanbanClient = () => {
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
  const router = useRouter();

  useEffect(() => {
    if (!projectId || !workspaceId) return;

    let isMounted = true;

    const init = async () => {
      const [issuesRes] = await Promise.all([
        dispatch(fetchIssuesByProjectAction(projectId)).unwrap(),
        dispatch(fetchWorkspaceMambersAction(workspaceId)).unwrap(),
        dispatch(fetchWorkspaceStatusAction(workspaceId)),
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
    await dispatch(fetchWorkspaceStatusAction(workspaceId));
  };

  if (!projectIssues) return "LOADING...";

  return (
    <DragDropProvider onDragEnd={handleDragOver}>
      <div className="flex items-center gap-4">
        {workspaceStatus?.map((status: any, id: any) => {
          return (
            <KanbanDroppable
              workspaceMembers={workspaceMembers}
              statusList={workspaceStatus}
              status={status}
              key={status?.id}
              id={status?.id}
              projectId={projectId}
              setIssues={setIssues}
            >
              {issues
                ?.filter((issue: any) => issue?.statusId === status?.id)
                ?.map((issue: any) => {
                  const findUser = workspaceMembers?.find(
                    (mem: any) => issue?.assigneeId === mem?.user?.id,
                  );
                  const user = findUser?.user;
                  const userName = !user?.name
                    ? user?.firstName + " " + user?.lastName
                    : user?.name;

                  const issueDataProp = {
                    name: userName,
                    issue,
                    team,
                  };
                  return (
                    status?.id === issue?.statusId && (
                      <span
                        key={issue?.id}
                        onClick={() =>
                          router.push(
                            `/${workspaceId}/team/${teamId}/project/${projectId}/issue/${issue?.id}`,
                          )
                        }
                      >
                        <DraggableCard
                          key={issue?.id}
                          issueData={issueDataProp}
                        />
                      </span>
                    )
                  );
                })}
            </KanbanDroppable>
          );
        })}
      </div>
    </DragDropProvider>
  );
};

export default KanbanClient;
