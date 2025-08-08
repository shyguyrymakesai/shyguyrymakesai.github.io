// src/pages/AgentProfile.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { agents } from "../data/agents";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { ArrowLeft, Bot } from "lucide-react";

export default function AgentProfile() {
  const { agentId } = useParams();
  const agent = agents.find((a) => a.id === agentId);

  if (!agent) {
    return (
      <main className="min-h-screen bg-white dark:bg-carbon-900">
        <Navbar />
        <div className="pt-24 max-w-3xl mx-auto px-6">
          <h1 className="text-2xl font-semibold">Agent not found</h1>
          <Link to="/agents" className="text-indigo-600 hover:underline">
            ← Back to Agents
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen font-sans bg-white dark:bg-carbon-900">
      <Navbar />
      <div className="pt-20" />

      {/* Banner */}
      <section
        className={`relative overflow-hidden border-b border-black/5 dark:border-white/10`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            agent.themeGradient || "from-indigo-100 to-cyan-100"
          } opacity-40`}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
            <Bot className="w-5 h-5 opacity-80" />
            <span className="text-xs uppercase tracking-wide opacity-80">
              {agent.title}
            </span>
          </div>
          <h1 className={`mt-2 text-3xl md:text-4xl font-bold ${agent.themeColors?.text || ""}`}>
            {agent.name}
          </h1>
          <p className="mt-3 max-w-2xl text-gray-700 dark:text-gray-200">
            {agent.description}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Link
              to="/contact"
              className={`px-5 py-2.5 rounded-full text-sm font-medium ${
                agent.themeColors?.accent || "bg-gray-900"
              } ${agent.themeColors?.accentHover || "hover:bg-gray-800"} text-white shadow`}
            >
              Book a demo
            </Link>
            <Link
              to="/agents"
              className="px-5 py-2.5 rounded-full text-sm font-medium border border-gray-300 dark:border-white/20 hover:bg-white/60 dark:hover:bg-white/10 transition inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Agents
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        {Array.isArray(agent.capabilities) && agent.capabilities.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">
              <h2 className="text-lg font-semibold">What it can do</h2>
              <ul className="mt-4 space-y-3">
                {agent.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-200">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Image / Banner if available */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
              {agent.banner ? (
                <img
                  src={agent.banner}
                  alt={`${agent.name} banner`}
                  className="w-full h-full object-cover"
                />
              ) : agent.image ? (
                <img
                  src={agent.image}
                  alt={`${agent.name} avatar`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full min-h-[220px] flex items-center justify-center text-gray-500">
                  No preview
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className={`px-5 py-2.5 rounded-full text-sm font-medium ${
              agent.themeColors?.accent || "bg-gray-900"
            } ${agent.themeColors?.accentHover || "hover:bg-gray-800"} text-white shadow`}
          >
            Get started
          </Link>
          <Link
            to="/agents"
            className="px-5 py-2.5 rounded-full text-sm font-medium border border-gray-300 dark:border-white/20 hover:bg-white/60 dark:hover:bg-white/10 transition"
          >
            ← Back to Agents
          </Link>
        </div>
      </section>
    </main>
  );
}
