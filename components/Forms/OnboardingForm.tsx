"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {} from "@/actions/user.actions";
import { workspaceNameSchema, WorkspaceNameType } from "@/lib/schema";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { createWorkspaceAction } from "@/Store/actions/workspace.action";
import { useRouter } from "next/navigation";

export function CreateWorkspaceModal() {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((store) => store);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  console.log("userData", userData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
      let res = await dispatch(createWorkspaceAction(payload)).unwrap();
      if (res?.success) {
        toast.success(res.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-2">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">
          Workspace Name
        </label>
        <Input
          {...register("name")}
          placeholder="Eg: Acme Corp"
          className={`primary-input mt-0.5 ${errors.name ? "error" : ""}`}
          required
          maxLength={50}
        />
        {errors.name && (
          <p className="text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          className="w-full button-primary shadow-lg shadow-indigo-500/20"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Workspace"}
        </Button>
      </div>
    </form>
  );
}
