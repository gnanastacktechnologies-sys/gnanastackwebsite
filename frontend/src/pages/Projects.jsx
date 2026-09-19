import React from 'react';
import { PageTransition } from '../components/layout/PageTransition';
import { ProjectsSection } from '../components/sections/ProjectsSection';

export const Projects = () => {
  return (
    <PageTransition>
      <div className="pt-28 pb-16 bg-gnana-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-gnana-cyan">
              OUR WORK & CASE STUDIES
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              Software Products & Solutions
            </h1>
            <p className="text-gnana-muted text-base sm:text-lg">
              Explore how we translate complex real-world requirements into resilient, high-utility software.
            </p>
          </div>
        </div>

        <ProjectsSection />
      </div>
    </PageTransition>
  );
};
