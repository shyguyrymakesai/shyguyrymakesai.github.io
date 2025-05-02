// src/pages/AgentProfile.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { agents } from "../data/agents";

export default function AgentProfile() {
  const { agentId } = useParams();
  const agent = agents.find((a) => a.id === agentId);

  if (!agent) {
    return (
      <main className="min-h-screen flex items-center justify-center text-center font-sans">
        <div>
          <h1 className="text-3xl font-bold mb-4">Agent not found</h1>
          <Link to="/agents" className="text-blue-600 hover:underline">← Back to Agents</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen font-sans bg-white">
      <section className="relative bg-gradient-to-r from-blue-50 to-blue-100 py-24 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <img
            src={whastapp-avatar}
            alt={`${agent.name} avatar`}
            className="h-24 w-24 rounded-full mx-auto mb-6 border-4 border-white shadow-lg object-cover"
          />
          <h1 className="text-4xl font-bold text-blue-800 mb-2">Meet {agent.name}</h1>
          <p className="text-blue-600 font-medium mb-4">{agent.title}</p>
          <p className="text-gray-700 mb-6">{agent.description}</p>
          <Link
            to="/agents"
            className="inline-block px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-md transition"
          >
            ← Back to Agents
          </Link>
        </div>
      </section>
    </main>
  );
}
