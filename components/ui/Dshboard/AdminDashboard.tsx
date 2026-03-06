"use client";

import DashboardButton from "@/components/Common/TeamDashboardButton";
import Card from "../Card/Card";
import TaskBarChart from "../Chart/BarChart";
import { activityConfig } from "@/utils/constants";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import toast from "react-hot-toast";
import { GetActivity } from "./ActivityTrackerActions";
dayjs.extend(utc);

export default function AdminDashboard({
  totalTeamCount,
  totalIssuesCount,
  totalMembers,
  totalMembersCount,
  selectedWorkspace,
  workspaceId,
  totalProjectsCount,
  activities,
  totalIssues,
  workspaceStatusList,
}: any) {
  const router = useRouter();

  const findMember = (userId: string) => {
    const member = totalMembers?.find(
      (member: any) => member?.user?.id === userId,
    );
    return member?.user;
  };

  const getName = (userData: any) => {
    const name = !userData?.name
      ? userData?.firstName
      : userData?.name?.split(" ")[0];
    return name;
  };

  const getTime = (utcTime: any) => {
    const localTime = dayjs.utc(utcTime).local().format("DD/MM/YYYY hh:mm A");
    return localTime;
  };

  const handleRedirect = (item: any) => {
    const findIssue = totalIssues?.some(
      (issue: any) => issue?.id === item?.issueId,
    );

    if (!findIssue) toast.error("Issue is deleted.");

    if (findIssue && item?.action !== "DELETED") {
      router.push(
        `/${item?.workspaceId}/team/${item?.teamId}/project/${item?.projectId}/issue/${item?.issueId}?from=dashboard`,
      );
    }
  };

  const findStatus = (statusId: string) => {
    const status = workspaceStatusList.find((st: any) => st?.id === statusId);
    return status?.name;
  };

  const getStatusName = (item: any) => {
    const oldIssueId = item?.beforeState?.previousStatusId;
    const newIssueId = item?.afterState?.newStatusId;

    const oldStatusName = findStatus(oldIssueId);
    const newStatusName = findStatus(newIssueId);

    return {
      oldStatusName,
      newStatusName,
    };
  };

  const completedTaskId = workspaceStatusList?.find(
    (status: any) => status?.name === "Done",
  )?.id;

  return (
    <div>
      <header className="flex justify-between items-center mb-12">
        <h3 className="text-2xl font-semibold">{selectedWorkspace?.name}</h3>
        <DashboardButton workspaceId={workspaceId} />
      </header>

      <main className="space-y-10">
        <section>
          <h4 className="font-semibold mb-4">Workspace Summary</h4>
          <div className="flex flex-wrap gap-4">
            <Card
              title="Teams"
              data={totalTeamCount}
              className="bg-[#1f2937] border-white/5"
              desc="Active teams in your workspace"
            />
            <Card
              title="Issues"
              data={totalIssuesCount}
              className="bg-[#1f2937] border-white/5"
              desc={totalIssuesCount === 0 ? "All caught up" : "Open Issues"}
            />
            <Card
              title="Members"
              data={totalMembersCount}
              className="bg-[#1f2937] border-white/5"
              desc="Total workspace users"
            />

            <Card
              title="Projects"
              data={totalProjectsCount}
              className="bg-[#1f2937] border-white/5"
              desc="Ongoing and active initiatives"
            />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className=" flex flex-col">
            <h4 className="font-semibold mb-4">Task Completion</h4>
            <div className="bg-[#1f2937] p-6 rounded-xl border border-white/5 h-[300px]">
              <TaskBarChart
                completedTaskId={completedTaskId}
                workspaceId={workspaceId}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <h4 className="font-semibold">Recent Activity</h4>
            </div>

            <div className="bg-[#1f2937] border border-white/5 rounded-xl p-5 h-[300px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-[#1f2937] [&::-webkit-scrollbar-thumb]:bg-gray-600 hover:[&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-thumb]:rounded-full">
              <ul className="relative space-y-6 before:absolute before:left-[9px]  before:w-[1px]">
                {activities?.length > 0 ? (
                  activities?.map((item: any) => {
                    const selectedMember = findMember(item?.userId);
                    const name = getName(selectedMember);
                    const Icon = activityConfig[item?.action]?.icon;
                    const iconColor = activityConfig[item?.action]?.color;
                    const actionLabel = activityConfig[item?.action]?.label;
                    const time = getTime(item?.created_at);
                    return (
                      <li
                        key={item.id}
                        className="relative pl-8 flex flex-col gap-1"
                      >
                        <div className="absolute left-0 top-1 w-[20px] h-[20px] bg-[#111827] border border-white/10 rounded-full flex items-center justify-center z-10">
                          {Icon && <Icon size={12} className={iconColor} />}
                        </div>

                        <div className="text-sm flex flex-wrap items-center gap-x-1.5 gap-y-2">
                          <span className="font-medium text-white whitespace-nowrap">
                            {name}
                          </span>
                          <span className="text-gray-400 font-semibold whitespace-nowrap">
                            {actionLabel}
                          </span>
                          <span
                            onClick={() => handleRedirect(item)}
                            className="text-indigo-400 hover:underline cursor-pointer whitespace-nowrap"
                          >
                            {item.entityTitle}
                          </span>

                          <GetActivity
                            item={item}
                            getStatusName={getStatusName}
                            findMember={findMember}
                            getName={getName}
                          />
                        </div>

                        <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                          {time}
                        </span>
                      </li>
                    );
                  })
                ) : (
                  <span className="flex items-center justify-center h-full">
                    <p className=" text-gray-400 text-sm font-semibold">
                      No Recent Activities
                    </p>
                  </span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
