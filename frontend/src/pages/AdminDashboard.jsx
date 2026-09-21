import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Inbox,
  FolderKanban,
  Settings,
  Plus,
  Trash2,
  LogOut,
  RefreshCw,
  Save,
  Mail,
  Phone,
  MapPin,
  Upload,
  Image,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ListOrdered,
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/ui/Logo';

export const AdminDashboard = () => {
  const { user, token, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('enquiries');
  const [enquiries, setEnquiries] = useState([]);
  const [projects, setProjects] = useState([]);
  const [companyInfo, setCompanyInfo] = useState({
    email: 'gnanastacktechnologies@gmail.com',
    phone: '+91 6379250367',
    location: 'Salem, Tamil Nadu, India - 636117',
  });
  const [savingCompany, setSavingCompany] = useState(false);
  const [companyMsg, setCompanyMsg] = useState('');

  // New Project Form State
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    slug: '',
    category: 'Fleet Management',
    shortDescription: '',
    description: '',
    technologies: 'React, Node.js, Express, MongoDB',
    coverImage: '/assets/projects/gvehicle.png',
    problem: '',
    solution: '',
    status: 'Production Ready',
    order: '',
  });

  const [sortMode, setSortMode] = useState('custom'); // 'custom' | 'newest' | 'oldest'

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    fetchDashboardData();
  }, [isAuthenticated, navigate]);

  const fetchDashboardData = async () => {
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const [enqRes, projRes, compRes] = await Promise.all([
        axios.get('/api/contact', { headers }).catch(() => ({ data: { enquiries: [] } })),
        axios.get('/api/projects/admin/all', { headers }).catch(() => ({ data: { projects: [] } })),
        axios.get('/api/company').catch(() => ({ data: { company: null } })),
      ]);

      setEnquiries(enqRes.data.enquiries || []);
      setProjects(projRes.data.projects || []);
      if (compRes.data.company) {
        setCompanyInfo({
          email: compRes.data.company.email || 'gnanastacktechnologies@gmail.com',
          phone: compRes.data.company.phone || '+91 6379250367',
          location: compRes.data.company.location || 'Salem, Tamil Nadu, India - 636117',
        });
      }
    } catch (err) {
      console.warn('Dashboard fetch warning:', err);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.patch(
        `/api/contact/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDashboardData();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axios.delete(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDashboardData();
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newProject,
        technologies: newProject.technologies.split(',').map((t) => t.trim()),
        slug: newProject.slug || newProject.title.toLowerCase().replace(/\s+/g, '-'),
      };

      await axios.post('/api/projects', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowAddProjectModal(false);
      setNewProject({
        title: '',
        slug: '',
        category: 'Fleet Management',
        shortDescription: '',
        description: '',
        technologies: 'React, Node.js, Express, MongoDB',
        coverImage: '/assets/projects/gvehicle.png',
        problem: '',
        solution: '',
        status: 'Production Ready',
        order: '',
      });
      fetchDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create project');
    }
  };

  const handleMoveProject = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const updatedProjects = [...projects];
    const temp = updatedProjects[index];
    updatedProjects[index] = updatedProjects[targetIndex];
    updatedProjects[targetIndex] = temp;

    const projectOrders = updatedProjects.map((p, idx) => ({
      id: p._id,
      order: idx + 1,
    }));

    setProjects(updatedProjects.map((p, idx) => ({ ...p, order: idx + 1 })));

    try {
      await axios.put(
        '/api/projects/reorder',
        { projectOrders },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error('Reorder failed:', err);
      fetchDashboardData();
    }
  };

  const handleSaveProjectOrder = async (id, newOrderVal) => {
    const parsedOrder = parseInt(newOrderVal, 10);
    if (isNaN(parsedOrder)) return;

    try {
      await axios.put(
        `/api/projects/${id}`,
        { order: parsedOrder },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDashboardData();
    } catch (err) {
      alert('Failed to update project order');
    }
  };

  const handleSaveCompanyInfo = async (e) => {
    e.preventDefault();
    setSavingCompany(true);
    setCompanyMsg('');
    try {
      const res = await axios.put('/api/company', companyInfo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setCompanyMsg('Company contact information updated successfully!');
      }
    } catch (err) {
      setCompanyMsg('Failed to update company contact info.');
    } finally {
      setSavingCompany(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gnana-bg">
      {/* Top Admin Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="rounded-2xl glass-panel p-6 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo emblemOnly />
            <div>
              <h1 className="text-xl font-extrabold text-white">Admin CMS Control Tower</h1>
              <p className="text-xs text-gnana-muted font-mono">
                Authenticated as: <span className="text-gnana-cyan">{user?.email || 'Admin'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchDashboardData}
              className="p-2.5 rounded-xl bg-gnana-dark border border-white/10 text-gnana-muted hover:text-gnana-cyan transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-2 border-b border-white/10 mb-8">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'enquiries'
                ? 'border-gnana-cyan text-gnana-cyan'
                : 'border-transparent text-gnana-muted hover:text-white'
            }`}
          >
            <Inbox className="w-4 h-4" /> Client Enquiries ({enquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'border-gnana-cyan text-gnana-cyan'
                : 'border-transparent text-gnana-muted hover:text-white'
            }`}
          >
            <FolderKanban className="w-4 h-4" /> Manage Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('company')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'company'
                ? 'border-gnana-cyan text-gnana-cyan'
                : 'border-transparent text-gnana-muted hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" /> Company Contact Settings
          </button>
        </div>

        {/* TAB 1: CLIENT ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Project Enquiries & Pipeline Leads</h2>
            </div>

            {enquiries.length === 0 ? (
              <div className="p-12 text-center glass-panel rounded-2xl border border-white/10 text-gnana-muted">
                No project enquiries recorded yet.
              </div>
            ) : (
              <div className="space-y-4">
                {enquiries.map((enq) => (
                  <div
                    key={enq._id}
                    className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/10 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-white">{enq.name}</h3>
                          {enq.company && (
                            <span className="text-xs font-mono text-gnana-muted">({enq.company})</span>
                          )}
                        </div>
                        <div className="text-xs font-mono text-gnana-cyan pt-1">
                          {enq.email} • {enq.phone || 'No phone'}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-gnana-dark border border-white/10 text-gnana-teal">
                          {enq.projectType}
                        </span>
                        
                        {/* Status Select */}
                        <select
                          value={enq.status || 'new'}
                          onChange={(e) => handleUpdateStatus(enq._id, e.target.value)}
                          className="px-3 py-1 rounded-lg bg-gnana-dark border border-white/20 text-xs font-mono text-white focus:outline-none focus:border-gnana-cyan"
                        >
                          <option value="new">new</option>
                          <option value="contacted">contacted</option>
                          <option value="in-progress">in-progress</option>
                          <option value="completed">completed</option>
                          <option value="archived">archived</option>
                        </select>
                      </div>
                    </div>

                    <p className="text-sm text-gnana-muted leading-relaxed whitespace-pre-wrap">
                      {enq.message}
                    </p>

                    <div className="flex items-center justify-between text-xs font-mono text-gnana-muted pt-2">
                      <span>Budget: {enq.budget || 'Undisclosed'}</span>
                      <span>Submitted: {new Date(enq.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROJECT CMS */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FolderKanban className="w-5 h-5 text-gnana-cyan" /> Project CMS Catalog
                </h2>
                <p className="text-xs text-gnana-muted mt-1">
                  Arrange project display order to control appearance on the main website.
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Sort Mode Controls */}
                <div className="flex items-center gap-1 p-1 bg-gnana-dark/80 rounded-xl border border-white/10">
                  <button
                    onClick={() => setSortMode('custom')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
                      sortMode === 'custom'
                        ? 'bg-gnana-cyan/20 text-gnana-cyan border border-gnana-cyan/30'
                        : 'text-gnana-muted hover:text-white'
                    }`}
                  >
                    <ListOrdered className="w-3.5 h-3.5" /> Order #
                  </button>
                  <button
                    onClick={() => setSortMode('newest')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
                      sortMode === 'newest'
                        ? 'bg-gnana-cyan/20 text-gnana-cyan border border-gnana-cyan/30'
                        : 'text-gnana-muted hover:text-white'
                    }`}
                  >
                    Newest
                  </button>
                  <button
                    onClick={() => setSortMode('oldest')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
                      sortMode === 'oldest'
                        ? 'bg-gnana-cyan/20 text-gnana-cyan border border-gnana-cyan/30'
                        : 'text-gnana-muted hover:text-white'
                    }`}
                  >
                    Oldest
                  </button>
                </div>

                <button
                  onClick={() => setShowAddProjectModal(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-gnana-blue to-gnana-cyan text-black text-xs font-bold flex items-center gap-2 shadow-lg shadow-gnana-cyan/20 hover:shadow-gnana-cyan/40 transition-shadow"
                >
                  <Plus className="w-4 h-4" /> Add New Project
                </button>
              </div>
            </div>

            {/* Quick Instruction Banner */}
            <div className="p-3.5 rounded-xl bg-gnana-dark/60 border border-white/10 flex items-center justify-between gap-3 text-xs text-gnana-muted">
              <span className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-gnana-cyan" />
                <span>Use <strong>▲ Move Up</strong> &amp; <strong>▼ Move Down</strong> buttons or edit the <strong>Order #</strong> to arrange site display sequence.</span>
              </span>
              <span className="font-mono text-gnana-cyan">{projects.length} Total Projects</span>
            </div>

            {/* Project List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...projects]
                .sort((a, b) => {
                  if (sortMode === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
                  if (sortMode === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
                  return (a.order ?? 999) - (b.order ?? 999);
                })
                .map((proj, idx) => (
                  <div
                    key={proj._id}
                    className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4 flex flex-col justify-between relative group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {/* Order Number Badge */}
                          <span className="px-2.5 py-1 rounded-lg bg-gnana-cyan/10 border border-gnana-cyan/30 text-gnana-cyan text-xs font-mono font-bold">
                            Order #{proj.order ?? idx + 1}
                          </span>
                          <span className="text-xs font-mono text-gnana-muted">{proj.category}</span>
                        </div>
                        <span className="text-xs font-mono text-gnana-green px-2.5 py-0.5 rounded-full bg-gnana-green/10 border border-gnana-green/20">
                          {proj.status}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xl font-bold text-white">{proj.title}</h3>
                      </div>
                      <p className="text-xs text-gnana-muted line-clamp-2 leading-relaxed">{proj.shortDescription}</p>
                    </div>

                    <div className="pt-4 border-t border-white/10 space-y-3">
                      {/* Order Controls Bar */}
                      <div className="flex items-center justify-between bg-gnana-dark/80 p-2 rounded-xl border border-white/5">
                        <span className="text-xs font-mono text-gnana-muted pl-1">Order Sequence:</span>

                        <div className="flex items-center gap-2">
                          {/* Move Up / Down Buttons */}
                          <button
                            onClick={() => handleMoveProject(idx, 'up')}
                            disabled={idx === 0 || sortMode !== 'custom'}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-gnana-cyan/20 border border-white/10 text-gnana-cyan disabled:opacity-30 disabled:hover:bg-white/5 transition-colors"
                            title="Move Up in Order"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveProject(idx, 'down')}
                            disabled={idx === projects.length - 1 || sortMode !== 'custom'}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-gnana-cyan/20 border border-white/10 text-gnana-cyan disabled:opacity-30 disabled:hover:bg-white/5 transition-colors"
                            title="Move Down in Order"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>

                          {/* Editable Order Number Input */}
                          <div className="flex items-center gap-1 ml-1">
                            <input
                              type="number"
                              defaultValue={proj.order ?? idx + 1}
                              onBlur={(e) => handleSaveProjectOrder(proj._id, e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleSaveProjectOrder(proj._id, e.target.value);
                                }
                              }}
                              className="w-14 px-2 py-1 rounded-lg bg-black/60 border border-white/20 text-xs font-mono text-center text-white focus:outline-none focus:border-gnana-cyan"
                              title="Type order number & hit Enter"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Footer Info & Delete */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-mono text-gnana-muted">/projects/{proj.slug}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDeleteProject(proj._id)}
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs transition-colors flex items-center gap-1 font-mono"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 3: COMPANY CONTACT SETTINGS */}
        {activeTab === 'company' && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-xl font-bold text-white">Edit Company Contact Details</h2>

            {companyMsg && (
              <div className="p-4 rounded-xl bg-gnana-cyan/10 border border-gnana-cyan/30 text-gnana-cyan text-xs">
                {companyMsg}
              </div>
            )}

            <form onSubmit={handleSaveCompanyInfo} className="glass-panel p-8 rounded-2xl border border-white/10 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-gnana-muted tracking-wider flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gnana-cyan" /> Company Email Address
                </label>
                <input
                  type="email"
                  required
                  value={companyInfo.email}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                  placeholder="gnanastacktechnologies@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-gnana-dark border border-white/10 text-white text-sm focus:outline-none focus:border-gnana-cyan"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-gnana-muted tracking-wider flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gnana-teal" /> Mobile Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={companyInfo.phone}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                  placeholder="+91 6379250367"
                  className="w-full px-4 py-3 rounded-xl bg-gnana-dark border border-white/10 text-white text-sm focus:outline-none focus:border-gnana-cyan"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-gnana-muted tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gnana-green" /> Office Location / Address
                </label>
                <input
                  type="text"
                  required
                  value={companyInfo.location}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, location: e.target.value })}
                  placeholder="Salem, Tamil Nadu, India - 636117"
                  className="w-full px-4 py-3 rounded-xl bg-gnana-dark border border-white/10 text-white text-sm focus:outline-none focus:border-gnana-cyan"
                />
              </div>

              <button
                type="submit"
                disabled={savingCompany}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gnana-blue via-gnana-cyan to-gnana-teal text-black text-sm font-bold shadow-lg shadow-gnana-cyan/20 hover:shadow-gnana-cyan/40 transition-shadow flex items-center justify-center gap-2"
              >
                {savingCompany ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Save Contact Details
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl rounded-3xl glass-panel p-8 border border-white/10 space-y-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white">Create New Project Case Study</h2>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-gnana-muted">Project Title</label>
                <input
                  type="text"
                  required
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="e.g. GVehicle Platform"
                  className="w-full px-4 py-2.5 rounded-xl bg-gnana-dark border border-white/10 text-white text-sm focus:outline-none focus:border-gnana-cyan"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-gnana-muted">Category</label>
                <input
                  type="text"
                  required
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gnana-dark border border-white/10 text-white text-sm focus:outline-none focus:border-gnana-cyan"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-gnana-muted">Short Summary</label>
                <input
                  type="text"
                  required
                  value={newProject.shortDescription}
                  onChange={(e) => setNewProject({ ...newProject, shortDescription: e.target.value })}
                  placeholder="One sentence overview..."
                  className="w-full px-4 py-2.5 rounded-xl bg-gnana-dark border border-white/10 text-white text-sm focus:outline-none focus:border-gnana-cyan"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-gnana-muted">Full Description</label>
                <textarea
                  rows={3}
                  required
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gnana-dark border border-white/10 text-white text-sm focus:outline-none focus:border-gnana-cyan"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-gnana-muted mb-1 block">Project Logo / Cover Image</label>
                <div className="space-y-3">
                  {/* File Upload Input */}
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-gnana-dark border border-gnana-cyan/40 hover:border-gnana-cyan text-gnana-cyan text-xs font-mono font-semibold flex items-center gap-2 transition-colors">
                      <Upload className="w-4 h-4 text-gnana-cyan" />
                      <span>Upload Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setNewProject({ ...newProject, coverImage: reader.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    <span className="text-xs text-gnana-muted">or paste URL below</span>
                  </div>

                  {/* Manual URL Input */}
                  <input
                    type="text"
                    value={newProject.coverImage}
                    onChange={(e) => setNewProject({ ...newProject, coverImage: e.target.value })}
                    placeholder="/assets/projects/gvehicle.png or https://..."
                    className="w-full px-4 py-2.5 rounded-xl bg-gnana-dark border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-gnana-cyan"
                  />

                  {/* Image Live Preview */}
                  {newProject.coverImage && (
                    <div className="p-3 rounded-2xl bg-gnana-dark/80 border border-white/10 flex items-center gap-4">
                      <img
                        src={newProject.coverImage}
                        alt="Project Preview"
                        className="w-20 h-14 object-contain rounded-lg bg-black/40 p-1 border border-white/10"
                      />
                      <div className="text-xs space-y-1">
                        <div className="font-semibold text-gnana-cyan flex items-center gap-1.5">
                          <Image className="w-3.5 h-3.5" /> Image Selected & Ready
                        </div>
                        <div className="text-gnana-muted text-[11px]">Will display in full view across project grids</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-gnana-muted flex items-center justify-between">
                  <span>Technologies (comma separated)</span>
                </label>
                <input
                  type="text"
                  value={newProject.technologies}
                  onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gnana-dark border border-white/10 text-white text-sm focus:outline-none focus:border-gnana-cyan"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-gnana-muted flex items-center justify-between mb-1">
                  <span>Display Order Sequence</span>
                  <span className="text-gnana-cyan text-[11px] font-normal">(1 = top of project list)</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={newProject.order}
                  onChange={(e) => setNewProject({ ...newProject, order: e.target.value })}
                  placeholder="Leave empty to auto-assign at end"
                  className="w-full px-4 py-2.5 rounded-xl bg-gnana-dark border border-white/10 text-white text-sm focus:outline-none focus:border-gnana-cyan font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-gnana-dark border border-white/10 text-xs font-mono text-gnana-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gnana-blue to-gnana-cyan text-black text-xs font-bold shadow-lg shadow-gnana-cyan/20 hover:shadow-gnana-cyan/40 transition-shadow"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
