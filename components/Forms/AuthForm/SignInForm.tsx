"use client";

import { Input } from "@/components/ui/Input/input";
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
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function SignInForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="flex flex-col gap-3"
      >
        <div>
          <Input
            {...register("email")}
            type="email"
            placeholder="Email address"
            className="primary-input"
            required
          />
          {errors.email && (
            <p className="mt-0.5 ml-0.5 text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="relative">
          <Input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`primary-input ${errors.password ? "error" : ""}`}
            required
          />
          <div className=" absolute top-[30%] right-5">
            {showPassword ? (
              <EyeOff
                color="#6b7280"
                size={14}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <Eye
                color="#6b7280"
                size={14}
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          {errors.password && (
            <p className="mt-0.5 ml-0.5 text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <button type="submit" className="button-primary" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center gap-1">
              <Spinner color="#ffffff" />
              <span>Signing In</span>
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
}
