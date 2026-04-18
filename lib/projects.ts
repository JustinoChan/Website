export type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; alt: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  period: string;
  cover: string;
  liveUrl?: string;
  repoUrl?: string;
  media: MediaItem[];
};

// Drop screenshots/videos into /public/projects/<slug>/ and reference as "/projects/<slug>/file.png"
export const projects: Project[] = [
  {
    slug: "search-engine",
    title: "Search Engine",
    tagline: "Python search engine that indexed 56,000+ web pages.",
    description:
      "Engineered a Python-based search engine that indexed and processed 56,000+ web pages, enabling rapid information retrieval across a large corpus.\n\nDeveloped a robust query handling system that improved search accuracy and interpretation of user intent. Reduced average query response time by 35% through custom tokenization and algorithm optimization strategies.",
    tags: ["Python", "JSON", "Algorithm Optimization", "Information Retrieval"],
    period: "Feb 2023 — Mar 2023",
    cover: "/projects/placeholder-1.svg",
    repoUrl: "https://github.com/Vincent10351/Indexer",
    media: [
      {
        type: "image",
        src: "/projects/placeholder-1.svg",
        alt: "Search Engine cover",
      },
    ],
  },
  {
    slug: "capstone-archive",
    title: "Capstone Project Archive",
    tagline: "A web app for hosting UCI student capstone projects.",
    description:
      "Developed a Capstone Archive web application for hosting student projects, with Firebase Authentication and a MySQL8 database integration.\n\nContributed to frontend development with CSS and React.js, and modified a Django REST API for data management. Established Agile workflows by implementing Jira boards, hosting weekly meetings, and coordinating daily standups via Discord to improve team communication and delivery.",
    tags: ["React.js", "JavaScript", "Python", "Django", "MySQL8", "Firebase"],
    period: "Jan 2024 — Jun 2024",
    cover: "/projects/placeholder-2.svg",
    repoUrl: "https://github.com/cpark50/capstone-archive",
    media: [
      {
        type: "image",
        src: "/projects/placeholder-2.svg",
        alt: "Capstone Archive cover",
      },
    ],
  },
  {
    slug: "bitlink",
    title: "BitLink",
    tagline:
      "Full-stack social platform with real-time messaging and social interactions.",
    description:
      "Built and deployed a full-stack social media platform supporting real-time messaging, user authentication, and social interactions (posts, likes, follows).\n\nDeveloped scalable APIs in Node.js to handle data persistence for records in MongoDB. Implemented secure authentication using Passport.js and BCrypt, ensuring encrypted credential storage and session handling. Designed a responsive UI in Angular + TypeScript, improving engagement and usability across devices.",
    tags: ["Angular", "TypeScript", "MongoDB", "Node.js", "Passport", "BCrypt"],
    period: "Mar 2024 — Jun 2024",
    cover: "/projects/placeholder-1.svg",
    repoUrl: "https://github.com/SusLiu03/BitLink",
    media: [
      {
        type: "image",
        src: "/projects/placeholder-1.svg",
        alt: "BitLink cover",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
