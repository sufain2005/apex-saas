import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UserTable } from "./user-table";

export const metadata = {
  title: "User Management — Admin Console",
};

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          User & Tenant Management
        </h1>
        <p className="text-sm text-[#82a391]">
          View, suspend, or update permissions across all registered platform accounts.
        </p>
      </div>

      <UserTable
        initialUsers={[
          {
            id: user.id,
            email: user.email || "admin@example.com",
            role: "Superadmin",
            plan: "Active Pro",
            status: "active",
            created: "Today",
          },
          {
            id: "usr-4921",
            email: "founder@techstartup.example",
            role: "User",
            plan: "Active Pro",
            status: "active",
            created: "Oct 22, 2026",
          },
          {
            id: "usr-8392",
            email: "dev@clientagency.example",
            role: "User",
            plan: "Free Starter",
            status: "active",
            created: "Oct 19, 2026",
          },
          {
            id: "usr-1102",
            email: "spam.test@botnet.example",
            role: "User",
            plan: "Free Starter",
            status: "suspended",
            created: "Oct 15, 2026",
          },
        ]}
      />
    </div>
  );
}

