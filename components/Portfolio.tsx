"use client";
import React, { useEffect, useState } from "react";
import { Sun, Moon, Mail, GithubIcon, LinkedinIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import Slider from "react-slick";
import { sendContactForm } from "@/utils/api";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

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

const AlertBox: React.FC<{
  message: string;
  type: "success" | "error";
  onClose: () => void;
}> = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        &times;
      </button>
    </div>
  );
};

const Portfolio: React.FC<PortfolioProps> = ({ projects, skills, adarsh }) => {
  const [darkMode, setDarkMode] = React.useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const result = await sendContactForm(data);
      setAlert({
        message: result.message || "Message sent successfully!",
        type: "success",
      });

      form.reset();
      setSending(false);
    } catch (error) {
      setAlert({ message: "Failed to send message.", type: "error" });
    }
  };

  const handleCloseAlert = () => {
    setAlert(null);
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };


  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50"
        style={{ scaleX }}
      />
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-900 z-40">
        <h1 className="text-2xl font-bold">Adarsh Kumar</h1>
        <div className="flex">
          <Link href={`${adarsh.resume}`}>
            <div className="bg-gray-200 dark:bg-gray-700 px-3 py-2 my-auto justify-center rounded-full text-sm">
              Resume
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {darkMode ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <AnimatedSection>
          <motion.section className=" md:flex items-center">
            <motion.div className="mr-8">
              <motion.h2 className="text-4xl font-bold mb-4">
                Hello, I'm Adarsh
              </motion.h2>
              <motion.p className="text-xl mb-6">{adarsh.tagline}</motion.p>
              <motion.p className="mb-6">{adarsh.bio}</motion.p>
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
                className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {skill.name}
              </motion.span>
            ))}
          </motion.div>
        </AnimatedSection>

        <AnimatedSection>
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-bold mb-4"
          >
            Projects
          </motion.h3>
          <motion.div variants={itemVariants}>
            <Slider {...settings}>
              {projects.map((project) => (
                <div key={project.id} className="px-2">
                  <motion.div
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-full"
                    whileHover={{ scale: 0.96 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href={`${project.github}`}>
                      <h4 className="text-xl font-semibold mb-3">
                        {project.name}
                      </h4>
                    </Link>
                    <p className="text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="relative w-full h-56 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={`${project.image}`}
                        alt={project.name}
                        layout="fill"
                        objectFit="cover"
                        unoptimized={true}
                      />
                    </div>
                  </motion.div>
                </div>
              ))}
            </Slider>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection>
        <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-4">
            Get in Touch
          </motion.h3>
          <div className="flex flex-col md:flex-row gap-8">
            <motion.div variants={itemVariants} className="flex-1">
              <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <h4 className="text-xl font-semibold mb-4">Contact Me</h4>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <motion.button
                  type="submit"
                  className={`w-full px-4 py-2 rounded-md text-white transition-all ${
                    sending
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  disabled={sending}
                  whileHover={{ scale: 1.004 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {sending ? "Sending" : "Send"}
                </motion.button>
              </form>
            </motion.div>
            <motion.div variants={itemVariants} className="flex-1 hidden md:block">
              <Image
                src={"/contact.svg"}
                height={400}
                width={400}
                alt="Contact Illustration"
              />
            </motion.div>
          </div>
         
          <motion.div variants={itemVariants} className="flex mt-8 justify-center">
            <div className="flex gap-6">
              {[
                { icon: Mail, href: `mailto:${adarsh.email}` },
                { icon: GithubIcon, href: adarsh.github },
                { icon: LinkedinIcon, href: adarsh.linkedin },
              ].map(({ icon: Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="h-8 w-8" />
                </motion.a>
              ))}
            </div>
          </motion.div>
         
        </AnimatedSection>
      </main>
      {alert && (
        <AlertBox
          message={alert.message}
          type={alert.type}
          onClose={handleCloseAlert}
        />
      )}
    </div>
  );
};

export default Portfolio;
