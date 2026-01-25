import { useState, useRef } from "react";
import { HiOutlineLockClosed, HiOutlinePlay, HiOutlinePause } from "react-icons/hi2";

// Obfuscated endpoint
const _e = "aHR0cHM6Ly9ibGFjay1iYXNlLTU1YjQuam9objItMHplcm8ud29ya2Vycy5kZXYvdW5sb2Nr";
const getEndpoint = () => atob(_e);

export default function Secret() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleUnlock = async () => {
    if (!password.trim()) {
      setError("Please enter a password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(getEndpoint(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        setError(msg.error || "Incorrect password");
        setLoading(false);
        return;
      }

      // Create blob URL for audio playback
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUnlock();
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
        {!audioUrl ? (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-teal-500/20 rounded-full flex items-center justify-center mb-4">
                <HiOutlineLockClosed className="w-8 h-8 text-teal-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Protected Content</h1>
              <p className="text-slate-400 text-sm">Enter the password to listen</p>
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm text-center bg-red-500/10 py-2 px-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                onClick={handleUnlock}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-500/50 text-white font-medium rounded-lg transition-colors"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    <HiOutlineLockClosed className="w-5 h-5" />
                    Unlock
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-teal-500/20 rounded-full flex items-center justify-center mb-4">
                <button
                  onClick={togglePlayPause}
                  className="w-16 h-16 bg-teal-500 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors"
                >
                  {isPlaying ? (
                    <HiOutlinePause className="w-8 h-8 text-white" />
                  ) : (
                    <HiOutlinePlay className="w-8 h-8 text-white ml-1" />
                  )}
                </button>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Now Playing</h1>
              <p className="text-slate-400 text-sm">Click the button to play</p>
            </div>

            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={handleAudioEnded}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              controls
              className="w-full mt-4"
            />
          </>
        )}
      </div>
    </div>
  );
}
