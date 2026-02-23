"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { verifyInviteMember } from "@/actions/auth.actions";
import { CheckCircle2, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Spinner } from "../ui/Spinner/spinner";

const ClientVerification = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("utok");
  const email = searchParams.get("email");

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

      const res = await verifyInviteMember({
        email: email,
        token: token,
      });

      if (res?.success) {
        setStatus("SUCCESS");
        setMessage("Verified Successfully!");
        toast.success("Verified!");

        setTimeout(() => {
          router.push(`/sign-up?email=${email}&utok=${token}&verified=true`);
        }, 2000);
      } else {
        setStatus("ERROR");
        setMessage("Verification failed");
        toast.error("Verification failed");
      }
    };

    init();
  }, [token, email, router]);

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
