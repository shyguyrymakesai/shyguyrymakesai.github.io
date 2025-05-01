// src/pages/AgentsPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { agents } from "../data/agents";

export default function AgentsPage() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Meet the Agents</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {agents.map((agent) => (
          <Link
            to={`/agents/${agent.id}`}
            key={agent.id}
            className="bg-white rounded-xl shadow hover:shadow-md transition block overflow-hidden border hover:border-blue-600"
          >
            <img
              src={agent.image}
              alt={agent.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">Meet {agent.name}</h2>
              <p className="text-blue-600 font-medium mb-2">{agent.title}</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                {agent.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
