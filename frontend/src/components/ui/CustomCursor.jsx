import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.interactive');
      setIsPointer(!!isInteractive);
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-gnana-cyan rounded-full pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isPointer ? 1.8 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-gnana-cyan/40 rounded-full pointer-events-none z-50"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.5 : 1,
          borderColor: isPointer ? '#00D6B4' : 'rgba(0, 200, 255, 0.4)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.3 }}
      />
    </>
  );
};
