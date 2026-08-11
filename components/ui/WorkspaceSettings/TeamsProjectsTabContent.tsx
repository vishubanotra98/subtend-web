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
      <section className="space-y-5">
        <div className="flex items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <Users size={16} className="text-brand" />
              </div>

              <h2 className="text-base font-semibold text-primary">
                Manage Teams
              </h2>
            </div>

            <p className="mt-1.5 text-sm text-secondary">
              Teams group members together for easier assignment.
            </p>
          </div>

          <button
            type="button"
            className=" group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-default bg-card px-3.5 py-2 text-sm font-medium text-primary shadow-sm transition-all duration-200 hover:border-brand hover:bg-accent hover:text-brand active:scale-[0.98] cursor-pointer"
          >
            <Plus
              size={15}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:rotate-90"
            />
            Create Team
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-default bg-card shadow-card">
          {teams.length === 0 ? (
            <div className="flex min-h-28 items-center justify-center px-6 text-sm text-secondary">
              No teams found in this workspace.
            </div>
          ) : (
            <ul className="divide-y divide-default">
              {teams.map((team) => (
                <li
                  key={team.id}
                  className=" group flex items-center justify-between gap-6 px-5 py-4 transition-colors duration-150 hover:bg-secondary/40"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-default bg-secondary/40">
                      <Users size={15} className="text-secondary" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-primary">
                        {team.name}
                      </p>

                      <p className="mt-0.5 text-xs text-secondary">
                        {team.memberCount}{" "}
                        {team.memberCount === 1 ? "member" : "members"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className=" group/delete inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-1.5 text-xs font-medium text-destructive transition-all duration-150 hover:bg-destructive/10 hover:border-destructive/30 active:scale-[0.98] cursor-pointer"
                  >
                    <Trash2
                      size={13}
                      className="transition-transform duration-150 group-hover/delete:scale-105"
                    />
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <FolderGit2 size={16} className="text-brand" />
              </div>

              <h2 className="text-base font-semibold text-primary">
                Manage Projects
              </h2>
            </div>

            <p className="mt-1.5 text-sm text-secondary">
              Projects contain your workflows, columns, and tasks.
            </p>
          </div>

          <button
            type="button"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-default bg-card px-3.5 py-2 text-sm font-medium text-primary shadow-sm transition-all duration-200 hover:border-brand hover:bg-accent hover:text-brand active:scale-[0.98] cursor-pointer"
          >
            <Plus
              size={15}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:rotate-90"
            />
            Create Project
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-default bg-card shadow-card">
          {projects.length === 0 ? (
            <div className="flex min-h-28 items-center justify-center px-6 text-sm text-secondary">
              No projects found in this workspace.
            </div>
          ) : (
            <ul className="divide-y divide-default">
              {projects.map((project) => (
                <li
                  key={project.id}
                  className="group flex items-center justify-between gap-6 px-5 py-4 transition-colors duration-150 hover:bg-secondary/40"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-default bg-secondary/40">
                      <FolderGit2 size={15} className="text-secondary" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-primary">
                        {project.name}
                      </p>

                      <div className="mt-1 flex items-center gap-1.5">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            project.status === "Active"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        />

                        <span className="text-xs text-secondary">
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className=" group/delete inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-1.5 text-xs font-medium text-destructive transition-all duration-150 hover:bg-destructive/10 hover:border-destructive/30 active:scale-[0.98] cursor-pointer
                    "
                  >
                    <Trash2
                      size={13}
                      className="transition-transform duration-150 group-hover/delete:scale-105"
                    />
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <div className="border-t border-default pt-6">
        <div className="flex max-w-2xl gap-3">
          <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />

          <p className="text-sm leading-relaxed text-secondary">
            <strong className="font-medium text-primary">
              Note on deletions:
            </strong>{" "}
            Deleting a team or project removes it from view immediately. The
            data is held in a soft-deleted state and will be permanently purged
            according to your workspace data retention policy (default 30 days).
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamsProjectsTabContent;
