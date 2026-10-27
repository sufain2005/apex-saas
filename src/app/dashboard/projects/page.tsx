import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProjectManager } from "./project-manager";

export const metadata = {
  title: "Projects — Apex",
};

export default async function ProjectsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Attempt to fetch user's projects from database
  const { data: initialProjects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#17211d] sm:text-3xl">
          Projects & Workspaces
        </h1>
        <p className="text-sm text-[#627069]">
          Manage applications, deployments, and production environments isolated by your tenant.
        </p>
      </div>

      <ProjectManager
        userId={user.id}
        initialProjects={
          initialProjects && initialProjects.length > 0
            ? initialProjects
            : [
                {
                  id: "proj-1",
                  name: "Production Web App",
                  description: "Primary customer-facing SaaS web application and API.",
                  status: "active",
                  environment: "production",
                  created_at: "2026-10-27T00:00:00.000Z",
                },
                {
                  id: "proj-2",
                  name: "Staging Sandbox",
                  description: "Pre-release testing environment for new features.",
                  status: "draft",
                  environment: "staging",
                  created_at: "2026-10-24T00:00:00.000Z",
                },
              ]
        }
      />
    </div>
  );
}
