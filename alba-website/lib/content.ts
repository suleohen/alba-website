export const palette = {
  accent: "#F73914",
  lime: "#E0F714",
  pink: "#F7148D",
  purple: "#8D14F7",
  blue: "#5141F7",
} as const;

export const site = {
  name: "Studio",
  tagline: "Minimal work. Loud ideas.",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Studio", href: "/studio" },
  { label: "Services", href: "/services" },
  { label: "Objects", href: "/objects" },
  { label: "Journal", href: "/journal" },
  { label: "Experiential", href: "/experiential" },
  { label: "Works", href: "/works" },
  { label: "Contact", href: "/contact" },
] as const;

type IndexLink = {
  label: string;
  desc: string;
  href: string;
  comingSoon?: boolean;
};

export const home = {
  hero: {
    eyebrow: "Studio",
    headline: "Minimal, gallery-first design for bold ideas.",
    subline:
      "Brand strategy, visual identity, and photography—crafted with quiet confidence and sharp detail.",
    ctas: [
      { label: "View Works", href: "/works" },
      { label: "Contact", href: "/contact" },
    ],
  },
  featured: [
    { title: "Arc / Identity System", year: "2025", tag: "Branding", href: "/works" },
    { title: "Mono / Poster Series", year: "2024", tag: "Graphic", href: "/works" },
    { title: "Still / Product Study", year: "2024", tag: "Photography", href: "/works" },
    { title: "Field / Editorial", year: "2023", tag: "Layout", href: "/works" },
  ],
  indexLinks: [
    { label: "Studio", desc: "About & approach", href: "/studio" },
    { label: "Services", desc: "Strategy / Identity / Photo", href: "/services" },
    { label: "Journal", desc: "Podcast / Workshops / Zine", href: "/journal" },
    { label: "Experiential", desc: "Installations & spaces", href: "/experiential" },
    { label: "Objects", desc: "Coming soon", href: "/objects", comingSoon: true },
  ] satisfies IndexLink[],
} as const;

export const workCategories = [
  "Photography",
  "Collages",
  "Painting",
  "Printing",
  "Typography",
  "Experimental Art",
] as const;

export type WorkCategory = (typeof workCategories)[number];

export type WorkItem = {
  slug: string;
  title: string;
  year: string;
  categories: WorkCategory[];
  cover: string;
  // Optional: you can add width/height if you want to optimize further
  // width?: number;
  // height?: number;
};

export const works: WorkItem[] = [
  {
    slug: "still-life-01",
    title: "Still Life Study",
    year: "2025",
    categories: ["Collages"],
    cover: "/works/cl1.png",
  },
    {
    slug: "still-life-01",
    title: "Still Life Study",
    year: "2025",
    categories: ["Collages"],
    cover: "/works/cl2.png",
  },
  {
    slug: "still-life-01",
    title: "Still Life Study",
    year: "2025",
    categories: ["Photography"],
    cover: "/works/ph1.png",
  },
    {
    slug: "still-life-01",
    title: "Still Life Study",
    year: "2025",
    categories: ["Photography"],
    cover: "/works/ph2.png",
  },
    {
    slug: "still-life-01",
    title: "Still Life Study",
    year: "2025",
    categories: ["Photography"],
    cover: "/works/ph3.png",
  },
    {
    slug: "still-life-01",
    title: "Still Life Study",
    year: "2025",
    categories: ["Painting"],
    cover: "/works/pa1.png",
  },
    {
    slug: "still-life-01",
    title: "Still Life Study",
    year: "2025",
    categories: ["Painting"],
    cover: "/works/pa2.png",
  },
    {
    slug: "still-life-01",
    title: "Still Life Study",
    year: "2025",
    categories: ["Painting"],
    cover: "/works/pa3.png",
  },
    {
    slug: "still-life-01",
    title: "Still Life Study",
    year: "2025",
    categories: ["Painting"],
    cover: "/works/pa4.png",
  },
    {
    slug: "still-life-01",
    title: "Still Life Study",
    year: "2025",
    categories: ["Printing"],
    cover: "/works/pr1.png",
  },
      {
    slug: "still-life-01",
    title: "Still Life Study",
    year: "2025",
    categories: ["Experimental Art"],
    cover: "/works/ea1.png",
  },
        {
    slug: "still-life-01",
    title: "Still Life Study",
    year: "2025",
    categories: ["Typography"],
    cover: "/works/ty1.png",
  },

];

// lib/content.ts


// BLOG SECTION
export const blog = {
  pageTitle: "Blogs",
  intro:
    "Editorial notes — structured, reflective, and quietly bold. Short reads that leave a mark.",
  heroWord: "EDITORIAL",
} as const;

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "quiet-systems-loud-ideas",
    title: "Quiet systems, loud ideas",
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
    title: "My Second Blog Post",
    excerpt: "This is a test to make sure navigation works properly.",
    content: [
      "This is the first paragraph of my second blog post.",
      "Here's another paragraph to test the layout.",
      "And a final paragraph for good measure.",
    ],
  },
];