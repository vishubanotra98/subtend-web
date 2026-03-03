"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { deleteIssue } from "@/actions/workspace.actions";
import toast from "react-hot-toast";
import { Spinner } from "../Spinner/spinner";
import { useParams, useRouter } from "next/navigation";

interface ModalTypes {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DeleteModal({ open, setOpen }: ModalTypes) {
  const [loading, setLoading] = useState(false);

  const { workspaceId, teamId, projectId, issueId } = useParams();
  const router = useRouter();

  const handleDeleteIssue = async () => {
    setLoading(true);
    const payload = {
      workspaceId,
      issueId,
      projectId,
      teamId,
    };
    const res = await deleteIssue(payload);
    if (res?.success) {
      toast.success(res?.message);
      setOpen(false);
      router.push(`/${workspaceId}/team/${teamId}/project/${projectId}`);
    } else {
      toast.error("Error deleting issue.");
    }
    setLoading(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-full flex items-center justify-center gap-2 p-2 rounded text-xs font-medium text-white bg-red-500 hover:bg-red-600 transition-all duration-200 group cursor-pointer">
          <Trash2 size={14} />
          <span>Delete Issue</span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px] bg-[#1f2937] text-white border-white/10 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold tracking-tight text-gray-100">
            Delete Issue
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5 mt-2">
          <p className="text-sm text-gray-400 leading-relaxed">
            Are you sure you want to delete this issue? This action cannot be
            undone and will permanently remove it from your board.
          </p>

          <div className="flex items-center justify-end gap-3 mt-2">
            <DialogClose asChild>
              <button
                type="button"
                className="px-4 py-2 text-xs font-medium text-gray-300 bg-transparent border border-[#374151] hover:bg-[#374151] hover:text-white rounded-md transition-all duration-200"
              >
                Cancel
              </button>
            </DialogClose>

            <button
              onClick={handleDeleteIssue}
              disabled={loading}
              className="px-4 py-2 flex items-center gap-1 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md shadow-sm transition-colors duration-200 cursor-pointer"
            >
              {loading && <Spinner color="#ffffff" />}
              Delete
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
