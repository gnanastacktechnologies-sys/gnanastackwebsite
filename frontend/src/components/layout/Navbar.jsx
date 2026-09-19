import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { MagneticButton } from '../ui/MagneticButton';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu sidebar drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'Innovations', path: '/innovations' },
    { name: 'Technologies', path: '/#technologies' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path.startsWith('/#')) {
      return location.hash === path.substring(1);
    }
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-gnana-bg/85 backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1 glass-panel px-4 py-1.5 rounded-full border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full ${
                  isActive(link.path)
                    ? 'text-gnana-cyan'
                    : 'text-gnana-muted hover:text-gnana-text'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-gnana-blue via-gnana-cyan to-gnana-teal rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/contact">
              <MagneticButton variant="primary">
                Start a Project
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-gnana-dark border border-white/10 text-gnana-muted hover:text-gnana-cyan focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay & Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[70px] bottom-0 z-50 lg:hidden bg-black/60 backdrop-blur-sm flex flex-col justify-start">
          <div className="bg-gnana-dark/95 backdrop-blur-2xl border-b border-white/10 px-6 pt-4 pb-8 space-y-3 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-gnana-cyan mb-2">
              NAVIGATION MENU
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-gnana-cyan/10 text-gnana-cyan border border-gnana-cyan/20'
                    : 'text-gnana-muted hover:text-gnana-text hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-white/10">
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                <MagneticButton variant="primary" className="w-full justify-center">
                  Start a Project
                  <ArrowUpRight className="w-4 h-4" />
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
