"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createWorkspaceAction } from "@/actions/user.actions";
import { workspaceNameSchema, WorkspaceNameType } from "@/lib/schema";
import toast from "react-hot-toast";

export function CreateWorkspaceModal({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(workspaceNameSchema),
  });

  const onSubmit = async (wsName: WorkspaceNameType) => {
    setLoading(true);

    let res = await createWorkspaceAction(wsName, userId);

    if (res?.success) {
      toast.success(res.message);
    } else {
      toast.error("Error creating workspace.");
    }
    setLoading(false);
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
