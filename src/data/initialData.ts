import { ServiceItem, PortfolioProject, Testimonial, JobPosting, DigitalProduct } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'ai-solutions',
    title: 'Artificial Intelligence Solutions',
    shortDescription: 'Custom AI systems, intelligent applications, machine learning integrations, and business-focused AI solutions.',
    fullDescription: 'We build proprietary generative AI models, custom LLM fine-tuning, computer vision pipelines, and intelligent AI agents customized specifically to automate core enterprise workflows and elevate decision intelligence.',
    iconName: 'Cpu',
    features: [
      'Custom LLM Fine-tuning & RAG Systems',
      'AI Chatbots & Multi-agent Systems',
      'Predictive Analytics & Machine Learning',
      'Computer Vision & OCR Automation'
    ],
    technologies: ['OpenAI API', 'PyTorch', 'LangChain', 'Python', 'FastAPI', 'Vector DBs']
  },
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    shortDescription: 'Secure, scalable, and tailored software built around your unique business requirements.',
    fullDescription: 'From mission-critical internal ERP systems to high-throughput SaaS platforms, our engineering team crafts resilient software architectures designed for high reliability, enterprise security, and effortless scaling.',
    iconName: 'Code2',
    features: [
      'Microservices & Event-Driven Architecture',
      'Enterprise SaaS Platforms',
      'Legacy System Modernization',
      'API Design & Cloud Integrations'
    ],
    technologies: ['TypeScript', 'Node.js', 'Go', 'PostgreSQL', 'Docker', 'Kubernetes']
  },
  {
    id: 'web-development',
    title: 'Web Development',
    shortDescription: 'Modern, fast, responsive, and high-performing websites and web applications.',
    fullDescription: 'We design and engineer lightning-fast digital web experiences leveraging Next.js, React, and modern Jamstack principles. Built with conversion science, flawless responsive design, and SEO-first standards.',
    iconName: 'Globe',
    features: [
      'Full-stack Next.js & React Applications',
      'High-conversion Landing Pages & Marketing Portals',
      'Headless E-commerce Solutions',
      'Real-time Collaborative Dashboards'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'GraphQL', 'Vite', 'WebSockets']
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    shortDescription: 'Beautiful and powerful mobile applications for Android and iOS platforms.',
    fullDescription: 'Native-feel cross-platform mobile apps for iOS and Android. Built with React Native or Flutter, optimized for fluid 60fps animations, offline resilience, and seamless push notifications.',
    iconName: 'Smartphone',
    features: [
      'iOS & Android Cross-Platform Apps',
      'Biometric Security & Wallet Integrations',
      'Offline-First Data Syncing',
      'App Store Optimization & Deployment'
    ],
    technologies: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase']
  },
  {
    id: 'business-automation',
    title: 'Business Automation',
    shortDescription: 'Automate repetitive workflows and connect your business systems with intelligent automation.',
    fullDescription: 'Eliminate human bottlenecks with automated ETL data pipelines, webhook connectors, intelligent document processing, and AI robotic process automation (RPA) tailored to your operational tools.',
    iconName: 'Zap',
    features: [
      'End-to-End Workflow Automation',
      'CRM & ERP Data Synchronization',
      'Automated Financial & Invoice Processing',
      'Custom Webhook & API Connectors'
    ],
    technologies: ['Python', 'Zapier', 'n8n', 'Make', 'REST APIs', 'Celery']
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    shortDescription: 'User-focused digital experiences with modern interfaces and conversion-driven design.',
    fullDescription: 'Human-centered UI/UX design crafted with interactive visual systems, detailed wireframes, aesthetic glassmorphism UI elements, micro-interactions, and conversion rate optimization at the forefront.',
    iconName: 'Layout',
    features: [
      'Interactive Design Systems & Figma Libraries',
      'User Research & Usability Testing',
      'High-Fidelity Wireframing & Prototyping',
      'Conversion Rate Optimization (CRO)'
    ],
    technologies: ['Figma', 'Framer', 'Protopie', 'Tailwind CSS', 'Design Tokens']
  }
];

export const INITIAL_PORTFOLIO: PortfolioProject[] = [
  {
    id: 'project-1',
    title: 'AI Business Automation Platform',
    category: 'AI & Automation',
    description: 'An enterprise multi-agent workflow system that processes 50,000+ daily operational tasks with 99.4% automated precision.',
    longDescription: 'Engineered for a global logistics firm, this platform uses autonomous AI agents to ingest invoices, verify customs documents, route support inquiries, and automatically dispatch real-time shipping updates to stakeholders.',
    metrics: ['+340% Efficiency', '50k+ Daily Tasks', '99.4% Accuracy'],
    technologies: ['Python', 'OpenAI GPT-4', 'FastAPI', 'React', 'PostgreSQL', 'Redis'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    client: 'Apex Global Logistics',
    featured: true,
    architectureDetails: 'Event-driven microservices architecture hosted on Cloud Run with PostgreSQL read-replicas, vector embeddings in Qdrant, and real-time client updates via WebSockets.'
  },
  {
    id: 'project-2',
    title: 'Modern E-Commerce Platform',
    category: 'Web Applications',
    description: 'A headless e-commerce store with AI product recommendations, sub-second page loads, and dynamic personalization.',
    longDescription: 'Created for a luxury tech brand, this full-stack web application increased checkout conversions by 48% through real-time vector recommendation engine, dynamic pricing previews, and instant multi-currency settlement.',
    metrics: ['+48% Conversion Rate', '<0.4s Page Load', '$12M Revenue Processed'],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe API', 'GraphQL', 'Vercel'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    client: 'Aetheria Luxury Goods',
    featured: true,
    architectureDetails: 'Jamstack web deployment with edge middleware routing, cached GraphQL API layer, and integrated Stripe Connect for automated multi-vendor payouts.'
  },
  {
    id: 'project-3',
    title: 'Smart Business Management System',
    category: 'Enterprise Systems',
    description: 'A cloud-based ERP and resource management system featuring predictive inventory forecasting and real-time financial tracking.',
    longDescription: 'Replaced 4 fragmented legacy software tools with a unified intelligent dashboard. Includes automated payroll calculation, smart inventory alerting, team performance analytics, and executive AI summary generation.',
    metrics: ['4 Tools Unified', '85% Time Saved on Reporting', '100% Data Sync'],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Docker', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    client: 'Vanguard Industrial Group',
    featured: true,
    architectureDetails: 'Containerized Node.js backend running on Cloud Run, backed by MongoDB Atlas cluster with automated audit logging and role-based access control.'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Marcus Vance',
    role: 'Chief Technology Officer',
    company: 'FinPulse Systems',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    quote: 'Degenlience AI transformed our core backend with their custom AI automation pipelines. Their engineering depth, speed of delivery, and glassmorphism UI polish exceeded our highest expectations.',
    rating: 5,
    projectType: 'AI & Custom Software'
  },
  {
    id: 'test-2',
    clientName: 'Elena Rostova',
    role: 'Founder & CEO',
    company: 'NovaHealth Digital',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    quote: 'Working with Degenlience AI was seamless from day one. They took our initial idea for an AI-powered telemedicine app and built an enterprise product that secured our Series A funding.',
    rating: 5,
    projectType: 'Mobile App & AI Integration'
  },
  {
    id: 'test-3',
    clientName: 'David Sterling',
    role: 'VP of Product',
    company: 'OmniGrowth Corp',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    quote: 'Their attention to detail, modern visual identity, and clean architecture are top tier. They delivered our new web platform two weeks ahead of schedule with zero post-launch bugs.',
    rating: 5,
    projectType: 'Web Development & UI/UX'
  }
];

export const INITIAL_JOBS: JobPosting[] = [
  {
    id: 'job-1',
    title: 'AI & Machine Learning Engineer Internship',
    type: 'Internship',
    category: 'AI & Data Science',
    location: 'Remote / Silicon Valley',
    stipendOrSalary: '$1,500 - $2,500 / Month Stipend',
    duration: '3 Months (Mentorship Included)',
    description: 'Work directly alongside our Lead AI Architects building custom RAG frameworks, fine-tuning LLMs, and deploying generative AI pipelines for enterprise clients.',
    requirements: [
      'Proficiency in Python, PyTorch / TensorFlow',
      'Familiarity with LangChain, LlamaIndex, or OpenAI APIs',
      'Basic knowledge of vector databases (Qdrant, Pinecone, pgvector)',
      'Undergraduate or Graduate student in CS/AI or equivalent experience'
    ],
    perks: ['1-on-1 Senior Mentorship', 'Certificate of Completion', 'Job Offer Potential Upon Completion', 'Flexible Hours'],
    isFeatured: true,
    isOpen: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'job-2',
    title: 'Full-Stack Software Engineer (React / Node.js / TypeScript)',
    type: 'Full-Time',
    category: 'Engineering',
    location: 'Hybrid / Remote',
    stipendOrSalary: '$80,000 - $120,000 / Year',
    description: 'Lead client web application development, craft high-performance Next.js architectures, and build modular REST/GraphQL APIs.',
    requirements: [
      '3+ years experience with React, TypeScript, and Node.js',
      'Strong expertise in Tailwind CSS, UI/UX design systems, and responsive layouts',
      'Experience with PostgreSQL, Redis, and Cloud Run / Docker containerization',
      'Solid understanding of state management and API design'
    ],
    perks: ['Competitive Salary & Stock Options', 'Remote Work Budget', 'Health Insurance', 'Annual Learning Allowance'],
    isFeatured: true,
    isOpen: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'job-3',
    title: 'UI/UX Design & Frontend Internship',
    type: 'Remote Internship',
    category: 'UI/UX Design',
    location: '100% Remote',
    stipendOrSalary: '$1,200 - $2,000 / Month Stipend',
    duration: '3 Months',
    description: 'Craft stunning glassmorphic UI interfaces, build design tokens in Figma, and implement interactive micro-animations with Tailwind and Framer Motion.',
    requirements: [
      'Portfolio showcasing modern, high-contrast web or mobile UI designs',
      'Proficiency in Figma and component libraries',
      'Basic HTML/CSS/Tailwind CSS knowledge is a plus',
      'Passionate about sleek, editorial aesthetic design'
    ],
    perks: ['Build Real Portfolio Projects', 'Direct Feedback from Creative Director', 'Remote Flexibility'],
    isFeatured: false,
    isOpen: true,
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_PRODUCTS: DigitalProduct[] = [
  {
    id: 'prod-1',
    title: 'Full-Stack Agentic AI Starter Kit',
    category: 'SaaS Template',
    price: 49,
    originalPrice: 149,
    shortDescription: 'Production-ready boilerplate for building multi-agent AI SaaS apps with React, Express, and OpenAI.',
    fullDescription: 'Accelerate your AI startup development by months. Includes built-in vector search, agent workflow engine, glassmorphic UI design system, Stripe checkout integration, and JWT authentication.',
    features: [
      'Complete React + Express + TypeScript codebase',
      'Built-in RAG & Vector database connectors',
      'Stripe payments & user subscription manager',
      'Full documentation & 1-click Cloud Run deployment'
    ],
    rating: 4.9,
    enrollmentsCount: 340,
    isCourse: false,
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    isPublished: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-2',
    title: 'Enterprise AI & Agentic Development Bootcamp',
    category: 'Training Course',
    price: 99,
    originalPrice: 299,
    shortDescription: 'Master building, fine-tuning, and deploying commercial AI agents from scratch in 6 intensive modules.',
    fullDescription: 'A practical, project-driven course designed for students and developers. Build 4 production-grade AI systems: an automated customer support agent, a document analyzer, an AI code auditor, and an autonomous web researcher.',
    features: [
      '6 Comprehensive Video Modules (24+ Hours)',
      'Hands-on Code Repositories & Exercises',
      'Direct Mentorship Discord Community Access',
      'Certificate of Masterclass Completion'
    ],
    rating: 5.0,
    enrollmentsCount: 820,
    isCourse: true,
    duration: '6 Weeks (Self-Paced)',
    instructor: 'Degenlience AI Engineering Team',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    isPublished: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-3',
    title: 'Glassmorphic UI Design System for Figma & Tailwind',
    category: 'Digital Asset',
    price: 29,
    originalPrice: 79,
    shortDescription: 'A premium UI kit featuring 120+ dark glassmorphism components, icons, and responsive layouts.',
    fullDescription: 'Craft futuristic web interfaces instantly. Includes pre-designed dashboard layouts, pricing tables, hero banners, custom form controls, and dark-theme Tailwind configuration file.',
    features: [
      '120+ Glassmorphic UI Components',
      'Full Figma Tokens & Component Variants',
      'Ready-to-use Tailwind CSS CSS config',
      'Lifetime Free Updates'
    ],
    rating: 4.8,
    enrollmentsCount: 510,
    isCourse: false,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    isPublished: true,
    createdAt: new Date().toISOString()
  }
];

export const TECH_STACK = {
  frontend: ['React', 'Next.js', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Motion'],
  backend: ['Node.js', 'Python', 'Express', 'Django', 'Laravel', 'REST APIs', 'GraphQL', 'FastAPI'],
  aiAndData: ['OpenAI APIs', 'Machine Learning', 'Python', 'Data Analytics', 'Automation Tools', 'LangChain', 'PyTorch'],
  mobile: ['Flutter', 'React Native', 'iOS Swift', 'Android Kotlin'],
  cloudAndDatabase: ['AWS', 'Firebase', 'MySQL', 'PostgreSQL', 'MongoDB', 'Docker', 'Google Cloud']
};

export const FAQ_ITEMS = [
  {
    question: 'What services does Degenlience AI provide?',
    answer: 'Degenlience AI provides end-to-end digital engineering services including Artificial Intelligence Solutions, Custom Software Development, Web Development, Mobile App Development, Business Automation, and UI/UX Design.'
  },
  {
    question: 'Can students apply for internships at Degenlience AI?',
    answer: 'Yes! We actively offer internships in AI/ML Engineering, Full-Stack Software Development, and UI/UX Design. Students can apply through our Jobs & Internships section or via the Student Portal.'
  },
  {
    question: 'What digital products and courses are available?',
    answer: 'We offer SaaS templates, starter kits, UI design systems, and practical masterclass courses on Enterprise AI development and Agentic workflows for students and developers.'
  },
  {
    question: 'Do you provide support after project delivery?',
    answer: 'Absolutely. We offer comprehensive ongoing maintenance, 24/7 SLA monitoring, cloud infrastructure management, security updates, and feature iteration plans to ensure your product scales seamlessly.'
  },
  {
    question: 'Can you build a custom AI solution for my business?',
    answer: 'Yes! We specialize in custom AI integrations—including fine-tuned LLM agents, intelligent chatbot systems, automated document processors, predictive data models, and computer vision tools built around your proprietary business workflows.'
  },
  {
    question: 'Do you work with startups and small businesses?',
    answer: 'Yes! We partner with startups, fast-growing SMEs, and large enterprises alike. We offer flexible, milestone-based engagements designed to accelerate market entry while maintaining enterprise quality.'
  }
];
