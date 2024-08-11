// app/page.tsx
"use client";
import Portfolio from "../components/Portfolio";
import {
  fetchAdarshDetails,
  fetchPortfolioData,
  fetchSkillData,
} from "../utils/api";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const MainPage = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [profile, setAdarsh] = useState({
    tagline: "",
    bio: "",
    email: "",
    image: "",
    resume: "",
    github: "",
    linkedin: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const projectData = await fetchPortfolioData();
      const skillData = await fetchSkillData();
      const adarshData = await fetchAdarshDetails();
      setProjects(projectData.projects);
      setSkills(skillData.skills);
      setAdarsh(adarshData);
      setLoading(false);
    };

    loadData();
  }, []);

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
        <Portfolio projects={projects} skills={skills} adarsh={profile} />
      )}
    </>
  );
};

export default MainPage;
