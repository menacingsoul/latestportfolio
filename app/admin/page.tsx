"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import {
  Loader2,
  X,
  Edit,
  Plus,
  Trash2,
  Save,
  ImagePlus,
  Lock,
  Unlock,
} from "lucide-react";
import {
  fetchPortfolioData,
  fetchSkillData,
  fetchAdarshDetails,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  addSkill,
  updateSkill,
  deleteSkill,
  updateAdarshDetails,
} from "@/utils/api";
import { useRouter } from "next/navigation";
import Image from "next/image";

// TypeScript Interfaces
interface Project {
  id?: string;
  name: string;
  description: string;
  image: string;
  github: string;
  url: string;
}

interface Skill {
  id?: string;
  name: string;
  image: string;
}

interface AdarshDetails {
  tagline: string;
  bio: string;
  email: string;
  image: string;
  resume: string;
  github: string;
  linkedin: string;
}

const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  // Form States
  const [newProject, setNewProject] = useState<Project>({
    name: "",
    description: "",
    image: "",
    github: "",
    url: "",
  });
  const [editProject, setEditProject] = useState<Project | null>(null);

  const [newSkill, setNewSkill] = useState<Skill>({
    name: "",
    image: "",
  });
  const [editSkill, setEditSkill] = useState<Skill | null>(null);

  const [newAdarsh, setNewAdarsh] = useState<AdarshDetails>({
    tagline: "",
    bio: "",
    email: "",
    image: "",
    resume: "",
    github: "",
    linkedin: "",
  });

  // Upload and Authentication States
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [passkey, setPasskey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    () =>
      typeof window !== "undefined" &&
      localStorage.getItem("isAuthenticated") === "true"
  );

  const router = useRouter();

  // Data Fetching
  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          const [projectResponse, skillResponse, adarshResponse] =
            await Promise.all([
              fetchPortfolioData(),
              fetchSkillData(),
              fetchAdarshDetails(),
            ]);

          setProjects(projectResponse.projects);
          setSkills(skillResponse.skills);
          setNewAdarsh(adarshResponse);
          setLoading(false);
        } catch (error) {
          console.error("Data fetch error:", error);
          handleLogout();
        }
      }
    };

    fetchData();
  }, [isAuthenticated]);

  // Authentication Handlers
  const handlePasskeySubmit = () => {
    const correctPasskey = process.env.NEXT_PUBLIC_ADMIN_PASSKEY;
    if (passkey === correctPasskey) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
    } else {
      alert("Incorrect passkey.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    setPasskey("");
  };

  // Image Upload Handler
  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "project" | "skill" | "adarsh" = "project"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await response.json();
      const imageUrl = data.secure_url;

      switch (type) {
        case "project":
          editProject
            ? setEditProject({ ...editProject, image: imageUrl })
            : setNewProject({ ...newProject, image: imageUrl });
          break;
        case "skill":
          editSkill
            ? setEditSkill({ ...editSkill, image: imageUrl })
            : setNewSkill({ ...newSkill, image: imageUrl });
          break;
        case "adarsh":
          setNewAdarsh({ ...newAdarsh, image: imageUrl });
          break;
      }
      setUploading(false);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Image upload failed");
      setUploading(false);
    }
  };

  // Project Handlers
  const handleAddProject = async () => {
    try {
      await addPortfolioItem(newProject);
      setNewProject({
        name: "",
        description: "",
        image: "",
        github: "",
        url: "",
      });
      router.refresh();
    } catch (error) {
      console.error("Add project failed", error);
    }
  };

  const handleUpdateProject = async () => {
    if (!editProject) return;
    try {
      await updatePortfolioItem(editProject);
      setEditProject(null);
      router.refresh();
    } catch (error) {
      console.error("Update project failed", error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await deletePortfolioItem(id);
      router.refresh();
    } catch (error) {
      console.error("Delete project failed", error);
    }
  };

  // Skill Handlers
  const handleAddSkill = async () => {
    try {
      await addSkill(newSkill);
      setNewSkill({ name: "", image: "" });
      router.refresh();
    } catch (error) {
      console.error("Add skill failed", error);
    }
  };

  const handleUpdateSkill = async () => {
    if (!editSkill) return;
    try {
      await updateSkill(editSkill);
      setEditSkill(null);
      router.refresh();
    } catch (error) {
      console.error("Update skill failed", error);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      await deleteSkill(id);
      router.refresh();
    } catch (error) {
      console.error("Delete skill failed", error);
    }
  };

  // Adarsh Details Handler
  const handleUpdateAdarshDetails = async () => {
    try {
      await updateAdarshDetails(newAdarsh);
      router.refresh();
    } catch (error) {
      console.error("Update Adarsh details failed", error);
    }
  };

  // Authentication Render
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Admin Access
          </h2>
          <div className="space-y-4">
            <input
              type="password"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              placeholder="Enter admin passkey"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <Button
              onClick={handlePasskeySubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg"
            >
              Access Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard Render
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          {/* Projects Section */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold">Projects</h2>
              <Button
                onClick={() => setEditProject(null)}
                className="flex items-center"
              >
                <Plus className="mr-2" /> Add Project
              </Button>
            </div>

            {/* Project Form */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Project Name"
                  value={editProject?.name || newProject.name}
                  onChange={(e) =>
                    editProject
                      ? setEditProject({ ...editProject, name: e.target.value })
                      : setNewProject({ ...newProject, name: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <input
                  placeholder="Description"
                  value={editProject?.description || newProject.description}
                  onChange={(e) =>
                    editProject
                      ? setEditProject({
                          ...editProject,
                          description: e.target.value,
                        })
                      : setNewProject({
                          ...newProject,
                          description: e.target.value,
                        })
                  }
                  className="border p-2 rounded"
                />
                <input
                  placeholder="GitHub URL"
                  value={editProject?.github || newProject.github}
                  onChange={(e) =>
                    editProject
                      ? setEditProject({
                          ...editProject,
                          github: e.target.value,
                        })
                      : setNewProject({ ...newProject, github: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <input
                  placeholder="Project URL"
                  value={editProject?.url || newProject.url}
                  onChange={(e) =>
                    editProject
                      ? setEditProject({ ...editProject, url: e.target.value })
                      : setNewProject({ ...newProject, url: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <div className="flex items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUploadImage(e, "project")}
                    className="border p-2 rounded"
                  />
                  {uploading && <span>Uploading: {uploadProgress}%</span>}
                </div>
                <Button
                  onClick={editProject ? handleUpdateProject : handleAddProject}
                  className="bg-blue-500 text-white"
                >
                  {editProject ? "Update" : "Add"} Project
                </Button>
              </div>
            </div>

            {/* Project List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl shadow-md p-4"
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="font-bold text-xl">{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="flex justify-between mt-4">
                    <Button
                      onClick={() => setEditProject(project)}
                      variant="outline"
                    >
                      <Edit className="mr-2" /> Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteProject(project.id!)}
                      variant="destructive"
                    >
                      <Trash2 className="mr-2" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold">Skills</h2>
              <Button
                onClick={() => setEditSkill(null)}
                className="flex items-center"
              >
                <Plus className="mr-2" /> Add Skill
              </Button>
            </div>

            {/* Skill Form */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Skill Name"
                  value={editSkill?.name || newSkill.name}
                  onChange={(e) =>
                    editSkill
                      ? setEditSkill({ ...editSkill, name: e.target.value })
                      : setNewSkill({ ...newSkill, name: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <div className="flex items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUploadImage(e, "skill")}
                    className="border p-2 rounded"
                  />
                  {uploading && <span>Uploading: {uploadProgress}%</span>}
                </div>
                <Button
                  onClick={editSkill ? handleUpdateSkill : handleAddSkill}
                  className="bg-blue-500 text-white"
                >
                  {editSkill ? "Update" : "Add"} Skill
                </Button>
              </div>
            </div>

            {/* Skill List */}
            <div className="flex flex-wrap gap-4">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-white rounded-xl shadow-md p-4 flex items-center"
                >
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="w-12 h-12 object-cover rounded-full mr-4"
                  />
                  <span className="font-semibold">{skill.name}</span>
                  <div className="ml-auto flex gap-2">
                    <Button
                      onClick={() => setEditSkill(skill)}
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="mr-2" /> Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteSkill(skill.id!)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="mr-2" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Adarsh Details Section */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">Adarsh Details</h2>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Tagline"
                  value={newAdarsh.tagline}
                  onChange={(e) =>
                    setNewAdarsh({ ...newAdarsh, tagline: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <textarea
                  placeholder="Bio"
                  value={newAdarsh.bio}
                  onChange={(e) =>
                    setNewAdarsh({ ...newAdarsh, bio: e.target.value })
                  }
                  className="border p-2 rounded h-24"
                />
                <input
                  placeholder="Email"
                  value={newAdarsh.email}
                  onChange={(e) =>
                    setNewAdarsh({ ...newAdarsh, email: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <input
                  placeholder="Resume URL"
                  value={newAdarsh.resume}
                  onChange={(e) =>
                    setNewAdarsh({ ...newAdarsh, resume: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <input
                  placeholder="GitHub URL"
                  value={newAdarsh.github}
                  onChange={(e) =>
                    setNewAdarsh({ ...newAdarsh, github: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <input
                  placeholder="LinkedIn URL"
                  value={newAdarsh.linkedin}
                  onChange={(e) =>
                    setNewAdarsh({ ...newAdarsh, linkedin: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <div className="flex items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUploadImage(e, "adarsh")}
                    className="border p-2 rounded"
                  />
                  {uploading && <span>Uploading: {uploadProgress}%</span>}
                </div>
                {newAdarsh.image && (
                  <img
                    src={newAdarsh.image}
                    alt="Adarsh Profile"
                    className="w-32 h-32 object-cover rounded-full"
                  />
                )}
                <Button
                  onClick={handleUpdateAdarshDetails}
                  className="bg-blue-500 text-white col-span-2"
                >
                  Update Adarsh Details
                </Button>
              </div>
            </div>
          </section>

          {/* Logout Button */}
          <div className="fixed bottom-4 right-4">
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="flex items-center"
            >
              <Lock className="mr-2" /> Logout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
