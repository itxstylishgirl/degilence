import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_SERVICES, INITIAL_PORTFOLIO, INITIAL_TESTIMONIALS, INITIAL_JOBS, INITIAL_PRODUCTS } from './src/data/initialData';
import { LeadInquiry, PortfolioProject, Testimonial, ServiceItem, JobPosting, JobApplication, DigitalProduct, Enrollment } from './src/types';

const PORT = 3000;
const DB_FILE = path.join(process.cwd(), 'data_db.json');

// Memory store backed by JSON file
interface LocalDB {
  leads: LeadInquiry[];
  portfolio: PortfolioProject[];
  testimonials: Testimonial[];
  services: ServiceItem[];
  jobs: JobPosting[];
  applications: JobApplication[];
  products: DigitalProduct[];
  enrollments: Enrollment[];
  emailLogs: { id: string; to: string; subject: string; body: string; sentAt: string }[];
}

function loadDB(): LocalDB {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      // ensure missing arrays exist if loaded from older JSON
      return {
        leads: parsed.leads || [],
        portfolio: parsed.portfolio || INITIAL_PORTFOLIO,
        testimonials: parsed.testimonials || INITIAL_TESTIMONIALS,
        services: parsed.services || INITIAL_SERVICES,
        jobs: parsed.jobs && parsed.jobs.length > 0 ? parsed.jobs : INITIAL_JOBS,
        applications: parsed.applications || [
          {
            id: 'app-1',
            jobId: 'job-1',
            jobTitle: 'AI & Machine Learning Engineer Internship',
            type: 'Internship',
            applicantName: 'Hamza Malik',
            email: 'hamza.malik@university.edu',
            phone: '+92 300 1234567',
            universityOrCompany: 'FAST NUST University',
            portfolioOrGithub: 'github.com/hamzamalik-ai',
            resumeSummary: 'CS student with solid PyTorch & LangChain experience. Built 2 AI projects.',
            coverNote: 'Extremely passionate about AI agents and fine-tuning models at Degenlience AI.',
            status: 'Shortlisted',
            createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
          }
        ],
        products: parsed.products && parsed.products.length > 0 ? parsed.products : INITIAL_PRODUCTS,
        enrollments: parsed.enrollments || [
          {
            id: 'enr-1',
            studentName: 'Ali Hassan',
            email: 'ali.hassan@gmail.com',
            phone: '+92 321 8889900',
            productId: 'prod-2',
            productTitle: 'Enterprise AI & Agentic Development Bootcamp',
            productCategory: 'Training Course',
            amountPaid: 99,
            paymentStatus: 'Completed',
            accessGranted: true,
            enrolledAt: new Date(Date.now() - 3600000 * 24).toISOString()
          }
        ],
        emailLogs: parsed.emailLogs || []
      };
    }
  } catch (err) {
    console.error('Error loading DB file, fallback to initial:', err);
  }

  const initialDB: LocalDB = {
    leads: [
      {
        id: 'lead-1',
        type: 'project',
        fullName: 'Alexander Wright',
        email: 'alex@vortexventures.com',
        phone: '+1 (555) 234-5678',
        companyName: 'Vortex Ventures',
        service: 'Artificial Intelligence Solutions',
        budget: '$25,000 - $50,000',
        details: 'We are looking to build a custom RAG-based AI assistant for internal legal document analysis.',
        status: 'New',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        estimatedScope: 'Estimated 120-160 hours. Recommended Stack: FastAPI, LangChain, PostgreSQL (pgvector).'
      },
      {
        id: 'lead-2',
        type: 'contact',
        fullName: 'Sophia Chen',
        email: 'sophia@lumina.io',
        phone: '+1 (555) 987-6543',
        companyName: 'Lumina Tech',
        service: 'Web Development',
        budget: '$10,000 - $25,000',
        details: 'Interested in a modern website redesign with glassmorphism UI and fast Next.js architecture.',
        status: 'Contacted',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
      }
    ],
    portfolio: INITIAL_PORTFOLIO,
    testimonials: INITIAL_TESTIMONIALS,
    services: INITIAL_SERVICES,
    jobs: INITIAL_JOBS,
    applications: [
      {
        id: 'app-1',
        jobId: 'job-1',
        jobTitle: 'AI & Machine Learning Engineer Internship',
        type: 'Internship',
        applicantName: 'Hamza Malik',
        email: 'hamza.malik@university.edu',
        phone: '+92 300 1234567',
        universityOrCompany: 'FAST NUST University',
        portfolioOrGithub: 'github.com/hamzamalik-ai',
        resumeSummary: 'CS student with solid PyTorch & LangChain experience. Built 2 AI projects.',
        coverNote: 'Extremely passionate about AI agents and fine-tuning models at Degenlience AI.',
        status: 'Shortlisted',
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
      }
    ],
    products: INITIAL_PRODUCTS,
    enrollments: [
      {
        id: 'enr-1',
        studentName: 'Ali Hassan',
        email: 'ali.hassan@gmail.com',
        phone: '+92 321 8889900',
        productId: 'prod-2',
        productTitle: 'Enterprise AI & Agentic Development Bootcamp',
        productCategory: 'Training Course',
        amountPaid: 99,
        paymentStatus: 'Completed',
        accessGranted: true,
        enrolledAt: new Date(Date.now() - 3600000 * 24).toISOString()
      }
    ],
    emailLogs: []
  };

  saveDB(initialDB);
  return initialDB;
}

function saveDB(data: LocalDB) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save DB file:', err);
  }
}

let db = loadDB();

// Lazy Gemini AI initialization helper
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // ----------------------------------------------------
  // API ROUTES
  // ----------------------------------------------------

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Public Contact Form endpoint
  app.post('/api/contact', (req, res) => {
    const { fullName, email, phone, companyName, service, budget, details } = req.body;

    if (!fullName || !email || !details) {
      return res.status(400).json({ error: 'Please provide full name, email, and details.' });
    }

    const newLead: LeadInquiry = {
      id: 'lead-' + Date.now(),
      type: 'contact',
      fullName,
      email,
      phone: phone || '',
      companyName: companyName || '',
      service: service || 'General Inquiry',
      budget: budget || 'Undisclosed',
      details,
      status: 'New',
      createdAt: new Date().toISOString()
    };

    db.leads.unshift(newLead);

    // Simulate sending email notification
    const emailLog = {
      id: 'email-' + Date.now(),
      to: email,
      subject: 'Inquiry Received - Degenlience AI',
      body: `Hi ${fullName},\n\nThank you for reaching out to Degenlience AI. Our team has received your project inquiry regarding ${newLead.service} and will review your specifications within 24 hours.\n\nBest regards,\nDegenlience AI Team`,
      sentAt: new Date().toISOString()
    };
    db.emailLogs.unshift(emailLog);

    saveDB(db);

    return res.json({
      success: true,
      message: 'Thank you! Your project inquiry has been received.',
      leadId: newLead.id
    });
  });

  // Public Project Inquiry endpoint
  app.post('/api/project-inquiry', (req, res) => {
    const { fullName, email, phone, companyName, service, budget, details, estimatedScope } = req.body;

    if (!fullName || !email || !service || !details) {
      return res.status(400).json({ error: 'Full name, email, service choice, and project details are required.' });
    }

    const newLead: LeadInquiry = {
      id: 'lead-' + Date.now(),
      type: 'project',
      fullName,
      email,
      phone: phone || '',
      companyName: companyName || '',
      service,
      budget: budget || 'To be estimated',
      details,
      status: 'New',
      createdAt: new Date().toISOString(),
      estimatedScope: estimatedScope || ''
    };

    db.leads.unshift(newLead);

    // Simulated email log to user and admin
    db.emailLogs.unshift({
      id: 'email-' + Date.now(),
      to: email,
      subject: 'Project Consultation Request Confirmation - Degenlience AI',
      body: `Hello ${fullName},\n\nWe have received your detailed project submission for "${service}". A senior solutions architect from Degenlience AI will contact you shortly to schedule a consultation.\n\nSummary:\nService: ${service}\nBudget: ${budget}\n\nWarm regards,\nDegenlience AI Engineering Team`,
      sentAt: new Date().toISOString()
    });

    saveDB(db);

    return res.json({
      success: true,
      message: 'Project inquiry submitted successfully!',
      leadId: newLead.id
    });
  });

  // AI Scope Estimator Endpoint
  app.post('/api/ai/estimator', async (req, res) => {
    const { serviceType, projectScope, aiFeatures, targetPlatform, timeline } = req.body;

    try {
      const gemini = getGeminiClient();
      if (gemini) {
        const prompt = `You are a Senior Solutions Architect at Degenlience AI, an elite software house.
Analyze this client project specification and provide a structured JSON response:
- Service Needed: ${serviceType}
- Target Platform: ${targetPlatform}
- Scope & Requirements: ${projectScope}
- AI Features desired: ${Array.isArray(aiFeatures) ? aiFeatures.join(', ') : aiFeatures}
- Target Timeline: ${timeline}

Return valid JSON with these fields:
1. recommendedArchitecture (string, 2-3 sentences specifying recommended stack & system architecture)
2. estimatedHours (string, e.g. "120 - 180 development hours")
3. suggestedBudgetTier (string, e.g. "$15,000 - $25,000")
4. keyDeliverables (array of 4 string bullet points)
5. aiIntegrationAdvice (string, 2 sentences on how AI will maximize ROI for this project)

DO NOT wrap in markdown code blocks, return ONLY valid raw JSON.`;

        const response = await gemini.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt
        });

        const text = response.text || '';
        const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleaned);

        return res.json({ success: true, estimate: parsed });
      }
    } catch (err) {
      console.warn('Gemini estimation error, using intelligent algorithm fallback:', err);
    }

    // Algorithmic Fallback Estimation
    const featureCount = Array.isArray(aiFeatures) ? aiFeatures.length : 1;
    let baseHours = 80;
    if (serviceType.includes('AI') || featureCount > 2) baseHours += 80;
    if (targetPlatform.includes('Both') || targetPlatform.includes('Enterprise')) baseHours += 60;

    const minHours = baseHours;
    const maxHours = Math.round(baseHours * 1.4);
    const minBudget = minHours * 85;
    const maxBudget = maxHours * 110;

    return res.json({
      success: true,
      estimate: {
        recommendedArchitecture: `Enterprise-grade ${serviceType} built on Next.js/React frontend, Node.js FastAPI backend, and containerized deployment with cloud database syncing.`,
        estimatedHours: `${minHours} - ${maxHours} engineering hours`,
        suggestedBudgetTier: `$${minBudget.toLocaleString()} - $${maxBudget.toLocaleString()}`,
        keyDeliverables: [
          'High-fidelity Glassmorphism UI/UX Design system & prototypes',
          'Production API & core system engineering with TypeScript',
          'Intelligent AI model integration & automated testing',
          'Cloud deployment, documentation & 30-day post-launch support'
        ],
        aiIntegrationAdvice: 'Incorporating custom LLM function-calling and automated document workflows will reduce manual task handling by up to 70%.'
      }
    });
  });

  // Interactive Gemini AI Consultant Chatbot Endpoint
  app.post('/api/ai/chat', async (req, res) => {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    try {
      const gemini = getGeminiClient();
      if (gemini) {
        const systemInstruction = `You are Degenlience AI's Senior Technology Consultant & Student Career Advisor.
Degenlience AI is a premier software house specializing in:
- Custom AI & Multi-Agent Systems
- Full-Stack Web Development (React, Next.js, Node.js, TypeScript)
- Enterprise Automation & SaaS products
- Student Internships, Bootcamps, and Masterclass Training Courses

Guidelines:
- Provide helpful, professional, clear, and concise answers (2-4 sentences or bullet points).
- Assist clients with project scoping, technology choices, and budget planning.
- Guide students regarding internship opportunities and masterclass course enrollment.
- Tone: Professional, innovative, encouraging, and tech-savvy.`;

        let contents: any[] = [];
        if (Array.isArray(history) && history.length > 0) {
          contents = history.map((item: any) => ({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }]
          }));
        }
        contents.push({ role: 'user', parts: [{ text: message }] });

        const response = await gemini.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction
          }
        });

        return res.json({
          success: true,
          reply: response.text || 'Thank you for your inquiry. How else can Degenlience AI assist you today?'
        });
      }
    } catch (err) {
      console.warn('Gemini chat API error, using intelligent fallback:', err);
    }

    // Fallback response if API key is not set or call fails
    const lower = message.toLowerCase();
    let reply = "Hello! I am Degenlience AI's Senior Consultant. We offer custom AI solutions, full-stack software development, student internships, and digital bootcamps. How can we help build your vision or kickstart your career today?";

    if (lower.includes('intern') || lower.includes('job') || lower.includes('apply')) {
      reply = "We offer remote and hybrid student internships in AI/ML, Full-Stack Web Engineering, and UI/UX Design! You can explore open roles and apply directly in our 'Jobs & Internships' section or through the Student Portal.";
    } else if (lower.includes('course') || lower.includes('bootcamp') || lower.includes('product')) {
      reply = "Our Digital Products & Training Masterclasses include hands-on bootcamps in AI Agentic Development, Next.js Full-Stack Masterclass, and Production UI Design. Check out our 'Products & Courses' section to enroll!";
    } else if (lower.includes('cost') || lower.includes('price') || lower.includes('budget') || lower.includes('estimate')) {
      reply = "Our projects typically range from $2,500 for MVP starter tools to $50,000+ for enterprise multi-agent platforms. You can use our 'AI Estimator' button in the navbar for an instant breakdown!";
    }

    return res.json({ success: true, reply });
  });

  // Admin Auth endpoint
  app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    if ((email === 'admin@degenlience.ai' || email === 'admin') && (password === 'admin123' || password === 'degen123')) {
      return res.json({
        success: true,
        token: 'degen_admin_token_sec_' + Date.now(),
        adminUser: { name: 'Degenlience Lead Manager', email: 'admin@degenlience.ai', role: 'Super Admin' }
      });
    }
    return res.status(401).json({ error: 'Invalid admin credentials. Use admin@degenlience.ai / admin123' });
  });

  // GET Admin Leads
  app.get('/api/admin/leads', (req, res) => {
    res.json({
      leads: db.leads,
      total: db.leads.length,
      emailLogsCount: db.emailLogs.length
    });
  });

  // PATCH Update Lead Status
  app.patch('/api/admin/leads/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const lead = db.leads.find(l => l.id === id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    if (status) {
      lead.status = status;
    }

    saveDB(db);
    return res.json({ success: true, lead });
  });

  // DELETE Lead
  app.delete('/api/admin/leads/:id', (req, res) => {
    const { id } = req.params;
    const index = db.leads.findIndex(l => l.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    db.leads.splice(index, 1);
    saveDB(db);
    return res.json({ success: true, message: 'Lead deleted successfully' });
  });

  // ----------------------------------------------------
  // JOBS & INTERNSHIPS ENDPOINTS
  // ----------------------------------------------------

  // GET Jobs (Public)
  app.get('/api/jobs', (req, res) => {
    res.json({ jobs: db.jobs });
  });

  // POST Create Job or Internship (Admin)
  app.post('/api/jobs', (req, res) => {
    const { title, type, category, location, stipendOrSalary, duration, description, requirements, perks, isFeatured } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required for job postings.' });
    }

    const newJob: JobPosting = {
      id: 'job-' + Date.now(),
      title,
      type: type || 'Internship',
      category: category || 'Engineering',
      location: location || 'Remote',
      stipendOrSalary: stipendOrSalary || 'Competitive Stipend',
      duration: duration || '',
      description,
      requirements: Array.isArray(requirements) ? requirements : (requirements ? requirements.split('\n').filter(Boolean) : ['Passion for Software & AI']),
      perks: Array.isArray(perks) ? perks : (perks ? perks.split('\n').filter(Boolean) : ['Mentorship', 'Flexible Hours']),
      isFeatured: !!isFeatured,
      isOpen: true,
      createdAt: new Date().toISOString()
    };

    db.jobs.unshift(newJob);
    saveDB(db);

    return res.json({ success: true, message: 'Job posting published successfully!', job: newJob });
  });

  // DELETE Job (Admin)
  app.delete('/api/jobs/:id', (req, res) => {
    const { id } = req.params;
    const index = db.jobs.findIndex(j => j.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Job not found' });
    }
    db.jobs.splice(index, 1);
    saveDB(db);
    return res.json({ success: true, message: 'Job removed successfully' });
  });

  // POST Submit Job Application (Student / Candidate)
  app.post('/api/applications', (req, res) => {
    const { jobId, jobTitle, type, applicantName, email, phone, universityOrCompany, portfolioOrGithub, resumeSummary, coverNote } = req.body;

    if (!applicantName || !email || !resumeSummary) {
      return res.status(400).json({ error: 'Applicant name, email, and resume details are required.' });
    }

    const newApp: JobApplication = {
      id: 'app-' + Date.now(),
      jobId: jobId || 'general',
      jobTitle: jobTitle || 'General Internship / Job Application',
      type: type || 'Internship',
      applicantName,
      email,
      phone: phone || '',
      universityOrCompany: universityOrCompany || '',
      portfolioOrGithub: portfolioOrGithub || '',
      resumeSummary,
      coverNote: coverNote || '',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    db.applications.unshift(newApp);

    // Simulated email log
    db.emailLogs.unshift({
      id: 'email-' + Date.now(),
      to: email,
      subject: `Application Received: ${newApp.jobTitle} - Degenlience AI`,
      body: `Dear ${applicantName},\n\nThank you for applying for "${newApp.jobTitle}" at Degenlience AI. Our talent team will review your application and portfolio shortly.\n\nBest regards,\nDegenlience AI Recruitment`,
      sentAt: new Date().toISOString()
    });

    saveDB(db);

    return res.json({ success: true, message: 'Your application has been submitted successfully!', application: newApp });
  });

  // GET Job Applications (Admin)
  app.get('/api/admin/applications', (req, res) => {
    res.json({ applications: db.applications, total: db.applications.length });
  });

  // PATCH Update Application Status (Admin)
  app.patch('/api/admin/applications/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const appItem = db.applications.find(a => a.id === id);
    if (!appItem) {
      return res.status(404).json({ error: 'Application not found' });
    }

    if (status) {
      appItem.status = status;
    }

    saveDB(db);
    return res.json({ success: true, application: appItem });
  });

  // ----------------------------------------------------
  // PRODUCTS & COURSES ENDPOINTS
  // ----------------------------------------------------

  // GET Products (Public)
  app.get('/api/products', (req, res) => {
    res.json({ products: db.products });
  });

  // POST Create Product / Course (Admin)
  app.post('/api/products', (req, res) => {
    const { title, category, price, originalPrice, shortDescription, fullDescription, features, isCourse, duration, instructor, imageUrl } = req.body;

    if (!title || !shortDescription || price === undefined) {
      return res.status(400).json({ error: 'Title, short description, and price are required.' });
    }

    const newProd: DigitalProduct = {
      id: 'prod-' + Date.now(),
      title,
      category: category || (isCourse ? 'Training Course' : 'AI Tool'),
      price: Number(price) || 0,
      originalPrice: Number(originalPrice) || Number(price) * 2,
      shortDescription,
      fullDescription: fullDescription || shortDescription,
      features: Array.isArray(features) ? features : (features ? features.split('\n').filter(Boolean) : ['Lifetime Access', 'Community Support']),
      rating: 5.0,
      enrollmentsCount: 0,
      isCourse: !!isCourse,
      duration: duration || '',
      instructor: instructor || 'Degenlience AI Instructors',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      isPublished: true,
      createdAt: new Date().toISOString()
    };

    db.products.unshift(newProd);
    saveDB(db);

    return res.json({ success: true, message: 'Product / Course published successfully!', product: newProd });
  });

  // DELETE Product (Admin)
  app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const index = db.products.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    db.products.splice(index, 1);
    saveDB(db);
    return res.json({ success: true, message: 'Product removed successfully' });
  });

  // POST Enroll / Purchase Product (Student / Customer)
  app.post('/api/enroll', (req, res) => {
    const { studentName, email, phone, productId } = req.body;

    if (!studentName || !email || !productId) {
      return res.status(400).json({ error: 'Student name, email, and product choice are required.' });
    }

    const product = db.products.find(p => p.id === productId);
    if (!product) {
      return res.status(404).json({ error: 'Selected course or product not found.' });
    }

    // Increment enrollment count
    product.enrollmentsCount = (product.enrollmentsCount || 0) + 1;

    const newEnrollment: Enrollment = {
      id: 'enr-' + Date.now(),
      studentName,
      email,
      phone: phone || '',
      productId: product.id,
      productTitle: product.title,
      productCategory: product.category,
      amountPaid: product.price,
      paymentStatus: 'Completed',
      accessGranted: true,
      enrolledAt: new Date().toISOString()
    };

    db.enrollments.unshift(newEnrollment);

    // Simulated email log
    db.emailLogs.unshift({
      id: 'email-' + Date.now(),
      to: email,
      subject: `Enrollment Confirmed: ${product.title} - Degenlience AI`,
      body: `Congratulations ${studentName}!\n\nYour enrollment in "${product.title}" is confirmed. Access granted to student panel.\n\nSummary:\nItem: ${product.title}\nAmount Paid: $${product.price}\n\nWarm regards,\nDegenlience AI Learning Hub`,
      sentAt: new Date().toISOString()
    });

    saveDB(db);

    return res.json({
      success: true,
      message: `Enrolled successfully in ${product.title}!`,
      enrollment: newEnrollment
    });
  });

  // GET Enrollments (Admin / Student Lookup)
  app.get('/api/enrollments', (req, res) => {
    const { email } = req.query;
    if (email) {
      const studentEnrollments = db.enrollments.filter(e => e.email.toLowerCase() === String(email).toLowerCase());
      return res.json({ enrollments: studentEnrollments });
    }
    res.json({ enrollments: db.enrollments, total: db.enrollments.length });
  });

  // ----------------------------------------------------
  // PORTFOLIO & TESTIMONIALS
  // ----------------------------------------------------

  // GET Portfolio
  app.get('/api/portfolio', (req, res) => {
    res.json({ portfolio: db.portfolio });
  });

  // POST Create Portfolio item
  app.post('/api/portfolio', (req, res) => {
    const newProject: PortfolioProject = {
      id: 'project-' + Date.now(),
      title: req.body.title || 'New Innovation Project',
      category: req.body.category || 'AI & Automation',
      description: req.body.description || 'Custom software solution built for modern enterprise.',
      metrics: req.body.metrics || ['100% Scalable'],
      technologies: req.body.technologies || ['React', 'TypeScript', 'Node.js'],
      imageUrl: req.body.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      client: req.body.client || 'Enterprise Client',
      featured: true
    };

    db.portfolio.unshift(newProject);
    saveDB(db);
    res.json({ success: true, project: newProject });
  });

  // GET Testimonials
  app.get('/api/testimonials', (req, res) => {
    res.json({ testimonials: db.testimonials });
  });

  // POST Testimonials
  app.post('/api/testimonials', (req, res) => {
    const newTestimonial: Testimonial = {
      id: 'test-' + Date.now(),
      clientName: req.body.clientName || 'Anonymous Partner',
      role: req.body.role || 'Executive Leader',
      company: req.body.company || 'Tech Enterprise',
      avatarUrl: req.body.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      quote: req.body.quote || 'Outstanding execution and modern UI polish.',
      rating: req.body.rating || 5,
      projectType: req.body.projectType || 'Software Development'
    };

    db.testimonials.unshift(newTestimonial);
    saveDB(db);
    res.json({ success: true, testimonial: newTestimonial });
  });

  // GET Services
  app.get('/api/services', (req, res) => {
    res.json({ services: db.services });
  });

  // ----------------------------------------------------
  // VITE & STATIC FILES SERVING
  // ----------------------------------------------------

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Degenlience AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
