import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Cpu, Globe2, ArrowRight } from 'lucide-react';

export const VisionJourneySection = () => {
  const steps = [
    {
      stage: '01',
      title: 'LOCAL GROUNDING',
      subtitle: 'Real-World Roots',
      desc: 'Observing everyday operational struggles in local communities, logistics routes, and regional agriculture.',
      icon: MapPin,
      badgeColor: 'border-gnana-blue/30 text-gnana-blue',
    },
    {
      stage: '02',
      title: 'DIGITAL STACK',
      subtitle: 'Modern Engineering',
      desc: 'Architecting high-performance web software, hardware IoT integrations, and encrypted database pipelines.',
      icon: Cpu,
      badgeColor: 'border-gnana-cyan/30 text-gnana-cyan',
    },
    {
      stage: '03',
      title: 'GLOBAL SCALABILITY',
      subtitle: 'Unlimited Horizons',
      desc: 'Deploying cloud-native solutions that empower businesses everywhere with speed, integrity, and insight.',
      icon: Globe2,
      badgeColor: 'border-gnana-teal/30 text-gnana-teal',
    },
  ];

  return (
    <section className="relative py-24 bg-gnana-bg border-t border-white/5 overflow-hidden">
      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-gnana-cyan">
            BRAND ORIGIN & FUTURE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            FROM VILLAGE VISION <br />
            <span className="bg-gradient-to-r from-gnana-blue via-gnana-cyan to-gnana-green bg-clip-text text-transparent">
              TO DIGITAL INNOVATION
            </span>
          </h2>
          <p className="text-gnana-muted text-base sm:text-lg">
            Rooted in authentic problem solving, engineered with modern software standards, and built for global scale.
          </p>
        </div>

        {/* Visual Journey 3-Step Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <motion.div
                key={step.stage}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative rounded-2xl glass-panel p-8 border border-white/10 glass-panel-hover flex flex-col justify-between group"
              >
                {/* Connector Arrow for Desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-gnana-dark border border-white/10 rounded-full p-2 text-gnana-cyan">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono bg-gnana-dark border ${step.badgeColor}`}>
                      PHASE {step.stage}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-gnana-dark border border-white/10 flex items-center justify-center text-gnana-cyan group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-gnana-muted uppercase tracking-wider block">
                      {step.subtitle}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-gnana-cyan transition-colors">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-sm text-gnana-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between text-xs font-mono text-gnana-muted">
                  <span>GnanaStack Vision</span>
                  <span className="text-gnana-cyan">0{idx + 1} / 03</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
