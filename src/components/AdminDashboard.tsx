import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Mail, Trash2, CheckCircle2, Lock, Filter, RefreshCw, Plus, FolderKanban, Star, LogOut, Download, Briefcase, GraduationCap, ShoppingBag, Users, Check } from 'lucide-react';
import { LeadInquiry, PortfolioProject, Testimonial, JobPosting, JobApplication, DigitalProduct, Enrollment } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('degen_admin_token'));
  const [loginEmail, setLoginEmail] = useState('admin@degenlience.ai');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'leads' | 'jobs' | 'products' | 'portfolio' | 'testimonials'>('leads');
  
  // Data States
  const [leads, setLeads] = useState<LeadInquiry[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [products, setProducts] = useState<DigitalProduct[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Job add form state
  const [showAddJob, setShowAddJob] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    type: 'Internship' as const,
    category: 'Engineering' as const,
    location: 'Remote',
    stipendOrSalary: '$1,500 / Month Stipend',
    duration: '3 Months',
    description: '',
    requirements: '',
    perks: ''
  });

  // Product add form state
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: 'Training Course' as const,
    price: 49,
    originalPrice: 149,
    shortDescription: '',
    fullDescription: '',
    features: '',
    isCourse: true,
    duration: '6 Weeks',
    instructor: 'Degenlience AI Team',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
  });

  // Portfolio add form state
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'AI & Automation' as const,
    description: '',
    client: '',
    metrics: ['+25% Growth'],
    technologies: ['React', 'TypeScript', 'Node.js'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
  });

  // Testimonial add form state
  const [showAddTestimonial, setShowAddTestimonial] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    clientName: '',
    role: '',
    company: '',
    quote: '',
    rating: 5,
    projectType: 'AI & Custom Software',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  });

  const fetchAllAdminData = async () => {
    setLoading(true);
    try {
      const [leadsRes, jobsRes, appsRes, prodsRes, enrRes] = await Promise.all([
        fetch('/api/admin/leads'),
        fetch('/api/jobs'),
        fetch('/api/admin/applications'),
        fetch('/api/products'),
        fetch('/api/enrollments')
      ]);

      const [leadsData, jobsData, appsData, prodsData, enrData] = await Promise.all([
        leadsRes.json(),
        jobsRes.json(),
        appsRes.json(),
        prodsRes.json(),
        enrRes.json()
      ]);

      if (leadsData.leads) setLeads(leadsData.leads);
      if (jobsData.jobs) setJobs(jobsData.jobs);
      if (appsData.applications) setApplications(appsData.applications);
      if (prodsData.products) setProducts(prodsData.products);
      if (enrData.enrollments) setEnrollments(enrData.enrollments);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && isOpen) {
      fetchAllAdminData();
    }
  }, [token, isOpen]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        localStorage.setItem('degen_admin_token', data.token);
      } else {
        setLoginError(data.error || 'Invalid admin credentials');
      }
    } catch (err) {
      setLoginError('Authentication server error');
    }
  };

  const updateLeadStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) fetchAllAdminData();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const updateApplicationStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) fetchAllAdminData();
    } catch (err) {
      console.error('Error updating app status:', err);
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
      if (res.ok) fetchAllAdminData();
    } catch (err) {
      console.error('Error deleting lead:', err);
    }
  };

  const deleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to remove this job posting?')) return;
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
      if (res.ok) fetchAllAdminData();
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) fetchAllAdminData();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const handleAddJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob)
      });
      if (res.ok) {
        alert('Job / Internship posted successfully!');
        setShowAddJob(false);
        fetchAllAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (res.ok) {
        alert('Product / Course published successfully!');
        setShowAddProduct(false);
        fetchAllAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });
      if (res.ok) {
        alert('Project added to portfolio!');
        setShowAddProject(false);
        fetchAllAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTestimonial)
      });
      if (res.ok) {
        alert('Testimonial added!');
        setShowAddTestimonial(false);
        fetchAllAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-5xl bg-[#101B26] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#19C6D1] to-slate-400 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-[#0B1520] rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#19C6D1]" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Degenlience Admin Control Center
                <span className="text-[10px] bg-[#19C6D1]/20 text-[#19C6D1] px-2 py-0.5 rounded-full border border-[#19C6D1]/30">
                  FULL SYSTEM
                </span>
              </h3>
              <p className="text-xs text-[#AAB8C4]">Manage Inquiries, Internships, Courses, and Digital Products</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {token && (
              <button
                onClick={() => {
                  setToken(null);
                  localStorage.removeItem('degen_admin_token');
                }}
                className="p-2 rounded-xl bg-white/05 hover:bg-red-500/20 text-[#AAB8C4] hover:text-red-300 transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/05 hover:bg-white/10 text-[#AAB8C4] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* LOGIN SCREEN */}
        {!token ? (
          <div className="max-w-md mx-auto py-12 text-center space-y-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#0B1520] border border-white/12 flex items-center justify-center shadow-xl">
              <Lock className="w-7 h-7 text-[#19C6D1]" />
            </div>
            <h4 className="text-2xl font-bold text-white">Administrator Sign In</h4>
            <p className="text-xs text-[#AAB8C4]">
              Access full control for jobs, student applications, product offerings, and project leads.
            </p>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              {loginError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#AAB8C4] uppercase mb-1">Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-[#0B1520] border border-white/12 rounded-xl py-2.5 px-3.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#AAB8C4] uppercase mb-1">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-[#0B1520] border border-white/12 rounded-xl py-2.5 px-3.5 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-[#101B26] bg-[#19C6D1] hover:bg-[#15b0ba] shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                Sign In to Admin Portal
              </button>

              <div className="p-3 rounded-xl bg-white/03 border border-white/08 text-center text-[11px] text-[#A9D8FF]">
                <strong>Preset Credentials:</strong> admin@degenlience.ai / admin123
              </div>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN PANEL */
          <div className="space-y-6">
            
            {/* Nav Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'leads' ? 'bg-[#19C6D1] text-[#101B26]' : 'bg-white/5 text-[#AAB8C4] hover:text-white'
                  }`}
                >
                  Leads ({leads.length})
                </button>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'jobs' ? 'bg-[#19C6D1] text-[#101B26]' : 'bg-white/5 text-[#AAB8C4] hover:text-white'
                  }`}
                >
                  Jobs & Applicants ({applications.length})
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'products' ? 'bg-[#19C6D1] text-[#101B26]' : 'bg-white/5 text-[#AAB8C4] hover:text-white'
                  }`}
                >
                  Products & Enrollments ({enrollments.length})
                </button>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'portfolio' ? 'bg-[#19C6D1] text-[#101B26]' : 'bg-white/5 text-[#AAB8C4] hover:text-white'
                  }`}
                >
                  Portfolio
                </button>
              </div>

              <button
                onClick={fetchAllAdminData}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#AAB8C4] hover:text-white transition-colors cursor-pointer"
                title="Refresh All Data"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* LEADS TAB */}
            {activeTab === 'leads' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Client Inquiries & Project Requests</h4>
                </div>

                {leads.length === 0 ? (
                  <p className="text-xs text-[#AAB8C4]">No leads found.</p>
                ) : (
                  <div className="space-y-3">
                    {leads.map((lead) => (
                      <div key={lead.id} className="bg-[#0B1520] border border-white/10 rounded-2xl p-4 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <span className="font-bold text-sm text-white">{lead.fullName}</span>
                            <span className="text-xs text-[#19C6D1] ml-2">({lead.email})</span>
                          </div>
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            className="bg-[#101B26] border border-white/12 rounded-lg px-2.5 py-1 text-xs text-white"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Review">In Review</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </div>
                        <p className="text-xs text-[#AAB8C4]">{lead.details}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* JOBS & APPLICANTS TAB */}
            {activeTab === 'jobs' && (
              <div className="space-y-6">
                
                {/* Section A: Post Job */}
                <div className="bg-[#0B1520] p-5 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-[#19C6D1]" />
                        Manage Job & Internship Postings
                      </h4>
                      <p className="text-xs text-[#AAB8C4]">Post new internship or job openings for students and engineers</p>
                    </div>
                    <button
                      onClick={() => setShowAddJob(!showAddJob)}
                      className="px-4 py-2 rounded-xl bg-[#19C6D1] text-[#101B26] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> {showAddJob ? 'Cancel' : 'Post New Opening'}
                    </button>
                  </div>

                  {showAddJob && (
                    <form onSubmit={handleAddJobSubmit} className="space-y-3 pt-3 border-t border-white/10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Job Title (e.g. AI Research Intern)"
                          value={newJob.title}
                          onChange={e => setNewJob({ ...newJob, title: e.target.value })}
                          className="bg-[#101B26] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                        />
                        <select
                          value={newJob.type}
                          onChange={e => setNewJob({ ...newJob, type: e.target.value as any })}
                          className="bg-[#101B26] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                        >
                          <option value="Internship">Student Internship</option>
                          <option value="Remote Internship">Remote Internship</option>
                          <option value="Full-Time">Full-Time</option>
                          <option value="Part-Time">Part-Time</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Stipend / Salary (e.g. $1,500/Mo)"
                          value={newJob.stipendOrSalary}
                          onChange={e => setNewJob({ ...newJob, stipendOrSalary: e.target.value })}
                          className="bg-[#101B26] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Location (e.g. Remote / Hybrid)"
                          value={newJob.location}
                          onChange={e => setNewJob({ ...newJob, location: e.target.value })}
                          className="bg-[#101B26] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Duration (e.g. 3 Months)"
                          value={newJob.duration}
                          onChange={e => setNewJob({ ...newJob, duration: e.target.value })}
                          className="bg-[#101B26] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>

                      <textarea
                        required
                        rows={2}
                        placeholder="Role Description..."
                        value={newJob.description}
                        onChange={e => setNewJob({ ...newJob, description: e.target.value })}
                        className="w-full bg-[#101B26] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                      />

                      <textarea
                        rows={2}
                        placeholder="Requirements (one per line)..."
                        value={newJob.requirements}
                        onChange={e => setNewJob({ ...newJob, requirements: e.target.value })}
                        className="w-full bg-[#101B26] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                      />

                      <button type="submit" className="px-5 py-2.5 rounded-full bg-[#19C6D1] text-[#101B26] font-bold text-xs uppercase tracking-wider cursor-pointer">
                        Publish Job Posting
                      </button>
                    </form>
                  )}

                  {/* Existing Job Postings List */}
                  <div className="mt-4 space-y-2">
                    {jobs.map(j => (
                      <div key={j.id} className="p-3 bg-[#101B26] rounded-xl border border-white/05 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-white">{j.title}</span>
                          <span className="text-[#19C6D1] ml-2">({j.type})</span>
                        </div>
                        <button onClick={() => deleteJob(j.id)} className="text-red-400 hover:text-red-300 p-1 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section B: Applicants List */}
                <div className="bg-[#0B1520] p-5 rounded-2xl border border-white/10">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#4D8DFF]" />
                    Student & Job Applications Received ({applications.length})
                  </h4>

                  {applications.length === 0 ? (
                    <p className="text-xs text-[#AAB8C4]">No job or internship applications received yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {applications.map(appItem => (
                        <div key={appItem.id} className="bg-[#101B26] p-4 rounded-xl border border-white/10 space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <span className="font-bold text-sm text-white">{appItem.applicantName}</span>
                              <span className="text-xs text-[#19C6D1] ml-2">({appItem.email})</span>
                              {appItem.universityOrCompany && (
                                <span className="text-xs text-[#AAB8C4] ml-2">• {appItem.universityOrCompany}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] uppercase font-bold text-[#A9D8FF] px-2 py-0.5 bg-cyan-500/10 rounded">
                                {appItem.jobTitle}
                              </span>
                              <select
                                value={appItem.status}
                                onChange={e => updateApplicationStatus(appItem.id, e.target.value)}
                                className="bg-[#0B1520] border border-white/12 rounded-lg px-2 py-1 text-xs text-white"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Shortlisted">Shortlisted</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </div>
                          </div>

                          <p className="text-xs text-[#AAB8C4] bg-[#0B1520] p-2.5 rounded-lg border border-white/05">
                            <strong>Resume Summary:</strong> {appItem.resumeSummary}
                          </p>

                          {appItem.portfolioOrGithub && (
                            <div className="text-xs text-[#19C6D1]">
                              Portfolio/GitHub: <a href={appItem.portfolioOrGithub} target="_blank" rel="noreferrer" className="underline">{appItem.portfolioOrGithub}</a>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* PRODUCTS & ENROLLMENTS TAB */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                
                {/* Section A: Post Product */}
                <div className="bg-[#0B1520] p-5 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-[#19C6D1]" />
                        Manage Products & Courses
                      </h4>
                      <p className="text-xs text-[#AAB8C4]">Publish SaaS templates, digital tools, and student training bootcamps</p>
                    </div>
                    <button
                      onClick={() => setShowAddProduct(!showAddProduct)}
                      className="px-4 py-2 rounded-xl bg-[#19C6D1] text-[#101B26] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> {showAddProduct ? 'Cancel' : 'Publish New Offering'}
                    </button>
                  </div>

                  {showAddProduct && (
                    <form onSubmit={handleAddProductSubmit} className="space-y-3 pt-3 border-t border-white/10">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Title (e.g. AI Agent Masterclass)"
                          value={newProduct.title}
                          onChange={e => setNewProduct({ ...newProduct, title: e.target.value })}
                          className="bg-[#101B26] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                        />
                        <input
                          type="number"
                          required
                          placeholder="Price ($)"
                          value={newProduct.price}
                          onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                          className="bg-[#101B26] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                        />
                        <select
                          value={newProduct.isCourse ? 'Course' : 'Product'}
                          onChange={e => setNewProduct({ ...newProduct, isCourse: e.target.value === 'Course' })}
                          className="bg-[#101B26] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                        >
                          <option value="Course">Training Course / Bootcamp</option>
                          <option value="Product">Digital SaaS / Template</option>
                        </select>
                      </div>

                      <textarea
                        required
                        rows={2}
                        placeholder="Short Description..."
                        value={newProduct.shortDescription}
                        onChange={e => setNewProduct({ ...newProduct, shortDescription: e.target.value })}
                        className="w-full bg-[#101B26] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                      />

                      <button type="submit" className="px-5 py-2.5 rounded-full bg-[#19C6D1] text-[#101B26] font-bold text-xs uppercase tracking-wider cursor-pointer">
                        Publish Product / Course
                      </button>
                    </form>
                  )}

                  {/* Existing Products List */}
                  <div className="mt-4 space-y-2">
                    {products.map(p => (
                      <div key={p.id} className="p-3 bg-[#101B26] rounded-xl border border-white/05 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-white">{p.title}</span>
                          <span className="text-[#19C6D1] ml-2">(${p.price})</span>
                          <span className="text-[#AAB8C4] ml-2">• {p.enrollmentsCount} Enrolled</span>
                        </div>
                        <button onClick={() => deleteProduct(p.id)} className="text-red-400 hover:text-red-300 p-1 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section B: Enrollments List */}
                <div className="bg-[#0B1520] p-5 rounded-2xl border border-white/10">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#19C6D1]" />
                    Student & Customer Enrollments ({enrollments.length})
                  </h4>

                  {enrollments.length === 0 ? (
                    <p className="text-xs text-[#AAB8C4]">No course enrollments recorded yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {enrollments.map(enr => (
                        <div key={enr.id} className="bg-[#101B26] p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-white">{enr.studentName}</span>
                            <span className="text-[#19C6D1] ml-2">({enr.email})</span>
                            <span className="text-gray-400 ml-2">enrolled in</span>
                            <span className="font-semibold text-white ml-1">"{enr.productTitle}"</span>
                          </div>
                          <span className="text-green-400 font-bold">${enr.amountPaid} Paid</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* PORTFOLIO TAB */}
            {activeTab === 'portfolio' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Portfolio Case Studies</h4>
                  <button
                    onClick={() => setShowAddProject(!showAddProject)}
                    className="px-4 py-2 rounded-xl bg-[#19C6D1] text-[#101B26] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Case Study
                  </button>
                </div>

                {showAddProject && (
                  <form onSubmit={handleAddProjectSubmit} className="bg-[#0B1520] p-4 rounded-2xl border border-white/12 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Project Title"
                        required
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="bg-[#101B26] border border-white/12 rounded-xl p-2.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Client Name"
                        required
                        value={newProject.client}
                        onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                        className="bg-[#101B26] border border-white/12 rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>
                    <textarea
                      placeholder="Short Description"
                      required
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="w-full bg-[#101B26] border border-white/12 rounded-xl p-2.5 text-xs text-white"
                    />
                    <button type="submit" className="px-4 py-2 rounded-xl bg-[#19C6D1] text-[#101B26] text-xs font-bold uppercase tracking-wider cursor-pointer">
                      Save Case Study
                    </button>
                  </form>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
