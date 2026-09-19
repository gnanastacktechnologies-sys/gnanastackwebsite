import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import axios from 'axios';
import { Logo } from '../ui/Logo';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [company, setCompany] = useState({
    email: 'gnanastacktechnologies@gmail.com',
    phone: '+91 6379250367',
    location: 'Salem, Tamil Nadu, India - 636117',
  });

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const res = await axios.get('/api/company');
        if (res.data.success && res.data.company) {
          setCompany(res.data.company);
        }
      } catch (err) {
        console.warn('Using default company info');
      }
    };
    fetchCompanyInfo();
  }, []);

  return (
    <footer className="relative bg-[#05070A] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background radial glow */}
      <div className="gradient-orb w-96 h-96 top-0 right-1/4 bg-gnana-blue/20" />
      <div className="gradient-orb w-96 h-96 bottom-0 left-1/4 bg-gnana-cyan/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (2 Columns on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo withTagline />
            <p className="text-gnana-muted text-sm leading-relaxed max-w-sm">
              From Village Vision to Digital Innovation. We transform real-world ideas into modern digital products, intelligent systems, and scalable technology solutions.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gnana-dark border border-white/10 flex items-center justify-center text-gnana-muted hover:text-gnana-cyan hover:border-gnana-cyan/40 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gnana-dark border border-white/10 flex items-center justify-center text-gnana-muted hover:text-gnana-teal hover:border-gnana-teal/40 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-gnana-cyan mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-gnana-muted hover:text-gnana-text transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gnana-muted hover:text-gnana-text transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/projects" className="text-gnana-muted hover:text-gnana-text transition-colors">Our Projects</Link>
              </li>
              <li>
                <Link to="/services" className="text-gnana-muted hover:text-gnana-text transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/innovations" className="text-gnana-muted hover:text-gnana-text transition-colors">Innovations</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gnana-muted hover:text-gnana-text transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-gnana-teal mb-4">What We Build</h4>
            <ul className="space-y-2.5 text-sm text-gnana-muted">
              <li>Web Application Platforms</li>
              <li>Mobile Applications</li>
              <li>Custom Enterprise Software</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-gnana-green mb-4">Get In Touch</h4>
            <ul className="space-y-3 text-sm text-gnana-muted">
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-gnana-cyan mt-1 shrink-0" />
                <a href={`mailto:${company.email}`} className="hover:text-gnana-text transition-colors break-all">
                  {company.email}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-gnana-teal mt-1 shrink-0" />
                <a href={`tel:${company.phone}`} className="hover:text-gnana-text transition-colors">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gnana-green mt-1 shrink-0" />
                <span>{company.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gnana-muted space-y-4 sm:space-y-0">
          <p>© {currentYear} GnanaStack Technologies. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/admin/login" className="hover:text-gnana-cyan transition-colors flex items-center gap-1">
              Admin Access <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
