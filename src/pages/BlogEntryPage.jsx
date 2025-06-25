// src/pages/BlogEntryPage.jsx
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SparklesCore } from "../components/SparklesCore";
import { posts } from "../data/blog";
import ReactMarkdown from "react-markdown";
import CommentBox from "../components/CommentBox";

export default function BlogEntryPage() {
  const { id } = useParams();
  const post = posts.find((p) => p.slug === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>404: Blog post not found.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen px-6 py-16 bg-gradient-to-b from-[#1a102a] to-black text-white overflow-hidden">
      <SparklesCore className="absolute inset-0 -z-10 opacity-40" />

      <Link
        to="/blog"
        className="fixed bottom-6 left-6 z-50 px-4 py-2 text-sm font-semibold text-white bg-black/50 backdrop-blur border border-white/20 rounded-full shadow-lg hover:bg-pink-500/80 transition"
      >
        ← Back to Blog
      </Link>

      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur shadow-2xl mt-10">
        <div className="text-5xl mb-6">{post.emoji}</div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
          {post.title}
        </h1>
        <div className="flex flex-wrap gap-2 my-4">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="bg-pink-600/30 text-pink-200 text-xs px-3 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        <p className="mt-4 text-pink-100 italic">{post.snippet}</p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6 prose prose-invert prose-p:text-gray-200 prose-strong:text-white prose-a:text-pink-300"
        >
          <ReactMarkdown>{post.full}</ReactMarkdown>
        </motion.div>

        <CommentBox postId={post.id} />
      </div>
    </div>
  );
}
