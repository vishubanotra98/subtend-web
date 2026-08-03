"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/Spinner/spinner";
import { emailSchema, EmailType } from "@/lib/schema";
import { commonSelectStyles2 } from "@/utils/styles";
import { inviteMemberAction } from "@/Store/actions/user.action";
import { useAppDispatch } from "@/Store/hooks";

interface RoleInterface {
  label: string;
  value: string;
}

const options = [
  {
    label: "Admin",
    value: "ADMIN",
  },
  {
    label: "Member",
    value: "MEMBER",
  },
];

export const InviteMemberForm = ({
  setModal,
}: {
  setModal: (value: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<RoleInterface>({
    label: "Member",
    value: "MEMBER",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailType>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailType) => {
    try {
      setLoading(true);

      const res = await dispatch(
        inviteMemberAction({
          email: data.email,
          workspaceId,
          role: role.value,
        }),
      ).unwrap();

      if (res.success) {
        toast.success(res.message);
        setModal(false);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-primary">
          Email Address
        </label>

        <Input
          {...register("email")}
          placeholder="john@example.com"
          maxLength={50}
          variant={errors.email ? "error" : "default"}
          className="mt-1"
        />

        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-primary">
          Workspace Role
        </label>

        <Select
          options={options}
          value={role}
          onChange={(value) => setRole(value as RoleInterface)}
          getOptionLabel={(option: any) => option.label}
          getOptionValue={(option: any) => option.value}
          placeholder="Select role"
          styles={commonSelectStyles2}
          isSearchable={false}
        />

        <p className="text-xs text-secondary">
          Members can collaborate on projects. Admins can manage workspace
          settings and members.
        </p>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setModal(false)}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <Spinner color="#ffffff" />
              Inviting...
            </span>
          ) : (
            "Invite Member"
          )}
        </Button>
      </div>
    </form>
  );
};
