"use client";

import { Modal } from "@/components/Common/Modal";
import { UserPlus, Users } from "lucide-react";
import { useState } from "react";
import { AddTeamForm } from "../Forms/AddTeamForm";
import { InviteMemberForm } from "../Forms/InviteMember";

const TeamButton = () => {
  return (
    <span className="flex items-center justify-center gap-1.5">
      <Users size={14} />
      Create Team
    </span>
  );
};

const InviteButton = () => {
  return (
    <span className="flex items-center justify-center gap-1.5">
      <UserPlus size={14} />
      Invite Member
    </span>
  );
};

export default function DashboardButton() {
  const [teamModal, setTeamModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <Modal
        buttonInnerText={<TeamButton />}
        open={teamModal}
        setOpen={() => setTeamModal((prev) => !prev)}
        title="Add New Team"
        body={<AddTeamForm setModal={setTeamModal} />}
      />

      <Modal
        buttonInnerText={<InviteButton />}
        open={userModal}
        setOpen={() => setUserModal((prev) => !prev)}
        title="Invite New Member"
        body={<InviteMemberForm setModal={setUserModal} />}
      />
    </div>
  );
}
