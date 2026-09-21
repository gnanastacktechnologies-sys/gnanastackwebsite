import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight, ArrowLeft, Eye, EyeOff, Globe } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/ui/Logo';
import { PageTransition } from '../components/layout/PageTransition';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await axios.post('/api/auth/login', { email, password });
      if (res.data.success) {
        login(res.data.token, res.data.user);
        navigate('/admin/dashboard');
      } else {
        setErrorMsg(res.data.message || 'Invalid credentials');
      }
    } catch (err) {
      // Fallback for demonstration admin login if server API is operating in offline mode
      if (email === 'gnanastacktechnologies@gmail.com' && password === 'Gnana@123') {
        login('fallback_admin_token', {
          id: 'default_admin',
          name: 'GnanaStack Admin',
          email: 'gnanastacktechnologies@gmail.com',
          role: 'admin',
        });
        navigate('/admin/dashboard');
        return;
      }
      setErrorMsg(err.response?.data?.message || 'Server authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-gnana-bg bg-grid-pattern px-4">
        <div className="w-full max-w-md rounded-3xl glass-panel p-8 border border-white/10 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <Logo className="justify-center" />
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-gnana-cyan">
              ADMINISTRATOR PORTAL
            </div>
            <h1 className="text-2xl font-extrabold text-white">Sign In to CMS Control</h1>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-gnana-muted uppercase tracking-wider">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gnana-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gnanastack.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gnana-dark border border-white/10 text-white placeholder-gnana-muted/50 text-sm focus:outline-none focus:border-gnana-cyan"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-gnana-muted uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gnana-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-gnana-dark border border-white/10 text-white placeholder-gnana-muted/50 text-sm focus:outline-none focus:border-gnana-cyan"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gnana-muted hover:text-gnana-cyan focus:outline-none transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gnana-blue via-gnana-cyan to-gnana-teal text-black text-sm font-bold shadow-lg shadow-gnana-cyan/20 hover:shadow-gnana-cyan/40 transition-shadow flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Authenticate Admin Session <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Link back to home website */}
          <div className="pt-4 border-t border-white/10 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-gnana-cyan hover:text-gnana-teal transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Main Website</span>
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
