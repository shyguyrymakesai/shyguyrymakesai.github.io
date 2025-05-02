import willImg from '../assets/whatsapp-agent-avatar.jpg';
import avaImg from '../assets/Ava.png';
import kaiImg from '../assets/Kai.png';
import willBanner from '../assets/will-banner.png';
import avaBanner from '../assets/Ava-banner.png';
import kaiBanner from '../assets/Kai-banner.jpg';

export const agents = [
  {
    id: "will",
    name: "Will",
    title: "The WhatsApp Scheduler",
    description:
      "Will handles your scheduling, rescheduling, and follow-ups so you don’t have to. He’s fast, reliable, and built to manage WhatsApp communication for real businesses.",
    image: willImg,
    banner: willBanner,
themeColor: {
  text: "text-yellow-800",          // For headers and main titles
  accent: "bg-yellow-500",          // For buttons and strong highlights
  accentHover: "hover:bg-yellow-600", // Button hover state
  border: "border-yellow-200",      // Light accents like dividers or card borders
  bgTint: "bg-yellow-50",           // Subtle background sections
},
themeGradient: "from-yellow-100 to-yellow-600",
    capabilities: [
      "Schedule and confirm appointments via WhatsApp",
      "Route users to the right service or team",
      "Remember user preferences and past chats",
      "Send smart follow-up nudges",
    ],
  },
  {
    id: "ava",
    name: "Ava",
    title: "The Inbox Whisperer",
    description:
      "Ava triages emails, drafts replies, and manages scheduling so you can focus on what matters. Designed for busy professionals who want their inbox to work for them.",
    image: avaImg,
    banner: avaBanner, // when ready
    themeColor: {
      text: "text-purple-800",
      accent: "bg-purple-600",
      accentHover: "hover:bg-purple-700",
      border: "border-purple-200",
      bgTint: "bg-purple-50",
    }, // purple rain
    themeGradient: "from-purple-100 to-purple-600",
    capabilities: [
      "Sort and categorize incoming emails",
      "Draft context-aware responses",
      "Schedule meetings based on email content",
      "Prioritize high-value communication",
    ],
  },
  {
    id: "kai",
    name: "Kai",
    title: "The Pull Request Partner",
    description:
      "Kai is your quiet partner in every code review. He leaves clean, helpful feedback and identifies bugs, style issues, and optimization opportunities.",
    image: kaiImg,
    banner: kaiBanner, // when ready
    themeColor: {
      text: "text-cyan-800",
      accent: "bg-cyan-600",
      accentHover: "hover:bg-cyan-700",
      border: "border-cyan-100",
      bgTint: "bg-cyan-50",
    }, // cold-cyan
    themeGradient: "from-cyan-100 to-cyan-600",
    capabilities: [
      "Scan PRs for bugs, smells, and edge cases",
      "Comment in clean, human-like language",
      "Suggest syntax improvements and refactors",
      "Highlight risky merges and missed tests",
    ],
  },
];
