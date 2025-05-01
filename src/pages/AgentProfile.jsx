// src/pages/AgentProfile.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { agents } from "../data/agents";

export default function AgentProfile() {
  const { agentId } = useParams();
  const agent = agents.find((a) => a.id === agentId);

  if (!agent) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Agent not found.</h1>
        <Link to="/agents" className="text-blue-600 hover:underline">
          ← Back to Agents
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white font-sans px-6 py-16 max-w-4xl mx-auto">
      <img
        src={agent.image}
        alt={agent.name}
        className="rounded-xl shadow w-full mb-8"
      />
      <h1 className="text-4xl font-bold mb-2">Meet {agent.name}</h1>
      <h2 className="text-xl text-blue-600 font-semibold mb-4">
        {agent.title}
      </h2>
      <p className="text-gray-700 text-lg leading-relaxed">
        {agent.description}
      </p>
      <div className="mt-8">
        <Link to="/agents" className="text-blue-600 hover:underline">
          ← Back to Agents
        </Link>
      </div>
    </main>
  );
}
