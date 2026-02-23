"use client";

import { Modal } from "@/components/Common/Modal";
import { UserPlus, Users } from "lucide-react";
import { useState } from "react";
import { AddTeamForm } from "../Forms/AddTeamForm";
import { InviteMemberForm } from "../Forms/InviteMember";

export default function DashboardButton({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const [teamModal, setTeamModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <Modal
        buttonClassName=""
        buttonInnerText={
          <span className="flex items-center justify-center gap-1.5">
            <Users size={14} />
            Create Team
          </span>
        }
        open={teamModal}
        setOpen={() => setTeamModal((prev) => !prev)}
        title="Add New Team"
        body={
          <>
            <AddTeamForm setModal={setTeamModal} />
          </>
        }
      />

      <Modal
        buttonClassName=""
        buttonInnerText={
          <span className="flex items-center justify-center gap-1.5">
            <UserPlus size={14} />
            Invite Member
          </span>
        }
        open={userModal}
        setOpen={() => setUserModal((prev) => !prev)}
        title="Invite New Member"
        body={
          <>
            <InviteMemberForm
              setModal={setUserModal}
              workspaceId={workspaceId}
            />
          </>
        }
      />
    </div>
  );
}
