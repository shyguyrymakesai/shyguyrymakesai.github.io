import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Use your deployed backend URL
const API_BASE = "https://shyguyrymakesai-github-io.onrender.com/api/comments";

function Comments() {
  const { id: slug } = useParams();
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/${slug}`)
      .then(res => res.json())
      .then(setComments)
      .catch(() => setComments([]));
  }, [slug]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await fetch(`${API_BASE}/${slug}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );
    setForm({ name: "", message: "" });
    setLoading(false);
    fetch(`${API_BASE}/${slug}`)
      .then(res => res.json())
      .then(setComments);
  };

  return (
    <section className="max-w-xl mx-auto mt-12">
      <h3 className="text-2xl font-bold mb-4">Comments</h3>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2" autoComplete="off">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          autoComplete="off"
          className="border px-3 py-2 rounded w-full text-gray-900 bg-gray-50 dark:text-gray-200 dark:bg-carbon-700"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your comment"
          required
          autoComplete="off"
          className="border px-3 py-2 rounded w-full text-gray-900 bg-gray-50 dark:text-gray-200 dark:bg-carbon-700"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </form>
      <div>
        {comments.length === 0 && <p className="text-gray-900 dark:text-gray-200">No comments yet.</p>}
        {comments.map((c, i) => (
          <div key={i} className="mb-4 border-b pb-2">
            <strong className="text-gray-900 dark:text-gray-200">{c.name}</strong> <span className="text-xs text-gray-700 dark:text-gray-300">{new Date(c.date).toLocaleString()}</span>
            <p className="text-gray-900 dark:text-gray-200">{c.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Comments;
