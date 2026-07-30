import { Suspense } from "react";
import ClientVerification from "@/components/Verifications/ClientVerification";
import { Spinner } from "@/components/ui/Spinner/spinner";

export default function UserInvite() {
  return (
    <Suspense
      fallback={
        <div className="auth-bg flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-md rounded-card border border-default bg-card p-10 shadow-card animate-in fade-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                <Spinner className="size-7 text-brand" />
              </div>

              <h2 className="mt-6 text-2xl font-semibold tracking-tight text-primary">
                Loading invitation
              </h2>

              <p className="mt-3 max-w-xs text-sm leading-6 text-secondary">
                Please wait while we load your invitation details.
              </p>
            </div>
          </div>
        </div>
      }
    >
      <ClientVerification />
    </Suspense>
  );
}
