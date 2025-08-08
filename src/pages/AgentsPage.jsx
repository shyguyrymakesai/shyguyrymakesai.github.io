import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { agents } from "../data/agents";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Bot, Mail, MessageCircle, Code, Search } from "lucide-react";

const CATEGORY_MAP = {
  will: { key: "messaging", label: "Messaging", icon: MessageCircle },
  ava: { key: "email", label: "Email", icon: Mail },
  kai: { key: "code", label: "Code Review", icon: Code },
};

const TABS = [
  { key: "all", label: "All" },
  { key: "messaging", label: "Messaging" },
  { key: "email", label: "Email" },
  { key: "code", label: "Code" },
];

export default function AgentsPage() {
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");

  const enriched = useMemo(() => {
    return agents.map((a) => {
      const cat = CATEGORY_MAP[a.id] || { key: "misc", label: "Misc" };
      return { ...a, category: cat.key, categoryLabel: cat.label };
    });
  }, []);

  const filtered = useMemo(() => {
    const base = tab === "all" ? enriched : enriched.filter((a) => a.category === tab);
    if (!q.trim()) return base;
    const s = q.toLowerCase();
    return base.filter(
      (a) =>
        a.name.toLowerCase().includes(s) ||
        a.title.toLowerCase().includes(s) ||
        (a.description && a.description.toLowerCase().includes(s))
    );
  }, [tab, q, enriched]);

  return (
    <main className="min-h-screen font-sans bg-white dark:bg-carbon-900 scroll-smooth">
      <Navbar />

      {/* Spacing for fixed navbar */}
      <div className="pt-24" />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-indigo-900/40 dark:via-transparent dark:to-cyan-900/20 p-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Bot className="w-6 h-6 text-indigo-600 dark:text-cyan-300" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Meet the Agents
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
            A small, opinionated toolkit of assistants you can actually use:
            scheduling on WhatsApp, inbox triage, and PR/code review. Click any
            card to see capabilities and a live-ish demo description.
          </p>

          {/* Controls */}
          <div className="mt-6 flex flex-col md:flex-row gap-4 md:items-center">
            <div className="inline-flex rounded-full border border-gray-200 dark:border-white/10 p-1 bg-white/70 dark:bg-white/5 backdrop-blur md:self-start">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`px-4 py-2 text-sm rounded-full transition ${
                    tab === t.key
                      ? "bg-indigo-600 text-white dark:bg-indigo-500"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search agents…"
                className="w-full rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 md:ml-auto">
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-6 mt-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((agent, idx) => (
            <AgentCard key={agent.id} agent={agent} idx={idx} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow"
          >
            Build a custom agent
            <span className="opacity-80">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

function AgentCard({ agent, idx }) {
  const Icon =
    agent.category === "messaging"
      ? MessageCircle
      : agent.category === "email"
      ? Mail
      : Code;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.03 * idx }}
      className={`group relative overflow-hidden rounded-2xl border ${agent.themeColors?.border || "border-gray-200"} ${agent.themeColors?.bgTint || "bg-gray-50"} dark:border-white/10 dark:bg-white/5`}
    >
      {/* Banner / gradient */}
      <div
        className={`absolute inset-0 pointer-events-none bg-gradient-to-br ${agent.themeGradient || "from-indigo-100 to-cyan-100"} opacity-40 group-hover:opacity-60 transition`}
      />
      <div className="relative p-6 flex flex-col h-full">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 opacity-80" />
          <span className="text-xs uppercase tracking-wide opacity-80">
            {agent.categoryLabel || "Agent"}
          </span>
        </div>

        <h3 className={`mt-2 text-xl font-semibold ${agent.themeColors?.text || ""}`}>
          {agent.name}
          <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-300">
            — {agent.title}
          </span>
        </h3>

        <p className="mt-2 text-sm text-gray-700 dark:text-gray-200 line-clamp-4">
          {agent.description}
        </p>

        {/* Capabilities */}
        {Array.isArray(agent.capabilities) && agent.capabilities.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm">
            {agent.capabilities.slice(0, 3).map((cap, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-gray-700 dark:text-gray-200"
              >
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex items-center gap-3 pt-4 border-t border-black/5 dark:border-white/10">
          <Link
            to={`/agents/${agent.id}`}
            className={`px-4 py-2 rounded-full text-sm font-medium ${agent.themeColors?.accent || "bg-gray-900"} ${agent.themeColors?.accentHover || "hover:bg-gray-800"} text-white shadow`}
          >
            View details
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 rounded-full text-sm font-medium border border-gray-300 dark:border-white/20 hover:bg-white/60 dark:hover:bg-white/10 transition"
          >
            Book a demo
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
