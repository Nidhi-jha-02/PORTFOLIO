/**
 * Certificates and COA Assignment Data Source
 * 
 * To add a new certificate:
 * 1. Place the certificate image in: /public/certificates/<your-image-filename>
 * 2. Add an entry to the certificatesData array below with title, issuer, issueDate, etc.
 * 
 * To update the COA assignment PDF:
 * 1. Replace the file at: /public/documents/coa-assignment.pdf
 */

export const certificatesData = [
  {
    id: 'azure-fundamentals',
    title: 'Microsoft Certified: Azure Fundamentals',
    shortTitle: 'Azure Fundamentals (AZ-900)',
    category: 'Cloud & AI',
    issuer: 'Microsoft / Certiport',
    issueDate: 'November 19, 2025',
    credentialId: 'waNb9-H9dR',
    verifyUrl: 'https://verify.certiport.com',
    image: '/certificates/microsoft-azure-fundamentals.png',
    description: 'Validates foundational knowledge of cloud concepts, Microsoft Azure architectural services, security, privacy, compliance, and SLA support.',
    badge: 'AZ-900 CERTIFIED',
    highlight: 'Core Microsoft Cloud'
  },
  {
    id: 'azure-ai-fundamentals',
    title: 'Microsoft Certified: Azure AI Fundamentals',
    shortTitle: 'Azure AI Fundamentals (AI-900)',
    category: 'Cloud & AI',
    issuer: 'Microsoft / Certiport',
    issueDate: 'April 28, 2026',
    credentialId: 'y8Uv-DwW2',
    verifyUrl: 'https://verify.certiport.com',
    image: '/certificates/microsoft-azure-ai-fundamentals.png',
    description: 'Demonstrates understanding of machine learning workloads, computer vision, natural language processing (NLP), conversational AI, and responsible AI principles.',
    badge: 'AI-900 CERTIFIED',
    highlight: 'Azure Machine Learning'
  },
  {
    id: 'green-mobility-ideathon',
    title: 'The Integrated Green Mobility Ideathon 2026',
    shortTitle: 'Green Mobility Ideathon',
    category: 'Innovation & Ideathon',
    issuer: 'Ignite Youth Club & Indian Knowledge Systems (IKS), Chandigarh University',
    issueDate: 'February 16, 2026',
    credentialId: 'UID: 25BAI10032',
    image: '/certificates/green-mobility-ideathon-2026.png',
    description: 'Recognized for conceptualizing and pitching an AI-powered Smart Green Corridor system for dynamic signal management and eco-transit.',
    badge: 'IDEATHON 2026',
    highlight: 'Sustainable AI Transit'
  },
  {
    id: 'herizon-hackathon',
    title: 'HERizon 2026 Hackathon',
    shortTitle: 'HERizon 2026 National Hackathon',
    category: 'Hackathon',
    issuer: 'IEEE India Council & Chandigarh University (UIE)',
    issueDate: 'March 27-28, 2026',
    credentialId: 'Team QuadX',
    image: '/certificates/herizon-2026-hackathon.png',
    description: 'Actively participated in the flagship IEEE-partnered national hackathon, collaborating on rapid prototyping and algorithmic system architecture.',
    badge: 'IEEE HACKATHON',
    highlight: 'Rapid Prototyping'
  },
  {
    id: 'build-with-bharat',
    title: 'Build With Bharat 2.0 — National Hackathon',
    shortTitle: 'Build With Bharat 2.0 (NIT Delhi)',
    category: 'Hackathon',
    issuer: 'NIT Delhi, GitHub & Logitech / CodeVerse',
    issueDate: 'September 13-14, 2026',
    credentialId: 'Team Cipher Core',
    image: '/certificates/build-with-bharat-hackathon.png',
    description: 'Certificate of Participation in the PPT submission round of Build With Bharat 2.0 national hackathon organized by CodeVerse at NIT Delhi.',
    badge: 'NATIONAL HACKATHON',
    highlight: 'NIT Delhi & GitHub'
  },
  {
    id: 'build-summit-byte-built',
    title: 'Byte Built 1.0 — Build Summit 2026',
    shortTitle: 'Byte Built 1.0 (Engineers\' Day)',
    category: 'Engineering & Innovation',
    issuer: 'Chandigarh University & ByteXL',
    issueDate: 'September 14-15, 2026',
    credentialId: 'Certificate of Participation',
    image: '/certificates/build-summit-2026-byte-built.png',
    description: 'Recognized for innovative engineering problem-solving, collaboration, and showcasing engineering spirit during the university Build Summit 2026.',
    badge: 'BUILD SUMMIT 2026',
    highlight: 'Engineers\' Day Summit'
  }
];

export const assignmentData = {
  title: 'Computer Organization & Architecture — Assignment 1',
  subjectCode: 'COA // 25CST-201',
  degree: 'BE CSE Microsoft AI',
  institution: 'Chandigarh University',
  student: 'Nidhi Jha (UID: 25BAI10032)',
  submittedTo: 'Dr. Ruchika Gupta',
  label: 'Official Assignment · PDF',
  semester: 'Assignment - 1 Evaluation',
  pdfPath: '/documents/coa-assignment.pdf',
  downloadFilename: 'COA_Assignment_1_Nidhi_Jha_25BAI10032.pdf',
  fileSize: '4 Pages · Verified PDF',
  description: 'Official university assignment submitted for BE CSE Microsoft AI at Chandigarh University under Dr. Ruchika Gupta.',
  topics: [
    { title: "Raspberry Pi 5 Architecture & SBC Features", desc: "Single-board computer architecture, hardware components, and peripheral integration." },
    { title: "RAM Size, Word Size & 64-Bit Systems", desc: "Memory capacity limits, word length processing, and 64-bit architecture benefits." },
    { title: "CPU vs GPU vs TPU Architecture", desc: "Core parallelism comparison and hardware acceleration for AI/deep learning workloads." },
    { title: "13th Gen Intel Core i5 (x86-64)", desc: "Processor micro-architecture, register structure, and 64-bit instruction execution." },
    { title: "Stampeding Herd & Tech Milestones", desc: "Resource contention, Intel/AMD founders, and Turing Award reinforcement learning research." }
  ]
};
