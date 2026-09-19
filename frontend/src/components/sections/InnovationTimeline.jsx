import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Search, Compass, Code, CheckCircle, Lightbulb, Award } from 'lucide-react';

export const InnovationTimeline = () => {
  const steps = [
    {
      num: '01',
      title: 'VISION',
      desc: 'Understanding the underlying idea and diagnosing the real-world problem.',
      icon: Eye,
      color: 'text-gnana-blue',
      glow: 'shadow-gnana-blue/20',
    },
    {
      num: '02',
      title: 'DISCOVERY',
      desc: 'Researching technical requirements, domain constraints, and architecture possibilities.',
      icon: Search,
      color: 'text-gnana-cyan',
      glow: 'shadow-gnana-cyan/20',
    },
    {
      num: '03',
      title: 'DESIGN',
      desc: 'Creating human-centric user experience blueprints and technical data flows.',
      icon: Compass,
      color: 'text-gnana-teal',
      glow: 'shadow-gnana-teal/20',
    },
    {
      num: '04',
      title: 'ENGINEERING',
      desc: 'Building the actual full-stack code, databases, security protocols, and device integrations.',
      icon: Code,
      color: 'text-gnana-green',
      glow: 'shadow-gnana-green/20',
    },
    {
      num: '05',
      title: 'TESTING',
      desc: 'Validating software resilience, edge cases, speed benchmarks, and user acceptance.',
      icon: CheckCircle,
      color: 'text-gnana-lime',
      glow: 'shadow-gnana-lime/20',
    },
    {
      num: '06',
      title: 'INNOVATION',
      desc: 'Refining the custom software solution into a seamless, high-utility digital product.',
      icon: Lightbulb,
      color: 'text-gnana-cyan',
      glow: 'shadow-gnana-cyan/20',
    },
    {
      num: '07',
      title: 'IMPACT',
      desc: 'Deploying technology that solves problems, reduces friction, and creates tangible value.',
      icon: Award,
      color: 'text-gnana-teal',
      glow: 'shadow-gnana-teal/20',
    },
  ];

  return (
    <section id="innovations" className="relative py-24 bg-gnana-bg border-t border-white/5 overflow-hidden">
      {/* Background Orbs */}
      <div className="gradient-orb w-[600px] h-[600px] top-1/3 right-0 bg-gnana-cyan/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-gnana-cyan">
            METHODOLOGY & PROCESS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            FROM VISION TO INNOVATION
          </h2>
          <p className="text-gnana-muted text-base sm:text-lg">
            A disciplined, multi-stage engineering journey that turns initial concepts into impactful digital realities.
          </p>
        </div>

        {/* Timeline Desktop & Mobile Layout */}
        <div className="relative">
          {/* Vertical Glowing Timeline Bar */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gnana-blue via-gnana-cyan to-gnana-green opacity-40 -translate-x-1/2" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Box (Half width on desktop) */}
                  <div className="w-full md:w-1/2 px-0 md:px-8">
                    <div className="rounded-2xl glass-panel p-6 border border-white/10 glass-panel-hover group">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-mono font-bold tracking-widest ${step.color}`}>
                          STAGE {step.num}
                        </span>
                        <div className={`p-2.5 rounded-xl bg-gnana-dark border border-white/10 ${step.color}`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold tracking-tight text-white mb-2 group-hover:text-gnana-cyan transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-sm text-gnana-muted leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center Node Badge */}
                  <div className="my-4 md:my-0 flex items-center justify-center relative z-20">
                    <div className={`w-10 h-10 rounded-full bg-gnana-dark border border-white/20 flex items-center justify-center font-mono text-xs font-bold text-white shadow-xl ${step.glow}`}>
                      {step.num}
                    </div>
                  </div>

                  {/* Empty Spacer Column for layout symmetry */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
