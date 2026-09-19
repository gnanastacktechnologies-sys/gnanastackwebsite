import React from 'react';
import { PageTransition } from '../components/layout/PageTransition';
import { PhilosophySection } from '../components/sections/PhilosophySection';
import { VisionJourneySection } from '../components/sections/VisionJourneySection';
import { BrandIntroSection } from '../components/sections/BrandIntroSection';

export const About = () => {
  return (
    <PageTransition>
      <div className="pt-28 pb-16 bg-gnana-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-gnana-cyan">
              WHO WE ARE
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              GnanaStack Technologies
            </h1>
            <p className="text-gnana-muted text-base sm:text-lg leading-relaxed">
              An innovation-driven software development company taking real-world ideas and building them into practical, scalable digital solutions.
            </p>
          </div>
        </div>

        <BrandIntroSection />
        <PhilosophySection />
        <VisionJourneySection />
      </div>
    </PageTransition>
  );
};
