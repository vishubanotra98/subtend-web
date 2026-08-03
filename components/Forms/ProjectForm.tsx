"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "../ui/Spinner/spinner";
import { useAppDispatch } from "@/Store/hooks";
import {
  createProjectAction,
  fetchTeamsDataAction,
} from "@/Store/actions/workspace.action";
import { projectNameSchema, ProjectNameType } from "@/lib/schema";

export function CreateProjectModal({
  teamId,
  setIsModalOpen,
}: {
  teamId: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectNameType>({
    resolver: zodResolver(projectNameSchema),
  });

  const onSubmit = async ({
    projectName,
    projectOverview,
  }: ProjectNameType) => {
    try {
      setLoading(true);

      const payload = {
        teamId,
        projectName,
        projectOverview,
        targetDate: date,
      };

      const res = await dispatch(createProjectAction(payload)).unwrap();

      if (res.success) {
        await dispatch(
          fetchTeamsDataAction(params.workspaceId as string),
        ).unwrap();

        toast.success(res.message);
        setIsModalOpen(false);
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create project",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-primary">Project Name</label>
        <Input
          {...register("projectName")}
          placeholder="Authentication System"
          maxLength={50}
          variant={errors.projectName ? "error" : "default"}
          className="mt-1"
        />

        {errors.projectName && (
          <p className="text-sm text-destructive">
            {errors.projectName.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-primary">
          Project Overview
        </label>
        <Textarea
          {...register("projectOverview")}
          placeholder="Write a short description about this project..."
          className="mt-1"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-primary">Target Date</label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="secondary"
              className="h-12 w-full justify-start font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-secondary" />

              {date ? (
                <span>{format(date, "dd MMM yyyy")}</span>
              ) : (
                <span className="text-secondary">No target date</span>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            className="w-auto rounded-lg border border-default bg-card p-3 shadow-card"
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                setDate(selectedDate);

                if (selectedDate) {
                  setOpen(false);
                }
              }}
              captionLayout="label"
            />

            <div className="mt-3 flex items-center justify-between border-t border-default pt-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setDate(undefined);
                  setOpen(false);
                }}
              >
                Clear
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setIsModalOpen(false)}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <Spinner />
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
