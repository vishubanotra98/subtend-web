"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

interface ModalTypes {
  title: string;
  body: React.ReactNode;
}

export function IssueModal({ title, body }: ModalTypes) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-full flex items-center gap-2 p-2 rounded text-xs font-medium text-gray-500 hover:text-gray-200 hover:bg-[#1F2937] transition-all duration-200 group cursor-pointer">
          <div className="p-0.5 rounded bg-transparent group-hover:bg-[#374151] transition-colors">
            <Plus size={14} />
          </div>
          <span>Add Issue</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]   bg-[#1f2937] text-white border-white/10 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold tracking-tight">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div>{body}</div>
      </DialogContent>
    </Dialog>
  );
}
