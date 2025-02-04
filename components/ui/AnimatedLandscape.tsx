import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AstroBackground: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2
    }));
  };

  const stars = generateStars(100);

  return (
    <motion.div 
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: isDarkMode 
          ? 'linear-gradient(135deg, #0d1117, #161b22)' 
          : 'linear-gradient(135deg, #e6e9f0, #f5f7fa)'
      }}
    >
      {/* Floating Planets */}
      {[
        { size: 80, color: 'rgba(59, 130, 246, 0.2)', x: '10%', y: '20%' },
        { size: 120, color: 'rgba(99, 102, 241, 0.1)', x: '80%', y: '70%' }
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
            transform: `translate(-50%, -50%) rotate(${index * 45}deg)`
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10 + index * 5,
            repeat: Infinity,
            ease: "linear"
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
            backgroundColor: isDarkMode ? 'white' : 'rgba(0,0,0,0.2)',
            left: star.x,
            top: star.y
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut"
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
            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
            left: Math.random() * window.innerWidth,
            top: Math.random() * window.innerHeight
          }}
          animate={{
            x: [
              Math.random() * 100 - 50, 
              Math.random() * 100 - 50, 
              Math.random() * 100 - 50
            ],
            y: [
              Math.random() * 100 - 50, 
              Math.random() * 100 - 50, 
              Math.random() * 100 - 50
            ],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
};

export default AstroBackground;