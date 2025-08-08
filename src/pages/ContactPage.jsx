import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { SparklesCore } from "../components/SparklesCore";
import { Mail, Github, Linkedin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen font-sans bg-white dark:bg-carbon-900 relative overflow-hidden">
      <Navbar />
      <div className="pt-24" />

      {/* Sparkles backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.3}
          maxSize={1.0}
          particleDensity={120}
          className="w-full h-full"
          particleColor="#34d399"
        />
      </div>

      {/* Simple links */}
      <section className="relative z-10 max-w-xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Get in touch</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Reach me directly via any of the links below.
        </p>

        <div className="mt-8 space-y-4">
          <a
            href="mailto:ryan.martinez2@protonmail.com"
            className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-full border border-gray-300 dark:border-white/20 hover:bg-white/60 dark:hover:bg-white/10 transition"
          >
            <Mail className="w-5 h-5" /> ryan.martinez2@protonmail.com
          </a>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="https://github.com/shyguyrymakesai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-300 dark:border-white/20 hover:bg-white/60 dark:hover:bg-white/10 transition"
            >
              <Github className="w-5 h-5" /> github.com/shyguyrymakesai
            </a>
            <a
              href="https://www.linkedin.com/in/ryan-martinez13"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-300 dark:border-white/20 hover:bg-white/60 dark:hover:bg-white/10 transition"
            >
              <Linkedin className="w-5 h-5" /> linkedin.com/in/ryan-martinez13
            </a>
          </div>
        </div>
      </section>

      <Link to="/" className="fixed bottom-6 left-6 z-50 px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow">
        ← Back to Home
      </Link>
    </main>
  );
}
