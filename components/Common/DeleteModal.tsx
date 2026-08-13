"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/Spinner/spinner";

interface ModalTypes {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  subHeading?: string;
  modalWidth?: string;
  bodyText?: string;
  handlerButtonText?: string;
  deleteHandler: () => void;
  disabledText: string;
  spin: boolean;
}

export function NewDeleteModal({
  open,
  setOpen,
  title,
  bodyText,
  subHeading,
  modalWidth = "670px",
  handlerButtonText,
  deleteHandler,
  disabledText = "Deleting",
  spin = false,
}: ModalTypes) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        style={{ maxWidth: modalWidth }}
        className="border-default bg-card text-primary shadow-card max-h-[95vh] flex flex-col"
      >
        <DialogHeader className="gap-0.5 px-2">
          <DialogTitle className="text-lg font-semibold tracking-tight text-primary">
            {title}
          </DialogTitle>
          <p className="text-sm leading-5 mb-2 text-secondary">{subHeading}</p>
        </DialogHeader>

        <div className="py-2 overflow-y-auto px-2">
          <p>{bodyText}</p>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-default pt-4 mt-4 px-2">
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
            className="min-w-[90px]"
          >
            Cancel
          </Button>

          <Button
            variant="delete"
            onClick={deleteHandler}
            className="min-w-[120px] gap-2"
            disabled={spin}
          >
            {spin && <Spinner color="#ffffff" />}
            {spin ? disabledText : handlerButtonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
