"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Spinner } from "../ui/Spinner/spinner";
import { useAppDispatch } from "@/Store/hooks";
import { verifyInviteMemberAction } from "@/Store/actions/user.action";
import { SuccessToast } from "../ui/Toast/SuccessToast";
import { ErrorToast } from "../ui/Toast/ErrorToast";

const ClientVerification = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const token = searchParams.get("utok");
  const email = searchParams.get("email");
  const role = searchParams.get("role");

  const [status, setStatus] = useState<"VERIFYING" | "SUCCESS" | "ERROR">(
    "VERIFYING",
  );
  const [message, setMessage] = useState("Verifying invitation...");

  useEffect(() => {
    const init = async () => {
      if (!token || !email) {
        setStatus("ERROR");
        setMessage("Invalid verification link.");
        return;
      }

      try {
        const res = await dispatch(
          verifyInviteMemberAction({
            email,
            token,
          }),
        ).unwrap();

        if (res?.success) {
          setStatus("SUCCESS");
          setTimeout(() => {
            if (res?.data?.exists) {
              router.push("/");
            } else {
              setMessage("Verified Successfully!");
              toast.custom((t) => (
                <SuccessToast
                  t={t}
                  title="Verified"
                  description={"Verified Successfully."}
                />
              ));
              router.push(
                `/sign-up?email=${email}&utok=${token}&role=${role}&verified=true`,
              );
            }
          }, 2000);
          return;
        }

        setStatus("ERROR");
        setMessage(res?.message ?? "Verification failed");
        toast.custom((t) => (
          <ErrorToast t={t} title="Error" description="Verification failed" />
        ));
      } catch {
        setStatus("ERROR");
        setMessage("Verification failed");
        toast.custom((t) => (
          <ErrorToast t={t} title="Error" description="Verification failed" />
        ));
      }
    };

    init();
  }, [email, role, router, token]);

  return (
    <div className="auth-bg flex min-h-screen items-center justify-center px-6">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-card border border-default bg-card p-10 shadow-card animate-in fade-in zoom-in-95 duration-300">
          {status === "VERIFYING" && (
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                <Spinner className="size-7 text-brand" />
              </div>

              <h1 className="mt-6 text-3xl font-semibold tracking-tight text-primary">
                Verifying invitation
              </h1>

              <p className="mt-3 max-w-xs text-sm leading-6 text-secondary">
                Please wait while we securely verify your workspace invitation.
              </p>
            </div>
          )}

          {status === "SUCCESS" && (
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle2 className="size-8 text-success" />
              </div>

              <h1 className="mt-6 text-3xl font-semibold tracking-tight text-primary">
                Invitation verified
              </h1>

              <p className="mt-3 max-w-xs text-sm leading-6 text-secondary">
                Preparing your workspace...
              </p>
            </div>
          )}

          {status === "ERROR" && (
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                <XCircle className="size-8 text-destructive" />
              </div>

              <h1 className="mt-6 text-3xl font-semibold tracking-tight text-primary">
                Verification failed
              </h1>

              <p className="mt-3 max-w-xs text-sm leading-6 text-secondary">
                {message}
              </p>

              <button
                onClick={() => router.push("/")}
                className="button-primary mt-8"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientVerification;
