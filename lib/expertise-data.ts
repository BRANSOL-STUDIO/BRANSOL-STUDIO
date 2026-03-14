export type ProcessStep = { title: string; desc: string };
export type Tool = { name: string };

export type Discipline = {
  num: string;
  name: string;
  tag: string;
  color: string;
  capabilities: string[];
  process: ProcessStep[];
  tools: Tool[];
  aiBadge: string;
};

export const DISCIPLINES: Discipline[] = [
  {
    num: "01",
    name: "Brand Identity",
    tag: "Identity Systems",
    color: "var(--iris)",
    capabilities: [
      "Brand naming, verbal identity and tone-of-voice frameworks",
      "Logo design, wordmarks, monograms and symbol systems",
      "Colour architecture, typography selection and hierarchy",
      "Visual language, pattern systems and iconography",
      "Brand guidelines and governance documentation",
      "Stationery, document templates and brand collateral",
      "Brand refresh and evolution strategies",
    ],
    process: [
      { title: "Audit & Discovery", desc: "Competitive landscape, brand positioning and stakeholder alignment workshops" },
      { title: "Strategic Platform", desc: "Brand purpose, values, personality and positioning statement" },
      { title: "Identity Development", desc: "Concept exploration, refinement and senior design craft" },
      { title: "System Build", desc: "Full identity system, guidelines and asset production" },
      { title: "Handover & Governance", desc: "Implementation support, template library and brand stewardship" },
    ],
    tools: [
      { name: "Illustrator" },
      { name: "Photoshop" },
      { name: "InDesign" },
      { name: "Figma" },
      { name: "Adobe Fonts" },
      { name: "Midjourney" },
    ],
    aiBadge: "AI-augmented workflow",
  },
  {
    num: "02",
    name: "Digital Design",
    tag: "Web & Product",
    color: "var(--aqua)",
    capabilities: [
      "Website design — corporate, product, campaign and microsite",
      "UI/UX design for web applications and dashboards",
      "Design systems and component libraries",
      "Prototype and interaction design",
      "Email template design and digital brand application",
      "Responsive and accessibility-compliant design",
      "Front-end development handover and QA support",
    ],
    process: [
      { title: "Discovery & Information Architecture", desc: "User journeys, sitemap and content structure" },
      { title: "Wireframe & UX Logic", desc: "Low-fidelity flows and interaction mapping" },
      { title: "Visual Design", desc: "High-fidelity screens, brand application and motion principles" },
      { title: "Prototype & Test", desc: "Clickable prototype, stakeholder review and iteration" },
      { title: "Dev Handover", desc: "Annotated specs, component library and implementation support" },
    ],
    tools: [
      { name: "Figma" },
      { name: "Framer" },
      { name: "Adobe XD" },
      { name: "Webflow" },
      { name: "VS Code" },
      { name: "ChatGPT" },
    ],
    aiBadge: "AI-assisted UX copywriting",
  },
  {
    num: "03",
    name: "Campaign Creative",
    tag: "Print & Digital",
    color: "var(--gold)",
    capabilities: [
      "Campaign concept development and creative strategy",
      "Print collateral — brochures, annual reports, posters, mailers",
      "Digital advertising — social, display, programmatic assets",
      "Out-of-home and large-format production-ready artwork",
      "Integrated campaign rollout across multiple channels",
      "Photography art direction and CGI concept briefing",
      "Motion graphics and animated asset production",
    ],
    process: [
      { title: "Brief Interrogation", desc: "Audience insight, campaign objectives and success metrics" },
      { title: "Concept Development", desc: "Creative territories, headline exploration and visual direction" },
      { title: "Creative Production", desc: "Master artwork, asset adaptation and print/digital specs" },
      { title: "Rollout & Trafficking", desc: "Format versioning, supplier liaison and campaign deployment" },
    ],
    tools: [
      { name: "Illustrator" },
      { name: "Photoshop" },
      { name: "InDesign" },
      { name: "After Effects" },
      { name: "Premiere" },
      { name: "Midjourney" },
    ],
    aiBadge: "AI concept generation",
  },
  {
    num: "04",
    name: "Credentials & Presentations",
    tag: "Pitch & Investor",
    color: "var(--violet)",
    capabilities: [
      "Credentials documents and company profiles",
      "Investor presentations and pre-IPO roadshow decks",
      "Pitch decks for funding, tenders and commissions",
      "Annual report design and integrated report layout",
      "Board and executive presentation templates",
      "PowerPoint and Google Slides master template systems",
      "Data visualisation, infographics and financial charts",
    ],
    process: [
      { title: "Narrative Architecture", desc: "Story structure, key message hierarchy and slide logic" },
      { title: "Content Editing", desc: "Copy refinement, data validation and concision review" },
      { title: "Design Production", desc: "Visual execution, data viz and brand-accurate layout" },
      { title: "Format Delivery", desc: "PDF, PPTX, Google Slides and print-ready versions" },
    ],
    tools: [
      { name: "PowerPoint" },
      { name: "InDesign" },
      { name: "Illustrator" },
      { name: "Google Slides" },
      { name: "ChatGPT" },
      { name: "Claude AI" },
    ],
    aiBadge: "AI-assisted narrative structuring",
  },
  {
    num: "05",
    name: "Environmental & Spatial",
    tag: "Wayfinding & Signage",
    color: "var(--sky)",
    capabilities: [
      "Spatial brand strategy and environmental identity",
      "Wayfinding systems for campuses, hospitals and public buildings",
      "Interior signage — directories, door plaques, donor walls",
      "Exterior building signage and pylon design",
      "Exhibition and event environment design",
      "Vehicle livery and fleet graphics",
      "Fabrication-ready artwork and supplier coordination",
    ],
    process: [
      { title: "Site Analysis", desc: "Environmental audit, user flow mapping and material constraints" },
      { title: "System Design", desc: "Signage hierarchy, typographic standards and spatial strategy" },
      { title: "Concept Visualisation", desc: "3D renders, material mockups and in-situ presentations" },
      { title: "Technical Documentation", desc: "Shop drawings, specification sheets and fabrication packs" },
      { title: "Installation Oversight", desc: "Supplier management, site visits and quality assurance" },
    ],
    tools: [
      { name: "Illustrator" },
      { name: "Photoshop" },
      { name: "SketchUp" },
      { name: "AutoCAD" },
      { name: "Figma" },
      { name: "Lumion" },
    ],
    aiBadge: "AI-generated spatial concepts",
  },
];

export const TICKER_ITEMS = [
  "Brand Identity",
  "Digital Design",
  "Campaign Creative",
  "Credentials & Presentations",
  "Environmental & Spatial",
  "Brand Strategy",
];

export const STACK_TOOLS = [
  "Illustrator",
  "Photoshop",
  "InDesign",
  "After Effects",
  "Premiere",
  "Figma",
  "Framer",
  "ChatGPT",
  "Claude AI",
  "Midjourney",
  "PowerPoint",
  "Webflow",
];
