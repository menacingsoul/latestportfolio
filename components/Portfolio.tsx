'use client'
import React, { useEffect } from 'react';
import { Sun, Moon, Mail, GithubIcon,LinkedinIcon } from 'lucide-react';
import { Button } from "@/components/ui/Button";
import Image from 'next/image';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  github: string;
  url?: string;
}

interface Skill {
  id: string;
  name: string;
  image?: string;
}

interface Adarsh {
  tagline: string;
  image: string;
  bio: string;
  email: string;
  resume: string;
  github: string;
  linkedin: string;
}

interface PortfolioProps {
  projects: Project[];
  skills: Skill[];
  adarsh: Adarsh;
}

const Portfolio: React.FC<PortfolioProps> = ({ projects, skills, adarsh }) => {
  const [darkMode, setDarkMode] = React.useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const settings = {
    dots: true,
    infinite: true,
    buttons: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    padding: 10,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const AnimatedSection = ({ children }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { amount: 0.3 });
    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        {children}
      </motion.section>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50"
        style={{ scaleX }}
      />
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-900 z-40">
        <h1 className="text-2xl font-bold">Adarsh Kumar</h1>
        <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
          {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <AnimatedSection>
          <motion.section className="flex items-center">
            <motion.div className="mr-8">
              <motion.h2 className="text-4xl font-bold mb-4">
                Hello, I'm Adarsh
              </motion.h2>
              <motion.p className="text-xl mb-6">
                {adarsh.tagline}
              </motion.p>
              <motion.p className="mb-6">
                {adarsh.bio}
              </motion.p>
            </motion.div>
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image 
                src={`${adarsh.image}`}
                alt="Adarsh Kumar" 
                width={200} 
                height={200} 
                className="rounded-full" 
                unoptimized={true} 
              />
            </motion.div>
          </motion.section>
        </AnimatedSection>

        <AnimatedSection>
          <h3 className="text-2xl font-bold mb-4">Skills</h3>
          <motion.div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <motion.span
                key={skill.id}
                className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {skill.name}
              </motion.span>
            ))}
          </motion.div>
        </AnimatedSection>

        <AnimatedSection>
          <h3 className="text-2xl font-bold mb-6">Projects</h3>
          <Slider {...settings}>
            {projects.map((project, index) => (
              <div key={index} className="px-2">
                <motion.div
                  className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full"
                  whileHover={{ scale: 0.95 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href ={`${project.github}`}><h4 className="text-xl font-semibold mb-3">{project.name}</h4></Link>
                  <p className="text-sm mb-4 line-clamp-1">{project.description}</p>
                  <div className="relative w-full h-96 mb-4 rounded overflow-hidden">
                    <Image src={`${project.image}`} alt={project.name} layout="fill" objectFit="cover" unoptimized={true} />
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </AnimatedSection>

        <AnimatedSection>
          <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a href={`mailto:${adarsh.email}`} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Mail className="h-[1.2rem] w-[1.2rem]" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href={adarsh.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <GithubIcon className="h-[1.2rem] w-[1.2rem]" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href={adarsh.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <LinkedinIcon className="h-[1.2rem] w-[1.2rem]" />
              </a>
            </Button>
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
};

export default Portfolio;
