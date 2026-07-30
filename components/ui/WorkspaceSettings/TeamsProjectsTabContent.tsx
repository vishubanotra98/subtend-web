"use client";

import { useState } from "react";
import { Users, FolderGit2, Trash2, Plus } from "lucide-react";

interface Team {
  id: string;
  name: string;
  memberCount: number;
}

interface Project {
  id: string;
  name: string;
  status: "Active" | "Archived";
}

const initialTeams: Team[] = [
  { id: "t1", name: "Backend-1", memberCount: 4 },
  { id: "t2", name: "Frontend Core", memberCount: 3 },
];

const initialProjects: Project[] = [
  { id: "p1", name: "Demo-Project", status: "Active" },
  { id: "p2", name: "Subtend MVP", status: "Active" },
];

const TeamsProjectsTabContent = () => {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
              <Users size={20} className="text-purple-400" />
              Manage Teams
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Teams group members together for easier assignment.
            </p>
          </div>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg text-sm flex items-center gap-2 transition-colors">
            <Plus size={16} />
            Create Team
          </button>
        </div>

        <div className="bg-[#11131f] border border-gray-800 rounded-xl overflow-hidden shadow-xl">
          {teams.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">
              No teams found in this workspace.
            </div>
          ) : (
            <ul className="divide-y divide-gray-800">
              {teams.map((team) => (
                <li
                  key={team.id}
                  className="flex items-center justify-between p-5 hover:bg-[#161826]/50 transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-200">
                      {team.name}
                    </span>
                    <span className="text-xs text-gray-500 mt-0.5">
                      {team.memberCount} members
                    </span>
                  </div>
                  <button className="px-4 py-2 border border-red-900/50 hover:bg-red-950/40 text-red-400 font-medium rounded-lg text-xs flex items-center gap-2 transition-colors group">
                    <Trash2
                      size={14}
                      className="group-hover:scale-110 transition-transform"
                    />
                    Delete Team
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
              <FolderGit2 size={20} className="text-purple-400" />
              Manage Projects
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Projects contain all your workflows, columns, and tasks.
            </p>
          </div>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg text-sm flex items-center gap-2 transition-colors">
            <Plus size={16} />
            Create Project
          </button>
        </div>

        <div className="bg-[#11131f] border border-gray-800 rounded-xl overflow-hidden shadow-xl">
          {projects.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">
              No projects found in this workspace.
            </div>
          ) : (
            <ul className="divide-y divide-gray-800">
              {projects.map((project) => (
                <li
                  key={project.id}
                  className="flex items-center justify-between p-5 hover:bg-[#161826]/50 transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-200">
                      {project.name}
                    </span>
                    <span className="text-xs mt-0.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="text-gray-500">{project.status}</span>
                    </span>
                  </div>
                  <button className="px-4 py-2 border border-red-900/50 hover:bg-red-950/40 text-red-400 font-medium rounded-lg text-xs flex items-center gap-2 transition-colors group">
                    <Trash2
                      size={14}
                      className="group-hover:scale-110 transition-transform"
                    />
                    Delete Project
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <div className="mt-8 pt-6 border-t border-gray-800/50">
        <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
          <strong className="text-gray-400">Note on deletions:</strong> Deleting
          a team or project removes it from view immediately. The data is held
          in a soft-deleted state and will be permanently purged according to
          your workspace data retention policy (default 30 days).
        </p>
      </div>
    </div>
  );
};

export default TeamsProjectsTabContent;
