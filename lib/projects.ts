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
      "Distributed reinforcement learning system for Slay the Spire with behavior cloning, PPO fine-tuning, and adaptive auto-tuning.",
    description:
      "AscensionAI is a distributed reinforcement learning system that trains an AI agent to play Slay the Spire by wrapping a live desktop game instance within a training framework — built with PyTorch, Gymnasium, and live game integration via CommunicationMod.\n\nBuilt a 585-dimensional structured observation encoder covering player stats, hand cards, monster identity/behavior/intents/powers (19 power slots per monster), screen context, relic/potion inventories, deck profile, and a BFS map path lookahead. Embedded a database of all 66 STS enemies (7 behavioral flags + 8-d identity embeddings) directly into the observation space so the agent knows enemy patterns from the first encounter — without needing thousands of games to rediscover that Gremlin Nob punishes skills or Cultist scales strength every turn. All 19 monster powers are triple-verified STS1-only (Sharp Hide, Mode Shift, Enrage, Curiosity, Intangible, Invincible, Time Warp, Beat of Death, Malleable, Life Link, Regenerate, etc.).\n\nImplemented PPO from scratch with clipped surrogate objective, GAE advantage estimation, target-KL early stopping, adaptive entropy annealing, adaptive BC anchor decay, adaptive learning rate reduction, and boss-specific reward shaping for all Act 1–3 bosses (Guardian phase-aware shaping, Hexaghost, Slime Boss, Bronze Automaton, The Champ, Donu & Deca). The 134-action masked policy enforces legal-action constraints at every step via -∞ logit masking. Reward shaping includes elite win bonus (+4.0), rest-site upgrade reward (+0.30), HP-urgency-scaled heal reward (+0.025/hp × missing HP%), and Guardian offensive-mode damage bonus.\n\nUpgraded the network from a 256×256 Tanh MLP (~236K params) to a (512, 256, 256) GELU MLP (~504K params) using a warm-transfer method that copies compatible weight blocks, zero-initializes new capacity, and identity-initializes new layers to preserve learned behavior while adding representational capacity.\n\nDesigned a parallel rollout architecture: multiple concurrent worker processes feed a central offline trainer via checkpoint-tagged .pt files, with stale-rollout rejection. Completed 19,400+ PPO rollout games across 2,410+ update batches. BC warm-start achieves 84.95% validation accuracy across 86,297 labeled transitions. The heuristic baseline reaches floor 15.78 avg with 39% boss conversion and 26% Act 2 rate. Latest 200-game eval: 14.7 avg floor, 38.1% boss WR (up from 21.7%), 69.6% elite WR, 20% Act 2 reach rate, with 8 runs past floor 30 including two Act 3 runs (floors 42 and 46). Best single training run reached floor 50 (Act 3). Engineered for 24+ hour autonomous runs — atomic checkpoint saves, per-instance JVM heap limits, crash detection, orphan-process cleanup, restart-every cycling, and infinite-loop recovery. Includes an interactive results dashboard and reproducible experiment reports hosted on GitHub Pages.\n\nDeployed the full worker + trainer stack headless on a GPU-less GCP c3-standard-22 spot VM (22 vCPU) via a one-shot, idempotent installer, running 8 concurrent game instances at ~90+ games/hour for a few dollars per overnight run. Making a GUI-bound, mod-loaded desktop game run many times over on a server with no display surfaced a chain of non-obvious failures: each worker needed its own Xvfb virtual display with software OpenGL (a shared display ran ~100× slower because OpenGL serializes across windows) and its own JVM tmpdir (a shared /tmp caused LWJGL native-library extraction SIGSEGV races); ModTheSpire only loads mods under Java 8 (silent failure on 17+); headless audio required wiring LWJGL to libopenal; CommunicationMod's READY handshake had to be signaled before the slow torch import (its timeout is 10 s); and a silent JVM heap OOM that was killing workers after ~35 games was fixed with a 2 GB heap plus a 25-game restart cadence, lifting throughput from ~55 to ~90+ games/hour. Spot preemption is survived via STOP-on-preempt (disk preserved) plus an auto-restart monitor.",
    tags: [
      "Python",
      "PyTorch",
      "Reinforcement Learning",
      "PPO",
      "Gymnasium",
      "Action Masking",
      "GCP",
      "Linux",
      "Slay the Spire",
    ],
    period: "Nov 2025 — Present",
    status: "active",
    commit: "f2c0b87",
    cover: "/projects/ascension-ai/cover.jpg",
    liveUrl: "https://justinochan.github.io/AscensionAI/",
    repoUrl: "https://github.com/JustinoChan/AscensionAI",
    writeupUrl: "https://justinochan.github.io/AscensionAI/AscensionAI_Technical_Writeup.pdf",
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
        { label: "agent", value: "PPO + Behavior Cloning warm-start + adaptive auto-tuning" },
        { label: "framework", value: "PyTorch · Gymnasium · NumPy" },
        { label: "integration", value: "CommunicationMod (live game stdin/stdout JSON)" },
        { label: "observation", value: "585-d structured vector · 19 monster power slots · 66-monster knowledge base" },
        { label: "action space", value: "134 discrete actions (legal-action masked via -∞ logits)" },
        { label: "network", value: "585→512→256→256→{134 logits + 1 value} · GELU · ~504K params · CPU-only" },
        { label: "warm transfer", value: "530→585 obs expansion via zero-initialized new capacity; earlier 256×256 Tanh → 512×256×256 GELU migration" },
        { label: "training scale", value: "19,400+ rollout games · 2,410+ PPO updates · 86,297 BC transitions" },
        { label: "auto-tuning", value: "BC coef (0.001–0.009) · entropy coef · learning rate — all adaptive based on policy behavior" },
        { label: "reward shaping", value: "boss-specific shaping (Guardian, Hexaghost, Slime Boss, Automaton, Champ, Donu & Deca) + upgrade reward + HP-urgency heal reward + elite bonus +4.0" },
        { label: "baseline", value: "heuristic avg floor 15.78 · 39% boss conversion · 26% Act 2 rate · BC val acc 84.95%" },
        { label: "200-game eval", value: "avg floor 14.7 · 38.1% boss WR · 69.6% elite WR · 20% Act 2 reach · best floor 46" },
        { label: "deployment", value: "local Windows GUI · or headless GCP c3-standard-22 spot VM (22 vCPU, no GPU) — 8 workers under per-worker Xvfb + software GL, ~90+ games/hr" },
      ],
      problem: [
        "Slay the Spire is hard for RL agents for three reasons: the observation space is unstructured (cards, relics, intents — all categorical), the action space is large and conditionally legal, and reward is sparse (you only really learn if you survive an act).",
        "Naive observations force the agent to rediscover, over tens of thousands of games, that Gremlin Nob punishes skills or that Cultist scales strength every turn. That's slow, wasteful, and breaks when new content is added.",
        "Live-game training is bottlenecked by simulation speed — even at max Fast Mode, one game costs 30–90 seconds. There is no headless simulator, so throughput scales only by running multiple concurrent game instances on a single machine (~4–8 workers on a 16-core system).",
      ],
      architectureCaption:
        "Parallel rollout workers feed a central offline trainer via checkpoint-tagged .pt files. Stale rollouts (workers running an older policy than the current checkpoint) are rejected at ingest. The GUI acts as a process supervisor with crash recovery and restart-every cycling.",
      architectureAscii: String.raw`              ┌────────────────────────────────────────────────┐
              │              tkinter control panel              │
              │   auto-detect HW · worker count · live logs    │
              │   per-instance JVM heap · restart-every cycle  │
              └────────────────────────┬───────────────────────┘
                                       │ spawn + supervise
       ┌───────────────────────────────┼───────────────────────────────┐
       ▼                               ▼                               ▼
┌────────────┐                  ┌────────────┐                  ┌────────────┐
│ worker[0]  │                  │ worker[1]  │       ...        │ worker[N]  │
│ STS+commod │                  │ STS+commod │                  │ STS+commod │
│   policy → │                  │   policy → │                  │   policy → │
│   rollout  │                  │   rollout  │                  │   rollout  │
└─────┬──────┘                  └─────┬──────┘                  └─────┬──────┘
      │  rollout-{ckpt}.pt            │                              │
      └──────────────┬────────────────┴──────────────────────────────────┘
                     ▼
            ┌────────────────────┐         ┌────────────────────────┐
            │  ingest + filter   │ ───▶    │  PPO trainer (offline) │
            │  stale → discard   │         │  clipped surrogate     │
            └────────────────────┘         │  GAE advantages        │
                                           │  target-KL early stop  │
                                           │  BC anchor loss        │
                                           │  adaptive auto-tuning  │
                                           │  boss reward shaping   │
                                           └──────────┬─────────────┘
                                                      ▼
                                            ┌────────────────────┐
                                            │ atomic checkpoint  │
                                            │  → ppo_sts.pt      │
                                            └─────────┬──────────┘
                                                      ▼
                                                (workers reload)`,
      observation: {
        title: "observation encoder (585-d)",
        intro:
          "Hand-engineered, structured, dense. Every dimension has a known meaning. 19 monster power slots per monster (all STS1-verified: strength, vulnerable, weakened, artifact, ritual, curl up, thorns, angry, sharp hide, mode shift, enrage, curiosity, intangible, invincible, time warp, beat of death, malleable, life link, regenerate). The full database of all 66 STS enemies is embedded directly into the observation space, so the agent knows enemy patterns from the first encounter.",
        rows: [
          { dims: "0–31", component: "player stats — hp, max-hp, energy, gold, block, strength, dex, etc.", type: "scalar" },
          { dims: "32–95", component: "hand cards (up to 10 × 6-d card embedding)", type: "embedding" },
          { dims: "96–278", component: "monsters — identity, behavior flags, intents, 19 power slots, scaling rules", type: "embedding+flags" },
          { dims: "279–342", component: "draw pile + discard pile profile (counts by type, cost, family)", type: "histogram" },
          { dims: "343–390", component: "relic inventory (one-hot over 178 relics, bucketed by tier)", type: "one-hot" },
          { dims: "391–438", component: "potion inventory + slot count + brewable hints", type: "one-hot" },
          { dims: "439–502", component: "screen context — what UI state am I in? combat / map / shop / event", type: "one-hot" },
          { dims: "503–550", component: "map path lookahead — next 3 floors of node types + risk", type: "graph" },
          { dims: "551–584", component: "deck profile — synergies, energy curve, redundancy", type: "derived" },
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
          "Behavior cloning warm-start from a hand-coded heuristic (150–200 demo games → 86,297 labeled transitions, 84.95% validation accuracy with label smoothing 0.02). BC is resumable — per-game checkpointing survives STS crashes mid-collection.",
          "PPO from scratch — clipped surrogate objective, GAE advantage estimation (λ=0.95), target-KL early stopping (0.03), and a BC anchor loss that prevents catastrophic forgetting during fine-tuning. Three hyperparameters auto-tune during training: BC coefficient oscillates between 0.001–0.009 based on policy improvement, entropy coefficient adjusts based on normalized entropy to prevent premature collapse, and learning rate reduces when KL divergence exceeds target bounds.",
          "Boss-specific reward shaping for all Act 1–3 bosses: Guardian (phase-aware offensive-mode bonus), Hexaghost (inferno cycling), Slime Boss (split threshold), Bronze Automaton (hyper beam charging), The Champ (phase transitions), and Donu & Deca (priority targeting). Dense per-step shaping also covers gold, relics, HP delta, floor progression, spawner-priority incentives, elite win bonus (+4.0), rest-site upgrade reward (+0.30), and HP-urgency-scaled heal reward (+0.025/hp scaled by missing HP% — healing at 25% HP gives ~0.45, beating the 0.30 upgrade reward; healing at 75% HP gives ~0.15 so upgrade wins).",
          "Network upgraded from 256×256 Tanh MLP (~236K params) to (512, 256, 256) GELU MLP (~504K params) via warm transfer — compatible weights copied exactly, widened layers zero-padded, new layers identity-initialized to preserve learned behavior while adding capacity. Observation expanded from 530-d to 585-d (8→19 monster power slots) via a second warm transfer with zero-initialized new capacity.",
          "Parallel rollout architecture: 4–8 concurrent workers feed a central offline trainer via checkpoint-tagged .pt files. Stale-rollout rejection keeps importance ratios fresh. 19,400+ games collected across 2,410+ update batches. A Tkinter GUI control panel acts as process supervisor — auto-detects hardware, recommends worker counts, streams live logs, manages per-instance JVM heap limits, and supports restart-every cycling to prevent memory growth.",
          "Headless cloud deployment: the same worker + trainer stack runs unattended on a GPU-less GCP c3-standard-22 spot VM (22 vCPU) via a one-shot, idempotent installer, sustaining ~90+ games/hour on 8 instances. Running a GUI-bound, mod-loaded desktop game headless required per-worker Xvfb virtual displays with software OpenGL (a shared display serializes GL ~100× slower), per-worker JVM tmpdirs (shared /tmp triggers LWJGL native-extraction SIGSEGV races), a Java 8 pin (mods silently fail to load on 17+), headless OpenAL wiring, signaling CommunicationMod's READY handshake before the slow torch import (10 s timeout), and a 2 GB heap + 25-game restart to fix a silent OOM that had capped throughput at ~55 games/hour. Spot preemption is survived via STOP-on-preempt (disk preserved) plus an auto-restart monitor.",
        ],
        hyperparams: [
          { k: "γ (discount)", v: "0.995" },
          { k: "λ (GAE)", v: "0.95" },
          { k: "clip ε", v: "0.2" },
          { k: "lr (policy)", v: "3e-4 (adaptive)" },
          { k: "lr (value)", v: "1e-3" },
          { k: "target KL", v: "0.03" },
          { k: "entropy coef", v: "adaptive" },
          { k: "bc anchor", v: "0.001–0.009 (auto-tuned)" },
          { k: "batch size", v: "4096" },
          { k: "epochs/update", v: "4" },
          { k: "label smoothing (BC)", v: "0.02" },
          { k: "network", v: "(512, 256, 256) GELU" },
        ],
      },
      next: [
        "continue training with heal reward — boss WR jumped 21.7% to 38.1%, targeting first win and consistent Act 2 survival",
        "migrate non-combat screens (shop, card rewards, events) from heuristic to RL-learned policy one at a time",
        "checkpoint versioning with named snapshots and rollback support for PPO regression detection",
        "integrate headless simulator for 10–100× throughput over live-game bottleneck",
        "extend to additional characters (Silent → Defect → Watcher) and higher ascension levels",
        "explore transformer / attention-pooled architecture over variable-length sub-vectors",
      ],
    },
  },
  {
    slug: "job-application-agent",
    title: "Job Application Agent",
    tagline:
      "Truth-constrained job-hunting system that scores roles, tailors resumes, and audits every claim against source-of-truth YAML.",
    description:
      "Built a proactive job-hunting agent that scrapes or ingests job postings, parses company/title/requirements, scores fit against a structured profile and project bank, and produces versioned resume and cover-letter artifacts on demand.\n\nThe backend is a FastAPI service with token auth, CSV tracker persistence, and pipeline orchestration shared with a Typer CLI. A static React/Vite dashboard reviews discovered jobs, filters by fit/company/search, stars rows, bulk archives low-signal postings, and opens per-job resume, cover-letter, and audit views through the same API.\n\nDesigned the system around truth constraints: resume bullets are selected from approved YAML facts, PDF rendering re-runs the claim auditor before output, and cover letters pass a separate allowlist audit for unsupported technical claims. A scheduled scraper can run on a small GCP VM, pulling Greenhouse, Lever, Ashby, and Hacker News postings every four hours through a Cloudflare Tunnel into the local backend.",
    tags: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Typer",
      "Playwright",
      "Cloudflare",
      "GCP",
      "Automation",
    ],
    period: "May 2026 — Present",
    status: "active",
    commit: "5b45d58",
    cover: "/projects/job-application-agent/cover.svg",
    repoUrl: "https://github.com/JustinoChan/Job-Application-Agent",
    media: [
      {
        type: "image",
        src: "/projects/job-application-agent/cover.svg",
        alt:
          "Job Application Agent — audited job pipeline dashboard diagram",
      },
    ],
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
    cover: "/projects/bitlink/cover.svg",
    repoUrl: "https://github.com/SusLiu03/BitLink",
    media: [
      {
        type: "image",
        src: "/projects/bitlink/cover.svg",
        alt: "BitLink — social media feed and messaging interface",
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
    cover: "/projects/capstone-archive/cover.svg",
    repoUrl: "https://github.com/cpark50/capstone-archive",
    media: [
      {
        type: "image",
        src: "/projects/capstone-archive/cover.svg",
        alt: "Capstone Archive — browseable grid of student projects",
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
    cover: "/projects/search-engine/cover.svg",
    repoUrl: "https://github.com/Vincent10351/Indexer",
    media: [
      {
        type: "image",
        src: "/projects/search-engine/cover.svg",
        alt: "Search Engine — terminal search results over 56,000 indexed pages",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
