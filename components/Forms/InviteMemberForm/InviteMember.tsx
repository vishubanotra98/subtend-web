"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { inviteUserAction } from "@/actions/user.actions";
import { emailSchema, EmailType } from "@/lib/schema";
import toast from "react-hot-toast";

export const InviteMemberForm = ({
  workspaceId,
  setModal,
}: {
  workspaceId: string;
  setModal: (value: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailType) => {
    setLoading(true);

    let res = await inviteUserAction({ email: data.email, workspaceId });

    if (res?.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
    setModal(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-2">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Enter email</label>
        <Input
          {...register("email")}
          placeholder="Eg: example@gmail.com"
          className={`primary-input mt-0.5 ${errors.email ? "error" : ""}`}
          required
          maxLength={50}
        />
        {errors.email && (
          <p className="text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          className="w-full button-primary shadow-lg shadow-indigo-500/20"
          disabled={loading}
        >
          {loading ? "Inviting..." : "Invite member"}
        </Button>
      </div>
    </form>
  );
};
