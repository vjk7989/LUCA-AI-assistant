import React from 'react';
import { motion } from 'motion/react';

interface VoiceVisualizerProps {
  isUserTalking: boolean;
  isAITalking: boolean;
}

export const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({ isUserTalking, isAITalking }) => {
  const bars = [0, 1, 2, 3, 4, 5, 6];
  const dots = Array.from({ length: 48 });

  const activeColor = isUserTalking ? '#bf00ff' : (isAITalking ? '#ffffff' : '#333333');
  const isActive = isUserTalking || isAITalking;

  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden">
      {/* Dot Grid Background */}
      <div className="absolute inset-0 grid grid-cols-12 gap-4 p-4 opacity-20">
        {dots.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1 }}
            animate={{ 
              opacity: isActive ? [0.1, 0.3, 0.1] : 0.1,
              scale: isActive ? [1, 1.2, 1] : 1
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 0.05,
              ease: "easeInOut"
            }}
            className="w-1 h-1 bg-white rounded-full"
          />
        ))}
      </div>

      {/* Central Waveform Bars */}
      <div className="relative z-10 flex items-center gap-1.5">
        {bars.map((i) => {
          // Calculate height based on index for a diamond/wave shape
          const baseHeight = i === 3 ? 48 : (i === 2 || i === 4 ? 32 : (i === 1 || i === 5 ? 20 : 12));
          
          return (
            <motion.div
              key={i}
              initial={{ height: 4 }}
              animate={{ 
                height: isActive ? [baseHeight * 0.5, baseHeight, baseHeight * 0.7] : 4,
                backgroundColor: activeColor,
                boxShadow: isActive ? `0 0 15px ${activeColor}44` : 'none'
              }}
              transition={{ 
                duration: 0.6, 
                repeat: Infinity, 
                repeatType: "mirror",
                delay: i * 0.1,
                ease: "easeInOut"
              }}
              className="w-1.5 rounded-full transition-colors duration-300"
            />
          );
        })}
      </div>

      {/* Glow Effect */}
      <motion.div 
        animate={{ 
          opacity: isActive ? [0.1, 0.2, 0.1] : 0,
          scale: isActive ? [1, 1.1, 1] : 1
        }}
        className="absolute w-32 h-32 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: activeColor }}
      />
    </div>
  );
};
