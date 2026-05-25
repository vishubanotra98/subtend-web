"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Spinner } from "../ui/Spinner/spinner";
import { useAppDispatch } from "@/Store/hooks";
import { verifyInviteMemberAction } from "@/Store/actions/user.action";

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
          setMessage("Verified Successfully!");
          toast.success("Verified!");

          setTimeout(() => {
            router.push(
              `/sign-up?email=${email}&utok=${token}&role=${role}&verified=true`,
            );
          }, 2000);
          return;
        }

        setStatus("ERROR");
        setMessage(res?.message ?? "Verification failed");
        toast.error("Verification failed");
      } catch {
        setStatus("ERROR");
        setMessage("Verification failed");
        toast.error("Verification failed");
      }
    };

    init();
  }, [email, role, router, token]);

  return (
    <div className="auth-bg w-full h-screen flex items-center justify-center bg-[#0C0E12]">
      <div
        className={`
          flex flex-col items-center justify-center gap-4
          min-w-[320px] py-8 px-6 rounded-xl shadow-2xl border transition-colors duration-300
          bg-bg-primary
        : "border-[#2C2E33]"}
          
        `}
      >
        {status === "VERIFYING" && (
          <>
            <Spinner color="#ffffff" />
            <h1 className="text-gray-300 text-sm font-medium animate-pulse">
              Verifying your invitation...
            </h1>
          </>
        )}

        {status === "SUCCESS" && (
          <>
            <CheckCircle2
              size={48}
              className="text-green-500 animate-in zoom-in duration-300"
            />
            <div className="text-center">
              <h1 className="text-white text-lg font-semibold">Verified!</h1>
              <p className="text-gray-400 text-sm mt-1">
                Redirecting to setup...
              </p>
            </div>
          </>
        )}

        {status === "ERROR" && (
          <>
            <XCircle
              size={48}
              className="text-red-500 animate-in zoom-in duration-300"
            />
            <div className="text-center">
              <h1 className="text-white text-lg font-semibold">
                Verification Failed
              </h1>
              <p className="text-red-400 text-sm mt-1 max-w-[250px]">
                {message}
              </p>
            </div>

            <button
              onClick={() => router.push("/")}
              className="mt-4 text-xs text-gray-500 hover:text-white underline"
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ClientVerification;
