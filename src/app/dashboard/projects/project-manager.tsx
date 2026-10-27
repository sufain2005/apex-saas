"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Server,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Project = {
  id: string;
  name: string;
  description: string | null;
  status: string;
  environment: string;
  created_at: string;
};

export function ProjectManager({
  initialProjects,
}: {
  userId?: string;
  initialProjects: Project[];
}) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newEnv, setNewEnv] = useState("production");

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: newName,
      description: newDesc || "Custom workspace environment",
      status: "active",
      environment: newEnv,
      created_at: new Date().toISOString(),
    };

    setProjects([newProject, ...projects]);
    setNewName("");
    setNewDesc("");
    setShowModal(false);
  }

  function handleDelete(id: string) {
    setProjects(projects.filter((p) => p.id !== id));
  }

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Controls: Search & New Project Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#718078]" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 pl-10 rounded-xl"
          />
        </div>

        <Button
          onClick={() => setShowModal(true)}
          className="gap-2 rounded-xl bg-[#183d32] text-xs font-semibold text-white hover:bg-[#245b49]"
        >
          <Plus size={16} /> New Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <Card
            key={project.id}
            className="flex flex-col justify-between rounded-2xl border-[#e5ebe5] bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center rounded-xl bg-[#eaf1eb] text-[#2d6a4f]">
                  <Server size={18} />
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                    project.environment === "production"
                      ? "bg-[#eaf1eb] text-[#2d6a4f]"
                      : "bg-[#f2f4f8] text-[#335c8d]"
                  }`}
                >
                  {project.environment}
                </span>
              </div>

              <h2 className="mt-4 text-base font-bold text-[#17211d]">{project.name}</h2>
              <p className="mt-1 text-xs text-[#627069] leading-5">{project.description}</p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#f2f6f3] pt-4 text-xs">
              <span className="text-[#8e9c93]">
                {new Date(project.created_at).toLocaleDateString()}
              </span>

              <button
                onClick={() => handleDelete(project.id)}
                className="text-[#99a59d] transition hover:text-red-600"
                title="Delete Project"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center text-sm text-[#718078]">
            No projects found matching your search.
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-5">
            <div>
              <h3 className="text-lg font-bold text-[#17211d]">Create New Project</h3>
              <p className="text-xs text-[#627069]">
                Set up a new isolated workspace environment.
              </p>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="proj-name">Project Name</Label>
                <Input
                  id="proj-name"
                  required
                  placeholder="e.g. Analytics Engine"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="rounded-xl h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="proj-desc">Description</Label>
                <Input
                  id="proj-desc"
                  placeholder="Brief summary of this workload"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="rounded-xl h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="proj-env">Environment</Label>
                <select
                  id="proj-env"
                  value={newEnv}
                  onChange={(e) => setNewEnv(e.target.value)}
                  className="w-full rounded-xl border border-[#dce6df] p-2.5 text-xs text-[#17211d] outline-none"
                >
                  <option value="production">Production</option>
                  <option value="staging">Staging</option>
                  <option value="development">Development</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl bg-[#183d32] text-white hover:bg-[#245b49]"
                >
                  Create Project
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
