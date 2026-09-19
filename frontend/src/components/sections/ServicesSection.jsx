import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Globe,
  Smartphone,
  Cpu,
  Zap,
  Radio,
  Sparkles,
  BarChart3,
  Layers,
  ArrowRight,
} from 'lucide-react';
import axios from 'axios';

const iconMap = {
  Globe: Globe,
  Smartphone: Smartphone,
  Cpu: Cpu,
  Zap: Zap,
  Radio: Radio,
  Sparkles: Sparkles,
  BarChart3: BarChart3,
  Layers: Layers,
};

export const ServicesSection = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('/api/services');
        if (res.data.success) {
          setServices(res.data.services);
        }
      } catch (err) {
        console.warn('Failed to fetch API services, using fallback');
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="relative py-24 bg-[#0A0F14] border-t border-white/5 overflow-hidden">
      {/* Glow Orbs */}
      <div className="gradient-orb w-96 h-96 bottom-0 right-10 bg-gnana-teal/15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-gnana-teal">
            CORE CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            WHAT WE BUILD
          </h2>
          <p className="text-gnana-muted text-base sm:text-lg">
            Engineering robust digital infrastructure, user-centric products, and intelligent automation systems.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => {
            const IconComponent = iconMap[service.icon] || Globe;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative rounded-2xl glass-panel p-6 border border-white/10 glass-panel-hover flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Service Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gnana-dark border border-white/10 flex items-center justify-center text-gnana-cyan group-hover:text-gnana-teal group-hover:border-gnana-cyan/40 transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-gnana-cyan transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-gnana-muted leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Service details list */}
                  {service.details && (
                    <ul className="pt-2 space-y-1.5 text-xs text-gnana-muted/80">
                      {service.details.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-gnana-teal" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-6 border-t border-white/5 mt-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gnana-cyan group-hover:text-gnana-teal transition-colors"
                  >
                    Inquire About This Service
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
