import React from "react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 p-6">
      <section className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-10 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Ryan Martinez</h1>
          <p className="text-sm text-gray-500 mt-1">
            AI Automation Developer &mdash; LangChain • FastAPI • Python | Based in Indiana (Open to Remote)
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">About Me</h2>
          <p>
            I'm a developer with a passion for agentic AI and automation. After studying Computer Science and Economics at the University of Pennsylvania, I focused on building systems that reduce friction in communication and workflows. Most recently, I designed and deployed an AI assistant capable of handling appointment bookings, service interactions, and follow-ups entirely through WhatsApp.
          </p>
          <p className="mt-2">
            I thrive on solving real-world problems with fast, functional tech — especially when it involves LLMs, APIs, and clean backend architecture.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Featured Project: AI Appointment Assistant</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Integrated WhatsApp messaging with a FastAPI backend</li>
            <li>Used LangChain for tool-based reasoning and memory-driven responses</li>
            <li>Custom routing logic to determine user intent and invoke appropriate actions</li>
            <li>Dockerized and locally deployable for small businesses</li>
            <li>Focused on reliability, user-state persistence, and natural conversation flow</li>
          </ul>
          <p className="mt-2 text-sm text-gray-500">Codebase and demo available on request.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Contact</h2>
          <p className="leading-relaxed">
            <strong>Email:</strong> <a href="mailto:ryan.martinez2@protonmail.com" className="text-blue-600">ryan.martinez2@protonmail.com</a><br />
            <strong>GitHub:</strong> <span className="text-gray-700">(Insert GitHub Link Here)</span><br />
            <strong>Location:</strong> Muncie, Indiana &mdash; Remote-Ready
          </p>
        </section>

        <footer className="text-xs text-center text-gray-400 pt-6 border-t border-gray-200">
          &copy; {new Date().getFullYear()} Ryan Martinez. Built with React & Tailwind. Deployed via GitHub Pages.
        </footer>
      </section>
    </main>
  );
}
