"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface ModalTypes {
  open: boolean;
  setOpen: (open: boolean) => void;
  buttonInnerText: React.ReactNode;
  buttonClassName?: string;
  title: string;
  body: React.ReactNode;
  buttonVariant?: string;
  buttonSize?: "lg" | "default" | "sm" | "icon";
  subHeading?: string;
  modalWidth?: string;
}

export function Modal({
  open,
  setOpen,
  buttonInnerText,
  buttonClassName = "",
  title,
  body,
  buttonSize,
  buttonVariant = "default",
  subHeading,
  modalWidth = "600px",
}: ModalTypes) {
  console.log(modalWidth);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={buttonClassName} size={buttonSize}>
          {buttonInnerText}
        </Button>
      </DialogTrigger>

      <DialogContent
        className={`border-default bg-card text-primary shadow-card   sm:max-w-[${modalWidth}]`}
      >
        <DialogHeader className="space-y-1 ">
          <DialogTitle className="text-lg font-semibold tracking-tight text-primary">
            {title}
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm leading-5 mb-2 text-secondary">{subHeading}</p>

        <div className="py-2">{body}</div>
      </DialogContent>
    </Dialog>
  );
}
