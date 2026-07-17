export const palette = {
  accent: "#F73914",
  lime: "#E0F714",
  pink: "#F7148D",
  purple: "#8D14F7",
  blue: "#5141F7",
} as const;

export const site = {
  name: "Alba Studio",
  founder: "Cansu Albayrak",
  tagline: "Minimal work. Loud ideas.",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Artworks", href: "/artworks" },
  { label: "Writing", href: "/writing" },
  { label: "Future Projects", href: "/future-projects" },
  { label: "Contact", href: "/contact" },
];

export const home = {
  hero: {
    eyebrow: "Studio",
    headline: "Minimal, gallery-first design for bold ideas.",
    subline:
      "Brand strategy, visual identity, and photography—crafted with quiet confidence and sharp detail.",
    ctas: [
      { label: "View Works", href: "/work" },
      { label: "Contact", href: "/contact" },
    ],
  },
  // A diverse pick of 4 projects for the Featured Works preview on the home page.
  featuredWorkSlugs: [
    "la28-social-media-plan",
    "redbull-brand-manifesto",
    "hunter-spring-collection",
    "moleskine-sub-brand",
  ] as string[],
} as const;

export type ContentBlock =
  | { type: "image"; src: string; alt: string }
  | { type: "text"; content: string };

export type WorkItem = {
  slug: string;
  title: string;
  year: string;
  // One-line description shown under the title on the /work grid card.
  subtitle?: string;
  cover: string;
  // Shown on the project detail page as "date · type · note".
  meta?: { date: string; type: string; note: string };
  // Ordered image/text blocks for the project detail page. Editors can add
  // new blocks here without touching any component code. Items without a
  // `content` array fall back to a simple cover-image-only detail page.
  content?: ContentBlock[];
};

// Real project titles from the reference portfolio. Cover images are
// temporary placeholders reused from the existing /works/*.png set until
// actual project imagery is supplied — swap `cover` (and add `content`
// blocks) per project once that's available.
export const works: WorkItem[] = [
  {
    slug: "la28-social-media-plan",
    title: "Social Media Plan: LA28 Olympic Games",
    year: "2025",
    subtitle: "A communication plan for the Los Angeles Olympics",
    cover: "/works/ph1.png",
    meta: { date: "2025", type: "Academic Project", note: "Short-Story Advertising" },
  },
  {
    slug: "redbull-brand-manifesto",
    title: "Redbull Brand Manifesto Video",
    year: "2025",
    subtitle: "Video content built on a brand manifesto",
    cover: "/works/ex1.png",
    meta: { date: "2025", type: "Academic Project", note: "Advertising II" },
  },
  {
    slug: "esa-brand-awareness",
    title: "ESA – Brand Awareness Campaign",
    year: "2025",
    subtitle: "An awareness campaign for the European Space Agency",
    cover: "/works/ty1.png",
    meta: { date: "2025", type: "Academic Project", note: "Advertising II" },
  },
  {
    slug: "hunter-spring-collection",
    title: "Hunter: Spring Collection",
    year: "2025",
    subtitle: "A seasonal campaign for Hunter",
    cover: "/works/pa1.png",
    meta: { date: "2025", type: "Academic Project", note: "Advertising II" },
  },
  {
    slug: "daily-pages-of-a-lost-man",
    title: "Daily Pages Of A Lost Man",
    year: "2025",
    subtitle: "A personal editorial narrative",
    cover: "/works/cl1.png",
    meta: { date: "2025", type: "Personal Project", note: "Editorial" },
  },
  {
    slug: "campari-new-positioning",
    title: "Campari: A New Positioning",
    year: "2025",
    subtitle: "A brand positioning exploration for Campari",
    cover: "/works/pr1.png",
    meta: { date: "2025", type: "Academic Project", note: "Advertising I" },
  },
  {
    slug: "alba-typeface",
    title: "Type Design: Alba Typeface",
    year: "2025",
    subtitle: "An original display typeface",
    cover: "/works/cl2.png",
    meta: { date: "2025", type: "Personal Project", note: "Type Design" },
  },
  {
    slug: "moleskine-sub-brand",
    title: "Moleskine: Creating a New Sub-Brand",
    year: "2025",
    subtitle: "A sub-brand identity system for Moleskine",
    cover: "/works/pa2.png",
    meta: { date: "2025", type: "Academic Project", note: "Basic and Logo Design" },
  },
  {
    slug: "tictac-summer-campaign",
    title: "Tic Tac: Summer Campaign",
    year: "2025",
    subtitle: "A seasonal campaign for Tic Tac",
    cover: "/works/pa3.png",
    meta: { date: "2025", type: "Academic Project", note: "Advertising I" },
  },
];

export type Artwork = {
  slug: string;
  title: string;
  image: string;
  // Intrinsic dimensions so the masonry grid can render each piece at its
  // own natural aspect ratio instead of cropping it into a fixed box.
  width: number;
  height: number;
};

// Placeholder gallery — reuses the existing /works/*.png files until a
// dedicated set of artwork photography is available. Replace the `image`
// values (and add more entries) once real artwork scans/photos are ready.
export const artworks: Artwork[] = [
  { slug: "study-01", title: "Study I", image: "/works/cl1.png", width: 532, height: 700 },
  { slug: "study-02", title: "Study II", image: "/works/cl2.png", width: 711, height: 697 },
  { slug: "study-03", title: "Study III", image: "/works/ph1.png", width: 645, height: 637 },
  { slug: "study-04", title: "Study IV", image: "/works/ph2.png", width: 641, height: 640 },
  { slug: "study-05", title: "Study V", image: "/works/ph3.png", width: 638, height: 645 },
  { slug: "study-06", title: "Study VI", image: "/works/pa1.png", width: 558, height: 698 },
  { slug: "study-07", title: "Study VII", image: "/works/pa2.png", width: 920, height: 647 },
  { slug: "study-08", title: "Study VIII", image: "/works/pa3.png", width: 573, height: 572 },
  { slug: "study-09", title: "Study IX", image: "/works/pa4.png", width: 568, height: 571 },
  { slug: "study-10", title: "Study X", image: "/works/pr1.png", width: 736, height: 516 },
  { slug: "study-11", title: "Study XI", image: "/works/ex1.png", width: 681, height: 542 },
  { slug: "study-12", title: "Study XII", image: "/works/ty1.png", width: 757, height: 527 },
];

// lib/content.ts


// WRITING SECTION
export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "quiet-systems-loud-ideas",
    title: "Quiet systems, loud ideas",
    date: "March 2025",
    excerpt:
      "Minimal interfaces don't mean minimal intent. Systems can be silent and still hit hard.",
    content: [
      "I've been thinking about how design becomes more confident when it stops trying to prove itself.",
      "A clean grid isn't a constraint—it's a promise: every decision is intentional.",
      "If the work feels calm, it gives the idea room to be bold. The louder the idea, the quieter the frame can be.",
    ],
  },
  {
    slug: "second-blog-post",
    title: "Notes on process",
    date: "April 2025",
    excerpt: "Placeholder entry — swap in a real piece when it's ready.",
    content: [
      "This is a placeholder paragraph standing in for a future piece of writing.",
      "The layout, spacing, and reading rhythm are already in place — only the words are missing.",
      "Replace this content in lib/content.ts once the real essay is written.",
    ],
  },
  {
    slug: "second-blog-post-2",
    title: "On making and unmaking",
    date: "May 2025",
    excerpt: "Another placeholder — the structure is here, the words come later.",
    content: [
      "This is a placeholder paragraph standing in for a future piece of writing.",
      "The layout, spacing, and reading rhythm are already in place — only the words are missing.",
      "Replace this content in lib/content.ts once the real essay is written.",
    ],
  },
];

// ABOUT PAGE
// Images sourced from cansualbayrak.myportfolio.com/about and downloaded
// into public/assets/images (see about-page build notes).
export const about = {
  heading: "Hello, Ciao, Merhaba!",
  portrait: "/assets/images/e507fecc-301f-4b16-9927-7281321d2bf2_rw_1200.png",
  introLeft: [
    "I am Cansu Albayrak, a Graphic Design student based in Milan, building my practice at the intersection of design, strategy, and Creative Direction.",
    "I see design as a way of thinking before it becomes something visual. My process starts with research, asking questions, and understanding people, then translating those insights into clear visual systems, stories, and experiences.",
    "Studying and working across different cultures has shaped the way I approach creative problems. I enjoy connecting strategy with aesthetics, combining traditional design principles with contemporary digital communication to create work that is both thoughtful and engaging.",
    "Over the past five years, I have worked as a freelance designer while contributing to volunteer initiatives and academic projects. These experiences have strengthened my ability to organize complex ideas, collaborate with different people, and take projects from early concept to final execution.",
  ],
  introRight: [
    "While I enjoy crafting visual identities and editorial work, I am equally interested in the decisions behind them: defining concepts, building narratives, and shaping how a brand communicates across different touchpoints. This strategic perspective is what draws me toward Creative Direction.",
    "Currently, I am expanding my practice through branding, digital marketing, communication strategy, and multidisciplinary design. I enjoy experimenting with collage, photography, typography, illustration, and digital tools, selecting the medium that best supports the idea rather than following a fixed style.",
    "I am always looking for opportunities to collaborate, learn from different perspectives, and create work that communicates with clarity, purpose, and lasting impact.",
  ],
  closing: "Enough about me.",
  cta: { label: "See My Work", href: "/work" },

  // General highlight strip shown just above the "Volunteer Work" heading.
  volunteerGallery: [
    "/assets/images/564a3ac5-f883-42c2-9167-ea209c41d659_rw_1200.jpg",
    "/assets/images/be6b43fd-dbf7-4e5e-91f0-ec12375fe101_rw_1200.png",
    "/assets/images/ff1fc73c-00f6-4494-bfac-4fae05a9efbd_rw_1920.png",
    "/assets/images/805de8ec-b814-4f83-8c76-ccb9619d9809_rw_1200.png",
  ],

  volunteer: [
    {
      org: "Milan Turkish Student Association",
      period: "August 2025 – Present",
      logo: "/assets/images/692b1122-80da-47f5-aabf-b43a7bda199f_rw_600.png",
      paragraphs: [
        "As a volunteer member of the Design and Communications team, I contribute to the association's visual communication and promotional activities. My responsibilities include developing social media content, creating digital and printed design materials, designing merchandise, and supporting the planning and coordination of communication campaigns and events.",
        "Through this role, I help maintain a consistent visual presence while contributing to community engagement initiatives. The experience continues to strengthen my skills in visual communication, content strategy, project coordination, and collaborative teamwork within an international student community.",
      ],
    },
    {
      org: "Vianine",
      period: "May 2026 - Present",
      logo: "/assets/images/a9ec3055-1022-491b-8f64-6ee8e30cbc2e_rw_1200.jpg",
      paragraphs: [
        "Vianine is a women's community that brings together Turkish women living in different countries and helps them unlock and showcase their potential, creativity, and collective energy.",
        "I serve as the Milan Ambassador for Vianine. In this role, I organize events and create opportunities for women from diverse age groups and professional backgrounds in Milan to connect through social activities, networking gatherings, and workshops. My goal is to foster meaningful connections, encourage personal and professional growth, and strengthen the sense of community among Turkish women living abroad.",
      ],
    },
    {
      org: "NABA, Buddy Project",
      period: "October 2025-June 2026",
      logo: "/assets/images/7c45f715-aa22-4ac9-b75b-fa0ee309df94_rw_600.png",
      paragraphs: [
        "Selected as a mentor in the NABA Buddy Project, supporting first-year international students during their transition to academic and daily life in Milan. Facilitated cultural integration, orientation activities, and peer-to-peer guidance while strengthening communication and leadership skills.",
      ],
    },
    {
      org: "Bilkent University Radio",
      period: "April 2022 - August 2024",
      logo: "/assets/images/65f8b796-c3f2-4e6f-88c0-9dadc141789d_rw_600.png",
      paragraphs: [
        "For over two years, I worked as a volunteer designer in the Design Department of Bilkent University Radio, collaborating closely with the content team to create a wide range of visual communication materials. My responsibilities included designing logos, social media content, printed posters, brochures, and promotional assets for various projects and events.",
        "This experience strengthened my ability to work collaboratively, communicate ideas effectively, and adapt creative solutions based on feedback. It also improved my time management skills and taught me how to deliver high-quality work within fast-paced production schedules. Throughout this period, I further developed my proficiency in Adobe Illustrator, Photoshop, and InDesign while gaining valuable experience across multiple areas of visual communication.",
      ],
    },
  ],

  // Composite graphic of the software/tools used (Photoshop, Illustrator,
  // Premiere Pro, After Effects, CapCut, Figma, Gemini, Kling AI, Visual
  // Studio Code, PubCoder), as a single image on the source site.
  skillsToolsImage: "/assets/images/dc27e115-f682-41dd-90d5-719213057f20_rw_1920.PNG",

  skills: [
    {
      title: "Generative AI",
      paragraphs: [
        "Focused on integrating artificial intelligence into creative workflows.",
        "Working with tools such as ChatGPT, Midjourney, and Stable Diffusion, I explored AI-assisted ideation, research, visual generation, and creative problem-solving processes.",
      ],
    },
    {
      title: "Digital Technologies and Applications",
      paragraphs: [
        "Focused on motion graphics and three-dimensional content creation.",
        "Using Adobe After Effects and Cinema 4D, I developed skills in motion design, animation, and basic 3D production. Projects included an opening title sequence for a film and an experimental motion graphics piece synchronized with music.",
      ],
    },
    {
      title: "Audiovisual Production",
      paragraphs: [
        "Explored both the theoretical and practical aspects of video production, including camera angles, shot composition, storyboarding, scene organization, lighting, and visual storytelling.",
        "Projects included a personal video narrative, a short documentary introducing Milan's Navigli district, and a music-driven video montage created using archival footage. I worked with professional filming equipment and managed the editing process using Adobe Premiere Pro.",
      ],
    },
    {
      title: "Web Design I",
      paragraphs: [
        "Introduced the fundamentals of web design and front-end development.",
        "Designed and developed websites using HTML, CSS, Figma, and Visual Studio Code, while also experimenting with AI-assisted design and coding workflows.",
      ],
    },
    {
      title: "Event Design",
      paragraphs: [
        "Focused on brand experiences, event planning, and experiential design.",
        "Developed event concepts for brands including MoleCola, Revolut, Style Outlets, Heinz, and Oreo, translating brand values into physical experiences.",
      ],
    },
    {
      title: "Digital Analytics",
      paragraphs: [
        "Explored digital marketing, customer journeys, conversion funnels, and communication performance analysis. Worked with TOFU, MOFU, BOFU models, customer touchpoints, and call-to-action strategies. Applied these frameworks through a marketing analysis of IKEA.",
      ],
    },
    {
      title: "Creative Writing",
      paragraphs: [
        "Combined creative writing and copywriting practices.",
        "Developed storytelling, narrative structure, and advertising copywriting skills while adapting communication styles to different brand voices.",
      ],
    },
    {
      title: "Short-Story Advertising",
      paragraphs: [
        "Focused on short-form storytelling and content creation for social media platforms.",
        "Analyzed brand communication strategies across TikTok, Instagram, Facebook, and Pinterest, while developing a communication plan for the Los Angeles Olympics.",
      ],
    },
    {
      title: "Digital Publishing",
      paragraphs: [
        "Explored interactive publishing and user-centered publication design.",
        "Developed an interactive digital magazine using PubCoder while studying contemporary print and digital publishing formats.",
      ],
    },
    {
      title: "Basic and Logo Design",
      paragraphs: [
        "Provided a comprehensive introduction to branding, rebranding, logo design, and visual identity systems.",
        "Developed a sub-brand for Moleskine, including a logo system, brand applications, and a visual identity guideline.",
      ],
    },
    {
      title: "Methodology",
      paragraphs: [
        "This course focused on design methodologies, research processes, and critical thinking in design practice. Through the study of Capitalist Realism by Mark Fisher and Design as Art by Bruno Munari, I explored the cultural, social, and political dimensions of design.",
        "For the final project, I developed a poster inspired by concepts derived from these readings, supporting the design process with moodboards, visual references, and conceptual research. Throughout the semester, I produced presentations and projects centered on design processes, creative thinking, and project development.",
      ],
    },
    {
      title: "Advertising I",
      paragraphs: [
        "This course explored advertising strategies, digital communication, and campaign development.",
        "Throughout the semester, I created social media campaigns aimed at increasing brand awareness and expanding audience reach. In addition to projects focused on Campari and Tic Tac, I gained experience in SEO, Google Ads, and the interpretation of user and performance data.",
      ],
    },
    {
      title: "Advertising II",
      paragraphs: [
        "This course focused on creative campaign development and brand communication.",
        "Projects included a seasonal campaign for Hunter, a communication campaign for Uber, a brand awareness campaign for the European Space Agency, and video content based on a brand manifesto for Redbull. These projects strengthened my skills in strategic thinking, concept development, and storytelling.",
      ],
    },
    {
      title: "Strategy and Planning",
      paragraphs: [
        "This course focused on brand strategy, audience analysis, and market positioning. Topics included SWOT analysis, customer profiling, consumer behavior, and strategic planning.",
        "Through the analysis of global brands such as Nike, Tic Tac, Adidas, and Dove, I gained insight into brand communication strategies and positioning techniques.",
      ],
    },
  ],

  additionalCoursework: [
    "History of Modern Art",
    "Semiotics",
    "Genesis and Culture of Communication",
    "Theory and Methodology of Mass Media",
    "Computer Graphics",
    "Graphic Printing Techniques",
    "Visualization Techniques",
    "Editorial Design",
  ],

  social: [
    { label: "Behance", href: "https://www.behance.net/cansualbayrak3" },
    { label: "LinkedIn", href: "http://www.linkedin.com/in/cansu-albayrak" },
    { label: "Email", href: "mailto:228411c@gmail.com" },
  ],
} as const;

// FUTURE PROJECTS PAGE
export const futureProjects = [
  {
    number: "01",
    title: "Color Issue",
    description:
      "An interactive publication dedicated to a single color in each issue. Exploring culture, history, design, and everyday life through color.",
  },
  {
    number: "02",
    title: "Non-body",
    description:
      "An experiment beyond identity, appearance, and social labels. Participants explore what remains when individuality is temporarily concealed.",
  },
  {
    number: "03",
    title: "Always Almost Ready",
    description:
      "A fictional brand that preserves art by packaging it for future consumption. A reflection on value, ownership, and anticipation.",
  },
  {
    number: "04",
    title: "Shadowing",
    description:
      "A store that sells the shadows of products that do not exist. A conceptual critique of desire, ownership, and consumption.",
  },
  {
    number: "05",
    title: "T-Money",
    description:
      "An alternative economy where time replaces money. How much of a lifetime is a product really worth?",
  },
  {
    number: "06",
    title: "Tomorrow Archive",
    description:
      "A speculative museum of everyday objects destined to become obsolete. What will today's essentials look like when they belong to history?",
  },
  {
    number: "07",
    title: "Thought Marketing",
    description:
      "A fictional marketplace where ideas are auctioned and traded. An exploration of belief, influence, and collective thinking.",
  },
  {
    number: "08",
    title: "Voi-ry",
    description:
      "Memories transformed into physical form. Voices, frequencies, and personal stories become wearable objects and artworks.",
  },
] as const;

export const futureProjectsClosing =
  "Not every project exists from the moment it begins. Some evolve through time, research, and experience. This space is dedicated to future projects currently in development. Contributions help support the research, production, and experimentation behind these ideas.";