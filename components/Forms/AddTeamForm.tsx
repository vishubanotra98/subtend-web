"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { teamNameSchema, TeamNameType } from "@/lib/schema";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { Spinner } from "../ui/Spinner/spinner";
import {
  createTeamAction,
  fetchTeamsDataAction,
} from "@/Store/actions/workspace.action";
import { useAppDispatch } from "@/Store/hooks";

export const AddTeamForm = ({
  setModal,
}: {
  setModal: (value: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(teamNameSchema),
  });
  const params = useParams();

  const onSubmit = async ({ teamName }: TeamNameType) => {
    try {
      setLoading(true);
      const workspaceId = params?.workspaceId as string;
      const payload = {
        workspaceId,
        teamName,
      };
      const res = await dispatch(createTeamAction(payload)).unwrap();
      if (res?.success) {
        await dispatch(fetchTeamsDataAction(workspaceId)).unwrap();
        toast.success(res?.message);
        setModal(false);
      }
    } catch (err: any) {
      const message =
        err instanceof Error ? err.message : "Failed to create team";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Team Name</label>
        <Input
          {...register("teamName")}
          placeholder="Eg: Engineering"
          className={`primary-input mt-0.5 ${errors.teamName ? "error" : ""}`}
          required
          maxLength={50}
        />
        {errors.teamName && (
          <p className="text-sm text-red-400">{errors.teamName.message}</p>
        )}
      </div>

      <div className="flex justify-end mt-8">
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
            "Create Team"
          )}
        </Button>
      </div>
    </form>
  );
};
