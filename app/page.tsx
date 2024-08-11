import Portfolio from "../components/Portfolio";
import { prisma } from "../utils/db";

const MainPage = async () => {
  const projects = await prisma.projects.findMany();
  const skills = await prisma.skills.findMany();
  const profile = await prisma.adarsh.findUnique({
    where: {
      id: "301feb70-7e9a-44c0-9a66-1b97b3caf0ee",
    },
  });

  return (
    <>
      <Portfolio projects={projects} skills={skills} adarsh={profile} />
    </>
  );
};

export default MainPage;
