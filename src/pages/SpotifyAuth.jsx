export default function SpotifyAuth() {
  const CLIENT_ID = "your_spotify_client_id";
  const REDIRECT_URI = "http://localhost:3000/callback"; // Or your deployed version
  const SCOPES = [
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "streaming",
    "playlist-read-private",
    "playlist-read-collaborative"
  ].join(" ");

  const login = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES)}`;
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">Connect Spotify</h1>
      <button
        onClick={login}
        className="px-6 py-2 bg-green-500 rounded text-black font-semibold"
      >
        Log In With Spotify
      </button>
    </div>
  );
}
