import { Persona, StrategyRecommendation } from '../types';

export const generateMockPersonas = (productInput: any): Persona[] => [
  {
    id: '1',
    name: 'Sarah Chen',
    age: 29,
    occupation: 'Marketing Manager',
    location: 'San Francisco, CA',
    category: 'THE TECH PROFESSIONAL',
    imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    bio: 'Tech-savvy professional who values efficiency and innovation in her daily workflow.',
    demographics: {
      gender: 'Female',
      education: 'MBA',
      familyStatus: 'Single',
      income: '$85,000 - $120,000'
    },
    psychographics: {
      personality: ['Analytical', 'Goal-oriented', 'Collaborative'],
      values: ['Innovation', 'Work-life balance', 'Professional growth'],
      interests: ['Technology', 'Fitness', 'Travel', 'Podcasts'],
      lifestyle: 'Urban professional with active social life'
    },
    goals: [
      'Advance career in marketing technology',
      'Streamline daily workflows',
      'Build meaningful professional relationships'
    ],
    frustrations: [
      'Inefficient tools that slow down productivity',
      'Information overload from multiple platforms',
      'Lack of integration between work applications'
    ],
    behaviors: [
      'Early adopter of new technologies',
      'Researches extensively before making decisions',
      'Shares insights on professional networks'
    ],
    quote: "I need tools that work as fast as I think and help me stay ahead of the curve.",
    moodBoard: [
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    ],
    voiceNote: "Hi, I'm Sarah. I'm always looking for ways to make my work more efficient and impactful.",
    scenario: "Sarah is preparing for a major product launch campaign and realizes she's spending too much time switching between different marketing tools and manually compiling reports. She's frustrated with the lack of integration and decides to search for a comprehensive solution during her lunch break that can centralize her workflow and provide real-time analytics.",
    jobToBeDone: "Help me consolidate my marketing tools and get actionable insights faster so I can focus on strategy rather than data compilation.",
    previousExperiences: [
      "Used HubSpot but found it too complex for her team size",
      "Tried Mailchimp but lacked advanced analytics features",
      "Currently uses a combination of Google Analytics, Hootsuite, and Excel"
    ],
    successCriteria: "If I can reduce my daily reporting time from 2 hours to 30 minutes and get all my marketing metrics in one dashboard."
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    age: 34,
    occupation: 'Small Business Owner',
    location: 'Austin, TX',
    category: 'THE BUSINESS OWNER',
    imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    bio: 'Entrepreneurial spirit focused on building sustainable business solutions.',
    demographics: {
      gender: 'Male',
      education: 'Bachelor\'s Degree',
      familyStatus: 'Married with 2 children',
      income: '$60,000 - $90,000'
    },
    psychographics: {
      personality: ['Practical', 'Resourceful', 'Community-minded'],
      values: ['Family', 'Authenticity', 'Local community'],
      interests: ['Entrepreneurship', 'Cooking', 'Local events', 'Sustainability'],
      lifestyle: 'Busy family man balancing business and personal life'
    },
    goals: [
      'Grow business sustainably',
      'Improve operational efficiency',
      'Maintain work-life balance'
    ],
    frustrations: [
      'Limited budget for expensive solutions',
      'Time constraints from wearing multiple hats',
      'Difficulty finding reliable, affordable tools'
    ],
    behaviors: [
      'Seeks cost-effective solutions',
      'Values personal recommendations',
      'Prefers simple, intuitive interfaces'
    ],
    quote: "I need solutions that fit my budget and actually solve real problems for my business.",
    moodBoard: [
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/1181664/pexels-photo-1181664.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    ],
    voiceNote: "Hey there! I'm Marcus, and I'm passionate about building something meaningful for my community.",
    scenario: "Marcus is frustrated with spending his evenings manually creating invoices and tracking payments for his catering business. He recently lost a receipt and missed a tax deduction. After his kids go to bed, he decides to search for a simple, affordable accounting app that can help him automate this process so he can spend more quality time with his family.",
    jobToBeDone: "Help me look professional to my clients while saving time on administrative tasks so I can focus on growing my business and being present for my family.",
    previousExperiences: [
      "Tried QuickBooks but found it overwhelming and expensive",
      "Used Excel spreadsheets but prone to errors and time-consuming",
      "Currently uses a mix of paper receipts and basic invoicing templates"
    ],
    successCriteria: "If I can do my monthly invoicing and bookkeeping in under 2 hours instead of a full weekend, and never miss another tax deduction."
  },
  {
    id: '3',
    name: 'Emma Thompson',
    age: 42,
    occupation: 'Product Manager',
    location: 'Seattle, WA',
    category: 'THE PRODUCT MANAGER',
    imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    bio: 'Experienced product leader with a passion for user-centered design and data-driven decisions.',
    demographics: {
      gender: 'Female',
      education: 'Master\'s Degree',
      familyStatus: 'Married with 1 child',
      income: '$120,000 - $160,000'
    },
    psychographics: {
      personality: ['Strategic', 'Empathetic', 'Detail-oriented'],
      values: ['User experience', 'Team collaboration', 'Continuous learning'],
      interests: ['UX design', 'Data analytics', 'Reading', 'Hiking'],
      lifestyle: 'Work-focused professional who values quality time with family'
    },
    goals: [
      'Deliver exceptional user experiences',
      'Lead high-performing product teams',
      'Stay current with industry trends'
    ],
    frustrations: [
      'Silos between teams and departments',
      'Lack of user research resources',
      'Pressure to ship features quickly'
    ],
    behaviors: [
      'Data-driven decision maker',
      'Advocates for user needs',
      'Seeks tools that facilitate collaboration'
    ],
    quote: "Great products come from understanding users deeply and building with empathy.",
    moodBoard: [
      'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/3184354/pexels-photo-3184354.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    ],
    voiceNote: "Hello! I'm Emma, and I believe the best products are built when we truly understand our users.",
    scenario: "Emma is leading a cross-functional team to redesign their mobile app, but she's struggling to get alignment on user priorities. Different stakeholders have conflicting opinions about what features matter most. She needs a way to gather and synthesize user feedback quickly to make data-driven decisions and get everyone on the same page before the next sprint planning meeting.",
    jobToBeDone: "Give me confidence in my product decisions by providing clear, actionable user insights that I can use to align my team and stakeholders.",
    previousExperiences: [
      "Used UserVoice but found the insights too surface-level",
      "Tried Hotjar for heatmaps but struggled with analysis",
      "Currently relies on quarterly user interviews and surveys"
    ],
    successCriteria: "If I can reduce the time from user research to actionable insights from 3 weeks to 3 days, and get 90% stakeholder alignment on feature priorities."
  }
];

export const generateMockStrategies = (selectedPersonas: string[]): StrategyRecommendation[] => [
  {
    category: 'Onboarding',
    title: 'Streamlined First-Time Experience',
    description: 'Create a progressive onboarding flow that introduces key features gradually while allowing users to achieve quick wins.',
    actionItems: [
      'Design a 3-step guided tour highlighting core functionality',
      'Implement contextual tooltips for advanced features',
      'Create template galleries for quick setup',
      'Add progress indicators to reduce abandonment'
    ],
    priority: 'High'
  },
  {
    category: 'Feature Prioritization',
    title: 'Efficiency-Focused Core Features',
    description: 'Prioritize features that directly impact productivity and workflow optimization for professional users.',
    actionItems: [
      'Develop keyboard shortcuts for power users',
      'Implement bulk actions for common tasks',
      'Create customizable dashboards',
      'Add integration capabilities with popular tools'
    ],
    priority: 'High'
  },
  {
    category: 'UI/UX Design',
    title: 'Professional & Intuitive Interface',
    description: 'Design a clean, professional interface that feels familiar to business users while offering powerful functionality.',
    actionItems: [
      'Use familiar design patterns from business applications',
      'Implement consistent spacing and typography system',
      'Design for both light and dark modes',
      'Ensure accessibility compliance (WCAG 2.1)'
    ],
    priority: 'Medium'
  },
  {
    category: 'Marketing & Communication',
    title: 'Value-Driven Messaging Strategy',
    description: 'Focus messaging on concrete business outcomes and productivity improvements rather than features.',
    actionItems: [
      'Develop ROI calculators showing time/cost savings',
      'Create case studies with specific productivity metrics',
      'Target professional communities and forums',
      'Leverage LinkedIn and industry publications'
    ],
    priority: 'Medium'
  },
  {
    category: 'KPIs & Metrics',
    title: 'Success Measurement Framework',
    description: 'Track metrics that align with user goals around efficiency and business impact.',
    actionItems: [
      'Monitor feature adoption rates for core workflows',
      'Track time-to-value for new users',
      'Measure user engagement with productivity features',
      'Survey users on perceived productivity improvements'
    ],
    priority: 'Low'
  }
];