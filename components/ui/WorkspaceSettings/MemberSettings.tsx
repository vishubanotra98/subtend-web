"use client";

import { useState } from "react";
import { UserMinus, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { nameInitials } from "@/utils/constants";
import { Modal } from "@/components/Common/Modal";
import { InviteMemberForm } from "@/components/Forms/InviteMember";
import Select from "react-select";
import { commonSelectStyles } from "@/utils/styles";
import { changRoleAction } from "@/actions/user.actions";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

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

const MembersTabContent = ({ workspaceMembers, currentUser }: any) => {
  const [userModal, setUserModal] = useState(false);
  const { workspaceId } = useParams();
  const members = workspaceMembers ?? [];

  const handleRoleChange = async (
    workspaceId: string,
    userId: string,
    role: any,
  ) => {
    const res = await changRoleAction(workspaceId, userId, role);
    if (!res?.success) {
      toast?.error("Something went wrong.");
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-end">
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
                workspaceId={workspaceId}
                setModal={setUserModal}
              />
            </>
          }
        />
      </div>

      <div className="bg-[#11131f] border border-gray-800 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-[#0d0f17] border-b border-gray-800">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium tracking-wider">
                Member
              </th>
              <th scope="col" className="px-6 py-4 font-medium tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-4 font-medium tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-4 font-medium tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {members?.map((member: any) => (
              <tr
                key={member.id}
                className="hover:bg-[#161826]/50 transition-colors"
              >
                <td className="px-6 py-5 flex items-center gap-4">
                  <Avatar className="h-8 w-8 rounded-full border border-[#1f2937] bg-[#111827] shrink-0">
                    <AvatarImage
                      src={member?.user?.image}
                      className="object-cover rounded-full"
                    />
                    <AvatarFallback className="rounded-full flex items-center justify-center my-auto h-full  text-[#e5e7eb]">
                      {nameInitials(member?.user)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-100">
                      {member?.user?.name ||
                        member?.user?.firstName + " " + member?.user?.lastName}
                    </span>
                    {member?.userId === currentUser && (
                      <span className="text-xs text-purple-400 font-medium">
                        (You)
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-6 py-5 text-gray-300 font-mono">
                  {member?.user?.email}
                </td>

                <td className="px-6 py-5">
                  <div className="relative w-32">
                    <Select
                      options={options}
                      onChange={(val) => {
                        handleRoleChange(
                          member?.workspaceId,
                          member?.userId,
                          val?.value,
                        );
                      }}
                      value={options.find(
                        (val: any) => val?.value === member?.role,
                      )}
                      getOptionValue={(val: any) => val.value}
                      getOptionLabel={(val: any) => val.label}
                      placeholder="Change Role"
                      styles={commonSelectStyles}
                      menuPortalTarget={document?.body}
                      isDisabled={member?.userId === currentUser}
                      isClearable={false}
                    />
                  </div>
                </td>

                <td className="px-6 py-5 relative">
                  {member?.userId === currentUser ? (
                    <button
                      disabled
                      className="px-4 py-2 bg-gray-800/60 text-gray-500 font-medium rounded-lg text-xs flex items-center gap-2 cursor-not-allowed border border-gray-700/50"
                    >
                      <UserMinus size={14} className="transition-transform" />
                      Remove
                    </button>
                  ) : (
                    <button className="px-4 py-2 border border-red-900 bg-red-950/20 text-red-400 hover:bg-red-950/40 font-medium rounded-lg text-xs flex items-center gap-2 transition-colors group">
                      <UserMinus size={14} className="transition-transform" />
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="max-w-2xl text-gray-400 space-y-3">
        <h3 className="text-lg font-semibold text-gray-200">
          Members Deletion Settings
        </h3>
        <p className="text-sm leading-relaxed">
          Once you delete a member, they lose all access immediately. However,
          your workspace data will be scheduled for permanent deletion only if
          the entire workspace is deleted.
        </p>
      </div>
    </div>
  );
};

export default MembersTabContent;
