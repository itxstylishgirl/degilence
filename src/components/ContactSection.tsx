import React, { useState } from 'react';
import { Send, Mail, Clock, MapPin, CheckCircle, AlertCircle, Phone, MessageCircle } from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    service: initialService || 'AI Solutions & Marketing',
    budget: '$5,000 - $15,000',
    details: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const servicesList = [
    'AI Solutions & Marketing',
    'High-Converting Funnels',
    'Growth Automation',
    'Web Development',
    'Mobile App Development',
    'Custom Software Systems',
    'Other'
  ];

  const budgetTiers = [
    '< $5,000',
    '$5,000 - $15,000',
    '$15,000 - $30,000',
    '$30,000 - $50,000',
    '$50,000+'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.details.trim()) {
      setErrorMessage('Please describe your project requirements.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/project-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage('Thank you! Your inquiry has been received. Our team will contact you shortly.');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          companyName: '',
          service: 'AI Solutions & Marketing',
          budget: '$5,000 - $15,000',
          details: ''
        });
      } else {
        setErrorMessage(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setErrorMessage('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-[#130A1F] border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-[#C084FC] text-[10px] font-bold tracking-widest uppercase mb-4 w-fit mx-auto">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F4F8FB] tracking-tight">
            Let's Scale Your Business with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] via-[#A033FF] to-[#8B5CF6]">AI & Smart Funnels</span>
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Fill out the form below to reach out directly to our Lahore engineering team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Business Info & Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-glass-card rounded-[28px] p-8 border border-purple-500/30 backdrop-blur-xl shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6">Contact & Location</h3>
              
              <div className="space-y-6">
                
                {/* Office Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#C084FC]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Office Address</span>
                    <p className="text-sm font-bold text-white">F2 WAPDA Town, Lahore, Pakistan</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#C084FC]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Direct Email</span>
                    <a href="mailto:hello@digilenceai.com" className="text-sm font-bold text-white hover:text-[#C084FC] transition-colors">
                      hello@digilenceai.com
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#C084FC]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Business Hours</span>
                    <p className="text-sm font-bold text-white">Mon – Sat: 9:00 AM – 9:00 PM (PKT)</p>
                  </div>
                </div>

              </div>

              {/* Response Promise Banner */}
              <div className="mt-8 p-4 rounded-2xl bg-[#0D0614] border border-purple-500/30">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C084FC] mb-1">
                  <CheckCircle className="w-4 h-4 text-[#A033FF]" />
                  <span>Fast Turnaround Guarantee</span>
                </div>
                <p className="text-xs text-slate-400">
                  Every inquiry receives a personalized growth strategy consultation from our team in Lahore.
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT: Professional Form */}
          <div className="lg:col-span-7">
            <div className="bg-glass-card rounded-[32px] p-8 border border-purple-500/30 backdrop-blur-xl shadow-2xl">
              
              {successMessage ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/20 border border-[#A033FF] flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-[#C084FC]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Inquiry Received!</h3>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                    {successMessage}
                  </p>
                  <button
                    onClick={() => setSuccessMessage('')}
                    className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#8B5CF6] to-[#A033FF] cursor-pointer hover:brightness-110"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-xs text-red-200">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-[#1A0B2E] border border-purple-500/30 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#A033FF] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#1A0B2E] border border-purple-500/30 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#A033FF] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone / WhatsApp Number & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                        WhatsApp / Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="03143905772"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#1A0B2E] border border-purple-500/30 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#A033FF] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                        Company / Business Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your Business"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-[#1A0B2E] border border-purple-500/30 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#A033FF] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                        Service Interested In
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-[#1A0B2E] border border-purple-500/30 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#A033FF] transition-colors"
                      >
                        {servicesList.map((svc) => (
                          <option key={svc} value={svc} className="bg-[#130A1F] text-white">
                            {svc}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-[#1A0B2E] border border-purple-500/30 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#A033FF] transition-colors"
                      >
                        {budgetTiers.map((b) => (
                          <option key={b} value={b} className="bg-[#130A1F] text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Details */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Project Details & Requirements *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe your goals, AI funnel requirements, or project details..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full bg-[#1A0B2E] border border-purple-500/30 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#A033FF] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#8B5CF6] via-[#A033FF] to-[#C084FC] hover:brightness-110 shadow-lg shadow-purple-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting Inquiry...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Project Inquiry</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
