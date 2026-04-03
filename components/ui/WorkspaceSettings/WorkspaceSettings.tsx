"use client";

import { useState } from "react";
import MembersTabContent from "./MemberSettings";
import TeamsProjectsTabContent from "./TeamsProjectsTabContent";
import DangerContentTab from "./DangerContentTab";

type OptionTypes = "general" | "members" | "teamproject" | "danger";

const options: { label: string; value: OptionTypes }[] = [
  { label: "General", value: "general" },
  { label: "Members", value: "members" },
  { label: "Teams & Projects", value: "teamproject" },
  { label: "Danger Zone", value: "danger" },
];

const WorkspaceSettings = () => {
  const [option, setOption] = useState<OptionTypes>("general");

  return (
    <div className="flex-1 p-10 overflow-y-auto text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Workspace Settings
        </h1>
        <p className="text-gray-400 mb-8">
          Manage your workspace preferences, members, and billing.
        </p>

        <div className="flex space-x-6 border-b border-gray-800 mb-8">
          {options.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setOption(tab.value)}
              className={`pb-3 font-medium transition-colors ${
                option === tab.value
                  ? "border-b-2 border-purple-500 text-purple-400"
                  : "border-b-2 border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {option === "general" && <div>General Settings Content</div>}
          {option === "members" && <MembersTabContent />}
          {option === "teamproject" && <TeamsProjectsTabContent />}
          {option === "danger" && <DangerContentTab />}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSettings;
