"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Member = {
  id: string;
  email: string;
  role: "Owner" | "Admin" | "Member" | "Viewer";
  status: "active" | "invited";
  joined: string;
};

export function TeamManager({
  initialMembers,
}: {
  currentUserEmail?: string;
  initialMembers: Member[];
}) {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Member["role"]>("Member");

  function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newMember: Member = {
      id: `m-${Date.now()}`,
      email: inviteEmail.trim(),
      role: inviteRole,
      status: "invited",
      joined: "Pending invite",
    };

    setMembers([...members, newMember]);
    setInviteEmail("");
    setShowInviteModal(false);
  }

  function handleRemove(id: string) {
    setMembers(members.filter((m) => m.id !== id));
  }

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card className="rounded-2xl border-[#e5ebe5] bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-6">
          <div>
            <CardTitle className="text-lg">Workspace Members</CardTitle>
            <CardDescription>
              Users with assigned access privileges to your SaaS tenant.
            </CardDescription>
          </div>
          <Button
            onClick={() => setShowInviteModal(true)}
            className="gap-2 rounded-xl bg-[#183d32] text-xs font-semibold text-white hover:bg-[#245b49]"
          >
            <Plus size={16} /> Invite Member
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#f2f6f3] text-[#718078]">
                <tr>
                  <th className="pb-3 font-semibold">User</th>
                  <th className="pb-3 font-semibold">Role</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Joined</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f6f3] text-[#17211d]">
                {members.map((member) => (
                  <tr key={member.id}>
                    <td className="py-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="flex size-7 items-center justify-center rounded-full bg-[#eaf1eb] text-xs font-semibold text-[#2d6a4f]">
                          {member.email.charAt(0).toUpperCase()}
                        </span>
                        <span className="font-medium">{member.email}</span>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span className="rounded-full bg-[#f4f7f4] px-2.5 py-1 text-[11px] font-semibold text-[#52866c]">
                        {member.role}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                          member.status === "active"
                            ? "bg-[#eaf1eb] text-[#2d6a4f]"
                            : "bg-[#f5f0df] text-[#856404]"
                        }`}
                      >
                        {member.status === "active" ? "Active" : "Invited"}
                      </span>
                    </td>
                    <td className="py-3.5 text-[#627069]">{member.joined}</td>
                    <td className="py-3.5 text-right">
                      {member.role !== "Owner" && (
                        <button
                          onClick={() => handleRemove(member.id)}
                          className="text-[#99a59d] transition hover:text-red-600"
                          title="Revoke Access"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-5">
            <div>
              <h3 className="text-lg font-bold text-[#17211d]">Invite Team Member</h3>
              <p className="text-xs text-[#627069]">
                Send an invitation email to collaborate on your projects.
              </p>
            </div>

            <form onSubmit={handleInvite} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="inv-email">Email Address</Label>
                <Input
                  id="inv-email"
                  type="email"
                  required
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="rounded-xl h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="inv-role">Assigned Role</Label>
                <select
                  id="inv-role"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as Member["role"])}
                  className="w-full rounded-xl border border-[#dce6df] p-2.5 text-xs text-[#17211d] outline-none"
                >
                  <option value="Admin">Admin (Full project & billing access)</option>
                  <option value="Member">Member (Edit projects & view API keys)</option>
                  <option value="Viewer">Viewer (Read-only access)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowInviteModal(false)}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl bg-[#183d32] text-white hover:bg-[#245b49]"
                >
                  Send Invitation
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
