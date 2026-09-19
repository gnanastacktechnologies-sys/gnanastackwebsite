import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Layers, Cpu } from 'lucide-react';
import { HeroCanvas } from '../visual/HeroCanvas';
import { MagneticButton } from '../ui/MagneticButton';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-grid-pattern">
      {/* Background Interactive Particle Visualizer */}
      <HeroCanvas />

      {/* Subtle Radial Orbs */}
      <div className="gradient-orb w-[500px] h-[500px] top-1/4 left-1/2 -translate-x-1/2 bg-gnana-cyan/15" />
      <div className="gradient-orb w-[400px] h-[400px] bottom-10 left-10 bg-gnana-blue/20" />
      <div className="gradient-orb w-[400px] h-[400px] top-10 right-10 bg-gnana-teal/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center lg:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-gnana-cyan/30 text-xs font-mono text-gnana-cyan tracking-wide"
            >
              <Sparkles className="w-3.5 h-3.5 text-gnana-teal animate-pulse" />
              <span>From Village Vision to Digital Innovation</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white"
            >
              BUILDING IDEAS <br />
              <span className="bg-gradient-to-r from-gnana-blue via-gnana-cyan to-gnana-teal bg-clip-text text-transparent">
                INTO DIGITAL
              </span> <br />
              INNOVATIONS.
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-gnana-muted max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0"
            >
              We transform real-world ideas into modern digital products, intelligent systems, and practical technology solutions engineered for real-world impact.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link to="/projects">
                <MagneticButton variant="primary">
                  Explore Our Projects
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </Link>
              <Link to="/contact">
                <MagneticButton variant="secondary">
                  Start a Project
                </MagneticButton>
              </Link>
            </motion.div>

            {/* Capability highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-mono text-gnana-muted"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-gnana-cyan" />
                <span>Full-Stack Systems</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-gnana-teal" />
                <span>Custom Software</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gnana-green animate-ping" />
                <span className="text-gnana-text">Ready for Production</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Visual Accent Card / Emblem (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square rounded-3xl glass-panel p-8 border border-white/10 glow-border flex flex-col items-center justify-center shadow-2xl group">
              
              {/* Background emblem glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gnana-blue/20 via-gnana-cyan/20 to-gnana-green/10 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

              {/* Logo Emblem Render */}
              <div className="relative z-10 w-48 h-48 mb-6 p-4 rounded-2xl bg-gnana-dark/90 border border-gnana-cyan/30 flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <img
                  src="/assets/logo.png"
                  alt="GnanaStack Technologies Hero Emblem"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(0,200,255,0.4)]"
                />
              </div>

              {/* Layered stack label */}
              <div className="relative z-10 text-center space-y-1">
                <div className="text-xs font-mono uppercase tracking-[0.25em] text-gnana-cyan font-semibold">
                  GNANASTACK ENGINE
                </div>
                <div className="text-sm text-gnana-muted">
                  VISION → ENGINEERING → INNOVATION → IMPACT
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
