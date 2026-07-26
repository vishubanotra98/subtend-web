"use client";

import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import Card from "../Card/Card";
import { useRouter } from "next/navigation";
import { getTeamPrefix } from "@/utils/constants";
import toast from "react-hot-toast";
import {
  editIssueAction,
  fetchIssuesAction,
} from "@/Store/actions/workspace.action";
import { useAppDispatch } from "@/Store/hooks";

export default function MemberDashboard({
  myIssues,
  myIssuesCount,
  urgentTasks,
  completedIssuesCount,
  totalIssuesCount,
  teamData,
  totalProjects,
  workspaceId,
  workspaceStatusList,
}: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const safeMyIssues = Array.isArray(myIssues) ? myIssues : [];
  const safeUrgentTasks = Array.isArray(urgentTasks) ? urgentTasks : [];
  const safeTeamData = Array.isArray(teamData) ? teamData : [];
  const safeProjects = Array.isArray(totalProjects) ? totalProjects : [];
  const safeWorkspaceStatusList = Array.isArray(workspaceStatusList)
    ? workspaceStatusList
    : [];

  const getTeamData = (projectId: string) => {
    const project = safeProjects.find(
      (project: any) => project?.id === projectId,
    );

    const team = safeTeamData.find((team: any) => team?.id === project?.teamId);
    return team;
  };

  const doneTaskStatus = safeWorkspaceStatusList.find(
    (task: any) => task.name === "Done",
  );

  const incompleteTasksUrg = safeUrgentTasks.filter(
    (task: any) => task?.statusId !== doneTaskStatus?.id,
  );

  const incompleteTasksNormal = safeMyIssues.filter(
    (task: any) =>
      task?.statusId !== doneTaskStatus?.id && task.priority !== "URGENT",
  );

  const handleComplete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    task: any,
  ) => {
    e.stopPropagation();
    const payload = {
      workspaceId,
      teamId: getTeamData(task?.projectId)?.id,
      projectId: task?.projectId,
      issueId: task?.id,
      statusId: doneTaskStatus?.id,
    };
    const res = await dispatch(editIssueAction(payload)).unwrap();
    await dispatch(fetchIssuesAction(workspaceId));
    if (res?.success) {
      toast.success("Marked as completed.");
    }
  };

  const totalPendingIssuesCount =
    incompleteTasksNormal?.length + incompleteTasksUrg?.length;

  return (
    <div>
      <section>
        <h4 className="font-semibold mb-4 text-white">Issues Overview</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card
            title="Total Issues"
            data={totalIssuesCount}
            className="bg-[#1f2937] border-white/5"
            desc="All tickets in workspace"
          />

          <Card
            title="My Tasks"
            data={myIssuesCount}
            className="bg-[#1f2937] border-indigo-500/20"
            desc="Assigned to you"
          />

          <Card
            title="Urgent Fires"
            data={incompleteTasksUrg?.length}
            className="bg-[#1f2937] border-red-500/20"
            desc={
              incompleteTasksUrg?.length > 0
                ? "Requires attention"
                : "No urgent issues"
            }
          />

          <Card
            title="Completed"
            data={completedIssuesCount}
            className="bg-[#1f2937] border-green-500/20"
            desc="Successfully resolved"
          />
        </div>
      </section>
      <div className="mt-10 bg-[#1f2937] h-full border border-white/5 rounded-xl p-6 h-full flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-lg font-semibold text-white">My Work</h3>
          <span className="text-sm text-gray-400 font-medium bg-[#111827] px-3 py-1 rounded-full border border-white/5">
            {totalPendingIssuesCount === 0
              ? "No Tasks Pending"
              : `${totalPendingIssuesCount} Tasks Pending`}
          </span>
        </div>

        {incompleteTasksUrg?.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <AlertCircle size={16} className="text-red-400" />
              <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider">
                Requires Attention
              </h4>
            </div>
            <ul className="grid gap-3">
              {incompleteTasksUrg?.map((task: any) => {
                const teamData = getTeamData(task?.projectId);
                const ticketNumber = getTeamPrefix(teamData, task);
                return (
                  <li
                    onClick={() =>
                      router.push(
                        `/${workspaceId}/team/${teamData?.id}/project/${task.projectId}/issue/${task.id}`,
                      )
                    }
                    key={task.id}
                    className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex justify-between items-center group cursor-pointer hover:bg-red-500/20 transition-colors"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-red-100">
                        {task.title}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-red-300/70 mt-1">
                        <span className="uppercase">{ticketNumber}</span>
                        <span>•</span>

                        <span className="flex items-center gap-1 text-red-300/70">
                          <Clock size={12} className="text-red-300/70" />
                          Due
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-red-400 bg-red-400/10 border border-red-400/20 px-2 py-1 rounded">
                      URGENT
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {incompleteTasksNormal?.length > 0 && (
          <div className="space-y-3 flex-1">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Up Next
              </h4>
            </div>

            <ul className="grid gap-3">
              {incompleteTasksNormal?.map((task: any) => {
                const teamData = getTeamData(task?.projectId);
                const ticketNumber = getTeamPrefix(teamData, task);
                return (
                  <li
                    key={task.id}
                    onClick={() =>
                      router.push(
                        `/${workspaceId}/team/${teamData?.id}/project/${task.projectId}/issue/${task.id}`,
                      )
                    }
                    className="bg-[#111827] border border-white/5 rounded-lg p-3 flex justify-between items-center group cursor-pointer hover:border-indigo-500/30 transition-all"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                          {ticketNumber}
                        </span>
                        <span className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors">
                          {task.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          {task.project}
                        </span>
                        <span className="flex items-center gap-1 text-gray-500">
                          <Clock size={12} />
                          Due
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleComplete(e, task)}
                      className="text-gray-600 hover:text-green-400 transition-colors p-1"
                      title="Mark as complete"
                    >
                      <CheckCircle2 size={20} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {totalPendingIssuesCount === 0 && (
          <div className="text-center py-6 text-sm text-gray-500 border border-dashed border-white/10 rounded-lg">
            You're all caught up!
          </div>
        )}
      </div>
    </div>
  );
}
