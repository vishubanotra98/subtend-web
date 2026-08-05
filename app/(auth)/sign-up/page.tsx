import { SignupForm } from "@/components/Forms/AuthForm/SignupForm";
import GoogleAuthButton from "@/components/ui/Button/GoogleAuthButton";
import Link from "next/link";
import { Suspense } from "react";

export default function Signup() {
  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-primary">
          Create your account
        </h1>

        <p className="max-w-xs text-sm leading-7 text-secondary">
          Create your Subtend workspace and start collaborating in minutes.
        </p>
      </div>

      {/* Form */}
      <Suspense
        fallback={
          <div className="flex h-72 items-center justify-center">
            <span className="text-sm text-secondary">Loading...</span>
          </div>
        }
      >
        <SignupForm />
      </Suspense>

      {/* Divider */}
      <div className="relative flex items-center">
        <div className="flex-1 border-t border-default" />

        <span className="bg-page px-4 text-[11px] font-medium uppercase tracking-[0.18em] text-secondary">
          Or continue with
        </span>

        <div className="flex-1 border-t border-default" />
      </div>

      {/* Google */}
      <GoogleAuthButton />

      {/* Footer */}
      <p className="text-center text-sm text-secondary">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-brand transition-colors hover:opacity-80"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
