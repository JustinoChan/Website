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
      "AscensionAI is a distributed reinforcement learning system that trains an AI agent to play Slay the Spire by wrapping a live desktop game instance within a training framework — built with PyTorch, Gymnasium, and live game integration via CommunicationMod.\n\nBuilt a 530-dimensional structured observation encoder covering player stats, hand cards, monster identity/behavior/intents/powers, screen context, relic/potion inventories, deck profile, and a BFS map path lookahead. Embedded a database of all 66 STS enemies (7 behavioral flags + 8-d identity embeddings) directly into the observation space so the agent knows enemy patterns from the first encounter — without needing thousands of games to rediscover that Gremlin Nob punishes skills or Cultist scales strength every turn.\n\nImplemented PPO from scratch with clipped surrogate objective, GAE advantage estimation, target-KL early stopping, entropy annealing, and a BC anchor loss to prevent catastrophic forgetting during fine-tuning. The 134-action masked policy enforces legal-action constraints at every step, and dense per-step reward shaping covers gold, relics, HP, floor progression, and priority target incentives (spawner kills rewarded at 11× base).\n\nDesigned a parallel rollout architecture: multiple concurrent worker processes feed a central offline trainer via checkpoint-tagged .npz files, with stale-rollout rejection. Completed 4,136 PPO rollout games across 515 update batches with only 6 stale rollouts. BC warm-start achieves 84.9% validation accuracy across 86K labeled transitions, and the heuristic baseline reaches floor 15.8 avg with 26% Act 2 rate. Engineered for 24+ hour autonomous runs — atomic checkpoint saves, resumable BC progress, crash detection, orphan-process cleanup, and infinite-loop recovery. Includes an interactive results dashboard and reproducible experiment reports hosted on GitHub Pages.",
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
    liveUrl: "https://justinochan.github.io/AscensionAI/",
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
        { label: "integration", value: "CommunicationMod (live game stdin/stdout JSON)" },
        { label: "observation", value: "530-d structured vector · 66-monster knowledge base" },
        { label: "action space", value: "134 discrete actions (legal-action masked)" },
        { label: "network", value: "530→256→256→{134 logits + 1 value} · ~235K params · CPU-only" },
        { label: "training scale", value: "4,136 rollout games · 515 PPO updates · 86K BC transitions" },
        { label: "baseline", value: "heuristic avg floor 15.8 · 26% Act 2 rate · BC val acc 84.9%" },
      ],
      problem: [
        "Slay the Spire is hard for RL agents for three reasons: the observation space is unstructured (cards, relics, intents — all categorical), the action space is large and conditionally legal, and reward is sparse (you only really learn if you survive an act).",
        "Naive observations force the agent to rediscover, over tens of thousands of games, that Gremlin Nob punishes skills or that Cultist scales strength every turn. That's slow, wasteful, and breaks when new content is added.",
        "Live-game training is bottlenecked by simulation speed — even at max Fast Mode, one game costs 30–90 seconds. There is no headless simulator, so throughput scales only by running multiple concurrent game instances on a single machine (~4–8 workers on a 16-core system).",
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
          "Behavior cloning warm-start from a hand-coded heuristic (150–200 demo games → 86K labeled transitions, 84.9% validation accuracy). BC is resumable — per-game checkpointing survives STS crashes mid-collection.",
          "PPO from scratch — clipped surrogate objective, GAE advantage estimation, target-KL early stopping, entropy annealing, and a BC anchor loss that prevents catastrophic forgetting during fine-tuning. Dense per-step reward shaping: gold, relics, HP delta, floor progression, and spawner-priority incentives (spawner kills at 11× base reward).",
          "Parallel rollout architecture: 4 concurrent workers feed a central offline trainer via checkpoint-tagged .npz files. Stale-rollout rejection keeps importance ratios fresh. 4,136 games collected across 515 update batches with only 6 stale rollouts. A Tkinter GUI control panel auto-detects hardware, recommends worker counts, and streams live logs.",
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
        "run full 3,000-game converged training to validate avg-100 floor trends and exceed heuristic baseline win rate",
        "checkpoint versioning with named snapshots and rollback support for PPO regression detection",
        "move shop and grid-screen decisions from heuristic into RL-learned policy",
        "integrate headless simulator for 10–100× throughput over live-game bottleneck",
        "extend to additional characters (Silent → Defect → Watcher) and higher ascension levels",
        "replace 2-layer MLP with transformer / attention-pooled architecture over variable-length sub-vectors",
      ],
    },
  },
  {
    slug: "bitlink",
    title: "BitLink",
    tagline:
      "Full-stack social platform for CS enthusiasts with real-time messaging and social interactions.",
    description:
      "Built and deployed a full-stack social media platform designed for computer science enthusiasts, supporting real-time messaging, user authentication, and social interactions (posts, likes, follows).\n\nDeveloped the frontend in Angular with TypeScript and TailwindCSS, delivering a responsive single-page application. Built RESTful APIs with Express.js and MongoDB for data persistence, handling user profiles, posts, messaging threads, and social graph operations. Implemented secure authentication using Passport.js and BCrypt, ensuring encrypted credential storage and session handling.\n\nDeployed on a DigitalOcean Ubuntu instance with Nginx configured as a reverse proxy, serving both the Angular frontend and Express.js backend. The project spans 141 commits across a 4-person team.",
    tags: ["Angular", "TypeScript", "MongoDB", "Express.js", "TailwindCSS", "DigitalOcean"],
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
    tagline: "A web app for hosting and browsing UCI student capstone projects.",
    description:
      "Developed a Capstone Archive web application for hosting and discovering UCI student capstone projects, with Firebase Authentication for user login and a MySQL8 database for project metadata and search.\n\nBuilt frontend components in React.js with TailwindCSS and integrated them with a Django REST API for CRUD operations on project records. Implemented GitHub Actions CI/CD pipelines for automated testing and Firebase deployment. The project accumulated 229 commits across the team.\n\nEstablished Agile workflows by implementing Jira boards, hosting weekly meetings, and coordinating daily standups via Discord to improve team communication and delivery.",
    tags: ["React.js", "JavaScript", "Django", "MySQL8", "Firebase", "TailwindCSS"],
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
    tagline: "Python search engine that indexed 56,000+ web pages across 88 domains.",
    description:
      "Engineered a Python-based search engine that indexed and processed 56,000+ web pages across 88 different domains, delivering ranked results within 300ms.\n\nBuilt an inverted index system using BeautifulSoup for HTML parsing and custom tokenization. Optimized memory usage by partitioning the index into separate files for each letter of the alphabet, enabling partial loading at query time. Served results through a Flask web GUI that returns the top-K ranked links for any query.\n\nIndex creation processes the full 56K-page corpus in approximately 2 hours. Reduced average query response time by 35% through custom tokenization and algorithm optimization strategies.",
    tags: ["Python", "Flask", "BeautifulSoup", "Information Retrieval"],
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
