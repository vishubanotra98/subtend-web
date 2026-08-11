import SubtendLoader from "@/components/Loader/SubtendLoader";
import { VerifyOtpForm } from "@/components/Verifications/VerifyOtp";
import { Suspense } from "react";

function VerificationLoading() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-secondary">
      <SubtendLoader size={64} />

      <div className="text-center">
        <p className="text-sm font-medium text-primary">Loading verification</p>

        <p className="mt-1 text-xs text-secondary">Please wait a moment...</p>
      </div>
    </div>
  );
}

export default function AccountVerification() {
  return (
    <main className="auth-bg flex min-h-screen w-full items-center justify-center px-6">
      <Suspense fallback={<VerificationLoading />}>
        <VerifyOtpForm />
      </Suspense>
    </main>
  );
}
