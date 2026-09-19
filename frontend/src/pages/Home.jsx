import React from 'react';
import { PageTransition } from '../components/layout/PageTransition';
import { HeroSection } from '../components/sections/HeroSection';
import { BrandIntroSection } from '../components/sections/BrandIntroSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { InnovationTimeline } from '../components/sections/InnovationTimeline';
import { ServicesSection } from '../components/sections/ServicesSection';
import { TechStackSection } from '../components/sections/TechStackSection';
import { PhilosophySection } from '../components/sections/PhilosophySection';
import { VisionJourneySection } from '../components/sections/VisionJourneySection';
import { ContactSection } from '../components/sections/ContactSection';

export const Home = () => {
  return (
    <PageTransition>
      <div className="space-y-0">
        <HeroSection />
        <BrandIntroSection />
        <ProjectsSection />
        <InnovationTimeline />
        <ServicesSection />
        <TechStackSection />
        <PhilosophySection />
        <VisionJourneySection />
        <ContactSection />
      </div>
    </PageTransition>
  );
};
