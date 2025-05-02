// src/data/agents.js
const BASE_PATH = "/shyguyrymakesai.github.io";

import willImg from '../assets/whatsapp-agent-avatar.jpg';
import avaImg from '../assets/Ava.png';
import kaiImg from '../assets/Kai.png';

export const agents = [
  {
    id: "will",
    name: "Will",
    title: "The WhatsApp Agent",
    description:
      "Handles appointment scheduling, memory-driven follow-ups, and natural service walkthroughs using LangChain, FastAPI, and custom memory routing.",
    image: willImg,
  },
  {
    id: "ava",
    name: "Ava",
    title: "The Email Concierge",
    description:
      "COMING SOON",
      //"An AI that triages, drafts, and schedules emails for busy professionals. Built with GPT-4 and Google Workspace API integration.",
    image: avaImg,
  },
  {
    id: "kai",
    name: "Kai",
    title: "The Code Reviewer",
    description:
      "COMING SOON",
      // "LLM-powered reviewer that gives targeted pull request feedback. Includes sentiment-aware suggestions and lint-fix patches.",
    image: kaiImg,
  },
];
