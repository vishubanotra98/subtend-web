"use client";

import { fetchWorkspaceMambersAction } from "@/Store/actions/workspace.action";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import MembersTabContent from "./MemberSettings";
import TeamsProjectsTabContent from "./TeamsProjectsTabContent";
import DangerContentTab from "./DangerContentTab";

type OptionTypes = "general" | "members" | "teamproject" | "danger";

const options: { label: string; value: OptionTypes }[] = [
  // { label: "General", value: "general" },
  { label: "Members", value: "members" },
  // { label: "Teams & Projects", value: "teamproject" },
  // { label: "Danger Zone", value: "danger" },
];

const WorkspaceSettings = () => {
  const dispatch = useAppDispatch();
  const { workspaceId } = useParams();

  const {
    userData: { user },
    workspaceData: { workspaceMembers },
  } = useAppSelector((store: any) => store);

  const [option, setOption] = useState<OptionTypes>("members");

  useEffect(() => {
    if (!workspaceId) return;

    dispatch(fetchWorkspaceMambersAction(workspaceId as string));
  }, [dispatch, workspaceId]);

  return (
    <div className="flex h-[100vh] min-h-full w-full overflow-hidden bg-background">
      <aside className="flex h-full min-h-full w-56 shrink-0 flex-col border-r border-default bg-secondary/5">
        <div className="px-3 py-6">
          <div className="mb-6 px-3">
            <h2 className="text-sm font-semibold text-primary">
              Workspace settings
            </h2>

            <p className="mt-1 text-xs text-secondary">Manage your workspace</p>
          </div>

          <nav className=" space-y-1">
            {options.map((tab) => {
              const isActive = option === tab.value;

              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setOption(tab.value)}
                  className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-150 cursor-pointer ${isActive ? "bg-brand/20 text-primary" : "text-secondary hover:bg-brand/60 hover:text-primary"}`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="w-full px-10 py-8">
          <header className="mb-8">
            <h1 className="text-xl font-semibold tracking-tight text-primary">
              Workspace settings
            </h1>

            <p className="mt-1.5 text-sm text-secondary">
              Manage your workspace preferences, members, and access.
            </p>
          </header>

          <div className="w-full">
            {option === "general" && (
              <div className="text-sm text-secondary">
                General Settings Content
              </div>
            )}

            {option === "members" && (
              <MembersTabContent
                workspaceMembers={workspaceMembers}
                currentUser={user?.id}
              />
            )}

            {option === "teamproject" && <TeamsProjectsTabContent />}

            {option === "danger" && <DangerContentTab />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkspaceSettings;
