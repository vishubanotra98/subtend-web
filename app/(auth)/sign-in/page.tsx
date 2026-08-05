import { SignInForm } from "@/components/Forms/AuthForm/SignInForm";
import GoogleAuthButton from "@/components/ui/Button/GoogleAuthButton";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-primary">
          Welcome back
        </h1>

        <p className="max-w-xs text-sm leading-7 text-secondary">
          Build software together with your team.
        </p>
      </div>

      {/* Form */}
      <SignInForm />

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
        Don't have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-brand transition-colors hover:opacity-80"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
