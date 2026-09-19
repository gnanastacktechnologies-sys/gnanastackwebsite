import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import axios from 'axios';
import { MagneticButton } from '../ui/MagneticButton';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: 'Web Application',
    budget: '₹50,000 - ₹2,00,000',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const projectTypes = [
    'Web Application',
    'Mobile Application',
    'Custom Software Platform',
    'Business Automation',
    'IoT & Hardware Telemetry',
    'AI Integration',
    'Data Dashboard System',
    'Other / Advisory',
  ];

  const budgetRanges = [
    '< ₹50,000',
    '₹50,000 - ₹2,00,000',
    '₹2,00,000 - ₹5,00,000',
    '₹5,00,000+',
    'Flexible / Undisclosed',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in required fields: Name, Email, and Message.');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('/api/contact', formData);
      if (res.data.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          projectType: 'Web Application',
          budget: '₹50,000 - ₹2,00,000',
          message: '',
        });
      } else {
        setErrorMsg(res.data.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Server error. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-[#0A0F14] border-t border-white/5 overflow-hidden">
      {/* Background Orbs */}
      <div className="gradient-orb w-[500px] h-[500px] bottom-0 left-1/3 bg-gnana-cyan/15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Copy (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-gnana-cyan">
              START A PROJECT
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              LET'S BUILD <br />
              <span className="bg-gradient-to-r from-gnana-blue via-gnana-cyan to-gnana-teal bg-clip-text text-transparent">
                SOMETHING MEANINGFUL.
              </span>
            </h2>

            <p className="text-gnana-muted text-base leading-relaxed">
              Have an idea, a problem to solve, or a product to build? Let's turn your vision into working technology.
            </p>

            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="flex items-center gap-3 text-sm text-gnana-text">
                <Sparkles className="w-5 h-5 text-gnana-teal shrink-0" />
                <span>Direct consultation with core software architects</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gnana-text">
                <CheckCircle2 className="w-5 h-5 text-gnana-green shrink-0" />
                <span>Transparent scoping, architecture & technical roadmap</span>
              </div>
            </div>
          </div>

          {/* Contact Form (7 columns) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl glass-panel p-8 border border-white/10 shadow-2xl relative overflow-hidden">
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-gnana-green/20 border border-gnana-green/40 flex items-center justify-center text-gnana-green mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Enquiry Received!</h3>
                  <p className="text-sm text-gnana-muted max-w-md mx-auto">
                    Thank you for reaching out to GnanaStack Technologies. Our engineering team has received your enquiry and will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-gnana-dark border border-white/10 text-xs font-mono text-gnana-cyan hover:bg-gnana-surface transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-gnana-muted tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-gnana-dark/80 border border-white/10 text-white placeholder-gnana-muted/50 focus:outline-none focus:border-gnana-cyan text-sm transition-colors"
                      />
                    </div>

                    {/* Company */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-gnana-muted tracking-wider">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Corp"
                        className="w-full px-4 py-3 rounded-xl bg-gnana-dark/80 border border-white/10 text-white placeholder-gnana-muted/50 focus:outline-none focus:border-gnana-cyan text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-gnana-muted tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-gnana-dark/80 border border-white/10 text-white placeholder-gnana-muted/50 focus:outline-none focus:border-gnana-cyan text-sm transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-gnana-muted tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 0000000000"
                        className="w-full px-4 py-3 rounded-xl bg-gnana-dark/80 border border-white/10 text-white placeholder-gnana-muted/50 focus:outline-none focus:border-gnana-cyan text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Project Type */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-gnana-muted tracking-wider">
                        Project Type *
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-gnana-dark/80 border border-white/10 text-white focus:outline-none focus:border-gnana-cyan text-sm transition-colors"
                      >
                        {projectTypes.map((type) => (
                          <option key={type} value={type} className="bg-gnana-dark text-white">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Budget Range */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-gnana-muted tracking-wider">
                        Budget Range (Optional)
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-gnana-dark/80 border border-white/10 text-white focus:outline-none focus:border-gnana-cyan text-sm transition-colors"
                      >
                        {budgetRanges.map((range) => (
                          <option key={range} value={range} className="bg-gnana-dark text-white">
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-gnana-muted tracking-wider">
                      Project Details / Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your vision, goals, key requirements, or technical constraints..."
                      className="w-full px-4 py-3 rounded-xl bg-gnana-dark/80 border border-white/10 text-white placeholder-gnana-muted/50 focus:outline-none focus:border-gnana-cyan text-sm transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <MagneticButton
                    type="submit"
                    variant="primary"
                    className="w-full py-4 text-base font-bold"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        Submitting Enquiry...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Project Enquiry
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </MagneticButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
