"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  fetchPortfolioData,
  fetchSkillData,
  addSkill,
  updateSkill,
  deleteSkill,
  addPortfolioItem,
  deletePortfolioItem,
  updatePortfolioItem,
  fetchAdarshDetails,
  updateAdarshDetails,
} from "@/utils/api";
import Image from "next/image";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [adarsh, setAdarsh] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    image: "",
    github: "",
    url: "",
  });
  const [editProject, setEditProject] = useState(null);

  const [newSkill, setNewSkill] = useState({ name: "", image: "" });
  const [editSkill, setEditSkill] = useState(null);

  const [newAdarsh, setNewAdarsh] = useState({
    tagline: "",
    bio: "",
    email: "",
    image: "",
    resume: "",
    github: "",
    linkedin: "",
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const [passkey, setPasskey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(e);

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      const loadData = async () => {
        const projectData = await fetchPortfolioData();
        const skillData = await fetchSkillData();
        const adarshData = await fetchAdarshDetails();

        setProjects(projectData.projects);
        setSkills(skillData.skills);
        setAdarsh(adarshData);
        setNewAdarsh(adarshData);
        setLoading(false);
      };

      loadData();
    }
  }, [isAuthenticated]);

  const handlePasskeySubmit = () => {
    const correctPasskey = process.env.NEXT_PUBLIC_ADMIN_PASSKEY;
    if (passkey === correctPasskey) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect passkey.");
    }
  };

  const handleAddProject = async () => {
    await addPortfolioItem(newProject);
    router.refresh();
  };

  const handleEditProject = async (project) => {
    await updatePortfolioItem(project);
    router.refresh();
  };

  const handleDeleteProject = async (id) => {
    await deletePortfolioItem(id);
    router.refresh();
  };

  const handleAddSkill = async () => {
    await addSkill(newSkill);
    router.refresh();
  };

  const handleEditSkill = async (skill) => {
    await updateSkill(skill);
    router.refresh();
  };

  const handleDeleteSkill = async (id) => {
    await deleteSkill(id);
    router.refresh();
  };

  const handleAdarshChange = async () => {
    await updateAdarshDetails(newAdarsh);
    router.refresh();
  };

  // Handle image upload
  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
    field: "project" | "skill" | "adarsh" = "project"
  ) => {
    if (event.target.files && event.target.files[0]) {
      setUploading(true);
      setUploadProgress(0);
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
      );

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setUploadProgress(percentComplete);
        }
      });

      xhr.upload.addEventListener("load", () => {
        setUploadProgress(100);
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          const imageUrl = response.secure_url;
          setUploading(false);

          if (field === "project") {
            setNewProject((prev) => ({ ...prev, image: imageUrl }));
          } else if (field === "skill") {
            setNewSkill((prev) => ({ ...prev, image: imageUrl }));
          } else if (field === "adarsh") {
            setNewAdarsh((prev) => ({ ...prev, image: imageUrl }));
          }
        } else {
          alert("Failed to upload image.");
          setUploading(false);
        }
      });

      xhr.addEventListener("error", () => {
        alert("Failed to upload image.");
        setUploading(false);
      });

      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`
      );
      xhr.send(formData);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 border border-gray-200 rounded-md shadow-md max-w-sm w-full">
          <h1 className="text-2xl font-bold mb-4">Enter Passkey</h1>
          <input
            type="password"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            placeholder="Enter passkey"
            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          />
          <Button
            onClick={handlePasskeySubmit}
            className="bg-blue-500 text-white hover:bg-blue-600 w-full"
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <div>
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-100">
            <div className=" cursor-pointer overflow-hidden text-black p-8 ">
              <Loader2 className="mr-2 h-16 w-16 animate-spin" />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-gray-50 min-h-screen">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">
            Admin Dashboard
          </h1>

          {/* Projects Management */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-gray-700">
              Projects
            </h2>
            <div className="mb-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={newProject.name}
                  onChange={(e) =>
                    setNewProject({ ...newProject, name: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                  className="p-2 border border-gray-300 rounded-md"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUploadImage(e, "project")}
                    className="p-2 border border-gray-300 rounded-md flex-grow"
                  />
                  {uploading && <div>Uploading: {uploadProgress}%</div>}
                </div>
                <input
                  type="text"
                  placeholder="GitHub URL"
                  value={newProject.github}
                  onChange={(e) =>
                    setNewProject({ ...newProject, github: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Project URL"
                  value={newProject.url}
                  onChange={(e) =>
                    setNewProject({ ...newProject, url: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <Button
                onClick={handleAddProject}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Add Project
              </Button>
            </div>

            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white p-4 border border-gray-200 rounded-md shadow-md"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {project.name}
                      </h3>
                      <p className="text-gray-600">{project.description}</p>
                    </div>
                    <div>
                      <Image
                        src={`${project.image}`}
                        width={300}
                        height={100}
                        alt="project image"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    {/* <Button
                      onClick={() =>
                        handleEditProject({ ...project, name: "Updated Name" })
                      }
                      className="bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                      Edit
                    </Button> */}
                    <Button
                      onClick={() => handleDeleteProject(project.id)}
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Management */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-gray-700">
              Skills
            </h2>
            <div className="mb-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <input
                  type="text"
                  placeholder="Skill Name"
                  value={newSkill.name}
                  onChange={(e) =>
                    setNewSkill({ ...newSkill, name: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newSkill.image}
                  onChange={(e) =>
                    setNewSkill({ ...newSkill, image: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <Button
                onClick={handleAddSkill}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Add Skill
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {/* {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-white p-4 border border-gray-200 rounded-md shadow-md flex items-center"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    {skill.name}
                  </h3> */}
              {/* <img src={skill.image || '/default-skill-image.png'} alt={skill.name} className="w-12 h-12 rounded-full ml-4" /> */}
              {/* <div className="ml-auto flex gap-2">
                    <Button
                      onClick={() =>
                        handleEditSkill({ ...skill, name: "Updated Skill" })
                      }
                      className="bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))} */}
              {skills.map((skill, index) => (
                <div
                  key={skill.id}
                  className="bg-gray-200 px-3 flex text-center py-1 rounded-full text-sm"
                >
                  <div className=" my-auto">{skill.name}</div>
                  <div className=" text-red-400">
                    <Button onClick={() => handleDeleteSkill(skill.id)}>
                      <X />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Adarsh Details Management */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Adarsh Details</h2>
            <div className="bg-white p-6 border border-gray-200 rounded-md shadow-md">
              <input
                type="text"
                placeholder="Tagline"
                value={newAdarsh.tagline}
                onChange={(e) =>
                  setNewAdarsh({ ...newAdarsh, tagline: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md mb-2 w-full"
              />
              <textarea
                placeholder="Bio"
                value={newAdarsh.bio}
                onChange={(e) =>
                  setNewAdarsh({ ...newAdarsh, bio: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md mb-2 w-full"
              />
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUploadImage(e, "adarsh")}
                  className="p-2 border border-gray-300 rounded-md flex-grow"
                />
                {uploading && <div>Uploading: {uploadProgress}%</div>}
              </div>
              {newAdarsh.image && (
                <img
                  src={newAdarsh.image}
                  alt="Adarsh Image"
                  className="w-32 h-32 object-cover mb-4"
                />
              )}

              <input
                type="text"
                placeholder="Email"
                value={newAdarsh.email}
                onChange={(e) =>
                  setNewAdarsh({ ...newAdarsh, email: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Resume URL"
                value={newAdarsh.resume}
                onChange={(e) =>
                  setNewAdarsh({ ...newAdarsh, resume: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md mb-2 w-full"
              />
              <input
                type="text"
                placeholder="GitHub URL"
                value={newAdarsh.github}
                onChange={(e) =>
                  setNewAdarsh({ ...newAdarsh, github: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md mb-2 w-full"
              />
              <input
                type="text"
                placeholder="LinkedIn URL"
                value={newAdarsh.linkedin}
                onChange={(e) =>
                  setNewAdarsh({ ...newAdarsh, linkedin: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md mb-2 w-full"
              />
              <Button
                onClick={handleAdarshChange}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Update Adarsh Details
              </Button>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
