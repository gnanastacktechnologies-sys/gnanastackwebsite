import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Server, FolderKanban } from 'lucide-react';
import axios from 'axios';

export const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/projects');
        if (res.data.success) {
          setProjects(res.data.projects);
        }
      } catch (err) {
        console.warn('Failed to fetch API projects, using fallbacks');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="relative py-24 bg-[#0A0F14] border-t border-white/5 overflow-hidden">
      {/* Glow Orbs */}
      <div className="gradient-orb w-96 h-96 top-1/2 left-0 bg-gnana-blue/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-gnana-cyan">
              ENGINEERING PORTFOLIO
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              OUR PROJECTS
            </h2>
            <p className="text-gnana-muted text-base max-w-xl">
              Turning real-world ideas into working, reliable technology solutions.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gnana-cyan hover:text-gnana-teal transition-colors"
          >
            View All Case Studies
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.slug || project._id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-2xl glass-panel border border-white/10 overflow-hidden flex flex-col justify-between glass-panel-hover"
            >
              {/* Cover Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-gnana-dark/90 p-4 flex items-center justify-center">
                <img
                  src={project.coverImage || '/assets/projects/gvehicle.png'}
                  alt={project.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 filter drop-shadow-[0_0_10px_rgba(0,200,255,0.25)]"
                  onError={(e) => {
                    e.target.src = '/assets/logo.png';
                    e.target.className = 'w-full h-full object-contain p-6 opacity-40';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F14] via-transparent to-transparent opacity-40 pointer-events-none" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-gnana-dark/90 border border-white/10 text-gnana-cyan">
                    {project.category}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-gnana-green/10 border border-gnana-green/30 text-gnana-green">
                    <span className="w-1.5 h-1.5 rounded-full bg-gnana-green animate-pulse" />
                    {project.status || 'Production'}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-gnana-cyan transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gnana-muted leading-relaxed line-clamp-3">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies?.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-gnana-text"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 4 && (
                      <span className="px-2 py-1 rounded-md text-xs font-mono text-gnana-muted">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gnana-cyan group-hover:translate-x-1 transition-transform"
                  >
                    View Case Study
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
