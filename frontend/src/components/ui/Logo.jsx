import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ withTagline = false, className = '', emblemOnly = false }) => {
  return (
    <Link to="/" className={`inline-flex items-center gap-3 group focus:outline-none ${className}`}>
      {emblemOnly ? (
        <div className="w-9 h-9 rounded-lg overflow-hidden border border-white/10 p-0.5 bg-gnana-dark group-hover:border-gnana-cyan/50 transition-all duration-300">
          <img src="/assets/logo.png" alt="GnanaStack Logo Emblem" className="w-full h-full object-contain" />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <img
            src={withTagline ? "/assets/logo-tagline.png" : "/assets/logo.png"}
            alt="GnanaStack Technologies Logo"
            className="h-9 w-auto object-contain group-hover:opacity-90 transition-opacity"
          />
        </div>
      )}
    </Link>
  );
};
