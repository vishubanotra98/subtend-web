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
    <div className="w-full max-w-md p-8 space-y-6 bg-bg-primary border border-border-primary rounded-xl shadow-2xl">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">Verify your email</h1>
        <p className="text-sm text-gray-400 mt-2">
          We sent a code to <span className="text-indigo-400">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="otp" className="text-sm font-medium text-gray-300">
            One-Time Password
          </label>
          <input
            id="otp"
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="w-full px-4 py-3 text-center text-2xl tracking-[0.5em] font-mono bg-[#111827] border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-600 outline-none transition-all"
            placeholder="000000"
            disabled={loading}
          />
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={loading || otp.length !== 6}
          className="w-full flex items-center justify-center py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Spinner color="#ffffff" />
              Verifying...
            </>
          ) : (
            "Verify Email"
          )}
        </button>
      </form>

      <div className="text-center">
        <button
          type="button"
          onClick={() => router.push("/sign-up")}
          className="text-sm text-gray-500 hover:text-white transition-colors"
        >
          &larr; Back to Sign Up
        </button>
      </div>
    </div>
  );
}
