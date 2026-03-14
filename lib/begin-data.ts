export const SECTOR_OPTIONS = [
  { value: "gov", label: "Government / Public Sector" },
  { value: "soe", label: "State-Owned Enterprise" },
  { value: "listed", label: "Listed Company (JSE)" },
  { value: "private", label: "Private Company" },
  { value: "financial", label: "Financial Services" },
  { value: "infrastructure", label: "Infrastructure / Energy" },
  { value: "professional", label: "Professional Services" },
  { value: "ngo", label: "NGO / Foundation" },
  { value: "other", label: "Other" },
];

export const DISCIPLINE_OPTIONS = [
  { value: "brand-identity", label: "Brand Identity", sub: "Naming, identity systems, guidelines" },
  { value: "digital-design", label: "Digital Design", sub: "Web, product UI, design systems" },
  { value: "campaign", label: "Campaign Creative", sub: "Print, digital, environmental" },
  { value: "credentials", label: "Credentials & Presentations", sub: "Pitch decks, investor materials" },
  { value: "environmental", label: "Environmental & Spatial", sub: "Wayfinding, signage, spatial identity" },
  { value: "strategy", label: "Brand Strategy", sub: "Positioning, architecture, audit" },
];

export const TIMELINE_OPTIONS = [
  { value: "urgent", label: "Urgent", sub: "Under 4 weeks" },
  { value: "standard", label: "Standard", sub: "1 – 3 months" },
  { value: "considered", label: "Considered", sub: "3 months+" },
];

export const SOURCE_OPTIONS = [
  { value: "", label: "Select one" },
  { value: "referral", label: "Referral from a client or colleague" },
  { value: "search", label: "Online search" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "tender", label: "Tender / procurement database" },
  { value: "publication", label: "Publication or press" },
  { value: "event", label: "Event or conference" },
  { value: "other", label: "Other" },
];

export const BUDGET_POINTS = [
  "Under R 50k",
  "R 50,000",
  "R 100,000",
  "R 200,000",
  "R 350,000",
  "R 500,000",
  "R 750,000",
  "R 1,000,000",
  "R 1,500,000",
  "R 2,500,000",
  "R 5,000,000+",
];

export const TOTAL_STEPS = 4;
export const BRIEF_MIN_LENGTH = 80;
export const BRIEF_MAX_LENGTH = 1200;
export const EXTRA_MAX_LENGTH = 600;
