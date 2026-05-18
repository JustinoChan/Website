export type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; alt: string };

export type SpecObservationRow = {
  dims: string;
  component: string;
  type: string;
};

export type SpecActionRow = {
  range: string;
  desc: string;
};

export type SpecHyperparam = {
  k: string;
  v: string;
};

export type ProjectSpec = {
  facts: { label: string; value: string }[];
  problem?: string[];
  architectureAscii?: string;
  architectureCaption?: string;
  observation?: {
    title: string;
    intro?: string;
    rows: SpecObservationRow[];
  };
  actions?: {
    title: string;
    intro?: string;
    rows: SpecActionRow[];
  };
  training?: {
    title: string;
    paras: string[];
    hyperparams: SpecHyperparam[];
  };
  next?: string[];
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  period: string;
  status: "active" | "shipped" | "archived";
  commit: string;
  cover: string;
  liveUrl?: string;
  repoUrl?: string;
  writeupUrl?: string;
  media: MediaItem[];
  spec?: ProjectSpec;
};

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
    status: "active",
    commit: "f3a91c8",
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
    spec: {
      facts: [
        { label: "domain", value: "single-player deck-building roguelike (Slay the Spire)" },
        { label: "agent", value: "PPO + Behavior Cloning warm-start" },
        { label: "framework", value: "PyTorch · Gymnasium · NumPy" },
        { label: "integration", value: "Communication Mod (live game socket)" },
        { label: "observation", value: "530-dimensional structured vector" },
        { label: "action space", value: "134 discrete actions (legal-action masked)" },
      ],
      problem: [
        "Slay the Spire is hard for RL agents for three reasons: the observation space is unstructured (cards, relics, intents — all categorical), the action space is large and conditionally legal, and reward is sparse (you only really learn if you survive an act).",
        "Naive observations force the agent to rediscover, over tens of thousands of games, that Gremlin Nob punishes skills or that Cultist scales strength every turn. That's slow, wasteful, and breaks when new content is added.",
      ],
      architectureCaption:
        "Parallel rollout workers feed a central offline trainer via checkpoint-tagged .npz files. Stale rollouts (workers running an older policy than the current checkpoint) are rejected at ingest.",
      architectureAscii: String.raw`              ┌────────────────────────────────────────────────┐
              │              tkinter control panel              │
              │   auto-detect HW · worker count · live logs    │
              └────────────────────────┬───────────────────────┘
                                       │ spawn
       ┌───────────────────────────────┼───────────────────────────────┐
       ▼                               ▼                               ▼
┌────────────┐                  ┌────────────┐                  ┌────────────┐
│ worker[0]  │                  │ worker[1]  │       ...        │ worker[N]  │
│ STS+commod │                  │ STS+commod │                  │ STS+commod │
│   policy → │                  │   policy → │                  │   policy → │
│   rollout  │                  │   rollout  │                  │   rollout  │
└─────┬──────┘                  └─────┬──────┘                  └─────┬──────┘
      │  rollout-{ckpt}.npz           │                              │
      └──────────────┬────────────────┴──────────────────────────────────┘
                     ▼
            ┌────────────────────┐         ┌────────────────────────┐
            │  ingest + filter   │ ───▶    │  PPO trainer (offline) │
            │  stale → discard   │         │  clipped surrogate     │
            └────────────────────┘         │  GAE advantages        │
                                           │  target-KL early stop  │
                                           │  BC anchor loss        │
                                           └──────────┬─────────────┘
                                                      ▼
                                            ┌────────────────────┐
                                            │ atomic checkpoint  │
                                            │  → policy_v[N].pt  │
                                            └─────────┬──────────┘
                                                      ▼
                                                (workers reload)`,
      observation: {
        title: "observation encoder (530-d)",
        intro:
          "Hand-engineered, structured, dense. Every dimension has a known meaning. The full database of all 66 STS enemies is embedded directly into the observation space, so the agent knows enemy patterns from the first encounter.",
        rows: [
          { dims: "0–31", component: "player stats — hp, max-hp, energy, gold, block, strength, dex, etc.", type: "scalar" },
          { dims: "32–95", component: "hand cards (up to 10 × 6-d card embedding)", type: "embedding" },
          { dims: "96–223", component: "monsters — identity, behavior flags, intents, powers, scaling rules", type: "embedding+flags" },
          { dims: "224–287", component: "draw pile + discard pile profile (counts by type, cost, family)", type: "histogram" },
          { dims: "288–335", component: "relic inventory (one-hot over 178 relics, bucketed by tier)", type: "one-hot" },
          { dims: "336–383", component: "potion inventory + slot count + brewable hints", type: "one-hot" },
          { dims: "384–447", component: "screen context — what UI state am I in? combat / map / shop / event", type: "one-hot" },
          { dims: "448–495", component: "map path lookahead — next 3 floors of node types + risk", type: "graph" },
          { dims: "496–529", component: "deck profile — synergies, energy curve, redundancy", type: "derived" },
        ],
      },
      actions: {
        title: "action space (134 masked)",
        intro:
          "A flat 134-dim action head, with a legal-action mask computed at every step from the live game state. Illegal actions get -∞ logits before softmax — so the policy never wastes capacity on impossible moves.",
        rows: [
          { range: "00–09", desc: "end turn / open map / cancel / confirm" },
          { range: "10–69", desc: "play card[i] on target[j]  · 10×6 grid" },
          { range: "70–79", desc: "potion[k] on target[j]  · 5×2 grid" },
          { range: "80–99", desc: "card-select choices (rewards, upgrades, shop)" },
          { range: "100–119", desc: "map node selection (next-floor pick)" },
          { range: "120–133", desc: "event choices · 14 enumerated slots" },
        ],
      },
      training: {
        title: "training",
        paras: [
          "PPO from scratch — clipped surrogate objective, GAE advantage estimation, target-KL early stopping, entropy annealing, and a BC anchor loss that prevents catastrophic forgetting during fine-tuning.",
          "Reward is dense and per-step: gold gained, relics acquired, HP delta, floor progression, and priority-target incentives (kill the scaler before the tank). Engineered for 24+ hour autonomous runs with atomic checkpoint saves, resumable BC progress, crash detection, orphan-process cleanup, and infinite-loop recovery.",
        ],
        hyperparams: [
          { k: "γ (discount)", v: "0.995" },
          { k: "λ (GAE)", v: "0.95" },
          { k: "clip ε", v: "0.2" },
          { k: "lr (policy)", v: "3e-4" },
          { k: "lr (value)", v: "1e-3" },
          { k: "target KL", v: "0.02" },
          { k: "entropy coef", v: "0.01 → 0.001" },
          { k: "bc anchor", v: "0.5" },
          { k: "batch size", v: "4096" },
          { k: "epochs/update", v: "4" },
        ],
      },
      next: [
        "evaluate against fixed-seed runs to measure act-clear rate over training",
        "extend observation to act-2 / act-3 enemy database (currently act-1 complete)",
        "try a transformer policy head over the structured tokens",
      ],
    },
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
    status: "shipped",
    commit: "92e0a4b",
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
    status: "shipped",
    commit: "1b7c8d2",
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
    status: "archived",
    commit: "4d0fe19",
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
