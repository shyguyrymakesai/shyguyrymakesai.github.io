import { useParams, Link } from "react-router-dom";
import { posts } from "../data/blog";
import { BlogCard } from "./Blog";

export default function TagPage() {
  const { tag } = useParams();
  const filtered = posts.filter((p) => p.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()));

  if (filtered.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>No posts found for tag: {tag}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <Link
        to="/blog"
        className="fixed bottom-6 left-6 z-50 px-4 py-2 text-sm font-semibold text-white bg-black/50 backdrop-blur border border-white/20 rounded-full shadow-lg hover:bg-pink-500/80 transition"
      >
        ← Back to Blog
      </Link>
      <h1 className="text-4xl font-bold mb-8">Posts tagged with "{tag}"</h1>
      <div className="flex flex-wrap gap-8">
        {filtered.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
