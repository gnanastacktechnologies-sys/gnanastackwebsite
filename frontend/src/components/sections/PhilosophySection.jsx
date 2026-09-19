import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Cpu, Feather, Zap, ShieldCheck } from 'lucide-react';

export const PhilosophySection = () => {
  const principles = [
    {
      num: '01',
      name: 'INNOVATION',
      quote: 'Forward-thinking digital architectures that rethink traditional bottlenecks.',
      accent: 'from-gnana-blue to-gnana-cyan',
      textColor: 'text-gnana-cyan',
    },
    {
      num: '02',
      name: 'ENGINEERING',
      quote: 'Disciplined full-stack code, resilient data schemas, and zero-compromise security.',
      accent: 'from-gnana-cyan to-gnana-teal',
      textColor: 'text-gnana-teal',
    },
    {
      num: '03',
      name: 'SIMPLICITY',
      quote: 'Refining complex enterprise logic into intuitive, friction-free visual interfaces.',
      accent: 'from-gnana-teal to-gnana-green',
      textColor: 'text-gnana-green',
    },
    {
      num: '04',
      name: 'IMPACT',
      quote: 'Focusing exclusively on software capabilities that deliver real, measurable utility.',
      accent: 'from-gnana-green to-gnana-lime',
      textColor: 'text-gnana-lime',
    },
  ];

  return (
    <section className="relative py-24 bg-[#0A0F14] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Statement (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-gnana-cyan">
              ENGINEERING PHILOSOPHY
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              WE BUILD <br />
              <span className="bg-gradient-to-r from-gnana-blue via-gnana-cyan to-gnana-teal bg-clip-text text-transparent">
                WHAT MATTERS.
              </span>
            </h2>

            <blockquote className="text-lg text-gnana-text border-l-2 border-gnana-cyan pl-4 py-1 italic font-light leading-relaxed">
              "Technology should not exist simply because it is possible. It should exist because it solves a real problem."
            </blockquote>

            <p className="text-sm text-gnana-muted leading-relaxed">
              At GnanaStack Technologies, every line of code, database schema, and interface animation is engineered to connect human vision with practical utility.
            </p>
          </div>

          {/* Elegant Animated Principles Asymmetrical Layout (7 columns) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {principles.map((p, idx) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative p-6 rounded-2xl glass-panel border border-white/10 glass-panel-hover flex flex-col justify-between group overflow-hidden"
              >
                {/* Background Number Accent */}
                <div className="absolute -right-2 -bottom-4 text-7xl font-mono font-extrabold opacity-5 group-hover:opacity-15 transition-opacity text-white">
                  {p.num}
                </div>

                <div className="relative z-10 space-y-3">
                  <span className={`text-xs font-mono font-bold tracking-widest ${p.textColor}`}>
                    {p.num} // PRINCIPLE
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-gnana-cyan transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-gnana-muted leading-relaxed">
                    {p.quote}
                  </p>
                </div>

                <div className={`mt-6 h-0.5 w-12 rounded-full bg-gradient-to-r ${p.accent} group-hover:w-full transition-all duration-500`} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
