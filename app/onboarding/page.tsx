import { CreateWorkspaceModal } from "@/components/Forms/OnboardingForm";
import { LayoutGrid } from "lucide-react";

export default async function OnboardingPage() {
  return (
    <div className="auth-bg flex min-h-screen items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-card border border-default bg-card p-10 shadow-card animate-in fade-in zoom-in-95 duration-300">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent">
              <LayoutGrid className="size-8 text-brand" />
            </div>

            <span className="mt-6 inline-flex rounded-full border border-default bg-accent px-3 py-1 text-xs font-medium text-brand">
              Almost there
            </span>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-primary">
              Create your workspace
            </h1>

            <p className="mt-3 text-sm leading-6 text-secondary">
              Every project, team and issue in Subtend lives inside a workspace.
              Create your first workspace to get started.
            </p>
          </div>

          <div className="mt-10">
            <CreateWorkspaceModal />
          </div>

          <div className="mt-8 border-t border-default pt-6 text-center">
            <p className="text-sm text-secondary">
              Already have an invitation?{" "}
              <button
                type="button"
                className="font-medium text-brand transition-colors hover:opacity-80"
              >
                Join a workspace
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
