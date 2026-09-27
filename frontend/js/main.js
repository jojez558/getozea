// ---- Tab switching ----
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);

const tabs = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".panel");
const tabLinks = document.querySelectorAll("[data-tab-link]");
const serviceDetailLinks = document.querySelectorAll("[data-service-detail]");
const menuToggle = document.querySelector(".menu-toggle");
const tabsNav = document.querySelector(".topbar .tabs");
const homeVideo = document.querySelector(".home-video");
const landingPage = document.querySelector(".landing-page");
const landingVideo = document.querySelector(".landing-video");
const landingActions = document.querySelectorAll("[data-landing-action]");
const legalPage = document.querySelector("#legal-page");
const legalTitle = document.querySelector("#legal-title");
const legalContent = document.querySelector("#legal-content");
const legalClose = document.querySelector(".legal-close");
const legalLinks = document.querySelectorAll("[data-legal]");
const chatbot = document.querySelector(".chatbot");
const chatbotToggle = document.querySelector(".chatbot-toggle");
const chatbotPanel = document.querySelector(".chatbot-panel");
const chatbotClose = document.querySelector(".chatbot-close");
const chatbotMessages = document.querySelector(".chatbot-messages");
const chatbotForm = document.querySelector("#chatbot-form");
const chatbotInput = document.querySelector("#chatbot-input");
const chatbotPrompts = document.querySelectorAll("[data-chat-prompt]");
const chatbotTrainToggle = document.querySelector(".chatbot-train-toggle");
const chatbotTraining = document.querySelector("#chatbot-training");
const trainingStatus = document.querySelector(".chatbot-training-status");
const CHATBOT_POSITION_KEY = "getozea-chatbot-position";

const TRAINING_KEY = "getozvea-chatbot-knowledge";

function readTraining() {
  try {
    return JSON.parse(localStorage.getItem(TRAINING_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveTraining(entry) {
  const training = readTraining();
  training.push(entry);
  localStorage.setItem(TRAINING_KEY, JSON.stringify(training));
}

panels.forEach((panel) => {
  panel.hidden = !panel.classList.contains("active");
});

function keepHomeVideoPlaying() {
  if (homeVideo && !homeVideo.paused) return;
  homeVideo?.play().catch(() => {});
}

homeVideo?.addEventListener("canplay", keepHomeVideoPlaying);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    keepHomeVideoPlaying();
    keepLandingVideoPlaying();
  }
});
keepHomeVideoPlaying();

function keepLandingVideoPlaying() {
  if (landingVideo && !landingVideo.paused) return;
  landingVideo?.play().catch(() => {});
}

landingVideo?.addEventListener("canplay", keepLandingVideoPlaying);
keepLandingVideoPlaying();

landingActions.forEach((action) => {
  action.addEventListener("click", () => {
    landingPage?.classList.add("is-dismissed");
    activateTab(
      action.dataset.landingAction === "contact"
        ? "agency-contact"
        : "agency-home",
    );
  });
});

const legalPages = {
  terms: {
    title: "Terms & conditions",
    content: "<h3>Using this website</h3><p>This website presents Getozvea, George Mwaura's web design, development, digital marketing, branding, copywriting, and video editing work. By using the site, you agree to use its information respectfully and lawfully.</p><h3>Project enquiries</h3><p>Information submitted through a contact form is used to understand your enquiry and respond to it. A submitted enquiry does not create a contract until the scope, price, timeline, and responsibilities have been agreed directly.</p><h3>Content and availability</h3><p>Website content is provided for general information and may change as the portfolio and services develop. Specific project terms are confirmed separately with each client.</p>"
  },
  privacy: {
    title: "Privacy policy",
    content: "<h3>Information you choose to send</h3><p>When you use the contact form, the site may collect your name, email address, telephone details, company information, and project message so George can respond to your enquiry.</p><h3>How it is used</h3><p>Your information is used for communication about your enquiry, project planning, and requested services. It is not presented as public content on this website.</p><h3>Local assistant training</h3><p>Questions and answers saved through the free chatbot's Teach feature are stored locally in the browser using local storage. They are not sent to an external AI provider by this site.</p><h3>Your choices</h3><p>You can request clarification about information submitted through the contact form by emailing georgemwaura058@gmail.com.</p>"
  },
  license: {
    title: "License",
    content: "<h3>Portfolio work</h3><p>The written portfolio content, Getozvea branding, photographs, visual design, and custom website presentation belong to George Mwaura or their respective owners unless stated otherwise.</p><h3>Permitted use</h3><p>You may view this website and share links to it. You may not copy, repackage, resell, or present the site's design, writing, branding, or code as your own without written permission.</p><h3>Third-party materials</h3><p>External fonts, platform names, and third-party marks remain the property of their respective owners and are referenced for identification or service communication.</p>"
  }
};

function openLegalPage(pageKey) {
  const page = legalPages[pageKey];
  if (!page || !legalPage) return;
  legalTitle.textContent = page.title;
  legalContent.innerHTML = page.content;
  legalPage.hidden = false;
  document.body.classList.add("legal-page-open");
}

legalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openLegalPage(link.dataset.legal);
  });
});
legalClose?.addEventListener("click", () => {
  legalPage.hidden = true;
  document.body.classList.remove("legal-page-open");
});

function activateTab(tabName) {
  tabs.forEach((b) => b.setAttribute("aria-selected", "false"));
  panels.forEach((p) => {
    p.classList.remove("active");
    p.hidden = true;
  });
  const activeTab = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
  const activePanel = document.getElementById("panel-" + tabName);
  if (!activeTab || !activePanel) return;
  activeTab.setAttribute("aria-selected", "true");
  activePanel.classList.add("active");
  activePanel.hidden = false;
  tabsNav?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
}

const serviceDetails = {
  "digital-marketing": {
    title: "Digital Marketing",
    intro: "A practical marketing system that connects your message, channels, and campaigns to the people most likely to become customers.",
    focus: "Strategy and growth",
    audience: "Businesses ready for consistent visibility",
    outcome: "More qualified attention and enquiries",
    heading: "Make every channel work toward the same business goal.",
    description: "Digital marketing works best when it is not a collection of disconnected posts and adverts. We bring together positioning, content, search, social media, paid campaigns, and measurement so your online presence feels consistent and gives people a clear reason to act.",
    includes: ["Audience and competitor research", "Campaign and content direction", "Search and social media planning", "Conversion-focused calls to action", "Performance review and practical recommendations"],
    process: ["Understand the audience and business objective", "Choose the channels that match the customer journey", "Create, launch, measure, and refine the work"]
  },
  seo: {
    title: "Search Engine Optimization",
    intro: "A clear, long-term SEO foundation that helps the right people find your business when they are actively looking for what you offer.",
    focus: "Search visibility",
    audience: "Businesses competing for local or industry searches",
    outcome: "Stronger discoverability and useful organic traffic",
    heading: "Become easier to find, understand, and trust.",
    description: "SEO is more than adding keywords to a page. We improve the technical structure, content clarity, local relevance, and authority of your website so search engines can understand it and visitors can quickly see its value.",
    includes: ["Website and technical SEO review", "Keyword and search-intent research", "Page titles, headings, and content structure", "Local SEO and business profile guidance", "Content and link-building recommendations"],
    process: ["Audit the current website and search opportunities", "Prioritise fixes by impact and effort", "Publish useful improvements and monitor progress"]
  },
  "social-media": {
    title: "Social Media Marketing",
    intro: "A recognizable social presence built around clear stories, useful content, and consistent interaction with the people you want to reach.",
    focus: "Audience and engagement",
    audience: "Brands building awareness and community",
    outcome: "A stronger voice and more meaningful engagement",
    heading: "Give your brand something worth following.",
    description: "Social media should feel like an extension of your brand, not a stream of random posts. We shape content themes, visual direction, captions, and campaign ideas around the questions and interests of your audience.",
    includes: ["Platform and audience strategy", "Content pillars and monthly ideas", "Caption and visual direction", "Campaign and engagement planning", "Review of reach, response, and next actions"],
    process: ["Define how the brand should sound and look", "Build a repeatable content rhythm", "Learn from audience response and improve the next cycle"]
  },
  "google-ads": {
    title: "Pay Per Click and Google Ads",
    intro: "Focused paid campaigns designed to put your offer in front of high-intent audiences and turn clicks into measurable enquiries.",
    focus: "Paid acquisition",
    audience: "Businesses with a clear offer and conversion goal",
    outcome: "Better-targeted traffic and trackable actions",
    heading: "Put your budget behind the moments that matter.",
    description: "Effective paid advertising starts before the campaign is launched. We connect the audience, message, landing page, budget, and measurement so the campaign can be understood and improved instead of simply spending money for clicks.",
    includes: ["Campaign and audience structure", "Keyword and advert copy planning", "Landing page and call-to-action review", "Conversion tracking recommendations", "Performance checks and optimisation direction"],
    process: ["Set the offer, audience, budget, and success measure", "Build focused campaigns and landing experiences", "Review results and shift attention toward what works"]
  },
  branding: {
    title: "Graphic Design and Branding",
    intro: "A distinctive visual identity that helps your business look credible, communicate clearly, and stay recognizable across every touchpoint.",
    focus: "Visual identity",
    audience: "New, growing, or repositioning businesses",
    outcome: "A clearer and more memorable brand presence",
    heading: "Make the quality of your business visible.",
    description: "Good branding gives your business a visual point of view. We create a considered direction for color, typography, layout, imagery, and supporting assets so your website and marketing materials feel like they belong to one confident brand.",
    includes: ["Brand direction and visual references", "Color and typography selection", "Logo and supporting graphic concepts", "Social and campaign asset direction", "Practical usage guidance for consistency"],
    process: ["Understand the business, audience, and position", "Explore and refine a visual direction", "Deliver a system that can be used consistently"]
  },
  copywriting: {
    title: "Copywriting Services",
    intro: "Clear, persuasive writing that explains your value, sounds like your brand, and guides visitors toward the next useful action.",
    focus: "Message and conversion",
    audience: "Businesses whose offer is hard to explain quickly",
    outcome: "Sharper communication and stronger calls to action",
    heading: "Give your audience the words they need to say yes.",
    description: "Visitors should not have to work hard to understand what you do, who it is for, or why it matters. We shape website and campaign copy around real customer questions, a clear voice, and a practical path from attention to action.",
    includes: ["Website page and section copy", "Brand voice and messaging direction", "Service and product descriptions", "SEO-aware headings and supporting text", "Calls to action and enquiry prompts"],
    process: ["Gather the business knowledge and audience questions", "Shape the message, structure, and tone", "Refine the copy for clarity, confidence, and action"]
  }
};

const serviceExtras = {
  "digital-marketing": {
    subheading: "Build a connected presence instead of isolated campaigns.",
    strategy: "We start with the commercial goal, then map the audience, message, channel, and action needed to move someone from first discovery to serious enquiry.",
    benefits: [
      ["Clearer positioning", "Your audience understands who you help, what you offer, and why your approach is different."],
      ["Smarter channel mix", "Time and budget are focused on channels that match how your customers actually decide."],
      ["Consistent momentum", "A repeatable plan replaces last-minute posting and disconnected campaign ideas."]
    ],
    deliverables: ["Audience and competitor snapshot", "Campaign and content roadmap", "Channel recommendations", "Conversion journey review", "Monthly improvement priorities"],
    tools: ["Search strategy", "Social content", "Email campaigns", "Paid media", "Analytics and reporting"],
    measures: ["Reach and qualified visibility", "Website visits from target audiences", "Enquiry and conversion rate", "Cost per useful action", "Quality of customer feedback"],
    faq: [["Do I need to use every platform?", "No. The right mix depends on your audience, offer, resources, and where decisions are made."], ["How soon will we see results?", "Some improvements can be seen quickly, while trust, search visibility, and consistent growth normally build over several cycles."], ["Can you work with an existing team?", "Yes. We can provide direction, content systems, reviews, or a more hands-on campaign role."]]
  },
  seo: {
    subheading: "Make your website useful to both search engines and real people.",
    strategy: "SEO combines technical clarity, useful content, local relevance, and authority. The work is prioritised around opportunities that can improve visibility without losing the human quality of the page.",
    benefits: [["Better search foundations", "Important pages become easier for crawlers to discover, understand, and index."], ["Intent-led content", "Pages answer the questions people are already asking before they contact a business."], ["Local discoverability", "Your location, services, and contact signals become clearer for nearby customers."]],
    deliverables: ["Technical SEO audit", "Keyword and search-intent map", "On-page optimisation plan", "Local search recommendations", "Content opportunities and reporting priorities"],
    tools: ["Search Console", "Keyword research", "Technical audits", "Local SEO", "Content optimisation"],
    measures: ["Indexed and technically healthy pages", "Ranking movement for relevant terms", "Organic visits from target searches", "Engagement on optimised pages", "Organic enquiries over time"],
    faq: [["Can SEO guarantee a number-one ranking?", "No honest SEO service can guarantee that. We can improve the foundations, relevance, and quality of your search presence."], ["Is SEO only for large companies?", "No. Local businesses can benefit significantly when their services and location are clearly represented."], ["Will SEO replace advertising?", "SEO and advertising can support each other. One builds durable visibility while the other creates controlled short-term reach."]]
  },
  "social-media": {
    subheading: "Turn your social channels into a recognizable brand experience.",
    strategy: "We build around repeatable content pillars so your audience sees a coherent point of view: what you know, what you offer, how you work, and why people should trust you.",
    benefits: [["A recognisable voice", "Your captions, visuals, and responses feel connected across platforms."], ["Better content decisions", "Ideas are selected for a purpose instead of filling a calendar for its own sake."], ["Stronger community", "Useful interaction gives people a reason to remember and recommend the brand."]],
    deliverables: ["Platform and audience direction", "Content pillars", "Monthly content themes", "Caption and creative guidance", "Engagement and review plan"],
    tools: ["Instagram", "Facebook", "LinkedIn", "Short-form video", "Community management"],
    measures: ["Reach within the intended audience", "Saves, shares, comments, and replies", "Profile and website actions", "Content consistency", "Leads assisted by social content"],
    faq: [["Do you create the actual posts?", "That can be included. We can provide strategy, written direction, finished content, or a system your team can operate."], ["How often should a business post?", "Consistency and usefulness matter more than an arbitrary number. The rhythm should match your capacity and audience."], ["Which platform is best?", "The best platform is where your audience pays attention and your business can contribute consistently."]]
  },
  "google-ads": {
    subheading: "Make paid traffic accountable from the first click.",
    strategy: "A campaign is only as strong as the relationship between the search, the advert, the landing page, and the action after the click. We review that whole path before recommending spend.",
    benefits: [["Controlled reach", "Put a relevant offer in front of people with a current need or clear search intent."], ["Useful measurement", "Separate impressions and clicks from the actions that actually matter to the business."], ["Continuous improvement", "Use campaign data to refine terms, audiences, messages, and landing experiences."]],
    deliverables: ["Campaign structure", "Keyword and audience plan", "Advert copy direction", "Landing page recommendations", "Conversion and optimisation checklist"],
    tools: ["Google Search Ads", "Display campaigns", "Remarketing", "Landing pages", "Conversion tracking"],
    measures: ["Qualified click-through rate", "Cost per enquiry", "Conversion rate", "Search term quality", "Return against campaign objective"],
    faq: [["How much should I spend?", "Budget depends on demand, competition, margins, and the value of a customer. We recommend starting with a measurable test."], ["Can ads fix a weak offer?", "No. Advertising can create attention, but the offer, page, trust signals, and follow-up still need to earn the enquiry."], ["Do you manage campaigns after launch?", "Yes. Ongoing review is where wasted spend is reduced and stronger opportunities are found."]]
  },
  branding: {
    subheading: "Create a visual identity people can recognise and trust.",
    strategy: "Branding turns the character of a business into a usable visual system. We balance distinctiveness with clarity so the result works on a website, social post, document, screen, or printed touchpoint.",
    benefits: [["A stronger first impression", "The visual quality of the brand reflects the seriousness of the work behind it."], ["Consistency at every touchpoint", "A shared system stops each poster, page, and social profile from looking unrelated."], ["Room to grow", "The identity is designed as a flexible foundation, not just a one-off logo."]],
    deliverables: ["Visual direction", "Logo or wordmark concepts", "Color and type system", "Graphic and image direction", "Practical brand usage notes"],
    tools: ["Brand strategy", "Logo design", "Typography", "Color systems", "Social and web assets"],
    measures: ["Recognition and recall", "Consistency across assets", "Clarity of brand message", "Audience confidence", "Ease of producing new materials"],
    faq: [["Do I only receive a logo?", "No. A useful identity includes the decisions around color, typography, layout, imagery, and how the logo is used."], ["Can an existing brand be refreshed?", "Yes. We can preserve what has recognition while improving clarity, consistency, and relevance."], ["Will the brand work on mobile?", "The system is designed to remain clear at small sizes and across responsive digital layouts."]]
  },
  copywriting: {
    subheading: "Make the value of your business easier to understand.",
    strategy: "We organise the message around customer questions and decisions: what is this, is it for me, why should I believe it, and what should I do next?", 
    benefits: [["Sharper message", "The most important value is clear before a visitor has to search for it."], ["Stronger brand voice", "The business sounds consistent, credible, and human across pages and campaigns."], ["More useful action", "Calls to action guide visitors toward an appropriate next step instead of creating pressure or confusion."]],
    deliverables: ["Website page copy", "Service and product descriptions", "Headline and CTA options", "Brand voice guidance", "SEO-aware content structure"],
    tools: ["Customer interviews", "Message architecture", "Website copy", "Campaign copy", "Editing and refinement"],
    measures: ["Message clarity in user feedback", "Time spent on important pages", "Scroll and interaction depth", "Enquiry quality", "Improvement in conversion actions"],
    faq: [["Do you need a complete brief first?", "We can work from an existing brief or help create one through a focused discovery conversation."], ["Can you match an existing brand voice?", "Yes. We study existing materials, audience expectations, and the tone you want to develop."], ["Is copywriting only for websites?", "No. It can support campaigns, social content, proposals, product descriptions, and email communication."]]
  }
};

const processPhaseTitles = {
  "digital-marketing": ["Discovery and goals", "Channel planning", "Launch and improve"],
  seo: ["Audit and opportunity", "Prioritise the work", "Publish and measure"],
  "social-media": ["Define the voice", "Build the content rhythm", "Learn and refine"],
  "google-ads": ["Set the campaign goal", "Build the experience", "Optimise the spend"],
  branding: ["Understand the position", "Shape the visual direction", "Create the system"],
  copywriting: ["Gather the insight", "Shape the message", "Edit for action"]
};

const processPhaseDescriptions = {
  "digital-marketing": ["We clarify the audience, offer, and business result the work must support.", "We select the channels and messages that fit the customer journey and available resources.", "We release the work, review the response, and use evidence to improve the next cycle."],
  seo: ["We inspect the site, content, technical health, and search opportunities before recommending changes.", "We rank improvements by likely impact so the most valuable work happens first.", "We publish useful changes and monitor visibility, engagement, and enquiries over time."],
  "social-media": ["We establish the tone, visual character, audience, and themes the brand should own.", "We turn those themes into a realistic calendar of useful, recognisable content.", "We study what people respond to and refine the next set of ideas instead of repeating blindly."],
  "google-ads": ["We define the offer, audience, budget, landing page, and success measure before spending.", "We connect the advert to a focused destination with a clear and trackable action.", "We review search terms and conversions, then direct budget toward the strongest opportunities."],
  branding: ["We understand the business, audience, competitors, and position the identity needs to express.", "We explore color, type, imagery, layout, and mark direction until the visual language feels right.", "We organise the chosen direction into practical assets and guidance the business can use consistently."],
  copywriting: ["We gather the business knowledge, customer questions, proof points, and desired tone.", "We organise the words around clarity, credibility, and the decisions the reader needs to make.", "We edit for rhythm, precision, search awareness, and a clear next action." ]
};

function showServiceDetail(serviceKey) {
  const detail = serviceDetails[serviceKey];
  if (!detail) return;

  document.getElementById("service-detail-title").textContent = detail.title;
  document.getElementById("service-detail-intro").textContent = detail.intro;
  document.getElementById("service-detail-focus").textContent = detail.focus;
  document.getElementById("service-detail-audience").textContent = detail.audience;
  document.getElementById("service-detail-outcome").textContent = detail.outcome;
  document.getElementById("service-detail-heading").textContent = detail.heading;
  document.getElementById("service-detail-description").textContent = detail.description;
  document.getElementById("service-detail-list").innerHTML = detail.includes
    .map((item) => `<li>${item}</li>`)
    .join("");
  document.getElementById("service-detail-process").innerHTML = detail.process
    .map((step, index) => `<div><b>0${index + 1}</b><section><strong>${processPhaseTitles[serviceKey][index]}</strong><span>${processPhaseDescriptions[serviceKey][index]}</span></section></div>`)
    .join("");
  const extra = serviceExtras[serviceKey];
  document.getElementById("service-detail-subheading").textContent = extra.subheading;
  document.getElementById("service-detail-strategy").textContent = extra.strategy;
  document.getElementById("service-detail-benefits").innerHTML = extra.benefits
    .map(([title, text], index) => `<article><b>0${index + 1}</b><h3>${title}</h3><p>${text}</p></article>`)
    .join("");
  document.getElementById("service-detail-deliverables").innerHTML = extra.deliverables
    .map((item) => `<span>${item}</span>`)
    .join("");
  document.getElementById("service-detail-tools").innerHTML = extra.tools
    .map((item) => `<span>${item}</span>`)
    .join("");
  document.getElementById("service-detail-measures").innerHTML = extra.measures
    .map((item) => `<div><b>+</b><span>${item}</span></div>`)
    .join("");
  document.getElementById("service-detail-faq").innerHTML = extra.faq
    .map(([question, answer], index) => `<details ${index === 0 ? "open" : ""}><summary>${question}</summary><p>${answer}</p></details>`)
    .join("");

  tabs.forEach((button) => button.setAttribute("aria-selected", "false"));
  document.querySelector('[data-tab="agency-home"]')?.setAttribute("aria-selected", "true");
  panels.forEach((panel) => {
    panel.classList.remove("active");
    panel.hidden = true;
  });
  const detailPanel = document.getElementById("panel-agency-service-detail");
  detailPanel.classList.add("active");
  detailPanel.hidden = false;
  tabsNav?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
}

window.showServiceDetail = showServiceDetail;

tabs.forEach((btn) => {
  btn.addEventListener("click", () => activateTab(btn.dataset.tab));
});

tabLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    activateTab(link.dataset.tabLink);
  });
});

serviceDetailLinks.forEach((link) => {
  link.addEventListener("click", () => showServiceDetail(link.dataset.serviceDetail));
});

document.addEventListener("click", (event) => {
  const serviceLink = event.target.closest("[data-service-detail]");
  if (!serviceLink) return;
  event.preventDefault();
  showServiceDetail(serviceLink.dataset.serviceDetail);
});

menuToggle?.addEventListener("click", () => {
  const isOpen = tabsNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

const chatbotReplies = [
  {
    terms: ["web design", "website design", "website development", "build a website", "website"],
    reply: "Getozvea creates responsive websites for businesses, personal brands, and growing ideas. The work can include structure, visual design, frontend development, backend features, contact forms, SEO foundations, testing, and launch support."
  },
  {
    terms: ["seo", "search engine", "google ranking", "be found", "search visibility"],
    reply: "The SEO service covers technical review, keyword and search-intent research, page structure, local search guidance, useful content opportunities, and measurement. The goal is stronger visibility for relevant searches, not empty ranking promises."
  },
  {
    terms: ["social media", "instagram", "facebook", "linkedin", "social marketing"],
    reply: "Social media work includes audience and platform direction, content pillars, monthly themes, caption and visual guidance, engagement planning, and review of reach, response, and website actions."
  },
  {
    terms: ["google ads", "pay per click", "ppc", "paid ads", "advertising"],
    reply: "Google Ads and PPC work connects campaign structure, keywords, advert copy, landing pages, conversion tracking, and ongoing optimisation. The focus is qualified traffic and measurable enquiries, not clicks alone."
  },
  {
    terms: ["branding", "brand identity", "logo", "graphic design", "visual identity"],
    reply: "Branding can include visual direction, logo or wordmark concepts, color and typography systems, imagery guidance, social assets, and practical usage notes so the business looks consistent everywhere."
  },
  {
    terms: ["copywriting", "website words", "website content", "write content", "content writing"],
    reply: "Copywriting covers website pages, service descriptions, headlines, calls to action, brand voice, campaign copy, and SEO-aware content structure. The aim is to make the offer clear, credible, and easier to act on."
  },
  {
    terms: ["ecommerce", "e-commerce", "online store", "sell online", "shop"],
    reply: "The Pricing page includes e-commerce options for online stores with product listings, secure checkout, M-Pesa, cards, PayPal, analytics, WhatsApp support, and post-launch support depending on the package."
  },
  {
    terms: ["starter website", "business website", "premium website", "website package"],
    reply: "Website packages include Starter, Business, and Premium options. They differ by page count, business emails, hosting, SEO and analytics support, speed optimisation, and support period. Visit Pricing or request a recommendation for your exact needs."
  },
  {
    terms: ["how long", "timeline", "time to build", "delivery time", "when can"],
    reply: "Timing depends on the number of pages, content readiness, features, feedback speed, and integrations. A clear timeline is agreed after the goals and scope are understood."
  },
  {
    terms: ["mobile", "responsive", "phone", "tablet"],
    reply: "Responsive design is part of the approach. Layouts, navigation, forms, typography, and content are checked across phone, tablet, and desktop sizes so the experience remains usable everywhere."
  },
  {
    terms: ["cms", "content management", "admin panel", "update website", "edit website"],
    reply: "The Getozvea project includes a purpose-built CMS concept with authenticated administration, editable text, services, portfolio entries, image uploads, contact details, and stored enquiries without editing code."
  },
  {
    terms: ["getozvea project", "technical report", "project report", "case study"],
    reply: "The Portfolio Report explains the Getozvea project from background and requirements through architecture, UX, implementation, testing, deployment, risks, limitations, references, and future recommendations."
  },
  {
    terms: ["node", "express", "javascript", "technology", "tech stack"],
    reply: "The featured Getozvea system uses HTML, CSS, JavaScript, Node.js, and Express. It uses a lightweight backend, structured content storage, authenticated administration, image handling, and contact form storage."
  },
  {
    terms: ["where are you", "location", "based", "office", "karatina", "kitale"],
    reply: "Getozvea is based in Karatina, Kenya, with George connected to both Karatina and Kitale. Projects can be discussed remotely as well as locally."
  },
  {
    terms: ["email address", "email you", "send email"],
    reply: "For a formal project enquiry, email georgemwaura058@gmail.com. Include your name, business, project goal, required service, useful links, and preferred timeline."
  },
  {
    terms: ["phone number", "call you", "whatsapp number", "safaricom"],
    reply: "You can call or WhatsApp George on +254 738 026 731. The alternative Safaricom line is +254 748 505 966."
  },
  {
    terms: ["student", "education", "university", "course", "kcse", "school"],
    reply: "George Mwaura Mungai is a third-year student at Karatina University. He attended St. Mark's Boys High School, Cherangani, and attained a B plain at KCSE."
  },
  {
    terms: ["video editing", "videos", "video editor", "digital media"],
    reply: "Alongside web design and development, George works in video editing and digital media. This can support promotional content, social media storytelling, and visual communication for digital projects."
  },
  {
    terms: ["service", "offer", "do you do", "help"],
    reply: "Getozvea offers web design and development, digital marketing, SEO, social media marketing, Google Ads, branding, and copywriting. Choose Services in the navigation or open a service card for the full breakdown."
  },
  {
    terms: ["process", "work", "approach", "start"],
    reply: "The process starts with discovery and goals, continues through strategy and design, then moves into implementation, testing, launch, and ongoing improvement. Each service page explains its own phases in detail."
  },
  {
    terms: ["price", "pricing", "cost", "how much", "budget"],
    reply: "Website packages and e-commerce options are available on the Pricing page. For a precise recommendation, send a formal project enquiry with your goals, pages, features, and timeline."
  },
  {
    terms: ["portfolio", "work", "project", "example"],
    reply: "You can explore the current work and the full Getozvea technical portfolio report from Our Works and Portfolio Report. The report explains the architecture, design decisions, testing, and lessons behind the project."
  },
  {
    terms: ["contact", "email", "message", "reach", "phone", "whatsapp"],
    reply: "You can send a formal enquiry through Contact Us, email georgemwaura058@gmail.com, or call/WhatsApp +254 738 026 731. I am based between Kitale and Karatina, Kenya."
  },
  {
    terms: ["about", "george", "who", "founder"],
    reply: "George Mwaura Mungai is a third-year Karatina University student working across web design, development, and video editing. Visit About Us for the full professional profile."
  }
];

function addChatMessage(text, type) {
  const message = document.createElement("div");
  message.className = `chat-message chat-message-${type}`;
  message.textContent = text;
  chatbotMessages?.appendChild(message);
  if (chatbotMessages) chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getChatbotReply(question) {
  const normalized = question.toLowerCase();
  const trainedMatch = readTraining().find((entry) =>
    normalized.includes(entry.question.toLowerCase()),
  );
  if (trainedMatch) return trainedMatch.answer;
  const match = chatbotReplies.find((entry) =>
    entry.terms.some((term) => normalized.includes(term)),
  );
  return match?.reply || "I can help with services, process, pricing, portfolio, contact details, or George's professional profile. Try one of those topics, or send a formal message through Contact Us.";
}

function openChatbot() {
  if (!chatbotPanel || !chatbotToggle) return;
  chatbotPanel.hidden = false;
  chatbot.classList.add("is-open");
  chatbotToggle.setAttribute("aria-expanded", "true");
  requestAnimationFrame(positionChatbotPanel);
  chatbotInput?.focus();
}

function clampChatbotPosition(left, top) {
  if (!chatbot) return;
  const bounds = chatbot.getBoundingClientRect();
  const safeLeft = Math.max(8, Math.min(left, window.innerWidth - bounds.width - 8));
  const safeTop = Math.max(8, Math.min(top, window.innerHeight - bounds.height - 8));
  chatbot.style.left = `${safeLeft}px`;
  chatbot.style.top = `${safeTop}px`;
  chatbot.style.right = "auto";
  chatbot.style.bottom = "auto";
  chatbot.style.transform = "none";
}

function positionChatbotPanel() {
  if (!chatbotPanel || chatbotPanel.hidden || !chatbotToggle) return;
  const trigger = chatbotToggle.getBoundingClientRect();
  chatbotPanel.style.position = "fixed";
  chatbotPanel.style.right = "auto";
  chatbotPanel.style.bottom = "auto";
  chatbotPanel.style.left = "0px";
  chatbotPanel.style.top = "0px";

  const panel = chatbotPanel.getBoundingClientRect();
  const left = Math.max(12, Math.min(trigger.right - panel.width, window.innerWidth - panel.width - 12));
  const above = trigger.top - panel.height - 12;
  const top = above >= 12
    ? above
    : Math.min(trigger.bottom + 12, window.innerHeight - panel.height - 12);
  chatbotPanel.style.left = `${left}px`;
  chatbotPanel.style.top = `${Math.max(12, top)}px`;
}

try {
  const savedPosition = JSON.parse(localStorage.getItem(CHATBOT_POSITION_KEY) || "null");
  if (savedPosition && Number.isFinite(savedPosition.left) && Number.isFinite(savedPosition.top)) {
    requestAnimationFrame(() => clampChatbotPosition(savedPosition.left, savedPosition.top));
  }
} catch {}

let chatbotDrag = null;
let suppressChatbotClick = false;

chatbotToggle?.addEventListener("pointerdown", (event) => {
  if (!chatbotPanel?.hidden || (event.pointerType === "mouse" && event.button !== 0)) return;
  const bounds = chatbot.getBoundingClientRect();
  chatbotDrag = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    left: bounds.left,
    top: bounds.top,
    moved: false,
  };
  chatbotToggle.setPointerCapture(event.pointerId);
});

chatbotToggle?.addEventListener("pointermove", (event) => {
  if (!chatbotDrag || event.pointerId !== chatbotDrag.pointerId) return;
  const deltaX = event.clientX - chatbotDrag.startX;
  const deltaY = event.clientY - chatbotDrag.startY;
  if (!chatbotDrag.moved && Math.hypot(deltaX, deltaY) < 7) return;
  chatbotDrag.moved = true;
  event.preventDefault();
  chatbot.classList.add("is-dragging");
  clampChatbotPosition(chatbotDrag.left + deltaX, chatbotDrag.top + deltaY);
});

function finishChatbotDrag(event) {
  if (!chatbotDrag || event.pointerId !== chatbotDrag.pointerId) return;
  if (chatbotDrag.moved) {
    const bounds = chatbot.getBoundingClientRect();
    localStorage.setItem(CHATBOT_POSITION_KEY, JSON.stringify({ left: bounds.left, top: bounds.top }));
    suppressChatbotClick = true;
  }
  chatbot.classList.remove("is-dragging");
  chatbotDrag = null;
}

chatbotToggle?.addEventListener("pointerup", finishChatbotDrag);
chatbotToggle?.addEventListener("pointercancel", finishChatbotDrag);
window.addEventListener("resize", () => {
  if (chatbot?.style.left) {
    const bounds = chatbot.getBoundingClientRect();
    clampChatbotPosition(bounds.left, bounds.top);
  }
  positionChatbotPanel();
});

function closeChatbot() {
  if (!chatbotPanel || !chatbotToggle) return;
  chatbotPanel.hidden = true;
  chatbot.classList.remove("is-open");
  chatbotToggle.setAttribute("aria-expanded", "false");
}

chatbotToggle?.addEventListener("click", () => {
  if (suppressChatbotClick) {
    suppressChatbotClick = false;
    return;
  }
  chatbotPanel?.hidden ? openChatbot() : closeChatbot();
});
chatbotClose?.addEventListener("click", closeChatbot);
chatbotTrainToggle?.addEventListener("click", () => {
  if (!chatbotTraining || !chatbotTrainToggle) return;
  chatbotTraining.hidden = !chatbotTraining.hidden;
  chatbotTrainToggle.setAttribute("aria-expanded", String(!chatbotTraining.hidden));
  if (!chatbotTraining.hidden) chatbotTraining.querySelector("input")?.focus();
});
chatbotPrompts.forEach((prompt) => {
  prompt.addEventListener("click", () => {
    const question = prompt.dataset.chatPrompt;
    addChatMessage(question, "user");
    addChatMessage(getChatbotReply(question), "bot");
  });
});
chatbotForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = chatbotInput.value.trim();
  if (!question) return;
  addChatMessage(question, "user");
  addChatMessage(getChatbotReply(question), "bot");
  chatbotInput.value = "";
});

chatbotTraining?.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = chatbotTraining.querySelector("#training-question").value.trim();
  const answer = chatbotTraining.querySelector("#training-answer").value.trim();
  if (!question || !answer) return;
  saveTraining({ question, answer });
  chatbotTraining.reset();
  if (trainingStatus) trainingStatus.textContent = "Saved. The assistant will use this answer next time.";
});

// ---- Contact form -> backend API ----
const API_BASE = window.API_BASE_URL || "https://getozea.onrender.com";

const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");
const agencyQuoteForm = document.getElementById("agency-quote-form");
const agencyQuoteStatus = document.getElementById("agency-quote-status");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector(".form-submit");
    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    submitBtn.disabled = true;
    statusEl.textContent = "Sending…";
    statusEl.className = "form-status";

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      statusEl.textContent =
        "Message sent — thanks, I'll get back to you soon.";
      statusEl.className = "form-status ok";
      form.reset();
    } catch (err) {
      statusEl.textContent =
        "Something went wrong sending that. Please try again, or email me directly.";
      statusEl.className = "form-status err";
    } finally {
      submitBtn.disabled = false;
    }
  });
}

if (agencyQuoteForm) {
  agencyQuoteForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = agencyQuoteForm.querySelector("button[type='submit']");
    const data = new FormData(agencyQuoteForm);
    const firstName = String(data.get("firstName") || "").trim();
    const lastName = String(data.get("lastName") || "").trim();
    const details = String(data.get("projectDetails") || "").trim();
    const selectedServices = [
      ...agencyQuoteForm.querySelectorAll("input[type='checkbox']:checked"),
    ]
      .map((checkbox) => checkbox.parentElement.textContent.trim())
      .join(", ");

    submitButton.disabled = true;
    agencyQuoteStatus.textContent = "Sending request...";
    agencyQuoteStatus.className = "form-status";

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email: String(data.get("email") || "").trim(),
          message: `${details}\n\nServices: ${selectedServices || "Not specified"}`,
        }),
      });
      if (!response.ok) throw new Error("Request failed");
      agencyQuoteStatus.textContent = "Thanks. Your request has been sent.";
      agencyQuoteStatus.className = "form-status ok";
      agencyQuoteForm.reset();
    } catch {
      agencyQuoteStatus.textContent =
        "Unable to send right now. Please email georgemwaura058@gmail.com.";
      agencyQuoteStatus.className = "form-status err";
    } finally {
      submitButton.disabled = false;
    }
  });
}
