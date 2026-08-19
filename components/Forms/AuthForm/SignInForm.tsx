"use client";

import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/Spinner/spinner";
import { SignInSchema, signInSchema } from "@/lib/schema";
import { signInAction } from "@/Store/actions/auth.action";
import {
  fetchUserAction,
  fetchWorkspaceAction,
} from "@/Store/actions/workspace.action";
import { useAppDispatch } from "@/Store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ErrorToast } from "@/components/ui/Toast/ErrorToast";

const getErrorMessage = (err: unknown) => {
  if (err instanceof Error) return err.message;

  if (typeof err === "object" && err !== null && "message" in err) {
    const message = (err as { message?: unknown }).message;

    if (typeof message === "string") return message;
  }

  return "Unable to sign in";
};

export function SignInForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (payload: SignInSchema) => {
    try {
      setLoading(true);

      const res = await dispatch(signInAction(payload)).unwrap();

      await dispatch(fetchUserAction()).unwrap();
      await dispatch(fetchWorkspaceAction()).unwrap();

      if (res?.success) {
        router.push("/");
      }
    } catch (err) {
      const message = getErrorMessage(err);
      toast.custom((t) => (
        <ErrorToast t={t} title="Error" description={message} />
      ));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col gap-6">
      <div className="space-y-2">
        <Input
          {...register("email")}
          type="email"
          autoComplete="email"
          placeholder="Email address"
          disabled={loading}
          className={`${errors.email ? "error" : ""}`}
          variant={"auth"}
        />

        {errors.email && (
          <p className="pl-1 text-xs leading-5 text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        {/*
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-brand transition-colors hover:underline"
          >
            Forgot password?
          </Link>
          */}

        <div className="relative">
          <Input
            id="password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            disabled={loading}
            className={`pr-12 ${errors.password ? "error" : ""}`}
            variant="auth"
          />

          <button
            type="button"
            disabled={loading}
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-secondary transition-colors hover:text-primary focus:outline-none focus-visible:text-primary disabled:pointer-events-none disabled:opacity-50"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {errors.password && (
          <p className="pl-1 text-xs leading-5 text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Spinner />
            <span>Signing in...</span>
          </span>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}
