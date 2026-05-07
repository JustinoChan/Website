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
    slug: "ascension-ai",
    title: "AscensionAI",
    tagline:
      "Reinforcement learning agent that learns to play Slay the Spire via behavior cloning and PPO.",
    description:
      "AscensionAI is a reinforcement learning project for training an AI agent to play Slay the Spire through a Gymnasium-style environment, Communication Mod integration, behavior cloning warm starts, PPO fine-tuning, action masking, dense reward shaping, and parallel rollout workers.\n\nThe observation encoder converts the full game state into a 530-float vector covering player stats, hand cards, monster identity/behavior/intents/powers, screen context, relic/potion inventories, deck profile, and map path lookahead. It includes a built-in database of all 66 STS monsters with behavioral flags and identity embeddings, so the agent knows enemy patterns from the first encounter.\n\nThe action space covers 134 discrete actions — targeted/untargeted card plays, end turn, potions, choice selection, proceed, and leave — with illegal actions masked out per game state. Dense per-step rewards shape learning for gold, relics, max HP, floor progression, combat damage, card management, and act advancement, with extra incentives for priority targets like Gremlin Nob and Cultist.\n\nTraining follows a three-stage pipeline: behavior cloning from a hand-coded heuristic, PPO fine-tuning with GAE advantages and KL early stopping, then parallel scaling across multiple STS instances with an offline trainer. A GUI Control Panel auto-detects hardware, manages workers, and displays live logs. The project also supports multi-machine collaboration where rollout data is pooled across contributors.",
    tags: [
      "Python",
      "PyTorch",
      "Reinforcement Learning",
      "PPO",
      "Gymnasium",
      "Slay the Spire",
    ],
    period: "Nov 2025 — Present",
    cover: "/projects/placeholder-2.svg",
    repoUrl: "https://github.com/JustinoChan/AscensionAI",
    media: [
      {
        type: "image",
        src: "/projects/placeholder-2.svg",
        alt: "AscensionAI cover",
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
