import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { SoftwareHouseSlider } from './components/SoftwareHouseSlider';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { ServicesSection } from './components/ServicesSection';
import { AISolutionsSection } from './components/AISolutionsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProcessSection } from './components/ProcessSection';
import { PortfolioSection } from './components/PortfolioSection';
import { JobsSection } from './components/JobsSection';
import { ProductsSection } from './components/ProductsSection';
import { TechStackSection } from './components/TechStackSection';
import { StatsSection } from './components/StatsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutSection } from './components/AboutSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTASection } from './components/FinalCTASection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AIEstimatorModal } from './components/AIEstimatorModal';
import { AdminDashboard } from './components/AdminDashboard';
import { StudentPortalModal } from './components/StudentPortalModal';
import { BubblesAnimation } from './components/BubblesAnimation';
import { WhatsAppWidget } from './components/WhatsAppWidget';

import { INITIAL_SERVICES, INITIAL_PORTFOLIO, INITIAL_TESTIMONIALS } from './data/initialData';
import { ServiceItem, PortfolioProject, Testimonial, AIEstimateResponse } from './types';

// Reusable reveal on scroll wrapper for Framer Motion
const SectionReveal: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 35 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>(INITIAL_PORTFOLIO);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isStudentPortalOpen, setIsStudentPortalOpen] = useState(false);
  const [selectedServiceForForm, setSelectedServiceForForm] = useState('AI Solutions & Marketing');

  useEffect(() => {
    // Fetch live data from backend server
    const fetchLiveData = async () => {
      try {
        const [resSvc, resPort, resTest] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/portfolio'),
          fetch('/api/testimonials')
        ]);

        if (resSvc.ok) {
          const dataSvc = await resSvc.json();
          if (dataSvc.services) setServices(dataSvc.services);
        }
        if (resPort.ok) {
          const dataPort = await resPort.json();
          if (dataPort.portfolio) setPortfolio(dataPort.portfolio);
        }
        if (resTest.ok) {
          const dataTest = await resTest.json();
          if (dataTest.testimonials) setTestimonials(dataTest.testimonials);
        }
      } catch (err) {
        console.log('Using local client seed data:', err);
      }
    };

    fetchLiveData();
  }, []);

  const handleOpenProjectForm = (serviceTitle?: string) => {
    if (serviceTitle) {
      setSelectedServiceForForm(serviceTitle);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyEstimateToForm = (estimate: AIEstimateResponse, serviceType: string) => {
    setSelectedServiceForForm(serviceType);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToJobs = () => {
    const jobsElem = document.getElementById('jobs');
    if (jobsElem) {
      jobsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0614] text-[#F4F8FB] font-['Plus_Jakarta_Sans',sans-serif] relative selection:bg-[#A033FF]/30 selection:text-[#C084FC]">
      
      {/* Background Animated Floating Bubbles */}
      <BubblesAnimation />

      {/* Floating WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Navbar */}
      <Navbar
        onOpenProjectForm={() => handleOpenProjectForm()}
        onOpenEstimator={() => setIsEstimatorOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenStudentPortal={() => setIsStudentPortalOpen(true)}
      />

      {/* Software House Breadcrumb Image Slider */}
      <SectionReveal>
        <SoftwareHouseSlider onOpenProjectForm={() => handleOpenProjectForm()} />
      </SectionReveal>

      {/* Hero */}
      <SectionReveal>
        <Hero
          onOpenProjectForm={() => handleOpenProjectForm()}
          onOpenEstimator={() => setIsEstimatorOpen(true)}
        />
      </SectionReveal>

      {/* Services Section */}
      <SectionReveal>
        <ServicesSection
          services={services}
          onOpenProjectForm={handleOpenProjectForm}
        />
      </SectionReveal>

      {/* Why Choose Us */}
      <SectionReveal>
        <WhyChooseUs />
      </SectionReveal>

      {/* Portfolio Showcase */}
      <SectionReveal>
        <PortfolioSection
          portfolio={portfolio}
          onOpenProjectForm={handleOpenProjectForm}
        />
      </SectionReveal>

      {/* Jobs & Student Internships Section */}
      <SectionReveal>
        <JobsSection />
      </SectionReveal>

      {/* Digital Products & Training Courses Section */}
      <SectionReveal>
        <ProductsSection
          onOpenStudentPortal={() => setIsStudentPortalOpen(true)}
        />
      </SectionReveal>

      {/* Client Testimonials */}
      <SectionReveal>
        <TestimonialsSection testimonials={testimonials} />
      </SectionReveal>

      {/* FAQ Accordion */}
      <SectionReveal>
        <FAQSection />
      </SectionReveal>

      {/* Contact & Inquiry Form */}
      <SectionReveal>
        <ContactSection initialService={selectedServiceForForm} />
      </SectionReveal>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <AIEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        onApplyEstimateToForm={handleApplyEstimateToForm}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      <StudentPortalModal
        isOpen={isStudentPortalOpen}
        onClose={() => setIsStudentPortalOpen(false)}
        onOpenJobs={handleScrollToJobs}
      />

    </div>
  );
}
