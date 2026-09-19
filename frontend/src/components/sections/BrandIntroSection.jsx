import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Wrench, Rocket, Zap, ChevronRight } from 'lucide-react';

export const BrandIntroSection = () => {
  const stages = [
    {
      id: '01',
      title: 'IDEA',
      desc: 'Identifying real-world challenges and defining meaningful digital solutions.',
      icon: Lightbulb,
      color: 'from-gnana-blue to-gnana-cyan',
      textColor: 'text-gnana-blue',
      borderColor: 'border-gnana-blue/40',
    },
    {
      id: '02',
      title: 'ENGINEERING',
      desc: 'Architecting robust full-stack codebases, database models, and connected IoT telemetry.',
      icon: Wrench,
      color: 'from-gnana-cyan to-gnana-teal',
      textColor: 'text-gnana-cyan',
      borderColor: 'border-gnana-cyan/40',
    },
    {
      id: '03',
      title: 'INNOVATION',
      desc: 'Synthesizing modern web technologies with intelligent automation for operational speed.',
      icon: Rocket,
      color: 'from-gnana-teal to-gnana-green',
      textColor: 'text-gnana-teal',
      borderColor: 'border-gnana-teal/40',
    },
    {
      id: '04',
      title: 'IMPACT',
      desc: 'Delivering practical software products that simplify work and scale real businesses.',
      icon: Zap,
      color: 'from-gnana-green to-gnana-lime',
      textColor: 'text-gnana-green',
      borderColor: 'border-gnana-green/40',
    },
  ];

  return (
    <section className="relative py-24 bg-gnana-bg overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-[0.25em] text-gnana-cyan"
          >
            TRUST & PHILOSOPHY
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white"
          >
            Technology With Purpose.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gnana-muted text-base sm:text-lg leading-relaxed"
          >
            GnanaStack Technologies builds practical digital solutions that connect ideas, technology, and real-world problems.
          </motion.p>
        </div>

        {/* Interactive Scroll Visual: Stage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage, idx) => {
            const IconComponent = stage.icon;
            return (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className={`relative rounded-2xl glass-panel p-6 border ${stage.borderColor} glass-panel-hover flex flex-col justify-between group`}
              >
                {/* Connector Arrow for desktop */}
                {idx < stages.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 bg-gnana-dark border border-white/10 rounded-full p-1 text-gnana-muted">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}

                {/* Stage Header */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono tracking-widest text-gnana-muted font-bold">
                      {stage.id}
                    </span>
                    <div className={`p-3 rounded-xl bg-gnana-dark border border-white/10 ${stage.textColor} group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className={`text-xl font-bold tracking-tight mb-2 text-white group-hover:${stage.textColor} transition-colors`}>
                    {stage.title}
                  </h3>

                  <p className="text-sm text-gnana-muted leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                {/* Bottom Gradient Accent Line */}
                <div className={`mt-6 h-1 w-full rounded-full bg-gradient-to-r ${stage.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
