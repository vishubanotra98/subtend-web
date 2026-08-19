"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/Spinner/spinner";
import { workspaceNameSchema, WorkspaceNameType } from "@/lib/schema";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import {
  createWorkspaceAction,
  fetchWorkspaceAction,
} from "@/Store/actions/workspace.action";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { SuccessToast } from "../ui/Toast/SuccessToast";
import { ErrorToast } from "../ui/Toast/ErrorToast";

export function OnboardingForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { userData } = useAppSelector((store) => store);
  const [loading, setLoading] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkspaceNameType>({
    resolver: zodResolver(workspaceNameSchema),
    defaultValues: {
      name: "",
    },
  });

  const workspaceName = watch("name") || "";

  const onSubmit = async (data: WorkspaceNameType) => {
    try {
      setLoading(true);

      const userId = userData.user?.id;

      if (!userId) {
        toast.custom((t) => (
          <ErrorToast
            t={t}
            title="Error"
            description={"User not found. Please sign in again."}
          />
        ));
        return;
      }

      const payload = {
        workspaceName: data.name,
        userId,
      };

      const res = await dispatch(createWorkspaceAction(payload)).unwrap();

      if (res?.success) {
        await dispatch(fetchWorkspaceAction()).unwrap();

        toast.custom((t) => (
          <SuccessToast t={t} title="Success" description={res.message} />
        ));

        router.push(`/${res.data.workspace.id}/dashboard`);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create workspace";

      toast.custom((t) => (
        <ErrorToast t={t} title="Error" description={message} />
      ));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="workspaceName"
            className="block text-sm font-medium text-primary"
          >
            Name your workspace
          </label>
        </div>

        <Input
          id="workspaceName"
          autoFocus
          autoComplete="off"
          maxLength={50}
          disabled={loading}
          placeholder="My Workspace"
          {...register("name")}
          className={`mb-2 ${
            errors.name ? "border-destructive focus:ring-destructive" : ""
          }`}
        />

        <div className="flex items-start justify-between">
          {errors.name ? (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          ) : (
            <span />
          )}

          {workspaceName.length > 0 && (
            <span className="text-xs text-secondary">
              {workspaceName.length}/50
            </span>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Spinner className="mr-2 size-4" />
            Creating workspace...
          </>
        ) : (
          "Create workspace"
        )}
      </Button>
    </form>
  );
}
