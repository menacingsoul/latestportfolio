"use client";
import React, { useEffect, useState } from "react";
import {
  Sun,
  Moon,
  GithubIcon,
  LinkedinIcon,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import AnimatedLandscape from "@/components/ui/AnimatedLandscape";
import Link from "next/link";

const AstroBackground: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2,
    }));
  };

  const stars = generateStars(100);

  return (
    <motion.div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: isDarkMode
          ? "linear-gradient(135deg, #0d1117, #161b22)"
          : "linear-gradient(135deg, #e6e9f0, #f5f7fa)",
      }}
    >
      {/* Floating Planets */}
      {[
        { size: 80, color: "rgba(59, 130, 246, 0.2)", x: "10%", y: "20%" },
        { size: 120, color: "rgba(99, 102, 241, 0.1)", x: "80%", y: "70%" },
      ].map((planet, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-2xl"
          style={{
            width: planet.size,
            height: planet.size,
            backgroundColor: planet.color,
            left: planet.x,
            top: planet.y,
            transform: `translate(-50%, -50%) rotate(${index * 45}deg)`,
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10 + index * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Animated Stars */}
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: star.size,
            height: star.size,
            backgroundColor: isDarkMode ? "white" : "rgba(0,0,0,0.2)",
            left: star.x,
            top: star.y,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Particles */}
      {[...Array(20)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full opacity-50"
          style={{
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            backgroundColor: isDarkMode
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.05)",
            left: Math.random() * window.innerWidth,
            top: Math.random() * window.innerHeight,
          }}
          animate={{
            x: [
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
            ],
            y: [
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
            ],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
};

interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  github: string;
  url?: string | null;
  techStacks: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface Skill {
  id: string;
  name: string;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface AdarshProfile {
  id: string;
  tagline: string;
  image: string;
  bio: string;
  email: string;
  resume: string;
  github: string;
  linkedin: string;
}

interface PortfolioProps {
  projects?: Project[];
  skills?: Skill[];
  adarsh: AdarshProfile;
}

const Portfolio: React.FC<PortfolioProps> = ({
  projects = [],
  skills = [],
  adarsh,
}) => {
  const [darkMode, setDarkMode] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const AnimatedSection = ({ children, delay = 0 }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { amount: 0.1 });
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay }}
        className="mb-16"
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedLandscape isDarkMode={darkMode} />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50"
        style={{ scaleX }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="py-6 flex justify-between items-center">
          <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Adarsh Kumar
          </h1>
          <div className="flex items-center space-x-4">
            <Link
              href={adarsh.resume}
              target="_blank"
              className="bg-white/50 dark:bg-gray-400/50 dark:text-white backdrop-blur-md px-3 py-2 rounded-md text-sm font-medium hover:bg-white/70 dark:hover:bg-gray-400/70 transition-colors"
            >
              Résumé
            </Link>
            <Button
              onClick={toggleDarkMode}
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-md"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-white" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8 mt-2 items-center">
            <div>
              <h2 className="md:text-4xl text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Hello, I'm Adarsh
              </h2>
              <p className="md:text-xl text-lg text-gray-700 dark:text-gray-300 mb-4">
                {adarsh.tagline}
              </p>
              <p className="text-gray-800 dark:text-gray-200">{adarsh.bio}</p>
              <div className="flex space-x-4 mt-6">
                <Link href={adarsh.github} target="_blank">
                  <GithubIcon className="h-6 w-6 text-gray-800 dark:text-white hover:text-blue-500 transition-colors" />
                </Link>
                <Link href={adarsh.linkedin} target="_blank">
                  <LinkedinIcon className="h-6 w-6 text-gray-800 dark:text-white hover:text-blue-500 transition-colors" />
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Image
                  src={adarsh.image}
                  alt="Adarsh Kumar"
                  width={300}
                  height={300}
                  className="rounded-full object-cover shadow-lg"
                  unoptimized
                />
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Skills Section */}
        {skills.length > 0 && (
          <AnimatedSection delay={0.2}>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-gray-800 dark:text-white"
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <AnimatedSection delay={0.3}>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={project.image}
                      alt={project.name}
                      layout="fill"
                      objectFit="cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {project.name}
                      </h4>
                      <div className="flex space-x-2">
                        <Link href={project.github} target="_blank">
                          <GithubIcon className="h-5 w-5 text-gray-800 dark:text-white hover:text-blue-500" />
                        </Link>
                        {project.url && (
                          <Link href={project.url} target="_blank">
                            <ExternalLink className="h-5 w-5 text-gray-800 dark:text-white hover:text-blue-500" />
                          </Link>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      {project.description}
                    </p>
                    {project.techStacks.length > 0 && (
                      <div className="mt-2">
                        <h4 className="text-sm font-semibold text-gray-700">
                          Tech Stacks:
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {project.techStacks.map((stack, index) => (
                            <span
                              key={index}
                              className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded-lg"
                            >
                              {stack}
                            </span>
                          ))}
                          
                        </div>
                      </div>
                    )}

                    
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
