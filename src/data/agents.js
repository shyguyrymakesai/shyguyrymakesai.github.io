// src/data/agents.js
const BASE_PATH = "/shyguyrymakesai.github.io";

export const agents = [
  {
    id: "will",
    name: "Will",
    title: "The WhatsApp Agent",
    description:
      "Handles appointment scheduling, memory-driven follow-ups, and natural service walkthroughs using LangChain, FastAPI, and custom memory routing.",
    image: `${BASE_PATH}/whatsapp-agent-avatar.jpg`,
  },
  {
    id: "ava",
    name: "Ava",
    title: "The Email Concierge",
    description:
      "An AI that triages, drafts, and schedules emails for busy professionals. Built with GPT-4 and Google Workspace API integration.",
    image: `${BASE_PATH}/email-agent.jpg`,
  },
  {
    id: "kai",
    name: "Kai",
    title: "The Code Reviewer",
    description:
      "LLM-powered reviewer that gives targeted pull request feedback. Includes sentiment-aware suggestions and lint-fix patches.",
    image: `${BASE_PATH}/code-agent.jpg`,
  }
];
