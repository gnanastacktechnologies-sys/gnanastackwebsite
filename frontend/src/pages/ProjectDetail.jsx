import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  Award,
  ExternalLink,
} from 'lucide-react';
import axios from 'axios';
import { PageTransition } from '../components/layout/PageTransition';

export const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/projects/${slug}`);
        if (res.data.success) {
          setProject(res.data.project);
        } else {
          setError('Project not found');
        }
      } catch (err) {
        setError('Failed to load project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-gnana-bg">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-2 border-gnana-cyan border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-gnana-muted">Loading Case Study Documentation...</span>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen pt-32 px-4 flex flex-col items-center justify-center bg-gnana-bg text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Case Study Not Found</h2>
        <p className="text-sm text-gnana-muted">The requested project documentation could not be retrieved.</p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gnana-dark border border-white/10 text-gnana-cyan text-sm font-semibold hover:bg-gnana-surface transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Projects
        </Link>
      </div>
    );
  }

  return (
    <PageTransition>
      <article className="pt-28 pb-24 bg-gnana-bg text-gnana-text min-h-screen">
        
        {/* Top Breadcrumb Header */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-gnana-muted hover:text-gnana-cyan transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
          </Link>
        </div>

        {/* Hero Section */}
        <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-gnana-cyan/10 border border-gnana-cyan/30 text-gnana-cyan">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-gnana-green/10 border border-gnana-green/30 text-gnana-green flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gnana-green animate-pulse" />
              {project.status || 'Production Ready'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-gnana-muted font-normal leading-relaxed">
            {project.shortDescription}
          </p>
        </header>

        {/* Featured Cover Asset */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="rounded-3xl glass-panel p-6 border border-white/10 overflow-hidden shadow-2xl bg-gnana-dark/90 flex items-center justify-center">
            <img
              src={project.coverImage || '/assets/projects/gvehicle.png'}
              alt={project.title}
              className="w-full max-h-[450px] aspect-video object-contain rounded-2xl filter drop-shadow-[0_0_15px_rgba(0,200,255,0.3)]"
              onError={(e) => {
                e.target.src = '/assets/logo.png';
                e.target.className = 'w-full aspect-video object-contain p-12 opacity-50';
              }}
            />
          </div>
        </section>

        {/* Main Case Study Technical Documentation */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Executive Overview */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-gnana-cyan">
              01 // EXECUTIVE OVERVIEW
            </h2>
            <div className="rounded-2xl glass-panel p-8 border border-white/10 text-base leading-relaxed text-gnana-muted">
              {project.description}
            </div>
          </section>

          {/* Problem & Solution Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Problem */}
            <div className="rounded-2xl glass-panel p-8 border border-red-500/20 bg-red-950/10 space-y-4">
              <div className="flex items-center gap-3 text-red-400">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-lg font-bold tracking-tight text-white">The Challenge / Problem</h3>
              </div>
              <p className="text-sm text-gnana-muted leading-relaxed">
                {project.problem || 'Legacy workflows lacked real-time visibility and suffered from manual reporting latency.'}
              </p>
            </div>

            {/* Solution */}
            <div className="rounded-2xl glass-panel p-8 border border-gnana-teal/20 bg-gnana-teal/5 space-y-4">
              <div className="flex items-center gap-3 text-gnana-teal">
                <Lightbulb className="w-5 h-5" />
                <h3 className="text-lg font-bold tracking-tight text-white">The Technical Solution</h3>
              </div>
              <p className="text-sm text-gnana-muted leading-relaxed">
                {project.solution || 'GnanaStack engineered an integrated software platform with automated data processing and intuitive visual dashboards.'}
              </p>
            </div>
          </section>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-gnana-teal">
                02 // KEY SYSTEM CAPABILITIES
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl glass-panel p-4 border border-white/10 flex items-start gap-3 text-sm text-white"
                  >
                    <CheckCircle2 className="w-5 h-5 text-gnana-teal shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Architecture & Stack */}
          <section className="space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-gnana-green">
              03 // TECHNICAL ARCHITECTURE & STACK
            </h2>
            
            <div className="rounded-2xl glass-panel p-8 border border-white/10 space-y-6">
              <div>
                <h3 className="text-sm font-mono text-gnana-muted mb-3 uppercase tracking-wider">
                  Technology Stack Utilized
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-gnana-cyan"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.architecture && (
                <div className="pt-6 border-t border-white/10 space-y-2">
                  <h3 className="text-sm font-mono text-gnana-muted uppercase tracking-wider">
                    Architecture Specification
                  </h3>
                  <p className="text-sm text-gnana-muted leading-relaxed">
                    {project.architecture}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Results & Impact */}
          {project.results && (
            <section className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-gnana-lime">
                04 // REAL-WORLD IMPACT
              </h2>
              <div className="rounded-2xl glass-panel p-8 border border-gnana-lime/30 bg-gnana-lime/5 flex items-start gap-4">
                <Award className="w-8 h-8 text-gnana-lime shrink-0 mt-1" />
                <p className="text-base font-semibold text-white leading-relaxed">
                  {project.results}
                </p>
              </div>
            </section>
          )}

          {/* Back Action */}
          <div className="pt-12 border-t border-white/10 flex justify-between items-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gnana-cyan hover:text-gnana-teal transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Case Studies
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gnana-blue via-gnana-cyan to-gnana-teal text-black text-sm font-bold shadow-lg shadow-gnana-cyan/20 hover:shadow-gnana-cyan/40 transition-shadow"
            >
              Build a Similar Project
            </Link>
          </div>
        </div>
      </article>
    </PageTransition>
  );
};
