import React from "react";
import { Link, useLocation } from "react-router-dom";
import heroImage from "../assets/hero.jpg";
import demoImage from "../assets/Demo_SS.png";
import shyguyryicon from "../assets/shyguyry_icon.png";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const location = useLocation();

  return (
    <main className="min-h-screen font-sans scroll-smooth">
      <Navbar/>

      <div className="pt-24">
        {/* Hero Section */}
        <section className="relative bg-white py-24 px-6 text-center transition-opacity duration-500 ease-in-out">
          <img
            src={heroImage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-contain opacity-35 pointer-events-none"
          />
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-4">Ryan Martinez</h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              AI Engineer focused on building agentic LLM systems. I recently built and deployed a WhatsApp-based AI assistant using LangChain, FastAPI, and memory routing — solo.
            </p>
          </div>
        </section>

        {/* Project Section */}
        <section id="project" className="bg-gray-100 py-14 px-6 transition-transform duration-500 ease-in-out">
          <h2 className="text-3xl font-bold text-center mb-10">Featured Projects</h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="rounded-xl overflow-hidden shadow-lg border bg-white">
              <img
                src={demoImage}
                alt="AI Assistant Demo"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">AI Appointment Assistant</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                A full-stack AI assistant deployed through WhatsApp. It handles appointment scheduling, natural language queries, memory-driven follow-ups, and service walkthroughs.
                Built with LangChain for tool routing, FastAPI for backend logic, and deployed via Docker for real-world testing.
              </p>
              <ul className="flex flex-wrap gap-3 text-sm text-gray-600 mb-6">
                {["LangChain", "FastAPI", "Tool Routing", "Memory", "Docker"].map((tag) => (
                  <li
                    key={tag}
                    className="bg-white px-3 py-1 rounded-full shadow-sm border hover:bg-blue-50 hover:text-blue-700 transition"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <a
                href="https://github.com/shyguyrymakesai/whatsapp-agent"
                className="inline-block px-6 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
              >
                View Code on GitHub
              </a>
              <div className="mt-6 text-center md:text-left">
                <Link
                  to="/agents"
                  className="inline-block px-5 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 hover:text-blue-800 transition"
                >
                  Explore My Live Agents →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="bg-white py-20 px-6 text-center transition-all duration-500 ease-in-out">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-gray-700 leading-relaxed">
              I'm a developer with a passion for autonomous AI systems. After leaving the University of Pennsylvania to refocus and rebuild, I dedicated myself to building tools that actually work — fast, smart, and solo. I'm actively seeking remote or Indiana-based roles in AI engineering, automation, or backend systems.
            </p>
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="bg-gray-50 py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Resume</h2>
            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-semibold mb-2">Technical Projects</h3>
                <p className="font-medium">AI Assistant (Solo Project) | Python, FastAPI, LangChain, WhatsApp API</p>
                <ul className="list-disc list-inside text-gray-700 ml-4">
                  <li>Built a WhatsApp-based AI assistant handling bookings, service explanations, and multi-turn memory</li>
                  <li>Implemented LangChain routing with FastAPI backend and deployed locally with Docker</li>
                  <li>Used JSON-based memory system and custom error-handling architecture</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Professional Experience</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Cybersecurity Analyst Intern – Anderson University | May – Aug 2023</p>
                    <ul className="list-disc list-inside text-gray-700 ml-4">
                      <li>Drafted a 200-page System Security Plan (SSP) for SMB clients with co-led team</li>
                      <li>Co-authored 3 white papers on threat vectors and InfoSec practices</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Undergraduate Research Assistant – Dr. Wang’s Lab, UPenn | May – Aug 2020</p>
                    <ul className="list-disc list-inside text-gray-700 ml-4">
                      <li>Supported ML research on patient outcome forecasting using healthcare datasets</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Data Engineering / ML Intern – Jobcase Inc. | June – Aug 2019</p>
                    <ul className="list-disc list-inside text-gray-700 ml-4">
                      <li>Built ETL pipelines and a prototype data lake using Apache Spark</li>
                      <li>Visualized engagement insights for civic outreach partnerships</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Technical Skills</h3>
                <p className="text-gray-700">
                  <strong>Languages & Tools:</strong> Python, Java, Bash, HTML/CSS, Git, Docker, Unix CLI<br />
                  <strong>Frameworks & Libraries:</strong> FastAPI, LangChain, TensorFlow, Pandas, Apache Spark<br />
                  <strong>Systems & Dev:</strong> REST APIs, LLM Tool Routing, Uvicorn, Virtualenv, VS Code, Postman
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <p className="text-gray-700">
                  University of Pennsylvania<br />
                  Completed 33.5 CUs toward B.S. in Computer Science (Engineering) & Economics (Wharton)<br />
                  2018–2024
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <footer
          id="contact"
          className="bg-gray-100 py-16 px-6 text-center text-sm text-gray-600 transition-opacity duration-500 ease-in-out"
        >
          <div className="mb-4 flex justify-center">
            <img
              src={shyguyryicon}
              alt="Cute avatar of Ryan coding"
              className="w-16 h-16 object-contain opacity-90"
            />
          </div>
          <p>📧 ryan.martinez2@protonmail.com</p>
          <p>
            🔗 GitHub:{" "}
            <a
              href="https://github.com/shyguyrymakesai"
              className="text-blue-600 hover:underline"
            >
              shyguyrymakesai
            </a>
          </p>
          <p className="mt-4">Let’s collaborate — or just say hi.</p>
        </footer>
      </div>
    </main>
  );
}
