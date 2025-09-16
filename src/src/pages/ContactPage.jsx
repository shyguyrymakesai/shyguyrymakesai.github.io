import React, { useEffect, useMemo, useState } from "react";
import { Mail, Github, Linkedin, UploadCloud, Clipboard } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { SparklesCore } from "../components/SparklesCore";
import { CONTACT_ENDPOINT } from "../../contexts/config";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    projectType: "Agent build",
    budget: "Under $2k",
    urgency: "Normal",
    message: "",
  });
  const [queue, setQueue] = useState([]);

  // Load queue from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("contactQueue") || "[]");
      setQueue(Array.isArray(saved) ? saved : []);
    } catch {}
  }, []);

  const saveQueue = (q) => {
    setQueue(q);
    localStorage.setItem("contactQueue", JSON.stringify(q));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const payload = useMemo(() => {
    return {
      ...form,
      timestamp: new Date().toISOString(),
      source: "portfolio-contact",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
    };
  }, [form]);

  const enqueue = () => {
    const updated = [...queue, payload];
    saveQueue(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.message) {
      toast.error("Please complete the required fields.");
      return;
    }
    enqueue();
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      projectType: "Agent build",
      budget: "Under $2k",
      urgency: "Normal",
      message: "",
    });
    toast.success("Saved to outbox.");
  };

  const syncNow = async () => {
    if (!CONTACT_ENDPOINT) {
      toast("No endpoint configured. (Set VITE_CONTACT_ENDPOINT at build-time.)");
      return;
    }
    let remaining = [];
    for (const item of queue) {
      try {
        const res = await fetch(CONTACT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        if (!res.ok) throw new Error("non-200");
      } catch (e) {
        remaining.push(item);
      }
    }
    saveQueue(remaining);
    if (remaining.length === 0) toast.success("All messages synced!");
    else toast.error(`${remaining.length} message(s) still pending.`);
  };

  const copyLatest = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(queue[queue.length - 1] || payload, null, 2));
      toast.success("Copied JSON to clipboard");
    } catch {
      toast.error("Copy failed");
    }
  };

  const downloadQueue = () => {
    const blob = new Blob([JSON.stringify(queue, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contact-queue.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen font-sans bg-white dark:bg-carbon-900 relative overflow-hidden">
      <Navbar />
      <Toaster />
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

      {/* Header */}
      <section className="relative z-10 text-center px-6 py-10">
        <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="text-3xl md:text-4xl font-bold">Get in touch</motion.h1>
        <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:.1}} className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Tell me about your project. This form saves to a local outbox first, then sends when a backend is configured.
        </motion.p>
      </section>

      {/* Form + sidebar */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="rounded-2xl border border-emerald-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="firstName" placeholder="First name*" value={form.firstName} onChange={handleChange} className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5" required/>
              <input name="lastName" placeholder="Last name*" value={form.lastName} onChange={handleChange} className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5" required/>
            </div>
            <input type="email" name="email" placeholder="Email*" value={form.email} onChange={handleChange} className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5" required/>
            <input name="company" placeholder="Company (optional)" value={form.company} onChange={handleChange} className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5"/>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <select name="projectType" value={form.projectType} onChange={handleChange} className="px-4 py-2 rounded-md border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5">
                <option>Agent build</option>
                <option>Automation</option>
                <option>Consulting</option>
                <option>Other</option>
              </select>
              <select name="budget" value={form.budget} onChange={handleChange} className="px-4 py-2 rounded-md border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5">
                <option>Under $2k</option>
                <option>$2k–$5k</option>
                <option>$5k–$10k</option>
                <option>$10k+</option>
              </select>
              <select name="urgency" value={form.urgency} onChange={handleChange} className="px-4 py-2 rounded-md border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5">
                <option>Normal</option>
                <option>Soon</option>
                <option>ASAP</option>
              </select>
            </div>
            <textarea name="message" rows={5} placeholder="What are we building?*" value={form.message} onChange={handleChange} className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5" required/>
            <div className="flex flex-wrap gap-3">
              <button type="submit" className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow">Save to outbox</button>
              <button type="button" onClick={syncNow} className="px-5 py-2.5 rounded-full border border-gray-300 dark:border-white/20 hover:bg-white/60 dark:hover:bg-white/10 font-medium inline-flex items-center gap-2">
                <UploadCloud className="w-4 h-4" /> Sync now
              </button>
              <button type="button" onClick={copyLatest} className="px-5 py-2.5 rounded-full border border-gray-300 dark:border-white/20 hover:bg-white/60 dark:hover:bg-white/10 font-medium inline-flex items-center gap-2">
                <Clipboard className="w-4 h-4" /> Copy latest JSON
              </button>
              <button type="button" onClick={downloadQueue} className="px-5 py-2.5 rounded-full border border-gray-300 dark:border-white/20 hover:bg-white/60 dark:hover:bg-white/10 font-medium">Download queue</button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Endpoint: {CONTACT_ENDPOINT ? <span className="text-emerald-700">configured</span> : <span className="text-amber-700">not set</span>} (set <code>VITE_CONTACT_ENDPOINT</code> at build)
            </p>
          </form>
        </motion.div>

        <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="rounded-2xl border border-emerald-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Prefer direct contact?</h2>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center gap-2"><Mail className="w-4 h-4"/><span>ryan.martinez2@protonmail.com</span></div>
            <div className="flex items-center gap-2"><Github className="w-4 h-4"/><a href="https://github.com/shyguyrymakesai" className="underline">github.com/shyguyrymakesai</a></div>
            <div className="flex items-center gap-2"><Linkedin className="w-4 h-4"/><a href="https://www.linkedin.com/in/ryan-martinez13" className="underline">linkedin.com/in/ryan-martinez13</a></div>
          </div>
          <p className="mt-4 text-xs text-gray-500">Your message is saved locally first. When you set an endpoint, hit “Sync now” and I’ll send it.</p>
        </motion.div>
      </section>

      <Link to="/" className="fixed bottom-6 left-6 z-50 px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow">← Back to Home</Link>
    </main>
  );
}
