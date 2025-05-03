// src/pages/SpotifyCallback.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SpotifyCallback() {
  const [searchParams] = useSearchParams();
  const [refreshToken, setRefreshToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      setError("Missing authorization code from Spotify.");
      return;
    }

    const fetchTokens = async () => {
      try {
        const res = await fetch(`/api/spotify-auth?code=${code}`);
        const data = await res.json();
        if (data.refresh_token) {
          setRefreshToken(data.refresh_token);
        } else {
          setError("Failed to receive refresh token: " + JSON.stringify(data));
        }
      } catch (err) {
        setError("Something went wrong: " + err.message);
      }
    };

    fetchTokens();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Spotify Callback</h1>
      {refreshToken ? (
        <div className="bg-green-800/50 p-4 rounded-lg">
          <p className="mb-2">✅ Refresh token received:</p>
          <code className="break-all text-green-200 text-sm">{refreshToken}</code>
          <p className="mt-4 text-sm">Copy this and save it in your Vercel environment as <strong>SPOTIFY_REFRESH_TOKEN</strong></p>
        </div>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <p className="italic text-gray-400">Exchanging code for token...</p>
      )}
    </div>
  );
}
