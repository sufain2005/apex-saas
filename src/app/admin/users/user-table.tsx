"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

type AdminUser = {
  id: string;
  email: string;
  role: string;
  plan: string;
  status: "active" | "suspended";
  created: string;
};

export function UserTable({ initialUsers }: { initialUsers: AdminUser[] }) {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");

  function toggleStatus(id: string) {
    setUsers(
      users.map((u) => {
        if (u.id === id) {
          return {
            ...u,
            status: u.status === "active" ? "suspended" : "active",
          };
        }
        return u;
      })
    );
  }

  const filtered = users.filter((u) =>
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="max-w-sm">
        <Input
          placeholder="Filter accounts by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-10 rounded-xl border-[#22352d] bg-[#14221c] text-xs text-white placeholder:text-[#527060]"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#22352d] bg-[#14221c] p-5">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#22352d] text-[#80a491]">
            <tr>
              <th className="pb-3 font-semibold">User Email</th>
              <th className="pb-3 font-semibold">Role</th>
              <th className="pb-3 font-semibold">Plan</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold">Created</th>
              <th className="pb-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e2f28] text-white">
            {filtered.map((u) => (
              <tr key={u.id}>
                <td className="py-3.5 font-medium">{u.email}</td>
                <td className="py-3.5">
                  <span className="rounded bg-[#1a2d24] px-2 py-0.5 text-[10px] font-semibold text-[#80d1a7]">
                    {u.role}
                  </span>
                </td>
                <td className="py-3.5 text-[#a8beaf]">{u.plan}</td>
                <td className="py-3.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                      u.status === "active"
                        ? "bg-[#183d32] text-[#80d1a7]"
                        : "bg-red-950 text-red-300"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="py-3.5 text-[#80a491]">{u.created}</td>
                <td className="py-3.5 text-right">
                  {u.role !== "Superadmin" && (
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className={`text-xs font-semibold hover:underline ${
                        u.status === "active" ? "text-red-400" : "text-[#80d1a7]"
                      }`}
                    >
                      {u.status === "active" ? "Suspend" : "Activate"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
