import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { TeamManager } from "./team-manager";

export const metadata = {
  title: "Team & Workspace — Apex",
};

export default async function TeamPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#17211d] sm:text-3xl">
          Team & Permissions
        </h1>
        <p className="text-sm text-[#627069]">
          Invite collaborators, manage role-based access control, and organization privileges.
        </p>
      </div>

      <TeamManager
        currentUserEmail={user.email || "owner@example.com"}
        initialMembers={[
          {
            id: "m-1",
            email: user.email || "owner@example.com",
            role: "Owner",
            status: "active",
            joined: "Current user",
          },
          {
            id: "m-2",
            email: "sarah.eng@company.example",
            role: "Admin",
            status: "active",
            joined: "Oct 14, 2026",
          },
          {
            id: "m-3",
            email: "alex.dev@company.example",
            role: "Member",
            status: "invited",
            joined: "Pending invite",
          },
        ]}
      />
    </div>
  );
}

