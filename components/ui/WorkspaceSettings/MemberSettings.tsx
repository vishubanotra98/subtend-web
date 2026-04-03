"use client";

import { useState } from "react";
import { UserMinus, Mail, ChevronDown, Trash2 } from "lucide-react";

type MemberRole = "Admin" | "Member";

interface Member {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  avatarInitial: string;
  avatarBgColor: string;
  isCurrentUser: boolean;
}

const mockMembers: Member[] = [
  {
    id: "user1",
    name: "banotravishu89@gmail.com",
    email: "banotravishu89@gmail.com",
    role: "Admin",
    avatarInitial: "V",
    avatarBgColor: "bg-emerald-950 text-emerald-300 border border-emerald-800",
    isCurrentUser: true,
  },
  {
    id: "user2",
    name: "Sarah Chen",
    email: "sarah@taskflow.dev",
    role: "Member",
    avatarInitial: "SC",
    avatarBgColor: "bg-purple-950 text-purple-300 border border-purple-800",
    isCurrentUser: false,
  },
  {
    id: "user3",
    name: "Sarah Yiong",
    email: "sarah@taskflow.dev",
    role: "Member",
    avatarInitial: "SC",
    avatarBgColor: "bg-lime-950 text-lime-300 border border-lime-800",
    isCurrentUser: false,
  },
  {
    id: "user4",
    name: "Sarah Štosilan",
    email: "sarah@taskflow.dev",
    role: "Member",
    avatarInitial: "FR",
    avatarBgColor: "bg-sky-950 text-sky-300 border border-sky-800",
    isCurrentUser: false,
  },
];

const MembersTabContent = () => {
  const [members, setMembers] = useState<Member[]>(mockMembers);

  return (
    <div className="space-y-10">
      <div className="flex justify-end">
        <button className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg text-sm flex items-center gap-2 transition-colors">
          <Mail size={16} />
          Invite Member
        </button>
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
            {members.map((member) => (
              <tr
                key={member.id}
                className="hover:bg-[#161826]/50 transition-colors"
              >
                <td className="px-6 py-5 flex items-center gap-4">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ${member.avatarBgColor}`}
                  >
                    {member.avatarInitial}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-100">
                      {member.name}
                    </span>
                    {member.isCurrentUser && (
                      <span className="text-xs text-purple-400 font-medium">
                        (You)
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-6 py-5 text-gray-300 font-mono">
                  {member.email}
                </td>

                <td className="px-6 py-5">
                  <div className="relative w-32">
                    <select
                      value={member.role}
                      className="w-full appearance-none bg-[#0d0f17] border border-gray-700 text-gray-100 text-sm rounded-lg px-4 py-2 pr-9 outline-0  transition-colors"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Member">Member</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                    />
                  </div>
                </td>

                <td className="px-6 py-5 relative">
                  {member.isCurrentUser ? (
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
