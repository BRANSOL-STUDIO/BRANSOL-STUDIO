export type ManifestoLine = { num: string; statement: string; expand: string };

export const MANIFESTO: ManifestoLine[] = [
  {
    num: "01",
    statement: "Design is a business argument, not a cosmetic one.",
    expand:
      "Every design decision has a business consequence. We treat aesthetics as a strategic instrument — not the goal, but the vehicle through which strategy becomes visible and legible to the people who matter.",
  },
  {
    num: "02",
    statement: "The brief is half the work.",
    expand:
      "A poorly defined brief produces expensive revisions, not good work. We invest more time in understanding the problem than most studios spend on the entire project. When the brief is right, the design almost writes itself.",
  },
  {
    num: "03",
    statement: "Selectivity is a form of respect.",
    expand:
      "We decline commissions that are not right — wrong fit, wrong timing, or where we genuinely believe another studio would serve the client better. This is not a negotiating tactic. It is how we stay honest.",
  },
  {
    num: "04",
    statement: "Permanence over novelty.",
    expand:
      "Design that chases trends ages in years. Design built on enduring principles ages in decades. We are not interested in what is fashionable. We are interested in what will still be correct when you look back on it in ten years.",
  },
  {
    num: "05",
    statement: "Craft is not optional.",
    expand:
      "In a world where speed tools can produce passable work instantly, the distinction between passable and excellent has never been more valuable. We spend time on the details that most people will never consciously notice — because those details are felt.",
  },
  {
    num: "06",
    statement: "We tell clients when we disagree.",
    expand:
      "A studio that only agrees is not a partner — it is a production house. We are hired for our judgement. If we believe a direction is wrong, we say so directly, explain why, and propose an alternative. Clients pay for that, whether they know it or not.",
  },
];

export type TeamMember = {
  initials: string;
  name: string;
  role: string;
  bio: string;
  tags: string[];
  quote: string;
  /** CSS color for geo SVG (e.g. var(--iris)) */
  accent: string;
  /** Optional profile image URL from Supabase; when set, shown on studio page */
  avatarUrl?: string | null;
};

export const TEAM: TeamMember[] = [
  {
    initials: "RB",
    name: "Ricardo Beaumont",
    role: "Chief Executive Officer",
    bio: "Leads BRANSOL's strategic direction and creative output across brand identity, digital design, and campaign. Ensures every commission is grounded in strategy and delivered with senior craft — from first concept to final asset.",
    tags: ["Brand Identity", "Digital Design", "Campaign"],
    quote: '"Design that cannot survive a board room does not deserve to survive at all."',
    accent: "var(--iris)",
  },
  {
    initials: "AB",
    name: "Ashleigh Beaumont",
    role: "Chief Operations Officer",
    bio: "Manages client relationships, the BRANSOL platform, and the operational infrastructure that lets the creative team work without administrative friction. The person who makes sure everything lands on time.",
    tags: ["Operations", "Client Relations", "Platform"],
    quote: '"Operations is the invisible design work. Nobody sees it when it works. Everybody feels it when it doesn\'t."',
    accent: "var(--r6)",
  },
  {
    initials: "PD",
    name: "Portia Deepnarain",
    role: "Compliance Officer",
    bio: "Oversees regulatory compliance, governance, and risk across BRANSOL's engagements. Ensures our processes and deliverables meet the standards required by government, listed, and institutional clients.",
    tags: ["Compliance", "Governance", "Risk"],
    quote: '"Compliance is not red tape — it is the structure that lets ambitious work happen without exposure."',
    accent: "var(--r4)",
  },
  {
    initials: "TM",
    name: "Teniel March",
    role: "Social Media Manager",
    bio: "Leads BRANSOL's presence and narrative across social channels. Connects studio work and perspectives with the right audiences while keeping the brand voice consistent and intentional.",
    tags: ["Social Media", "Content", "Community"],
    quote: '"Every post is a small piece of the brand. We treat it with the same care we give to client work."',
    accent: "var(--r1)",
  },
  {
    initials: "SW",
    name: "Shanice Winvogel",
    role: "Finance Director",
    bio: "Manages BRANSOL's financial operations, budgeting, and reporting. Ensures the studio runs on solid numbers so the team can focus on delivery while contracts, invoicing, and forecasting stay on track.",
    tags: ["Finance", "Reporting", "Operations"],
    quote: '"Good finance is invisible. It creates the space for everyone else to do their best work."',
    accent: "var(--r3)",
  },
];

export type ValueRow = { num: string; title: string; body: string };

export const VALUES: ValueRow[] = [
  {
    num: "01",
    title: "Honesty before harmony",
    body: "We tell clients what we think, even when it is uncomfortable. We have lost commissions for this. We have kept clients for it. The clients we keep are the ones worth keeping.",
  },
  {
    num: "02",
    title: "Depth over volume",
    body: "We are not trying to be the largest studio on the North Coast. We are trying to do the best work in our disciplines, for clients who understand the difference. Volume is the enemy of depth.",
  },
  {
    num: "03",
    title: "Accountability without excuses",
    body: "If something goes wrong — and sometimes it does — we fix it, explain what happened, and apply what we learned. We do not blame briefs, budgets, or timelines. We own the output.",
  },
  {
    num: "04",
    title: "Senior involvement, always",
    body: "Every commission is led by a senior practitioner with direct responsibility for the quality of the work. We do not have a layer of juniors working on client projects while seniors manage relationships.",
  },
  {
    num: "05",
    title: "Long relationships over quick wins",
    body: "Our 94% client retention rate is the result of a simple commitment: we behave the same way at the end of a project as we did at the beginning. No drop in attention. No handover to a junior. No moving on.",
  },
];

export type ModelBlock = {
  num: string;
  title: string;
  body: string;
  note: string;
  iconStroke: string;
};

export const MODEL_BLOCKS: ModelBlock[] = [
  {
    num: "01",
    title: "One brief. Documented. Agreed.",
    body: "Every commission begins with a structured brief that is written, reviewed, and signed off by both parties before design work begins. Verbal instructions do not exist in BRANSOL's workflow. Ambiguity is resolved before execution, not during it.",
    note: "Enforced by platform · No exceptions",
    iconStroke: "var(--iris)",
  },
  {
    num: "02",
    title: "Milestones, not months of silence.",
    body: "Every project is broken into defined milestones with agreed deliverables and review dates. Clients see progress in the platform in real time — not at the end of a long black-box period when it is too late to redirect.",
    note: "Synced to Asana · Visible on client platform",
    iconStroke: "var(--r4)",
  },
  {
    num: "03",
    title: "Feedback that lands.",
    body: "Feedback is collected through structured channels — not email, not WhatsApp, not a voice note forwarded three times. Every comment is contextual, attributed, and resolved in writing. We close every feedback loop explicitly.",
    note: "Structured · Documented · Resolved",
    iconStroke: "var(--r8)",
  },
  {
    num: "04",
    title: "Delivery that is actually complete.",
    body: "A project is not done when the design is done. It is done when the files are organised, correctly named, correctly formatted, permanently archived, and the client knows exactly what they have and how to use it. We stay until that is true.",
    note: "Asset pack · Guidelines · Archive",
    iconStroke: "var(--r3)",
  },
];

export type ClientPrinciple = { num: string; title: string; text: string };

export const CLIENT_PRINCIPLES: ClientPrinciple[] = [
  {
    num: "01",
    title: "We respond to every enquiry",
    text: "Even when the answer is no. Within two working days. Always personally — not a form response.",
  },
  {
    num: "02",
    title: "We do not negotiate on quality",
    text: "We will negotiate scope. We will negotiate timeline. We will not produce work that we believe is below the standard that represents BRANSOL correctly — regardless of budget pressure.",
  },
  {
    num: "03",
    title: "We disclose when we collaborate",
    text: "If we bring in a specialist collaborator — a photographer, fabricator, or developer — we tell you. You know who is working on your project at every stage.",
  },
  {
    num: "04",
    title: "We do not oversell the relationship",
    text: "We do not tell every prospect that they are \"exactly the kind of client we love to work with.\" If we say it, we mean it. Language is cheap. We let the work do the talking.",
  },
  {
    num: "05",
    title: "The studio is accessible",
    text: "Clients have direct access to the senior person leading their project — not an account manager who passes messages. Direct is faster, more honest, and produces better work.",
  },
];

export type SectorType = { label: string; color: string };

export const SECTOR_TYPES: SectorType[] = [
  { label: "Government departments and public entities", color: "var(--iris)" },
  { label: "State-owned enterprises and DFIs", color: "var(--r4)" },
  { label: "JSE-listed companies and their subsidiaries", color: "var(--r8)" },
  { label: "Financial services and asset management", color: "var(--r3)" },
  { label: "Infrastructure, energy, and professional services", color: "var(--r6)" },
  { label: "NGOs and foundations with institutional governance", color: "var(--r1)" },
];
