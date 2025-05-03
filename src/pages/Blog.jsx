// src/pages/Blog.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { SparklesCore } from "../components/SparklesCore";
import { Button } from "../components/Button";
import shyguyryicon from "../assets/shyguyry_futuristic_icon.png";

const fakePosts = [
  {
    id: 1,
    title: "Code Confessions #1",
    emoji: "💻",
    snippet: "That time I forgot a semicolon and summoned the void...",
    full: "In this post I walk through the most cursed debugging session of my life. Includes tears, caffeine, and demons.",
    tags: ["Dev Log", "Funny"],
  },
  {
    id: 2,
    title: "Build Log: Ava Learns Sass",
    emoji: "🤖",
    snippet: "I gave my AI assistant a makeover. She has opinions now.",
    full: "Ava got tired of grayscale. I taught her Sass and gave her the confidence to glow in gradients. Here’s how I styled her new skin.",
    tags: ["Build", "AI", "Style"],
  },
  {
    id: 3,
    title: "Notes from the Deep Work Realm",
    emoji: "🧘‍♂️",
    snippet: "Thoughts after a caffeine-fueled 4-hour focus sprint.",
    full: "Ever entered a trance coding state and emerged feeling like you time-traveled? Yeah, me too. Here's what I learned inside the void.",
    tags: ["Focus", "Philosophy"],
  },
];

const BlogCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onHoverStart={() => setExpanded(true)}
      onHoverEnd={() => setExpanded(false)}
      transition={{ type: "spring", stiffness: 100 }}
      className="relative p-[2px] w-full sm:max-w-full md:max-w-sm rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 hover:shadow-pink-500/50"
    >
      <div className="bg-black bg-opacity-50 rounded-[14px] p-5 text-white shadow-2xl hover:cursor-pointer">
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
        <p className="text-sm opacity-80 italic">{post.snippet}</p>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-2 text-xs text-gray-300"
            >
              {post.full}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function Blog() {
  const [randomPost, setRandomPost] = useState(null);
  const [header] = useState("Midnight Thoughts");

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

      {/* Unified Background Stacking Context */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ isolation: "isolate" }}>
        {/* Starfield */}
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(#ffffff 1.2px, transparent 1.3px), radial-gradient(#ffffff 1.2px, transparent 1.3px)',
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px',
          }}
        />

        {/* Animated Gradient */}
        <div
          className="absolute inset-0 z-10 opacity-30 bg-[length:400%_400%] animate-[midnightPulse_30s_ease-in-out_infinite]"
          style={{
            backgroundImage:
              'linear-gradient(135deg, #2b1b38, #1e1d35, #151926, #0d0f1c)',
          }}
        />

        {/* Sparkles Layer */}
        <SparklesCore className="absolute inset-0 z-20 opacity-40" />
      </div>

      {/* Floating Moon */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-br from-gray-300 to-white rounded-full shadow-lg z-30 animate-[moonFloat_10s_ease-in-out_infinite] opacity-70" />

      {/* Return Button */}
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

      <div className="flex flex-wrap justify-center gap-8 mb-12 pr-64">
        {fakePosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
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

      {/* Sticky Sidebar */}
      <div className="md:fixed md:top-24 md:right-4 w-full md:w-52 mt-12 md:mt-0 bg-black/60 border border-pink-500 p-4 rounded-xl shadow-lg text-white text-sm backdrop-blur">
        <div className="mb-4 flex justify-center">
          <img src={shyguyryicon} alt="ShyGuyRy" className="w-12 h-12 rounded-full shadow-sm" />
        </div>
        <div className="mb-4">
          <strong>📡 Live Spotify Recs</strong>
          <p className="mt-1 italic text-pink-300">COMING SOON</p>
        </div>
        <div className="mb-3">
          <strong>✍️ Mood</strong>
          <p>Curious. caffeinated. slightly unhinged.</p>
        </div>
        <div>
          <strong>💬 Ask Ava</strong>
          <p className="italic">(coming soon)</p>
        </div>
      </div>
    </div>
  );
}
