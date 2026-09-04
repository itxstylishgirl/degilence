import React, { useState } from 'react';
import { X, Sparkles, Cpu, Clock, DollarSign, CheckCircle2, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { AIEstimateResponse } from '../types';

interface AIEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyEstimateToForm: (estimate: AIEstimateResponse, serviceType: string) => void;
}

export const AIEstimatorModal: React.FC<AIEstimatorModalProps> = ({
  isOpen,
  onClose,
  onApplyEstimateToForm
}) => {
  const [serviceType, setServiceType] = useState('Artificial Intelligence Solutions');
  const [targetPlatform, setTargetPlatform] = useState('Web & Mobile');
  const [projectScope, setProjectScope] = useState('');
  const [selectedAiFeatures, setSelectedAiFeatures] = useState<string[]>([
    'Custom LLM & RAG',
    'AI Chatbot Agent'
  ]);
  const [timeline, setTimeline] = useState('Standard (4 - 8 weeks)');

  const [loading, setLoading] = useState(false);
  const [estimateResult, setEstimateResult] = useState<AIEstimateResponse | null>(null);

  if (!isOpen) return null;

  const aiFeaturesList = [
    'Custom LLM & RAG',
    'AI Chatbot Agent',
    'Automated ETL Data Pipelines',
    'Predictive Analytics',
    'Computer Vision / OCR',
    'Multi-agent Workflow'
  ];

  const toggleFeature = (feat: string) => {
    if (selectedAiFeatures.includes(feat)) {
      setSelectedAiFeatures(selectedAiFeatures.filter(f => f !== feat));
    } else {
      setSelectedAiFeatures([...selectedAiFeatures, feat]);
    }
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/ai/estimator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType,
          projectScope: projectScope || 'Standard custom digital product with high scalability.',
          aiFeatures: selectedAiFeatures,
          targetPlatform,
          timeline
        })
      });

      const data = await res.json();
      if (res.ok && data.estimate) {
        setEstimateResult(data.estimate);
      }
    } catch (err) {
      console.error('Estimate error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#172633] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#19C6D1] to-slate-400 p-0.5 flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-[#0B1520] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#19C6D1]" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">AI Project Scope & Cost Estimator</h3>
              <p className="text-xs text-[#AAB8C4]">Instant architectural recommendations & budget tier analysis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/05 hover:bg-white/10 text-[#AAB8C4] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {!estimateResult ? (
          <form onSubmit={handleCalculate} className="space-y-6">
            
            {/* Service & Platform */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#AAB8C4] mb-2">
                  Primary Service Needed
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-[#0B1520] border border-white/12 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-[#19C6D1]"
                >
                  <option value="Artificial Intelligence Solutions">Artificial Intelligence Solutions</option>
                  <option value="Custom Software Development">Custom Software Development</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Business Automation">Business Automation</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#AAB8C4] mb-2">
                  Target Platform
                </label>
                <select
                  value={targetPlatform}
                  onChange={(e) => setTargetPlatform(e.target.value)}
                  className="w-full bg-[#0B1520] border border-white/12 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-[#19C6D1]"
                >
                  <option value="Web Application (Desktop & Mobile)">Web Application (Desktop & Mobile)</option>
                  <option value="Mobile Native App (iOS & Android)">Mobile Native App (iOS & Android)</option>
                  <option value="Web & Mobile Cross-Platform">Web & Mobile Cross-Platform</option>
                  <option value="Enterprise On-Premise / Backend API">Enterprise On-Premise / Backend API</option>
                </select>
              </div>
            </div>

            {/* AI Capabilities to Include */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#AAB8C4] mb-2">
                Select AI Features & Integrations
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {aiFeaturesList.map((feat) => {
                  const isSel = selectedAiFeatures.includes(feat);
                  return (
                    <button
                      type="button"
                      key={feat}
                      onClick={() => toggleFeature(feat)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                        isSel
                          ? 'bg-[#19C6D1]/20 border-[#19C6D1] text-white'
                          : 'bg-[#0B1520] border-white/10 text-[#AAB8C4] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Zap className={`w-3 h-3 ${isSel ? 'text-[#19C6D1]' : 'text-gray-500'}`} />
                        <span>{feat}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Project Scope Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#AAB8C4] mb-2">
                Brief Scope & Core Goal
              </label>
              <textarea
                rows={3}
                placeholder="e.g., We want an automated document processing engine for our financial audit team..."
                value={projectScope}
                onChange={(e) => setProjectScope(e.target.value)}
                className="w-full bg-[#0B1520] border border-white/12 rounded-xl p-3 text-xs text-white placeholder-[#AAB8C4]/60 focus:outline-none focus:border-[#19C6D1] resize-none"
              />
            </div>

            {/* Target Timeline */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#AAB8C4] mb-2">
                Target Timeline
              </label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full bg-[#0B1520] border border-white/12 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-[#19C6D1]"
              >
                <option value="Rapid MVP (< 4 weeks)">Rapid MVP (&lt; 4 weeks)</option>
                <option value="Standard (4 - 8 weeks)">Standard (4 - 8 weeks)</option>
                <option value="Enterprise Solution (8 - 16 weeks)">Enterprise Solution (8 - 16 weeks)</option>
              </select>
            </div>

            {/* Calculate Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-[#101B26] bg-[#19C6D1] hover:bg-[#15b0ba] shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#101B26]" />
                  Analyzing Scope with AI...
                </span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#101B26]" />
                  <span>Generate Architecture & Estimate</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Estimate Results Display */
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#0B1520] border border-[#19C6D1]/30">
                <div className="flex items-center gap-2 text-xs text-[#AAB8C4] mb-1">
                  <Clock className="w-4 h-4 text-[#19C6D1]" />
                  <span>Estimated Engineering Time</span>
                </div>
                <div className="text-xl font-extrabold text-[#19C6D1]">
                  {estimateResult.estimatedHours}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0B1520] border border-slate-500/30">
                <div className="flex items-center gap-2 text-xs text-[#AAB8C4] mb-1">
                  <DollarSign className="w-4 h-4 text-slate-300" />
                  <span>Suggested Budget Tier</span>
                </div>
                <div className="text-xl font-extrabold text-slate-200">
                  {estimateResult.suggestedBudgetTier}
                </div>
              </div>
            </div>

            {/* Recommended Architecture */}
            <div className="p-4 rounded-2xl bg-[#0B1520]/80 border border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#19C6D1] mb-2">
                Recommended System Architecture
              </h4>
              <p className="text-xs text-white leading-relaxed">
                {estimateResult.recommendedArchitecture}
              </p>
            </div>

            {/* AI Integration Advice */}
            <div className="p-4 rounded-2xl bg-[#19C6D1]/10 border border-[#19C6D1]/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#19C6D1]" />
                AI Optimization Strategy
              </h4>
              <p className="text-xs text-[#F4F8FB]">
                {estimateResult.aiIntegrationAdvice}
              </p>
            </div>

            {/* Key Deliverables */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#AAB8C4] mb-3">
                Included Deliverables
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {estimateResult.keyDeliverables.map((deliv, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-white/03 border border-white/08 text-xs text-white">
                    <CheckCircle2 className="w-4 h-4 text-[#19C6D1] shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => setEstimateResult(null)}
                className="text-xs font-semibold text-[#AAB8C4] hover:text-white underline"
              >
                Recalculate Estimate
              </button>

              <button
                onClick={() => {
                  onApplyEstimateToForm(estimateResult, serviceType);
                  onClose();
                }}
                className="px-6 py-3 rounded-full text-xs font-bold text-[#101B26] bg-[#19C6D1] hover:bg-[#15b0ba] shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Submit as Project Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
