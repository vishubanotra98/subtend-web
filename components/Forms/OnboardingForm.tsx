"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { workspaceNameSchema, WorkspaceNameType } from "@/lib/schema";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import {
  createWorkspaceAction,
  fetchWorkspaceAction,
} from "@/Store/actions/workspace.action";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/Spinner/spinner";

export function CreateWorkspaceModal() {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((store) => store);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkspaceNameType>({
    resolver: zodResolver(workspaceNameSchema),
  });

  const onSubmit = async (workspaceName: WorkspaceNameType) => {
    try {
      setLoading(true);

      const userId = userData.user?.id;

      if (!userId) {
        toast.error("User not found. Please sign in again.");
        return;
      }

      const payload = {
        workspaceName: workspaceName.name,
        userId,
      };

      const res = await dispatch(createWorkspaceAction(payload)).unwrap();

      if (res?.success) {
        await dispatch(fetchWorkspaceAction()).unwrap();

        toast.success(res.message);

        router.push(`/${res?.data?.workspace?.id}/dashboard`);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create workspace";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="workspaceName"
          className="block text-sm font-medium text-primary"
        >
          Workspace name
        </label>

        <Input
          id="workspaceName"
          {...register("name")}
          placeholder="Acme Inc."
          maxLength={50}
          disabled={loading}
          className={`primary-input ${errors.name ? "border-destructive focus:ring-destructive" : ""}`}
        />

        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="button-primary w-full"
      >
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
