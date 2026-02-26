import { VerifyOtpForm } from "@/components/Verifications/VerifyOtp";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function AccountVerification() {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-[#0b1220] auth-bg">
      <Suspense
        fallback={
          <div className="flex flex-col items-center text-gray-400">
            <Loader2 className="w-8 h-8 mb-4 animate-spin text-indigo-500" />
            <p>Loading verification...</p>
          </div>
        }
      >
        <VerifyOtpForm />
      </Suspense>
    </div>
  );
}
