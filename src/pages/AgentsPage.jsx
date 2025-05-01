// src/pages/AgentsPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { agents } from "../data/agents";

export default function AgentsPage() {
  return (
    <main className="min-h-screen font-sans bg-white">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-blue-50 to-blue-100 py-24 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-blue-800">Meet the Agents 🤖</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Explore AI agents brought to life through elegant interfaces and powerful backends. Each one is specialized, tested, and built to perform — crafted by a human, running autonomously.
          </p>
          <Link
            to="/"
            className="inline-block mt-6 px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-md transition"
          >
            ← Back to Home
          </Link>
        </div>
      </section>

      {/* Agent Cards */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {agents.map((agent) => (
            <Link
              to={`/agents/${agent.id}`}
              key={agent.id}
              className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg border border-gray-200 hover:border-blue-500 transition transform hover:-translate-y-1"
            >
              <div className="relative px-6 pt-10 pb-4 text-center">
                <div className="flex justify-center mb-4">
                  <img
                    src={agent.image}
                    alt={`${agent.name} avatar`}
                    className="h-20 w-20 rounded-full border-4 border-white shadow-lg object-cover"
                    onError={(e) => { e.currentTarget.src = "/shyguyrymakesai.github.io/agents/whatsapp-agent.jpg"; }}
                  />
                </div>

                <div className="mt-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{agent.name}</h2>
                  <p className="text-blue-600 font-medium text-sm mb-3">{agent.title}</p>
                  <p className="text-sm text-gray-700 leading-snug mb-4">
                    {agent.description}
                  </p>
                  <span className="inline-block text-xs px-4 py-2 bg-blue-100 text-blue-600 font-medium rounded-full">
                    View Profile
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
