import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070A]"
    >
      <div className="relative flex flex-col items-center">
        {/* Glow halo */}
        <div className="absolute -inset-8 bg-gradient-to-r from-gnana-blue via-gnana-cyan to-gnana-teal rounded-full blur-2xl opacity-20 animate-pulse-slow" />
        
        {/* Logo Emblem Container */}
        <motion.div
          animate={{
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-20 h-20 mb-6 p-2 rounded-2xl bg-gnana-dark/80 border border-gnana-cyan/30 shadow-2xl flex items-center justify-center"
        >
          <img src="/assets/logo.png" alt="GnanaStack Technologies Loading Emblem" className="w-full h-full object-contain" />
        </motion.div>

        {/* Text & Energy Bar */}
        <span className="text-xs uppercase tracking-[0.3em] font-mono text-gnana-muted mb-3">
          GNANASTACK TECHNOLOGIES
        </span>

        <div className="w-36 h-1 rounded-full bg-gnana-dark overflow-hidden border border-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-gnana-blue via-gnana-cyan to-gnana-green"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
};
