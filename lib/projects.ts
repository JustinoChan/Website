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
  writeupUrl?: string;
  media: MediaItem[];
};

// Drop screenshots/videos into /public/projects/<slug>/ and reference as "/projects/<slug>/file.png"
export const projects: Project[] = [
  {
    slug: "ascension-ai",
    title: "AscensionAI",
    tagline:
      "Reinforcement learning agent that learns to play Slay the Spire via behavior cloning and PPO.",
    description:
      "AscensionAI is an end-to-end reinforcement learning pipeline for training an AI agent to play Slay the Spire — built with PyTorch, Gymnasium, and a live game integration via Communication Mod.\n\nBuilt a 530-dimensional structured observation encoder covering player stats, hand cards, monster identity/behavior/intents/powers, screen context, relic/potion inventories, deck profile, and map path lookahead. Embedded a database of all 66 STS enemies (behavioral flags, identity embeddings) directly into the observation space so the agent knows enemy patterns from the first encounter — without needing thousands of games to rediscover that Gremlin Nob punishes skills or Cultist scales strength every turn.\n\nImplemented PPO from scratch with clipped surrogate objective, GAE advantage estimation, target-KL early stopping, entropy annealing, and a BC anchor loss to prevent catastrophic forgetting during fine-tuning. The 134-action masked policy enforces legal-action constraints at every step, and dense per-step reward shaping covers gold, relics, HP, floor progression, and priority target incentives.\n\nDesigned a parallel rollout architecture: multiple concurrent worker processes feed a central offline trainer via checkpoint-tagged .npz files, with stale-rollout rejection. Engineered for 24+ hour autonomous runs — atomic checkpoint saves, resumable BC progress, crash detection, orphan-process cleanup, and infinite-loop recovery. A Tkinter GUI control panel auto-detects hardware, recommends worker counts, and streams live logs from all processes.",
    tags: [
      "Python",
      "PyTorch",
      "Reinforcement Learning",
      "PPO",
      "Gymnasium",
      "Slay the Spire",
    ],
    period: "Nov 2025 — Present",
    cover: "/projects/ascension-ai/cover.jpg",
    repoUrl: "https://github.com/JustinoChan/AscensionAI",
    writeupUrl: "/projects/ascension-ai/writeup.pdf",
    media: [
      {
        type: "image",
        src: "/projects/ascension-ai/cover.jpg",
        alt: "Slay the Spire — the game AscensionAI is trained to play",
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
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
