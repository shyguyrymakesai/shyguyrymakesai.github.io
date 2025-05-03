// src/pages/Blog.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesCore } from "../components/SparklesCore";
import { Button } from "../components/Button";

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

const spotifyPlaylists = [
  {
    name: "Frat Party Friday",
    url: "https://open.spotify.com/playlist/2A2VE7ykrelPEiVJOqcXr5?si=53d0407957bd4f41",
  },
  {
    name: "For the OGs",
    url: "https://open.spotify.com/playlist/3Ek6dSSZesqj4aEmjko19f?si=290d6c641bcd43fd",
  },
  {
    name: "Big Boy Bailey (NOLA '23)",
    url: "https://open.spotify.com/playlist/2FTPV9Tx6xi4ySESGXx6iV?si=55bfe90fcb914088"
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
      className="bg-black bg-opacity-50 border border-neon-pink rounded-2xl p-5 w-full max-w-sm text-white shadow-2xl hover:shadow-pink-500/50 hover:cursor-pointer"
    >
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
    </motion.div>
  );
};

export default function Blog() {
  const [randomPost, setRandomPost] = useState(null);
  const [header] = useState("Midnight Thoughts");
  const [playlistIndex, setPlaylistIndex] = useState(0);

  const surpriseMe = () => {
    const pick = fakePosts[Math.floor(Math.random() * fakePosts.length)];
    setRandomPost(pick);
  };

  const changePlaylist = (direction) => {
    setPlaylistIndex((prev) => {
      const total = spotifyPlaylists.length;
      return (prev + direction + total) % total;
    });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-tr from-[#1a1a1a] via-[#0f0f0f] to-black min-h-screen py-16 px-6">
      <SparklesCore className="absolute inset-0 -z-10 opacity-40" />

      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400 cursor-default"
        >
          {header}
        </motion.h1>
        <p className="mt-2 text-pink-200 italic">a chaotic archive of thoughts, builds & experiments</p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 mb-12 pr-64">
        {fakePosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={surpriseMe}
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
      <div className="fixed top-24 right-4 w-52 bg-black/60 border border-pink-500 p-4 rounded-xl shadow-lg text-white text-sm backdrop-blur hidden md:block">
        <div className="mb-4">
          <strong>📡 Now Listening</strong>
          <div className="mt-2">
            <AnimatePresence mode="wait">
              <motion.iframe
                key={spotifyPlaylists[playlistIndex].url}
                src={spotifyPlaylists[playlistIndex].url + "?utm_source=generator"}
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg"
                initial={{ opacity: 0, filter: "blur(8px) grayscale(1)" }}
                animate={{ opacity: 1, filter: "blur(0px) grayscale(0)" }}
                exit={{ opacity: 0, filter: "blur(8px) grayscale(1)" }}
                transition={{ duration: 0.5 }}
              ></motion.iframe>
            </AnimatePresence>
            <div className="flex justify-between mt-2 text-xs text-pink-300">
              <button
                onClick={() => changePlaylist(-1)}
                className="hover:text-pink-100"
              >
                ◀️ Prev
              </button>
              <span className="text-white">{spotifyPlaylists[playlistIndex].name}</span>
              <button
                onClick={() => changePlaylist(1)}
                className="hover:text-pink-100"
              >
                Next ▶️
              </button>
            </div>
          </div>
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
