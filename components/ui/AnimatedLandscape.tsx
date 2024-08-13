import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AnimatedLandscape = ({ isDarkMode }) => {
  const { scrollYProgress } = useScroll();

  const sunMoonY = useTransform(scrollYProgress, [0, 1], ["100%", "-20%"]);
  const skyColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isDarkMode
      ? ["#1a202c", "#2d3748", "#4a5568"]
      : ["#fef9c3", "#93c5fd", "#60a5fa"]
  );

  const mountainColors = isDarkMode
    ? ["#1e293b", "#334155", "#475569", "#64748b"]
    : ["#52525b", "#78716c", "#a8a29e", "#d6d3d1"];

  const cloudOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const starOpacity = useTransform(
    scrollYProgress,
    [0.5, 1],
    [0, isDarkMode ? 1 : 0]
  );

  const cloudFillColor = isDarkMode ? "rgba(169, 169, 169, 0.8)" : "rgba(255, 255, 255, 0.8)";
  
  const cloudSVG = `
    <g transform="scale(10)">
      <path d="M55.7,20.5c-0.1,0.3-0.1,0.6-0.1,0.9c0,1.6,1.3,2.9,2.9,2.9c0.2,0,0.4,0,0.6-0.1c0.1,1.3,1.2,2.3,2.5,2.3
        c1.2,0,2.1-0.8,2.4-1.9c0.3,0.1,0.5,0.1,0.8,0.1c1.6,0,2.9-1.3,2.9-2.9c0-1.1-0.6-2-1.5-2.5c0.1-0.3,0.1-0.6,0.1-1
        c0-2.4-1.9-4.3-4.3-4.3c-1.8,0-3.4,1.1-4,2.7c-0.2,0-0.4-0.1-0.7-0.1c-1.6,0-2.9,1.3-2.9,2.9C54.4,19.6,54.9,20.2,55.7,20.5z" fill="${cloudFillColor}"/>
    </g>
  `;

  return (
    <svg
      viewBox="0 0 1000 1000"
      className="fixed top-0 left-0 w-full h-full -z-10"
      preserveAspectRatio="xMidYMax slice"
    >
      <motion.rect x="0" y="0" width="1000" height="1000" fill={skyColor} />

      {/* Stars */}
      <motion.g style={{ opacity: starOpacity }}>
          {isDarkMode && [...Array(100)].map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 1000}
              cy={Math.random() * 500}
              r={Math.random() * 2 + 1}
              fill="#ffffff"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ 
                duration: 2 + Math.random() * 3, 
                repeat: Infinity, 
                delay: Math.random() * 2 
              }}
            />
          ))}
        </motion.g>
        

      {/* Clouds */}
      <motion.g style={{ opacity: cloudOpacity}}>
        {[...Array(2)].map((_, i) => (
          <motion.g
            key={i}
            dangerouslySetInnerHTML={{ __html: cloudSVG }}
            initial={{ x: -400+i*280, y: 400 }}
            animate={{ x: 1100 }}
            transition={{
              duration: 60 + i * 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 5,
            }}
          />
        ))}
      </motion.g>
      <motion.g style={{ opacity: cloudOpacity }}>
        {[...Array(2)].map((_, i) => (
          <motion.g
            key={i}
            dangerouslySetInnerHTML={{ __html: cloudSVG }}
            initial={{ x: -450 + i*200, y: 500 }}
            animate={{ x: 1100 }}
            transition={{
              duration: 60 + i * 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 5,
            }}
          />
        ))}
      </motion.g>
      {/* Sun or Moon */}
      <motion.circle
        cx="500"
        cy="1000"
        r="100"
        fill={isDarkMode ? "#f1f5f9" : "#fde047"}
        style={{ y: sunMoonY }}
      />

      {/* Mountain ranges */}
      <path
        d="M0 850 Q 100 800, 200 830 T 400 810 T 600 840 T 800 820 T 1000 850 L 1000 1000 L 0 1000 Z"
        fill={mountainColors[0]}
      />
      <path
        d="M0 900 Q 50 850, 100 880 T 200 850 T 300 890 T 400 860 T 500 900 T 600 870 T 700 910 T 800 880 T 900 920 T 1000 900 L 1000 1000 L 0 1000 Z"
        fill={mountainColors[1]}
      />
      <path
        d="M0 950 Q 100 850, 150 920 T 300 880 T 450 940 T 600 900 T 750 960 T 900 910 T 1000 950 L 1000 1000 L 0 1000 Z"
        fill={mountainColors[2]}
      />
      <path
        d="M0 980 Q 150 950, 250 975 T 500 960 T 750 980 T 1000 965 L 1000 1000 L 0 1000 Z"
        fill={mountainColors[3]}
      />
    </svg>
  );
};

export default AnimatedLandscape;
