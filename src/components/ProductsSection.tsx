import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, BookOpen, Star, Users, Check, ArrowRight, Sparkles, X, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { DigitalProduct } from '../types';

interface ProductsSectionProps {
  onOpenStudentPortal?: () => void;
  onEnrollSuccess?: () => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onOpenStudentPortal, onEnrollSuccess }) => {
  const [products, setProducts] = useState<DigitalProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'All' | 'Courses' | 'Templates'>('All');

  // Enrollment Modal state
  const [selectedProduct, setSelectedProduct] = useState<DigitalProduct | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  // Form Fields
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenEnroll = (product: DigitalProduct) => {
    setSelectedProduct(product);
    setEnrollSuccess(false);
    setIsEnrollModalOpen(true);
  };

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail || !selectedProduct) {
      alert('Please fill in your name and email.');
      return;
    }

    setEnrolling(true);
    try {
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          email: studentEmail,
          phone: studentPhone,
          productId: selectedProduct.id
        })
      });

      const data = await res.json();
      if (data.success) {
        setEnrollSuccess(true);
        fetchProducts(); // Refresh enrollment counts
        if (onEnrollSuccess) onEnrollSuccess();
      } else {
        alert(data.error || 'Enrollment failed.');
      }
    } catch (err) {
      console.error('Enrollment error:', err);
      alert('An error occurred during enrollment.');
    } finally {
      setEnrolling(false);
    }
  };

  const filteredProducts = products.filter(p => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Courses') return p.isCourse;
    if (activeTab === 'Templates') return !p.isCourse;
    return true;
  });

  return (
    <section id="products" className="py-24 relative overflow-hidden bg-[#0D0614]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#C084FC] text-[10px] font-bold tracking-widest uppercase mb-4 shadow-sm mx-auto">
            <ShoppingBag className="w-4 h-4 text-[#A033FF]" />
            Products & Learning Hub
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F4F8FB] tracking-tight">
            Digital Products & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] via-[#A033FF] to-[#8B5CF6]">Masterclass Courses</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Get instant access to AI SaaS starter templates, production codebases, and masterclass courses.
          </p>

          {/* Filter Pills & Portal Trigger */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveTab('All')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'All'
                  ? 'bg-gradient-to-r from-[#8B5CF6] to-[#A033FF] text-white shadow-lg shadow-purple-600/30'
                  : 'bg-white/5 text-slate-300 hover:text-white border border-purple-500/20'
              }`}
            >
              All Offerings
            </button>
            <button
              onClick={() => setActiveTab('Courses')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'Courses'
                  ? 'bg-gradient-to-r from-[#8B5CF6] to-[#A033FF] text-white shadow-lg shadow-purple-600/30'
                  : 'bg-white/5 text-slate-300 hover:text-white border border-purple-500/20'
              }`}
            >
              Training Courses
            </button>
            <button
              onClick={() => setActiveTab('Templates')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'Templates'
                  ? 'bg-gradient-to-r from-[#8B5CF6] to-[#A033FF] text-white shadow-lg shadow-purple-600/30'
                  : 'bg-white/5 text-slate-300 hover:text-white border border-purple-500/20'
              }`}
            >
              AI Starter Templates
            </button>

            {onOpenStudentPortal && (
              <button
                onClick={onOpenStudentPortal}
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-200 hover:bg-purple-500/30 border border-purple-500/40 transition-all cursor-pointer flex items-center gap-1.5 ml-0 sm:ml-4"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#C084FC]" />
                <span>My Student Portal</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#19C6D1]/30 border-t-[#19C6D1] rounded-full animate-spin" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-[#AAB8C4] text-sm">No products or courses found under this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(prod => (
              <div
                key={prod.id}
                className="bg-[#0B1520]/90 backdrop-blur-xl border border-white/10 hover:border-[#19C6D1]/40 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between group hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <div>
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={prod.imageUrl}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1520] via-transparent to-transparent" />

                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md ${
                      prod.isCourse
                        ? 'bg-slate-700/90 text-white border border-slate-500/40'
                        : 'bg-cyan-500/80 text-[#101B26]'
                    }`}>
                      {prod.category}
                    </span>

                    <div className="absolute bottom-4 right-4 bg-[#0B1520]/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1 text-xs font-bold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {prod.rating.toFixed(1)}
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-[#19C6D1] transition-colors mb-2">
                      {prod.title}
                    </h3>

                    {/* Instructor / Duration for courses */}
                    {prod.isCourse && (
                      <p className="text-xs text-[#A9D8FF] mb-3 flex items-center gap-2 font-medium">
                        <span>Instructor: {prod.instructor}</span>
                        {prod.duration && <span>• {prod.duration}</span>}
                      </p>
                    )}

                    {/* Short Description */}
                    <p className="text-xs text-[#AAB8C4] mb-4 leading-relaxed line-clamp-2">
                      {prod.shortDescription}
                    </p>

                    {/* Key Features */}
                    {prod.features && prod.features.length > 0 && (
                      <div className="space-y-2 mb-6 border-t border-white/10 pt-4">
                        {prod.features.slice(0, 3).map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-[#F4F8FB]">
                            <Check className="w-3.5 h-3.5 text-[#19C6D1] shrink-0" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer with Price and CTA */}
                <div className="p-6 pt-0 border-t border-white/10 mt-auto">
                  <div className="flex items-center justify-between mb-4 pt-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">${prod.price}</span>
                      {prod.originalPrice > prod.price && (
                        <span className="text-xs text-gray-400 line-through">${prod.originalPrice}</span>
                      )}
                    </div>

                    <div className="text-[11px] text-[#AAB8C4] flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#19C6D1]" />
                      {prod.enrollmentsCount} {prod.isCourse ? 'Enrolled' : 'Purchased'}
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenEnroll(prod)}
                    className="w-full py-3.5 rounded-full bg-[#19C6D1] hover:bg-[#15b0ba] text-[#101B26] font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
                  >
                    <span>{prod.isCourse ? 'Enroll In Masterclass' : 'Get Product Access'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ENROLLMENT / PURCHASE MODAL */}
      {isEnrollModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#101B26] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl">
            <button
              onClick={() => setIsEnrollModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {enrollSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#19C6D1]/20 border border-[#19C6D1] text-[#19C6D1] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Enrollment Confirmed!</h3>
                <p className="text-sm text-[#AAB8C4] max-w-sm mx-auto mb-6">
                  You are now enrolled in <span className="text-white font-semibold">{selectedProduct.title}</span>. Instant access instructions have been sent to <span className="text-[#19C6D1] font-medium">{studentEmail}</span>.
                </p>
                <div className="flex flex-col gap-3">
                  {onOpenStudentPortal && (
                    <button
                      onClick={() => {
                        setIsEnrollModalOpen(false);
                        onOpenStudentPortal();
                      }}
                      className="px-6 py-3 rounded-full bg-[#4D8DFF] text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-600 transition-all cursor-pointer"
                    >
                      Open Student Portal
                    </button>
                  )}
                  <button
                    onClick={() => setIsEnrollModalOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6 border-b border-white/10 pb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-[#19C6D1] border border-[#19C6D1]/30">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">{selectedProduct.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-2xl font-extrabold text-[#19C6D1]">${selectedProduct.price}</span>
                    <span className="text-xs text-[#AAB8C4]">Instant Lifetime Access</span>
                  </div>
                </div>

                <form onSubmit={handleEnrollSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#AAB8C4] uppercase tracking-wider mb-1">
                      Student / Customer Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={studentName}
                      onChange={e => setStudentName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#19C6D1]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#AAB8C4] uppercase tracking-wider mb-1">
                      Email Address (For Access) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@gmail.com"
                      value={studentEmail}
                      onChange={e => setStudentEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#19C6D1]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#AAB8C4] uppercase tracking-wider mb-1">
                      WhatsApp / Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 333-4455"
                      value={studentPhone}
                      onChange={e => setStudentPhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#19C6D1]"
                    />
                  </div>

                  <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 text-[11px] text-[#AAB8C4] flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#19C6D1] shrink-0 mt-0.5" />
                    <span>Includes 100% money-back guarantee, full source code / course materials, and student portal credentials.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={enrolling}
                    className="w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-[#101B26] bg-[#19C6D1] hover:bg-[#15b0ba] shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {enrolling ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-[#101B26]/30 border-t-[#101B26] rounded-full animate-spin" />
                        Processing Enrollment...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Confirm Enrollment (${selectedProduct.price})</span>
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
