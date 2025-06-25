import { useEffect, useState } from "react";

export default function CommentBox({ postId }) {
  const [issueNumber, setIssueNumber] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", comment: "", website: "" });
  const repo = import.meta.env.VITE_GITHUB_REPO;
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {
    async function init() {
      if (!repo) return;
      const issue = await getOrCreateIssue();
      if (issue) {
        setIssueNumber(issue.number);
        const comms = await fetchComments(issue.number);
        setComments(comms);
      }
      setLoading(false);
    }
    init();
  }, [postId]);

  async function getOrCreateIssue() {
    const headers = { Accept: "application/vnd.github+json" };
    if (token) headers.Authorization = `token ${token}`;
    const res = await fetch(
      `https://api.github.com/repos/${repo}/issues?labels=post-${postId}`
    );
    const issues = await res.json();
    if (Array.isArray(issues) && issues.length > 0) return issues[0];
    if (!token) return null;
    const createRes = await fetch(`https://api.github.com/repos/${repo}/issues`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        title: `Comments for post ${postId}`,
        labels: [`post-${postId}`],
      }),
    });
    return await createRes.json();
  }

  async function fetchComments(number) {
    const headers = { Accept: "application/vnd.github+json" };
    if (token) headers.Authorization = `token ${token}`;
    const res = await fetch(
      `https://api.github.com/repos/${repo}/issues/${number}/comments`,
      { headers }
    );
    return await res.json();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.website) return; // honeypot
    if (!form.name || !form.comment) return;
    if (!repo || !token || !issueNumber) return;
    const headers = {
      Accept: "application/vnd.github+json",
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
    };
    await fetch(`https://api.github.com/repos/${repo}/issues/${issueNumber}/comments`, {
      method: "POST",
      headers,
      body: JSON.stringify({ body: `**${form.name}**: ${form.comment}` }),
    });
    const comms = await fetchComments(issueNumber);
    setComments(comms);
    setForm({ name: "", comment: "", website: "" });
  };

  if (!repo) {
    return <p className="text-red-500">Comments not configured.</p>;
  }

  return (
    <div className="mt-8" id="comments">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="bg-white/10 p-3 rounded">
              <div dangerouslySetInnerHTML={{ __html: c.body_html }} />
            </div>
          ))}
          {comments.length === 0 && <p>No comments yet.</p>}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mt-4 space-y-2">
        <div className="hidden">
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/20 text-white"
        />
        <textarea
          name="comment"
          required
          rows="4"
          placeholder="Add your comment"
          value={form.comment}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/20 text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-pink-600 rounded text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
