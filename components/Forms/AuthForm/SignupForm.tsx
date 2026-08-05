"use client";

import { Spinner } from "../../ui/Spinner/spinner";
import { signUpAction } from "@/Store/actions/auth.action";
import { useAppDispatch } from "@/Store/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  RegisterUserWithConfirmSchema,
  registerUserWithConfirmSchema,
} from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const getErrorMessage = (err: unknown) => {
  if (err instanceof Error) return err.message;

  if (typeof err === "object" && err !== null && "message" in err) {
    const message = (err as { message?: unknown }).message;

    if (typeof message === "string") return message;
  }

  return "Unable to create account";
};

export function SignupForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useSearchParams();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const token = params.get("utok");
  const invitedEmail = params.get("email");
  const role = params.get("role");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserWithConfirmSchema>({
    resolver: zodResolver(registerUserWithConfirmSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: invitedEmail ?? "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignup = async (formData: RegisterUserWithConfirmSchema) => {
    try {
      setLoading(true);

      const payload = {
        formData,
        token,
        isAdmin: role === "ADMIN",
      };

      const res = await dispatch(signUpAction(payload)).unwrap();

      if (res?.success) {
        const workspaceId = res?.data?.workspaceId;
        const email = res?.data?.email;
        const isInvited = res?.data?.invited;

        if (!email && !workspaceId) {
          router.push("/sign-in");
        } else if (workspaceId && token && isInvited) {
          toast.success("Sign in to access the workspace!");
          router.push("/sign-in");
        } else {
          toast.success(res.message);
          router.push(`/account-verification?email=${email}`);
        }
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignup)} className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Input
            {...register("firstName")}
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            disabled={loading}
            className={`primary-input ${errors.firstName ? "error" : ""}`}
          />

          {errors.firstName && (
            <p className="pl-1 text-xs leading-5 text-destructive">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            {...register("lastName")}
            type="text"
            autoComplete="family-name"
            placeholder="Last name"
            disabled={loading}
            className={`primary-input ${errors.lastName ? "error" : ""}`}
          />

          {errors.lastName && (
            <p className="pl-1 text-xs leading-5 text-destructive">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Input
          {...register("email")}
          type="email"
          autoComplete="email"
          placeholder="Email address"
          disabled={loading || !!invitedEmail}
          variant={errors.email ? "error" : "auth"}
        />

        {errors.email && (
          <p className="pl-1 text-xs leading-5 text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="relative">
          <Input
            {...register("password")}
            type={showPassword.password ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Password"
            disabled={loading}
            variant={
              errors.password || errors.confirmPassword ? "error" : "auth"
            }
          />

          <button
            type="button"
            disabled={loading}
            aria-label={
              showPassword.password ? "Hide password" : "Show password"
            }
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                password: !prev.password,
              }))
            }
            className="absolute right-4 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-secondary transition-colors hover:text-primary focus:outline-none focus-visible:text-primary disabled:pointer-events-none disabled:opacity-50"
          >
            {showPassword.password ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {errors.password && (
          <p className="pl-1 text-xs leading-5 text-destructive">
            {errors.password.message || errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="relative">
          <Input
            {...register("confirmPassword")}
            type={showPassword.confirmPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Confirm password"
            disabled={loading}
            variant={errors.confirmPassword ? "error" : "auth"}
          />

          <button
            type="button"
            disabled={loading}
            aria-label={
              showPassword.confirmPassword ? "Hide password" : "Show password"
            }
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                confirmPassword: !prev.confirmPassword,
              }))
            }
            className="absolute right-4 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-secondary transition-colors hover:text-primary focus:outline-none focus-visible:text-primary disabled:pointer-events-none disabled:opacity-50"
          >
            {showPassword.confirmPassword ? (
              <EyeOff size={16} />
            ) : (
              <Eye size={16} />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="pl-1 text-xs leading-5 text-red-50 ">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Spinner />
            <span>Creating account...</span>
          </span>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  );
}
