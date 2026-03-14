/**
 * Full article content for perspectives/[slug] (from bransol-article.html).
 */

export interface TocItem {
  id: string;
  label: string;
}

export interface ArticleContent {
  slug: string;
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  dateShort: string;
  readTime: string;
  author: string;
  authorRole: string;
  excerpt: string;
  tags: string[];
  illustrationColor: [string, string, string];
  toc: TocItem[];
  content: string;
}

// Full content for each article (excerpts + key sections to keep file size manageable)
const ARTICLE_CONTENT: ArticleContent[] = [
  {
    slug: "why-government-design-procurement-is-broken",
    title: "Why Government Design Procurement Is Still Broken — And What It Would Take to Fix It",
    category: "Procurement",
    categoryColor: "var(--aqua)",
    date: "18 February 2026",
    dateShort: "18 Feb 2026",
    readTime: "8 min read",
    author: "BRANSOL Editorial",
    authorRole: "Studio",
    excerpt:
      "South Africa spends billions annually on government communications. A fraction of that produces work that is genuinely fit for purpose. The problem is not creative talent. It is the structure through which that talent is commissioned, evaluated, and paid.",
    tags: ["Government", "Procurement", "Design Policy", "Public Sector", "South Africa"],
    illustrationColor: ["#0a0a18", "#0d0f2a", "#06d6a0"],
    toc: [
      { id: "s1", label: "The structural problem" },
      { id: "s2", label: "How evaluation criteria fail" },
      { id: "s3", label: "The lowest-price fallacy" },
      { id: "s4", label: "What good commissioning looks like" },
      { id: "s5", label: "A path forward" },
    ],
    content: `
      <p>South Africa's government communication apparatus is one of the largest single buyers of design services on the continent. National departments, provincial governments, SOEs, municipalities — collectively they commission billions of rands worth of design work each year. Branding, reports, campaigns, environmental signage, digital platforms, publications. The scale is significant. The quality, on average, is not.</p>
      <p>This is not a talent problem. South Africa has world-class design talent. The problem is structural — baked into the way government procurement frameworks were designed, and perpetuated by a combination of institutional inertia, misaligned incentives, and a fundamental misunderstanding of what design actually is.</p>

      <h2 id="s1">The structural problem</h2>
      <p>Government procurement of design services in South Africa operates through frameworks designed primarily for the procurement of commodities and construction services. The PFMA, PPPFA, and SCM regulations were built to prevent corruption and ensure value for money in contexts where outputs are measurable and comparable. A bag of cement from supplier A is broadly equivalent to a bag of cement from supplier B. Design is not cement.</p>
      <p>When you apply commodity procurement logic to creative services, you get commodity creative services. Agencies are selected primarily on price, with creative and strategic quality weighted so low in evaluation criteria that it is functionally irrelevant.</p>

      <div class="prose-pull">
        "The evaluation criteria for government design tenders rarely assess the thing being procured. They assess the ability to comply with a checklist."
      </div>

      <h2 id="s2">How evaluation criteria fail</h2>
      <p>Walk through any government design tender brief and you will find a familiar set of requirements: BBBEE certificate, tax clearance, company registration, proof of insurance, a portfolio, and a price. The portfolio is rarely evaluated by anyone with design literacy. It exists to satisfy the requirement for a portfolio, not to genuinely inform selection.</p>
      <p>When evaluation panels do assess creative quality, they tend to assess it against two criteria: does it look professional, and does it follow the brief. Neither of these distinguishes good design from mediocre design.</p>

      <h2 id="s3">The lowest-price fallacy</h2>
      <p>There is a persistent belief in government procurement circles that selecting the lowest-price provider represents good stewardship of public funds. It does not. It represents a displacement of risk — the risk of poor quality is moved from the procurement decision to the implementation phase, where it manifests as rework, extensions, disputes, and ultimately, failed communications objectives.</p>

      <h2 id="s4">What good commissioning looks like</h2>
      <p>The organisations that consistently commission excellent design — whether in government or the private sector — share a set of behaviours that distinguish them from the organisations that do not. First, they ensure that someone with genuine design literacy is involved in the evaluation process. Second, they weight quality meaningfully. Third, they brief well.</p>

      <div class="prose-pull">
        "The quality of commissioned design is directly related to the quality of the brief that initiates it."
      </div>

      <h2 id="s5">A path forward</h2>
      <p>Fixing government design procurement is not a simple undertaking. The frameworks are embedded in legislation. The institutional habits are deeply established. But progress is possible. The first step is recognition: acknowledging that design is not a commodity, that procurement frameworks designed for commodities produce consistently poor outcomes when applied to design, and that the cost of those poor outcomes is real and material.</p>
      <p>From recognition, a number of practical reforms follow. Evaluation criteria can be reweighted. Quality assessors with relevant expertise can be included in panels. Briefing processes can be formalised and improved. None of this requires new legislation. It requires will, and a willingness to measure procurement outcomes rather than procurement compliance. South Africa's government communications deserve the distinction.</p>
    `,
  },
  {
    slug: "the-case-for-design-systems-in-enterprise",
    title: "The Case for Design Systems in Enterprise Organisations",
    category: "Strategy",
    categoryColor: "var(--iris)",
    date: "30 January 2026",
    dateShort: "30 Jan 2026",
    readTime: "6 min read",
    author: "BRANSOL Studio",
    authorRole: "Studio",
    excerpt:
      "Enterprise organisations waste millions annually on inconsistent design outputs. A well-governed design system is not a design team luxury — it is a procurement efficiency tool.",
    tags: ["Design Systems", "Enterprise", "Brand Governance", "Efficiency", "Strategy"],
    illustrationColor: ["#0a0a18", "#131340", "#7c83e5"],
    toc: [
      { id: "s1", label: "The inconsistency cost" },
      { id: "s2", label: "What a design system actually is" },
      { id: "s3", label: "The governance argument" },
      { id: "s4", label: "Implementation reality" },
    ],
    content: `
      <p>Large organisations produce a staggering volume of designed material. Annual reports, investor presentations, campaign assets, environmental signage, digital interfaces, procurement documents, HR communications, event collateral. The list is long, and the organisations producing it rarely have a coherent system governing how any of it looks or behaves.</p>
      <p>The result is inconsistency — not the harmless kind, but the kind that costs money. Duplicate production. Conflicting visual languages. Materials that undermine each other's credibility.</p>

      <h2 id="s1">The inconsistency cost</h2>
      <p>Most enterprise organisations do not have a clear picture of what they spend on design annually. The spend is distributed across departments, absorbed into event budgets, communications budgets, HR budgets, and project budgets. When it is consolidated, the numbers are consistently surprising.</p>

      <div class="prose-pull">
        "A design system is not an aesthetic exercise. It is an operational infrastructure investment with a measurable return."
      </div>

      <h2 id="s2">What a design system actually is</h2>
      <p>The term "design system" is widely used and variably understood. In some contexts it refers to a UI component library for digital products. In others, it means a brand guidelines document. Neither of these is wrong, but neither captures what a fully realised design system is: a governed set of principles, components, and rules that enables an organisation to produce consistently excellent design output at scale, across teams, over time.</p>

      <h2 id="s3">The governance argument</h2>
      <p>Governance is where most enterprise design system initiatives fail. An organisation invests in building the system — often at significant cost — and then treats it as a completed project. Effective design system governance requires three things: a designated owner with authority, a clear review process for new material, and consequences for non-compliance.</p>

      <h2 id="s4">Implementation reality</h2>
      <p>The most successful design system implementations start smaller than the organisation thinks they should, and they build from demonstrated value rather than comprehensive ambition. Identify the three to five document types that are produced most frequently and consume the most design resource. Build a system for those first. Demonstrate the efficiency gain.</p>
    `,
  },
  {
    slug: "what-procurement-panels-actually-want",
    title: "What Procurement Panels Actually Want From a Design Agency",
    category: "Procurement",
    categoryColor: "var(--aqua)",
    date: "14 January 2026",
    dateShort: "14 Jan 2026",
    readTime: "5 min read",
    author: "BRANSOL Studio",
    authorRole: "Studio",
    excerpt:
      "The evaluation criteria for formal design tenders rarely align with what good design actually requires. Here is what committees are really assessing — and how agencies consistently misread it.",
    tags: ["Procurement", "Tenders", "Agency", "Evaluation", "Pitching"],
    illustrationColor: ["#060814", "#0a1020", "#06d6a0"],
    toc: [
      { id: "s1", label: "What panels say they want" },
      { id: "s2", label: "What panels actually assess" },
      { id: "s3", label: "The credibility test" },
      { id: "s4", label: "How agencies misread the room" },
    ],
    content: `
      <p>Most design agencies approach formal tender processes as creative auditions. They put their best work forward, articulate their process with clarity, and present a team that is genuinely capable of delivering the brief. Then they lose to an agency that produced a cheaper price and a more compliant submission document.</p>
      <p>The frustration is understandable. But it misses something important: procurement panels are not primarily assessing creative quality. They are assessing risk. Understanding this distinction is the difference between consistent tender success and consistent tender confusion.</p>

      <h2 id="s1">What panels say they want</h2>
      <p>Read any formal tender brief for design services and you will find a list of evaluation criteria. They typically include: relevant experience, team capability, methodology, transformation credentials, and price. Each criterion, when examined carefully, is a proxy for risk assessment.</p>

      <div class="prose-pull">
        "Procurement panels are not primarily assessing creative quality. They are assessing risk. Understanding this distinction changes everything about how you respond to a brief."
      </div>

      <h2 id="s2">What panels actually assess</h2>
      <p>Beyond the formal criteria, experienced panel members are assessing three things that rarely appear explicitly in the evaluation matrix: credibility, reliability, and fit. Credibility is assessed through the quality and specificity of your case studies. Reliability is assessed through your process documentation.</p>

      <h2 id="s3">The credibility test</h2>
      <p>The credibility test happens in the first three pages of your submission. Panels read dozens of agency submissions. They develop heuristics quickly. An agency that opens with a capabilities overview and a list of services has already failed the credibility test.</p>

      <h2 id="s4">How agencies misread the room</h2>
      <p>The most common error we observe in agency tender submissions is a mismatch between what the agency wants to demonstrate and what the panel wants to assess. Agencies want to demonstrate creative excellence. Panels want to assess organisational risk. The work needs to be present and excellent — but it needs to be contextualised within a framework that addresses the panel's primary concern.</p>
    `,
  },
  {
    slug: "brand-identity-is-not-a-logo",
    title: "A Brand Identity Is Not a Logo — It Is an Operating System",
    category: "Brand Identity",
    categoryColor: "var(--violet)",
    date: "10 December 2025",
    dateShort: "10 Dec 2025",
    readTime: "7 min read",
    author: "BRANSOL Studio",
    authorRole: "Studio",
    excerpt:
      "Organisations that treat brand identity as a visual exercise routinely underinvest in it and overreact when it fails. The organisations that get lasting value from identity work understand what it actually is.",
    tags: ["Brand Identity", "Strategy", "Visual Systems", "Brand Management"],
    illustrationColor: ["#0e0814", "#1a0d2e", "#c77dff"],
    toc: [
      { id: "s1", label: "The logo fallacy" },
      { id: "s2", label: "What identity actually governs" },
      { id: "s3", label: "The system mindset" },
      { id: "s4", label: "Why identity work fails" },
    ],
    content: `
      <p>When an organisation decides it needs a new brand identity, the conversation almost always begins with the logo. This is understandable. The logo is visible. It is the part of an identity that appears on business cards and building signage and social media profiles. But it is the wrong focus — and organisations that understand brand identity as primarily a logo exercise consistently undervalue the work and are consistently disappointed by the outcomes.</p>

      <h2 id="s1">The logo fallacy</h2>
      <p>A logo is a mark. It is a symbol that, through consistent application over time, comes to stand for everything an organisation is and does. The mark itself carries no inherent meaning — it acquires meaning through the quality of the organisation's behaviour, communications, and outputs over time. The logo is one element of an identity system, and it is not the most important element. The most important element is the system.</p>

      <div class="prose-pull">
        "A logo is a mark. The identity is everything that gives that mark meaning — and building it requires considerably more than designing a symbol."
      </div>

      <h2 id="s2">What identity actually governs</h2>
      <p>A fully realised brand identity governs a remarkably broad set of decisions. Typography, colour, photography and illustration, layout, voice. These decisions, taken together, create the experience of a brand. Consistency in this experience builds trust. Inconsistency erodes it.</p>

      <h2 id="s3">The system mindset</h2>
      <p>The organisations that commission the best identity work and get the most lasting value from it approach the engagement with a system mindset. They understand that they are not buying a set of visual assets — they are investing in a governance infrastructure for how their organisation presents itself to the world.</p>

      <h2 id="s4">Why identity work fails</h2>
      <p>Most identity projects that fail to deliver lasting value fail for one of three reasons: insufficient strategic grounding, poor implementation governance, or organisational change that the identity was not designed to accommodate. The organisations that build identity systems with longevity in mind design for the organisation they expect to become, not only for the organisation they currently are.</p>
    `,
  },
  {
    slug: "south-african-design-industry-2026",
    title: "The State of the South African Design Industry Heading Into 2026",
    category: "Industry",
    categoryColor: "var(--gold)",
    date: "20 November 2025",
    dateShort: "20 Nov 2025",
    readTime: "9 min read",
    author: "BRANSOL Editorial",
    authorRole: "Studio",
    excerpt:
      "The industry is bifurcating. On one side, commoditised subscription services and AI-assisted production. On the other, a smaller number of studios doing the work that actually requires senior judgement. The middle is disappearing.",
    tags: ["Industry", "South Africa", "Design Market", "AI", "Trends 2026"],
    illustrationColor: ["#0e0a06", "#1a1408", "#ffd166"],
    toc: [
      { id: "s1", label: "The bifurcation" },
      { id: "s2", label: "AI and the production layer" },
      { id: "s3", label: "The strategic premium" },
      { id: "s4", label: "What survives" },
    ],
    content: `
      <p>The South African design industry enters 2026 in a state of structural tension. On one side, the economics of design production are being compressed by AI tooling, offshore competition, and a client market that has become more price-conscious. On the other, a small number of studios are commanding higher fees for work at the strategic end of the discipline.</p>
      <p>The middle of the market — studios doing competent work at moderate prices — is under the most pressure. This cohort is being squeezed from below by lower-cost producers who can now match their output quality using AI-assisted tools, and from above by clients who are increasingly discerning about the difference between design that is executed and design that is considered.</p>

      <h2 id="s1">The bifurcation</h2>
      <p>Market bifurcation in creative industries is not a new phenomenon. The same dynamic is now playing out in design, accelerated by technology shifts that are compressing the cost of design production faster than they are compressing the cost of design judgement. The upper tier — strategic design, identity systems, commissions with real organisational consequence — is a smaller volume market, but the economics are different.</p>

      <div class="prose-pull">
        "The middle of the market is disappearing. The studios that survive will be the ones that have decided clearly which end they are on — and built everything around that decision."
      </div>

      <h2 id="s2">AI and the production layer</h2>
      <p>AI tooling has genuinely disrupted the production layer of design — the execution of competent visual work at speed. What AI has not done is replace the strategic layer of design. The studios that are navigating the AI transition well are using it to increase the leverage of their senior people.</p>

      <h2 id="s3">The strategic premium</h2>
      <p>There is a meaningful and growing gap between what clients pay for production design and what they pay for strategic design. This gap is not primarily about aesthetics. The gap is about consequences: the difference between design that is produced and design that performs.</p>

      <h2 id="s4">What survives</h2>
      <p>The studios that will be in a materially better position in 2028 than they are today share a set of characteristics. They are positioned at the strategic end of the market. They are using AI tooling to increase the leverage of their senior people rather than to reduce headcount. They are selective about the work they take on. And they are building direct relationships with the decision-makers in client organisations.</p>
    `,
  },
  {
    slug: "why-your-digital-presence-is-your-credentials",
    title: "Your Digital Presence Is Your Credentials Document",
    category: "Digital",
    categoryColor: "var(--sky)",
    date: "08 October 2025",
    dateShort: "08 Oct 2025",
    readTime: "5 min read",
    author: "BRANSOL Studio",
    authorRole: "Studio",
    excerpt:
      "Before any formal engagement, procurement panels, CEOs, and marketing directors will have already assessed your digital presence. Most organisations treat it as a brochure. It is closer to a first interview.",
    tags: ["Digital", "Brand", "Credentials", "First Impressions", "Website Strategy"],
    illustrationColor: ["#060a14", "#0a1020", "#45b7d1"],
    toc: [
      { id: "s1", label: "The pre-engagement assessment" },
      { id: "s2", label: "What is actually being evaluated" },
      { id: "s3", label: "The credibility gap" },
      { id: "s4", label: "What good looks like" },
    ],
    content: `
      <p>Every significant design engagement begins before the first conversation. By the time a procurement panel convenes to evaluate submissions, every member has already formed a view of each agency — based on what they found when they searched for the agency online. This pre-engagement assessment is not formal. It is not documented. It carries no official weight in the evaluation matrix. And it shapes the outcome of the process more than most agencies realise.</p>
      <p>The logic is straightforward: if you are commissioning an agency to manage how your organisation is perceived, and that agency's own digital presence is mediocre, what does that tell you about the quality of the work they will produce for you?</p>

      <h2 id="s1">The pre-engagement assessment</h2>
      <p>Decision-makers who commission design services are sophisticated enough to use their experience of an agency's communications as a data point about the agency's capabilities. A marketing director who visits an agency's website and finds a PDF portfolio uploaded in 2019, a blog last updated two years ago, and a homepage that reads like it was written to pass a checklist — that marketing director has already formed a view.</p>

      <div class="prose-pull">
        "The question is not whether your digital presence will be assessed. It will be. The question is whether it is working for you or against you."
      </div>

      <h2 id="s2">What is actually being evaluated</h2>
      <p>What decision-makers are assessing when they review a potential agency's digital presence is not primarily aesthetic. They are assessing evidence of thinking. Does this agency have a point of view? Do they publish ideas that demonstrate strategic intelligence? Does their own brand demonstrate the kind of considered craft they claim to apply to client work?</p>

      <h2 id="s3">The credibility gap</h2>
      <p>The credibility gap is the distance between what an agency claims to do and what its digital presence demonstrates it is capable of. Most agencies have a credibility gap. This gap is particularly damaging for agencies seeking to move into the upper tier of the market.</p>

      <h2 id="s4">What good looks like</h2>
      <p>The digital presence of a high-calibre design agency is distinctive in a specific way: it demonstrates the thinking as much as the making. The work is present and well-presented, but it is contextualised. Each case study explains the strategic problem, the approach, the decisions made, and the outcome. The best agency digital presences are themselves excellent design work — not in the sense of visual novelty, but in the sense of a considered translation of an organisational reality into a compelling communication.</p>
    `,
  },
  {
    slug: "the-cost-of-cheap-design",
    title: "The True Cost of Cheap Design — What Organisations Don't Calculate",
    category: "Strategy",
    categoryColor: "var(--iris)",
    date: "02 September 2025",
    dateShort: "02 Sep 2025",
    readTime: "6 min read",
    author: "BRANSOL Studio",
    authorRole: "Studio",
    excerpt:
      "Organisations that choose the lowest-cost design provider rarely calculate the full cost. Rework, inconsistency, delayed approvals, and reputational exposure add up. We have seen the receipts.",
    tags: ["Strategy", "Procurement", "Cost", "Quality", "ROI"],
    illustrationColor: ["#0a0a18", "#12122a", "#7c83e5"],
    toc: [
      { id: "s1", label: "The hidden cost" },
      { id: "s2", label: "What gets missed" },
    ],
    content: `
      <p>Organisations that choose the lowest-cost design provider rarely calculate the full cost. Rework, inconsistency, delayed approvals, and reputational exposure add up. We have seen the receipts.</p>
      <p>When design is treated as a commodity purchase, the accounting rarely includes the cost of revisions, the cost of delayed launches, the cost of work that is abandoned because it does not meet the brief, or the cost of reputational damage when that work is published anyway. These costs are real. They are material. And they are routinely excluded from the procurement decision.</p>

      <h2 id="s1">The hidden cost</h2>
      <p>The true cost of cheap design is not the fee paid to the agency. It is the sum of the fee, the internal time spent managing the engagement, the revision cycles that exceed the original scope, the opportunity cost of delayed delivery, and the cost of fixing or replacing the work when it fails to meet its objectives. In our experience, organisations that select the lowest-cost design provider often spend two to three times the original fee by the time the work is either completed to an acceptable standard or replaced.</p>

      <h2 id="s2">What gets missed</h2>
      <p>Procurement frameworks that prioritise price above all else are not optimising for economy. They are optimising for the appearance of economy — and shifting the real cost to a part of the organisation that does not get to vote in the procurement process. The design that costs more upfront often costs less over its lifecycle. The design that costs less upfront often costs more. Someone in the organisation will pay that cost. It is rarely the person who made the procurement decision.</p>
    `,
  },
];

export function getArticleSlugs(): string[] {
  return ARTICLE_CONTENT.map((a) => a.slug);
}

export function getArticleBySlug(slug: string): ArticleContent | null {
  return ARTICLE_CONTENT.find((a) => a.slug === slug) ?? null;
}

export function getRelatedArticles(article: ArticleContent, count = 3): ArticleContent[] {
  return ARTICLE_CONTENT.filter((a) => a.slug !== article.slug).slice(0, count);
}
