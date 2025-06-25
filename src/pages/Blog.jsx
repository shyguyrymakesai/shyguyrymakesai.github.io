// src/pages/Blog.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { SparklesCore } from "../components/SparklesCore";
import { Button } from "../components/Button";
import shyguyryicon from "../assets/shyguyry_futuristic_icon.png";
import { fakePosts } from "../data/posts";
import ReactMarkdown from "react-markdown";

const BlogCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Link to={`/blog/${post.id}`} className="w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-sm">
      <motion.div
        whileHover={{ scale: 1.03 }}
        onHoverStart={() => setExpanded(true)}
        onHoverEnd={() => setExpanded(false)}
        transition={{ type: "spring", stiffness: 100 }}
        className="relative w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 hover:shadow-pink-500/50 p-[2px] flex flex-col h-full"
      >
        <div className="h-full w-full bg-black bg-opacity-50 rounded-[inherit] p-5 text-white shadow-2xl hover:cursor-pointer">
          <div className="text-4xl mb-2">{post.emoji}</div>
          <h2 className="text-xl font-bold mb-1 neon-text-gradient">{post.title}</h2>
          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-pink-600/30 text-pink-200 text-xs px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
          <p className="text-sm opacity-80 italic min-h-[3.5rem]">
            {post.snippet}
          </p>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2 text-xs text-gray-300 overflow-hidden line-clamp-2 prose prose-invert prose-p:m-0 prose-p:leading-snug"
              >
                <ReactMarkdown>{post.full}</ReactMarkdown>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Link>
  );
};

export default function Blog() {
  const [randomPost, setRandomPost] = useState(null);
  const [header] = useState("Ryan's River of Reflection");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative overflow-hidden min-h-screen py-16 px-6 bg-gradient-to-b from-[#1a102a] to-black">
      <style>{`
        @keyframes midnightPulse {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes moonFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none" style={{ isolation: "isolate" }}>
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(#ffffff 1.2px, transparent 1.3px), radial-gradient(#ffffff 1.2px, transparent 1.3px)',
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px',
          }}
        />
        <div
          className="absolute inset-0 z-10 opacity-30 bg-[length:400%_400%] animate-[midnightPulse_30s_ease-in-out_infinite]"
          style={{
            backgroundImage:
              'linear-gradient(135deg, #2b1b38, #1e1d35, #151926, #0d0f1c)',
          }}
        />
        <SparklesCore className="absolute inset-0 z-20 opacity-40" />
      </div>

      <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-br from-gray-300 to-white rounded-full shadow-lg z-30 animate-[moonFloat_10s_ease-in-out_infinite] opacity-70" />

      <Link
        to="/"
        className="fixed bottom-6 left-6 z-50 px-4 py-2 text-sm font-semibold text-white bg-black/50 backdrop-blur border border-white/20 rounded-full shadow-lg hover:bg-pink-500/80 transition"
      >
        ← Back to Main
      </Link>

      <div className="text-center mb-12">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-fuchsia-500/30 rounded-full blur-3xl z-[-1]" />
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400 cursor-default"
          >
            {header}
          </motion.h1>
        </div>
        <p className="mt-2 text-pink-200 italic">a chaotic archive of thoughts, builds & experiments</p>
      </div>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts..."
          className="w-full max-w-md px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
        />
      </div>

<div className="flex flex-wrap justify-center gap-8 mb-12 px-4 sm:px-6 md:pr-[20rem] md:pl-8 lg:pl-12 xl:pl-24">
        {fakePosts
          .filter(
            (post) =>
              post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              post.snippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
              post.tags.join(" ").toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        {fakePosts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.snippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.tags.join(" ").toLowerCase().includes(searchTerm.toLowerCase())
        ).length === 0 && (
          <p className="text-pink-100">No posts found.</p>
        )}
      </div>

      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={() => {
            const pick = fakePosts[Math.floor(Math.random() * fakePosts.length)];
            setRandomPost(pick);
          }}
          className="px-6 py-3 text-sm font-semibold rounded-full shadow-md bg-white text-black hover:text-transparent hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-cyan-400 hover:bg-clip-text transition-all duration-300"
        >
          🎲 Surprise Me
        </button>

        {randomPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 bg-pink-900/80 text-white px-6 py-4 rounded-xl shadow-lg max-w-md"
          >
            <h3 className="text-lg font-bold">{randomPost.title}</h3>
            <p className="text-sm mt-1">{randomPost.snippet}</p>
          </motion.div>
        )}
      </div>

      <div className="w-full md:w-52 mt-12 md:mt-0 md:fixed md:top-24 md:right-4 bg-black/60 border border-pink-500 p-4 rounded-xl shadow-lg text-white text-sm backdrop-blur">
        <div className="mb-4 flex justify-center">
          <img src={shyguyryicon} alt="ShyGuyRy" className="w-12 h-12 rounded-full shadow-sm" />
        </div>
        <div className="mb-4 overflow-y-auto max-h-60 pr-1 space-y-3">
          <strong className="block text-center">📡 Live Spotify Recs</strong>
          <a href="https://open.spotify.com/playlist/2A2VE7ykrelPEiVJOqcXr5?si=a8633f6e0eab474d" target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-r from-purple-700 to-pink-600 px-3 py-2 rounded-lg shadow hover:scale-[1.02] transition">
            🎶 Saturdays at Sansom
          </a>
          <a href="https://open.spotify.com/playlist/2FTPV9Tx6xi4ySESGXx6iV?si=6344c89e78aa42ca" target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-r from-green-600 to-teal-500 px-3 py-2 rounded-lg shadow hover:scale-[1.02] transition">
            🌴 NOLA '23
          </a>
          <a href="https://open.spotify.com/playlist/3Ek6dSSZesqj4aEmjko19f?si=7b95e5cec0104333" target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-r from-yellow-500 to-rose-400 px-3 py-2 rounded-lg shadow hover:scale-[1.02] transition">
            🎧 For the OG's
          </a>
        </div>
        <div className="mt-4">
          <strong>✍️ Mood</strong>
          <p>Curious. caffeinated. slightly unhinged.</p>
        </div>
        <div className="mt-3">
          <strong>💬 Ask Ava</strong>
          <p className="italic">(coming soon)</p>
        </div>
      </div>
    </div>
  );
}
