import React from "react";
import { Link, useLocation } from "react-router-dom";
import { agents } from "../data/agents";
import Navbar from "../components/Navbar";

export default function AgentsPage() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <main className="min-h-screen font-sans bg-white dark:bg-carbon-800 scroll-smooth">
            <Navbar />
      
      {/* Top Navigation Bar */}

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-blue-50 to-blue-100 dark:from-carbon-700 dark:to-carbon-800 pt-32 pb-20 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 animate-pulse bg-[url('/grid.svg')] bg-center bg-cover pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-5xl font-bold mb-4 text-blue-800">Meet the Agents 🤖</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            These assistants were built to think, act, and assist — autonomously.
            They each run on powerful backends, with specialized skills and personality.
          </p>
        </div>
      </section>

      {/* Spotlight Sections */}
      {agents.map((agent, index) => (
        <section
          key={agent.id}
          className={`py-16 px-6 bg-gradient-to-br ${agent.themeGradient} dark:from-carbon-700 dark:to-carbon-800 scroll-mt-20 animate-fade-in`}
        >
          <div
            className={`max-w-6xl mx-auto flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center gap-8`}
          >
            <img
              src={agent.image}
              alt={agent.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover scale-100 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="text-center md:text-left">
              <h2 className={`text-3xl font-bold mb-1 ${agent.themeColor.text}`}>{agent.name}</h2>
              <p className="text-md text-gray-800 mb-4 italic">{agent.title}</p>
              <ul className="text-gray-700 text-sm list-disc ml-5 space-y-1 mb-6">
                {agent.capabilities.map((cap) => (
                  <li key={cap}>{cap}</li>
                ))}
              </ul>
              <Link
                to={`/agents/${agent.id}`}
                className={`inline-block px-4 py-2 text-white rounded-lg ${agent.themeColor.accent} ${agent.themeColor.accentHover} transition`}
              >
                Try {agent.name} →
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Footer */}
      <section className="bg-gray-100 dark:bg-carbon-800 py-12 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 opacity-10 animate-fade-in pointer-events-none" />
        <div className="relative z-10">
          <h3 className="text-xl font-semibold mb-2">Want a custom agent for your business?</h3>
          <Link
            to="/contact"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Let’s chat →
          </Link>
        </div>
      </section>
    </main>
  );
}
