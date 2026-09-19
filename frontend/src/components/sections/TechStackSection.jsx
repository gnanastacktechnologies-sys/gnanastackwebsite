import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Atom,
  Code2,
  FileCode,
  Palette,
  Server,
  Cpu,
  Network,
  Database,
  Cloud,
  Terminal,
  GitBranch,
  FileCode2,
  Bot,
  Radio,
} from 'lucide-react';
import axios from 'axios';

const iconMap = {
  Atom: Atom,
  Code2: Code2,
  FileCode: FileCode,
  Palette: Palette,
  Server: Server,
  Cpu: Cpu,
  Network: Network,
  Database: Database,
  Cloud: Cloud,
  Terminal: Terminal,
  GitBranch: GitBranch,
  FileCode2: FileCode2,
  Bot: Bot,
  Radio: Radio,
};

export const TechStackSection = () => {
  const [technologies, setTechnologies] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchTech = async () => {
      try {
        const res = await axios.get('/api/technologies');
        if (res.data.success) {
          setTechnologies(res.data.technologies);
        }
      } catch (err) {
        console.warn('Failed to fetch API technologies');
      }
    };
    fetchTech();
  }, []);

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Cloud / Deployment'];

  const filteredTech =
    activeCategory === 'All'
      ? technologies
      : technologies.filter((t) => t.category === activeCategory);

  return (
    <section id="technologies" className="relative py-24 bg-gnana-bg border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-gnana-cyan">
            STACK ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            TECHNOLOGIES WE WORK WITH
          </h2>
          <p className="text-gnana-muted text-base sm:text-lg">
            Modern, industry-proven stacks selected for speed, security, maintainability, and scalability.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-gnana-blue to-gnana-cyan text-black font-bold shadow-lg shadow-gnana-cyan/20'
                  : 'bg-gnana-dark border border-white/10 text-gnana-muted hover:text-gnana-text hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Technology Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {filteredTech.map((item, idx) => {
            const IconComp = iconMap[item.icon] || Code2;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="group rounded-2xl glass-panel p-5 border border-white/10 glass-panel-hover flex flex-col items-center justify-center text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-gnana-dark border border-white/10 flex items-center justify-center text-gnana-cyan group-hover:text-gnana-teal group-hover:scale-110 transition-all duration-300">
                  <IconComp className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-white group-hover:text-gnana-cyan transition-colors">
                  {item.name}
                </span>
                <span className="text-[11px] font-mono text-gnana-muted">
                  {item.category}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
