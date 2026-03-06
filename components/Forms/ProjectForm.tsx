"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createProjectAction } from "@/actions/user.actions";
import { projectNameSchema, ProjectNameType } from "@/lib/schema";
import toast from "react-hot-toast";
import { Spinner } from "../ui/Spinner/spinner";

export function CreateProjectModal({
  teamId,
  setIsModalOpen,
}: {
  teamId: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectNameSchema),
  });

  const onSubmit = async ({ projectName }: ProjectNameType) => {
    setLoading(true);
    let res = await createProjectAction(projectName, teamId);

    if (res?.success) {
      toast.success(res.message);
    } else {
      toast.error("Error creating project.");
    }
    setLoading(false);
    setIsModalOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-2">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">
          Project Name
        </label>
        <Input
          {...register("projectName")}
          placeholder="Eg: Acme Corp"
          className={`primary-input mt-0.5 ${errors.projectName ? "error" : ""}`}
          required
          maxLength={50}
        />
        {errors.projectName && (
          <p className="text-sm text-red-400">{errors.projectName.message}</p>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          className="w-full button-primary shadow-lg shadow-indigo-500/20"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-1">
              <Spinner color="#ffffff" />
              Creating...
            </span>
          ) : (
            "Create Project"
          )}
        </Button>
      </div>
    </form>
  );
}
