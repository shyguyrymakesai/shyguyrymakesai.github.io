import React, { useState } from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import shyguyryicon from "../assets/shyguyry_icon.png";
import Navbar from "../components/Navbar";
import { SparklesCore } from "../components/SparklesCore";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { contact } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-()+]+$/;

    if (!emailRegex.test(contact) && !phoneRegex.test(contact)) {
      toast.error("Please enter a valid email or phone number.");
      return;
    }

    toast.success("Message sent!");
    setForm({
      firstName: "",
      lastName: "",
      contact: "",
      message: "",
    });
  };

  return (
    <main className="relative min-h-screen font-sans bg-gradient-to-b from-emerald-100 to-emerald-200 overflow-hidden">
      <Navbar />
      <SparklesCore className="absolute inset-0 -z-10 opacity-40" />
      <Toaster position="top-center" reverseOrder={false} />

      {/* Hero Banner */}
      <section className="pt-32 pb-16 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-emerald-900 mb-4"
        >
          Let’s Connect
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg text-emerald-800 max-w-xl mx-auto"
        >
          Have a project, question, or idea? Drop me a note below and I’ll get back to you.
        </motion.p>
      </section>

      {/* Form + Info */}
      <section className="relative z-10 flex flex-col md:flex-row items-start justify-center gap-10 px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full max-w-md bg-white/70 backdrop-blur-md border border-emerald-200 rounded-xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                required
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-emerald-200 rounded-md"
              />
              <input
                type="text"
                name="lastName"
                required
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-emerald-200 rounded-md"
              />
            </div>
            <input
              type="text"
              name="contact"
              required
              placeholder="Email or Phone Number"
              value={form.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-emerald-200 rounded-md"
            />
            <textarea
              name="message"
              required
              rows="5"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-emerald-200 rounded-md"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-medium shadow"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full max-w-md bg-white/70 backdrop-blur-md border border-emerald-200 rounded-xl shadow-xl p-8 space-y-4"
        >
          <h2 className="text-2xl font-bold text-green-900 text-center">Prefer direct contact?</h2>
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="text-green-800" size={20} />
            <span className="font-bold text-green-900">Email:</span>
            <span>ryan.martinez2@protonmail.com</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Github className="text-green-800" size={20} />
            <span className="font-bold text-green-900">GitHub:</span>
            <a
              href="https://github.com/shyguyrymakesai"
              className="text-green-800 hover:underline"
              target="_blank" rel="noopener noreferrer"
            >
              shyguyrymakesai
            </a>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Linkedin className="text-green-800" size={20} />
            <span className="font-bold text-green-900">LinkedIn:</span>
            <a
              href="https://linkedin.com/in/ryan-martinez13"
              className="text-green-800 hover:underline"
              target="_blank" rel="noopener noreferrer"
            >
              ryan-martinez13
            </a>
          </div>
        </motion.div>
      </section>

      <Link
        to="/"
        className="fixed bottom-6 left-6 z-50 px-4 py-2 text-sm font-semibold text-white bg-emerald-700/70 backdrop-blur rounded-full shadow-lg hover:bg-emerald-700"
      >
        ← Back to Home
      </Link>
    </main>
  );
}
