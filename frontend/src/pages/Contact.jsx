import React from 'react';
import { PageTransition } from '../components/layout/PageTransition';
import { ContactSection } from '../components/sections/ContactSection';

export const Contact = () => {
  return (
    <PageTransition>
      <div className="pt-28 pb-16 bg-gnana-bg">
        <ContactSection />
      </div>
    </PageTransition>
  );
};
