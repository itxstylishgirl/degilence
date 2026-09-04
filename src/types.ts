export interface LeadInquiry {
  id: string;
  type: 'contact' | 'project';
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  service: string;
  budget?: string;
  details: string;
  status: 'New' | 'Contacted' | 'In Review' | 'Closed' | 'Spam';
  createdAt: string;
  estimatedScope?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'AI & Automation' | 'Web Applications' | 'Mobile Apps' | 'Enterprise Systems';
  description: string;
  longDescription?: string;
  metrics: string[];
  technologies: string[];
  imageUrl: string;
  client: string;
  featured: boolean;
  architectureDetails?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  avatarUrl: string;
  quote: string;
  rating: number;
  projectType: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  features: string[];
  technologies: string[];
}

export interface AIEstimateRequest {
  serviceType: string;
  projectScope: string;
  aiFeatures: string[];
  targetPlatform: string;
  timeline: string;
}

export interface AIEstimateResponse {
  recommendedArchitecture: string;
  estimatedHours: string;
  suggestedBudgetTier: string;
  keyDeliverables: string[];
  aiIntegrationAdvice: string;
}

// Jobs & Internships
export interface JobPosting {
  id: string;
  title: string;
  type: 'Full-Time' | 'Part-Time' | 'Internship' | 'Remote Internship' | 'Contract';
  category: 'Engineering' | 'AI & Data Science' | 'UI/UX Design' | 'Marketing' | 'Business Development';
  location: string;
  stipendOrSalary: string;
  duration?: string; // For internships e.g. "3 Months"
  description: string;
  requirements: string[];
  perks: string[];
  isFeatured: boolean;
  isOpen: boolean;
  createdAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  type: 'Job' | 'Internship';
  applicantName: string;
  email: string;
  phone: string;
  universityOrCompany: string;
  portfolioOrGithub: string;
  resumeSummary: string;
  coverNote: string;
  status: 'Pending' | 'Under Review' | 'Shortlisted' | 'Accepted' | 'Rejected';
  createdAt: string;
}

// Digital Products & Courses
export interface DigitalProduct {
  id: string;
  title: string;
  category: 'AI Tool' | 'SaaS Template' | 'Training Course' | 'Digital Asset' | 'Bootcamp';
  price: number;
  originalPrice: number;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  rating: number;
  enrollmentsCount: number;
  isCourse: boolean;
  duration?: string; // e.g. "6 Weeks"
  instructor?: string;
  imageUrl: string;
  isPublished: boolean;
  createdAt: string;
}

export interface Enrollment {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  productId: string;
  productTitle: string;
  productCategory: string;
  amountPaid: number;
  paymentStatus: 'Completed' | 'Pending';
  accessGranted: boolean;
  enrolledAt: string;
}
