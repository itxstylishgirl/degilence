import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Briefcase, GraduationCap, MapPin, DollarSign, Clock, ArrowRight, CheckCircle2, Sparkles, Send, X, FileText, Globe } from 'lucide-react';
import { JobPosting } from '../types';

interface JobsSectionProps {
  onApplySuccess?: () => void;
}

export const JobsSection: React.FC<JobsSectionProps> = ({ onApplySuccess }) => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'All' | 'Internship' | 'Full-Time' | 'Remote'>('All');
  
  // Application Modal state
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    universityOrCompany: '',
    portfolioOrGithub: '',
    resumeSummary: '',
    coverNote: ''
  });

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      if (data.jobs) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error('Failed to load jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOpenApply = (job: JobPosting) => {
    setSelectedJob(job);
    setApplySuccess(false);
    setIsApplyModalOpen(true);
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.applicantName || !formData.email || !formData.resumeSummary) {
      alert('Please fill in required fields (Name, Email, Resume details).');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: selectedJob?.id || 'general',
          jobTitle: selectedJob?.title || 'General Internship Application',
          type: selectedJob?.type.includes('Internship') ? 'Internship' : 'Job',
          ...formData
        })
      });

      const data = await res.json();
      if (data.success) {
        setApplySuccess(true);
        if (onApplySuccess) onApplySuccess();
      } else {
        alert(data.error || 'Failed to submit application.');
      }
    } catch (err) {
      console.error('Application submit error:', err);
      alert('An error occurred while submitting your application.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredJobs = jobs.filter(j => {
    if (filter === 'All') return true;
    if (filter === 'Internship') return j.type.toLowerCase().includes('internship');
    if (filter === 'Full-Time') return j.type === 'Full-Time';
    if (filter === 'Remote') return j.location.toLowerCase().includes('remote') || j.type.toLowerCase().includes('remote');
    return true;
  });

  return (
    <section id="jobs" className="py-24 relative overflow-hidden bg-[#0D0614]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#C084FC] text-[10px] font-bold tracking-widest uppercase mb-4 shadow-sm">
            <GraduationCap className="w-4 h-4 text-[#A033FF]" />
            Careers & Student Internships
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F4F8FB] tracking-tight">
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] via-[#A033FF] to-[#8B5CF6]">Engineering & AI Team</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Whether you are a student seeking an internship or a senior engineer looking to build state-of-the-art AI systems, explore our open positions.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {(['All', 'Internship', 'Full-Time', 'Remote'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filter === tab
                    ? 'bg-gradient-to-r from-[#8B5CF6] to-[#A033FF] text-white shadow-lg shadow-purple-600/30'
                    : 'bg-white/5 text-slate-300 hover:text-white border border-purple-500/20 hover:border-purple-500/40'
                }`}
              >
                {tab === 'Internship' ? 'Student Internships' : tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-purple-500/30 border-t-[#C084FC] rounded-full animate-spin" />
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-purple-950/20 rounded-2xl border border-purple-500/20">
            <p className="text-slate-300 text-sm">No positions currently available under this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, idx) => {
              const isInternship = job.type.toLowerCase().includes('intern');
              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="bg-[#130A1F]/90 backdrop-blur-xl border border-purple-500/20 hover:border-purple-400/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-purple-900/30"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        isInternship
                          ? 'bg-purple-500/20 text-[#C084FC] border border-purple-500/40'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}>
                        {job.type}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#C084FC]" />
                        {job.location}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white group-hover:text-[#C084FC] transition-colors mb-2">
                      {job.title}
                    </h3>

                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-medium mb-4">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-[#C084FC]" />
                        {job.stipendOrSalary}
                      </div>
                      {job.duration && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {job.duration}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Key Requirements List */}
                    {job.requirements && job.requirements.length > 0 && (
                      <div className="mb-6 space-y-1.5 border-t border-purple-500/20 pt-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Key Requirements:</p>
                        {job.requirements.slice(0, 3).map((req, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[11px] text-[#F4F8FB]">
                            <CheckCircle2 className="w-3 h-3 text-[#C084FC] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{req}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Apply Button */}
                  <button
                    onClick={() => handleOpenApply(job)}
                    className="w-full mt-2 py-3 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#A033FF] text-white border border-purple-500/30 hover:border-purple-400 font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-purple-600/30"
                  >
                    <span>{isInternship ? 'Apply For Internship' : 'Apply For Position'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* APPLICATION MODAL */}
      {isApplyModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#130A1F] border border-purple-500/30 rounded-3xl p-6 sm:p-8 max-w-xl w-full relative shadow-2xl my-8">
            <button
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {applySuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-purple-500/20 border border-[#C084FC] text-[#C084FC] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Application Submitted!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                  Thank you for applying for <span className="text-white font-semibold">{selectedJob.title}</span>. Our recruitment team will review your application and contact you via email shortly.
                </p>
                <button
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A033FF] text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6 border-b border-purple-500/20 pb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-[#C084FC] border border-purple-500/30">
                    {selectedJob.type} Application
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">{selectedJob.title}</h3>
                  <p className="text-xs text-slate-300 mt-1">{selectedJob.location} • {selectedJob.stipendOrSalary}</p>
                </div>

                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.applicantName}
                      onChange={e => setFormData({ ...formData, applicantName: e.target.value })}
                      className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C084FC]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="sarah@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C084FC]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-1122"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C084FC]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        University / Institution
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. MIT / NUST University"
                        value={formData.universityOrCompany}
                        onChange={e => setFormData({ ...formData, universityOrCompany: e.target.value })}
                        className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C084FC]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        GitHub / Portfolio Link
                      </label>
                      <input
                        type="url"
                        placeholder="https://github.com/username"
                        value={formData.portfolioOrGithub}
                        onChange={e => setFormData({ ...formData, portfolioOrGithub: e.target.value })}
                        className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C084FC]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Resume Summary & Technical Skills *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Summarize your tech stack, programming experience, key projects, or paste your resume text..."
                      value={formData.resumeSummary}
                      onChange={e => setFormData({ ...formData, resumeSummary: e.target.value })}
                      className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C084FC]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Why Digilence AI? (Cover Note)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Briefly state why you'd like to join our software house..."
                      value={formData.coverNote}
                      onChange={e => setFormData({ ...formData, coverNote: e.target.value })}
                      className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C084FC]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#8B5CF6] to-[#A033FF] hover:brightness-110 shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting Application...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
