// src/pages/AgentsPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { agents } from "../data/agents";

export default function AgentsPage() {
  return (
    <main className="min-h-screen font-sans bg-white">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-blue-50 to-blue-100 py-20 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-blue-800">Meet the Agents 🤖</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            These assistants were built to think, act, and assist — autonomously. They each run on powerful backends, with specialized skills and personality.
          </p>
          <Link
            to="/"
            className="inline-block mt-6 px-4 py-1.5 text-sm text-blue-600 border border-blue-300 rounded-full hover:bg-blue-100 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </section>

      {/* Spotlight Sections */}
      {agents.map((agent, index) => (
        <section
          key={agent.id}
          className={`py-16 px-6 bg-gradient-to-br ${agent.themeGradient}`}
        >
          <div className={`max-w-6xl mx-auto flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}>
            <img
              src={agent.image}
              alt={agent.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
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
      <section className="bg-gray-100 py-12 px-6 text-center">
        <h3 className="text-xl font-semibold mb-2">Want a custom agent for your business?</h3>
        <Link
          to="#contact"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Let’s chat →
        </Link>
      </section>
    </main>
  );
}
