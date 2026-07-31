"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/Spinner/spinner";
import { teamNameSchema, TeamNameType } from "@/lib/schema";
import {
  createTeamAction,
  fetchTeamsDataAction,
} from "@/Store/actions/workspace.action";

import { useAppDispatch } from "@/Store/hooks";

type AddTeamFormProps = {
  setModal: (value: boolean) => void;
};

export const AddTeamForm = ({ setModal }: AddTeamFormProps) => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamNameType>({
    resolver: zodResolver(teamNameSchema),
    defaultValues: {
      teamName: "",
    },
  });

  const onSubmit = async ({ teamName }: TeamNameType) => {
    try {
      setLoading(true);

      const workspaceId = params?.workspaceId as string;

      if (!workspaceId) {
        toast.error("Workspace not found.");
        return;
      }

      const payload = {
        workspaceId,
        teamName,
      };

      const res = await dispatch(createTeamAction(payload)).unwrap();

      if (res?.success) {
        await dispatch(fetchTeamsDataAction(workspaceId)).unwrap();

        toast.success(res.message);
        setModal(false);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create team";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="teamName"
          className="block text-sm font-medium text-primary"
        >
          Team name
        </label>

        <p className="text-sm leading-5 text-secondary">
          Teams help organize people and projects within your workspace.
        </p>

        <Input
          id="teamName"
          {...register("teamName")}
          autoFocus
          autoComplete="off"
          maxLength={50}
          disabled={loading}
          placeholder="Engineering"
          className={`primary-input ${
            errors.teamName ? "border-destructive focus:ring-destructive" : ""
          }`}
        />

        {errors.teamName && (
          <p className="text-sm text-destructive">{errors.teamName.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="button-primary w-full"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Spinner className="size-4" />
            Creating team...
          </span>
        ) : (
          "Create team"
        )}
      </button>
    </form>
  );
};
