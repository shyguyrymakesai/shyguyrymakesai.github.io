import { useState } from "react";
import { toast } from "react-hot-toast";

export default function NewsletterSignup({ className = "" }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      if (import.meta.env.DEV) {
        console.log("Newsletter signup:", email);
      }

      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        let data = {};
        try { data = await res.json(); } catch { }
        throw new Error(data.error || "Signup failed");
      }

      toast.success("You're on the list!");
      setEmail("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-2 ${className}`}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full px-3 py-2 rounded text-black"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-pink-600 text-white px-3 py-2 rounded hover:bg-pink-700 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Subscribe"}
      </button>
    </form>
  );
}
