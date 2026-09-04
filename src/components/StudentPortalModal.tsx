import React, { useState } from 'react';
import { X, BookOpen, GraduationCap, CheckCircle2, Download, ExternalLink, Search, Sparkles, UserCheck, PlayCircle, ShieldCheck } from 'lucide-react';
import { Enrollment } from '../types';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenJobs?: () => void;
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({ isOpen, onClose, onOpenJobs }) => {
  const [emailInput, setEmailInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [enrollments, setEnrollments] = useState<Enrollment[] | null>(null);
  const [activeTab, setActiveTab] = useState<'Courses' | 'Resources'>('Courses');

  if (!isOpen) return null;

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/enrollments?email=${encodeURIComponent(emailInput)}`);
      const data = await res.json();
      setEnrollments(data.enrollments || []);
    } catch (err) {
      console.error('Lookup failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#101B26] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-2xl w-full relative shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
          <div className="w-10 h-10 rounded-xl bg-[#19C6D1] flex items-center justify-center text-[#101B26] shadow-lg shadow-cyan-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">Student & Customer Portal</h3>
            <p className="text-xs text-[#AAB8C4]">Access your enrolled courses, products, and internship programs</p>
          </div>
        </div>

        {/* Email Lookup form if not loaded */}
        {enrollments === null ? (
          <div className="py-8 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-[#19C6D1]/30 text-[#19C6D1] flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Login To Your Student Account</h4>
            <p className="text-xs text-[#AAB8C4] mb-6">
              Enter the email address you used when enrolling in a course or purchasing a digital product.
            </p>

            <form onSubmit={handleLookup} className="space-y-4">
              <input
                type="email"
                required
                placeholder="Enter your student email..."
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#19C6D1]"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-[#101B26] bg-[#19C6D1] hover:bg-[#15b0ba] shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#101B26]/30 border-t-[#101B26] rounded-full animate-spin" />
                    Accessing Dashboard...
                  </span>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>View My Enrollments</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#AAB8C4]">
              <span>Demo Account Email:</span>
              <button
                type="button"
                onClick={() => setEmailInput('ali.hassan@gmail.com')}
                className="text-[#19C6D1] underline cursor-pointer hover:text-white"
              >
                ali.hassan@gmail.com
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Student Logged In Bar */}
            <div className="flex flex-wrap items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/10 mb-6 gap-2">
              <div className="flex items-center gap-2 text-xs text-white">
                <span className="w-2 h-2 rounded-full bg-[#19C6D1] animate-pulse" />
                <span>Logged in as: <strong className="text-[#19C6D1]">{emailInput}</strong></span>
              </div>
              <button
                onClick={() => setEnrollments(null)}
                className="text-[10px] uppercase font-bold text-[#AAB8C4] hover:text-white underline cursor-pointer"
              >
                Switch Account
              </button>
            </div>

            {/* Portal Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 mb-6 pb-2">
              <button
                onClick={() => setActiveTab('Courses')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'Courses'
                    ? 'bg-[#19C6D1] text-[#101B26]'
                    : 'text-[#AAB8C4] hover:text-white'
                }`}
              >
                Enrolled Offerings ({enrollments.length})
              </button>
              <button
                onClick={() => setActiveTab('Resources')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'Resources'
                    ? 'bg-[#19C6D1] text-[#101B26]'
                    : 'text-[#AAB8C4] hover:text-white'
                }`}
              >
                Student Resources & Mentorship
              </button>
            </div>

            {/* Tab 1: Enrolled Courses */}
            {activeTab === 'Courses' && (
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                {enrollments.length === 0 ? (
                  <div className="text-center py-8 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-sm text-[#AAB8C4] mb-4">No active course enrollments found for this email.</p>
                    {onOpenJobs && (
                      <button
                        onClick={() => {
                          onClose();
                          onOpenJobs();
                        }}
                        className="px-5 py-2.5 rounded-full bg-[#19C6D1] text-[#101B26] font-bold text-xs uppercase tracking-wider"
                      >
                        Explore Internships & Courses
                      </button>
                    )}
                  </div>
                ) : (
                  enrollments.map(enr => (
                    <div
                      key={enr.id}
                      className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-cyan-500/20 text-[#19C6D1] border border-[#19C6D1]/30">
                          {enr.productCategory}
                        </span>
                        <h4 className="text-sm font-bold text-white mt-1">{enr.productTitle}</h4>
                        <p className="text-[11px] text-[#AAB8C4] mt-0.5">
                          Enrolled on: {new Date(enr.enrolledAt).toLocaleDateString()} • Status: <span className="text-green-400 font-semibold">{enr.paymentStatus}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => alert(`Launching Student Learning Portal & Video Lessons for "${enr.productTitle}"...`)}
                          className="px-4 py-2 rounded-xl bg-[#19C6D1] hover:bg-[#15b0ba] text-[#101B26] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-sm w-full sm:w-auto"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          <span>Start Learning</span>
                        </button>
                        <button
                          onClick={() => alert(`Downloading Certificate & Source Code Materials for "${enr.productTitle}"...`)}
                          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                          title="Download Materials & Certificate"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 2: Resources & Mentorship */}
            {activeTab === 'Resources' && (
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-[#19C6D1] font-bold text-sm mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>AI Engineering Career Roadmap 2026</span>
                  </div>
                  <p className="text-xs text-[#AAB8C4] mb-3 leading-relaxed">
                    Access Degenlience AI's internal curriculum for building RAG systems, model fine-tuning, and full-stack agent orchestration.
                  </p>
                  <button
                    onClick={() => alert('Accessing AI Engineering Roadmap Guide PDF...')}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Roadmap Guide</span>
                  </button>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-slate-300 font-bold text-sm mb-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>Student Internship Program</span>
                  </div>
                  <p className="text-xs text-[#AAB8C4] mb-3 leading-relaxed">
                    Active students can apply for 3-month remote or hybrid software house internships with senior engineer mentorship.
                  </p>
                  {onOpenJobs && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenJobs();
                      }}
                      className="px-4 py-2 rounded-full bg-[#19C6D1] text-[#101B26] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Browse Open Internships</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
