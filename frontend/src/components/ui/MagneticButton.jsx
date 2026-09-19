import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const MagneticButton = ({ children, className = '', onClick, type = 'button', variant = 'primary' }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.25;
    const y = (clientY - (top + height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyle =
    variant === 'primary'
      ? 'relative inline-flex items-center justify-center font-semibold text-sm px-6 py-3.5 rounded-xl bg-gradient-to-r from-gnana-blue via-gnana-cyan to-gnana-teal text-black shadow-lg shadow-gnana-cyan/20 hover:shadow-gnana-cyan/40 transition-shadow duration-300 group overflow-hidden'
      : variant === 'secondary'
      ? 'relative inline-flex items-center justify-center font-semibold text-sm px-6 py-3.5 rounded-xl bg-gnana-dark/90 text-gnana-text border border-white/10 hover:border-gnana-cyan/40 hover:bg-gnana-surface transition-all duration-300 group overflow-hidden'
      : 'relative inline-flex items-center justify-center font-semibold text-sm px-6 py-3.5 rounded-xl border border-gnana-cyan/40 text-gnana-cyan hover:bg-gnana-cyan/10 transition-all duration-300 group';

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 15, mass: 0.1 }}
      className={`${baseStyle} ${className}`}
    >
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};
