import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import heroImage from "../assets/hero.jpg";
import demoImage from "../assets/Demo_SS.png";
import shyguyryicon from "../assets/shyguyry_icon.png";
import Navbar from "../components/Navbar";
import { SparklesCore } from "../components/SparklesCore";
import Rocket from "../components/Rocket";

export default function HomePage() {
  const location = useLocation();
  const [typedText] = useTypewriter({
    words: [
      "AI Engineer building agentic LLM systems",
      "Built a WhatsApp AI assistant solo",
      "Open to remote roles in AI engineering",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <main className="min-h-screen font-sans scroll-smooth bg-white dark:bg-indigo-950">
      <Navbar />

      <div className="pt-24">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-white dark:bg-indigo-900 py-32 px-6 text-center overflow-hidden"
        >
          <SparklesCore className="absolute inset-0 -z-10 opacity-30" />
          <img
            src={heroImage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-contain opacity-30 pointer-events-none"
          />
          <div className="relative z-10 space-y-4">
            <h1 className="text-6xl font-extrabold tracking-tight">Ryan Martinez</h1>
            <p className="text-xl text-gray-700 max-w-xl mx-auto h-8">
              {typedText}
              <Cursor cursorColor="#000" />
            </p>
            <div className="flex justify-center pt-4">
              <Rocket className="w-12 h-12 animate-bounce" />
            </div>
          </div>
        </motion.section>

        {/* Project Section */}
        <motion.section
          id="project"
          className="bg-gray-100 dark:bg-indigo-900 py-14 px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-10">Featured Projects</h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <Link to="/projects/ai-assistant" className="rounded-xl overflow-hidden shadow-lg border bg-white dark:bg-indigo-800 block">
              <img
                src={demoImage}
                alt="AI Assistant Demo"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <div>
              <h2 className="text-3xl font-bold mb-4">AI Appointment Assistant</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                A full-stack AI assistant deployed through WhatsApp. It handles appointment scheduling, natural language queries, memory-driven follow-ups, and service walkthroughs.
                Built with LangChain for tool routing, FastAPI for backend logic, and deployed via Docker for real-world testing.
              </p>
              <ul className="flex flex-wrap gap-3 text-sm text-gray-600 mb-6">
                {['LangChain', 'FastAPI', 'Tool Routing', 'Memory', 'Docker'].map((tag) => (
                  <li
                    key={tag}
                      className="bg-white dark:bg-indigo-800 px-3 py-1 rounded-full shadow-sm border hover:bg-blue-50 dark:hover:bg-indigo-700 hover:text-blue-700 dark:text-indigo-200 dark:hover:text-blue-300 transition"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-center md:text-left">
                <Link
                  to="/agents"
                  className="inline-block px-8 py-3 text-lg font-semibold border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 hover:text-blue-800 transition"
                >
                  Explore My Live Agents →
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* About Me Section */}
        <motion.section
          id="about"
          className="bg-white dark:bg-indigo-900 py-20 px-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-gray-700 leading-relaxed">
              I'm a developer with a passion for autonomous AI systems. After leaving the University of Pennsylvania to refocus and rebuild, I dedicated myself to building tools that actually work — fast, smart, and solo. I'm actively seeking remote or Indiana-based roles in AI engineering, automation, or backend systems.
            </p>
          </div>
        </motion.section>

        {/* Resume Section */}
        <motion.section
          id="resume"
          className="bg-gray-50 dark:bg-indigo-800 py-20 px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
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
        </motion.section>

        {/* Contact Section */}
        <motion.footer
          id="contact"
          className="bg-gray-100 dark:bg-indigo-900 py-16 px-6 text-center text-sm text-gray-600 dark:text-indigo-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
            🔗 GitHub: {" "}
            <a
              href="https://github.com/shyguyrymakesai"
              className="text-blue-600 hover:underline"
            >
              shyguyrymakesai
            </a>
          </p>
          <p className="mt-4">Let’s collaborate — or just say hi.</p>
        </motion.footer>
      </div>
    </main>
  );
}
