"use client";

import {
  Archive,
  FolderKanban,
  RotateCcw,
  ShieldAlert,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";

interface DeletedTeam {
  id: string;
  name: string;
  deletedAt: string;
}

interface DeletedProject {
  id: string;
  name: string;
  deletedAt: string;
  teamName?: string;
}

interface TrashContentTabProps {
  teams?: DeletedTeam[];
  projects?: DeletedProject[];
  onRestoreTeam?: (teamId: string) => void;
  onRestoreProject?: (projectId: string) => void;
  onPermanentDeleteTeam?: (teamId: string) => void;
  onPermanentDeleteProject?: (projectId: string) => void;
}

const formatDeletedAt = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

export default function TrashContentTab({
  teams = [],
  projects = [],
  onRestoreTeam,
  onRestoreProject,
  onPermanentDeleteTeam,
  onPermanentDeleteProject,
}: TrashContentTabProps) {
  const [confirmDelete, setConfirmDelete] = useState<{
    type: "team" | "project";
    id: string;
    name: string;
  } | null>(null);

  const handlePermanentDelete = () => {
    if (!confirmDelete) return;

    if (confirmDelete.type === "team") {
      onPermanentDeleteTeam?.(confirmDelete.id);
    } else {
      onPermanentDeleteProject?.(confirmDelete.id);
    }

    setConfirmDelete(null);
  };

  const hasTeams = teams.length > 0;
  const hasProjects = projects.length > 0;
  const isEmpty = !hasTeams && !hasProjects;

  return (
    <>
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-2.5">
            <Trash2 size={19} className="text-secondary" />

            <h2 className="text-lg font-semibold tracking-tight text-primary">
              Trash
            </h2>
          </div>

          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-secondary">
            Deleted teams and projects are kept here until they are permanently
            removed. Restore them whenever you need to bring them back.
          </p>
        </div>

        <div className="flex items-start gap-3 rounded-card border border-default bg-secondary/40 px-4 py-3.5">
          <ShieldAlert size={17} className="mt-0.5 shrink-0 text-secondary" />

          <div>
            <p className="text-sm font-medium text-primary">
              Deleted resources are recoverable
            </p>

            <p className="mt-1 text-xs leading-relaxed text-secondary">
              Restoring a resource returns it to its previous workspace
              location. Permanently deleted resources cannot be recovered.
            </p>
          </div>
        </div>

        {isEmpty && (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-card border border-default bg-card px-6 text-center shadow-card">
            <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
              <Archive size={20} className="text-secondary" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-primary">
              Trash is empty
            </h3>

            <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-secondary">
              Deleted teams and projects will appear here and can be restored
              before permanent deletion.
            </p>
          </div>
        )}

        {/* Projects */}
        {hasProjects && (
          <TrashSection
            title="Projects"
            description="Deleted projects from your workspace."
            icon={<FolderKanban size={17} />}
            count={projects.length}
          >
            <div className="overflow-hidden rounded-card border border-default bg-card shadow-card">
              {projects.map((project, index) => (
                <TrashItem
                  key={project.id}
                  name={project.name}
                  metadata={
                    project.teamName
                      ? `${project.teamName} • Deleted ${formatDeletedAt(
                          project.deletedAt,
                        )}`
                      : `Deleted ${formatDeletedAt(project.deletedAt)}`
                  }
                  isLast={index === projects.length - 1}
                  onRestore={() => onRestoreProject?.(project.id)}
                  onDelete={() =>
                    setConfirmDelete({
                      type: "project",
                      id: project.id,
                      name: project.name,
                    })
                  }
                />
              ))}
            </div>
          </TrashSection>
        )}

        {/* Teams */}
        {hasTeams && (
          <TrashSection
            title="Teams"
            description="Deleted teams from your workspace."
            icon={<Users size={17} />}
            count={teams.length}
          >
            <div className="overflow-hidden rounded-card border border-default bg-card shadow-card">
              {teams.map((team, index) => (
                <TrashItem
                  key={team.id}
                  name={team.name}
                  metadata={`Deleted ${formatDeletedAt(team.deletedAt)}`}
                  isLast={index === teams.length - 1}
                  onRestore={() => onRestoreTeam?.(team.id)}
                  onDelete={() =>
                    setConfirmDelete({
                      type: "team",
                      id: team.id,
                      name: team.name,
                    })
                  }
                />
              ))}
            </div>
          </TrashSection>
        )}

        {!isEmpty && (
          <div className="border-t border-default pt-5">
            <p className="max-w-2xl text-xs leading-relaxed text-secondary">
              <span className="font-medium text-primary">
                Permanent deletion
              </span>{" "}
              removes the resource and its associated data permanently. Use this
              only when you are certain the resource is no longer needed.
            </p>
          </div>
        )}
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-card border border-default bg-card p-6 shadow-card">
            <div className="flex size-10 items-center justify-center rounded-lg bg-destructive/10">
              <Trash2 size={18} className="text-destructive" />
            </div>

            <h3 className="mt-4 text-base font-semibold text-primary">
              Permanently delete {confirmDelete.type}?
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-secondary">
              <span className="font-medium text-primary">
                “{confirmDelete.name}”
              </span>{" "}
              will be permanently removed. This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="rounded-lg border border-default bg-transparent px-4 py-2 text-sm font-medium text-primary transition-fast hover:bg-secondary"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handlePermanentDelete}
                className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-white transition-fast hover:bg-destructive/90"
              >
                Delete permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TrashSection({
  title,
  description,
  icon,
  count,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3.5">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-primary">
            <span className="text-secondary">{icon}</span>

            <h3 className="text-sm font-semibold">{title}</h3>

            <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary">
              {count}
            </span>
          </div>

          <p className="mt-1 text-xs text-secondary">{description}</p>
        </div>
      </div>

      {children}
    </section>
  );
}

function TrashItem({
  name,
  metadata,
  isLast,
  onRestore,
  onDelete,
}: {
  name: string;
  metadata: string;
  isLast: boolean;
  onRestore: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className={`group flex min-h-[72px] items-center justify-between gap-6 px-5 py-4 transition-fast hover:bg-secondary/50 ${
        !isLast ? "border-b border-default" : ""
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
          <FolderKanban size={16} className="text-secondary" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-primary">{name}</p>

          <p className="mt-0.5 truncate text-xs text-secondary">{metadata}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onRestore}
          className="inline-flex items-center gap-1.5 rounded-lg border border-default bg-transparent px-3 py-1.5 text-xs font-medium text-primary transition-fast hover:border-brand hover:bg-accent hover:text-brand"
        >
          <RotateCcw size={13} />
          Restore
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-1.5 text-xs font-medium text-secondary transition-fast hover:border-destructive/20 hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 size={13} />
          Delete
        </button>
      </div>
    </div>
  );
}
