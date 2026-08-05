"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { Spinner } from "../ui/Spinner/spinner";
import { useAppDispatch } from "@/Store/hooks";
import { otpVerificationAction } from "@/Store/actions/auth.action";

export function VerifyOtpForm() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      if (otp.length !== 6) {
        setError("Please enter a valid 6-digit code.");
        return;
      }

      if (!email) {
        setError("Email is missing. Please sign up again.");
        return;
      }

      const payload = {
        email,
        otp,
      };

      const res = await dispatch(otpVerificationAction(payload)).unwrap();
      if (res?.success) {
        router.push("/sign-in");
      }
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-card border border-default bg-card p-10 shadow-card animate-in fade-in zoom-in-95 duration-300">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent">
            <span className="text-2xl">✉️</span>
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-primary">
            Verify your email
          </h1>

          <p className="mt-3 text-sm leading-6 text-secondary">
            We've sent a 6-digit verification code to
          </p>

          <p className="mt-1 break-all text-sm font-medium text-brand">
            {email}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-primary"
            >
              Verification code
            </label>

            <input
              id="otp"
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              disabled={loading}
              inputMode="numeric"
              autoComplete="one-time-code"
              className="primary-input text-center text-3xl font-semibold tracking-[0.45em]"
            />

            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="button-primary"
          >
            {loading ? (
              <>
                <Spinner className="mr-2 size-4" />
                Verifying...
              </>
            ) : (
              "Verify email"
            )}
          </button>
        </form>

        <div className="mt-8 border-t border-default pt-6 text-center">
          <button
            type="button"
            onClick={() => router.push("/sign-up")}
            className="text-sm font-medium text-secondary transition-colors hover:text-primary"
          >
            Back to sign up
          </button>
        </div>
      </div>
    </div>
  );
}
