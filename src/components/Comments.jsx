import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Comments() {
  const { id: slug } = useParams();
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/api/comments/${slug}`)
      .then(res => res.json())
      .then(setComments)
      .catch(() => setComments([]));
  }, [slug]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await fetch(`http://localhost:4000/api/comments/${slug}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );
    setForm({ name: "", message: "" });
    setLoading(false);
    fetch(`http://localhost:4000/api/comments/${slug}`)
      .then(res => res.json())
      .then(setComments);
  };

  return (
    <section className="max-w-xl mx-auto mt-12">
      <h3 className="text-2xl font-bold mb-4">Comments</h3>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          className="border px-3 py-2 rounded w-full"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your comment"
          required
          className="border px-3 py-2 rounded w-full"
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
        {comments.length === 0 && <p>No comments yet.</p>}
        {comments.map((c, i) => (
          <div key={i} className="mb-4 border-b pb-2">
            <strong>{c.name}</strong> <span className="text-xs text-gray-500">{new Date(c.date).toLocaleString()}</span>
            <p>{c.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Comments;
