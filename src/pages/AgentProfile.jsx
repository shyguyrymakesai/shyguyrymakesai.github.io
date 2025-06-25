// src/pages/AgentProfile.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { agents } from "../data/agents";
import Navbar from "../components/Navbar";
import ChatDemo from "../components/ChatDemo";

export default function AgentProfile() {
  const { agentId } = useParams();
  const agent = agents.find((a) => a.id === agentId);

  if (!agent) {
    return (
      <main className="min-h-screen flex items-center justify-center text-center font-sans">
        <div>
          <h1 className="text-3xl font-bold mb-4">Agent not found</h1>
          <Link to="/agents" className="text-blue-600 hover:underline">
            ← Back to Agents
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen font-sans bg-white">
      <Navbar />

      {/* Responsive Hero Banner */}
      {agent.banner && (
        <section className="relative w-full bg-white overflow-hidden">
          <div className="w-full max-h-[420px] sm:max-h-[480px] md:max-h-[520px] overflow-hidden">
            <img
              src={agent.banner}
              alt={`${agent.name} banner`}
              className="w-full h-full object-fill sm:object-cover object-center"
              style={{ objectPosition: 'center top' }}
            />
          </div>
        </section>
      )}

      {/* Agent Details Section */}
      <section className="max-w-3xl mx-auto px-6 py-12 text-center">
        <h1 className={`text-4xl font-bold mb-2 ${agent.themeColor?.text || "text-gray-800"}`}>
          Meet {agent.name}
        </h1>
        <p className={`${agent.themeColor?.text || "text-gray-600"} font-medium text-lg mb-6`}>
          {agent.title}
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-10">
          {agent.description}
        </p>

        {agent.capabilities?.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Capabilities</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-gray-600 max-w-2xl mx-auto mb-10">
              {agent.capabilities.map((cap, idx) => (
                <li
                  key={idx}
                  className={`bg-white ${agent.themeColor?.border || "border-gray-200"} px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition`}
                >
                  ✅ {cap}
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="my-8">
          <h2 className="text-2xl font-semibold mb-4">Try {agent.name}</h2>
          <ChatDemo agentId={agent.id} />
        </div>

        <Link
          to="/agents"
          className={`inline-block px-6 py-2 text-sm font-medium text-white ${agent.themeColor?.accent || "bg-gray-800"} ${agent.themeColor?.accentHover || "hover:bg-gray-900"} rounded-full shadow transition`}
        >
          ← Back to Agents
        </Link>
      </section>
    </main>
  );
}
