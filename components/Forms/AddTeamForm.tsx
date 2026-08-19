"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/Spinner/spinner";

import { teamNameSchema, TeamNameType } from "@/lib/schema";
import {
  createTeamAction,
  fetchTeamsDataAction,
} from "@/Store/actions/workspace.action";
import { useAppDispatch } from "@/Store/hooks";
import { SuccessToast } from "../ui/Toast/SuccessToast";
import { ErrorToast } from "../ui/Toast/ErrorToast";

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

      const workspaceId = params.workspaceId as string;

      if (!workspaceId) {
        toast.custom((t) => (
          <ErrorToast t={t} title="Error" description="Workspace not found." />
        ));
        return;
      }

      const res = await dispatch(
        createTeamAction({
          workspaceId,
          teamName,
        }),
      ).unwrap();

      if (res.success) {
        await dispatch(fetchTeamsDataAction(workspaceId)).unwrap();

        // toast.custom(res.message);
        toast.custom((t) => (
          <SuccessToast t={t} title="Team Added" description={res?.message} />
        ));
        setModal(false);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create team";
      toast.custom((t) => (
        <ErrorToast t={t} title="Error" description={message} />
      ));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5">
        <label htmlFor="teamName" className="text-sm font-medium text-primary">
          Team Name
        </label>

        <Input
          id="teamName"
          {...register("teamName")}
          autoFocus
          autoComplete="off"
          maxLength={50}
          disabled={loading}
          placeholder="Engineering"
          variant={errors.teamName ? "error" : "default"}
          className="mt-1"
        />

        {errors.teamName && (
          <p className="text-sm text-destructive">{errors.teamName.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="secondary"
          disabled={loading}
          onClick={() => setModal(false)}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <Spinner color="#fff" />
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
