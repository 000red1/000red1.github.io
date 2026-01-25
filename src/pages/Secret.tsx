import { useState, useRef, useEffect } from "react";
import { HiOutlineLockClosed, HiOutlinePlay, HiOutlinePause, HiOutlineChevronUp } from "react-icons/hi2";

// Obfuscated base endpoint
const _e = "aHR0cHM6Ly9ibGFjay1iYXNlLTU1YjQuam9objItMHplcm8ud29ya2Vycy5kZXY=";
const getBaseUrl = () => atob(_e);

interface VTTCue {
  start: number;
  end: number;
  text: string;
}

// Parse VTT timestamp to seconds
function parseVTTTime(timeStr: string): number {
  const parts = timeStr.trim().split(":");
  if (parts.length === 3) {
    // HH:MM:SS.mmm
    const [h, m, s] = parts;
    return parseFloat(h) * 3600 + parseFloat(m) * 60 + parseFloat(s.replace(",", "."));
  } else if (parts.length === 2) {
    // MM:SS.mmm
    const [m, s] = parts;
    return parseFloat(m) * 60 + parseFloat(s.replace(",", "."));
  }
  return 0;
}

// Parse VTT file content into cues
function parseVTT(vttContent: string): VTTCue[] {
  const cues: VTTCue[] = [];
  const lines = vttContent.split("\n");
  let i = 0;

  // Skip WEBVTT header
  while (i < lines.length && !lines[i].includes("-->")) {
    i++;
  }

  while (i < lines.length) {
    const line = lines[i].trim();

    // Look for timestamp line (contains "-->")
    if (line.includes("-->")) {
      const [startStr, endStr] = line.split("-->");
      const start = parseVTTTime(startStr);
      const end = parseVTTTime(endStr);

      // Collect all text lines until empty line or next timestamp
      const textLines: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== "" && !lines[i].includes("-->")) {
        textLines.push(lines[i].trim());
        i++;
      }

      if (textLines.length > 0) {
        cues.push({ start, end, text: textLines.join("\n") });
      }
    } else {
      i++;
    }
  }

  return cues;
}

export default function Secret() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [cues, setCues] = useState<VTTCue[]>([]);
  const [currentCueIndex, setCurrentCueIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const activeCueRef = useRef<HTMLDivElement>(null);

  // Handle scroll visibility for the scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll to active cue
  useEffect(() => {
    if (activeCueRef.current && transcriptRef.current) {
      activeCueRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentCueIndex]);

  const handleUnlock = async () => {
    if (!password.trim()) {
      setError("Please enter a password");
      return;
    }

    setLoading(true);
    setError("");

    const baseUrl = getBaseUrl();

    try {
      // Fetch audio and transcript in parallel
      const [audioRes, transcriptRes] = await Promise.all([
        fetch(`${baseUrl}/unlock`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }),
        fetch(`${baseUrl}/transcript`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }),
      ]);

      if (!audioRes.ok) {
        const msg = await audioRes.json().catch(() => ({}));
        setError(msg.error || "Incorrect password");
        setLoading(false);
        return;
      }

      // Create blob URL for audio playback
      const audioBlob = await audioRes.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      // Parse VTT transcript if available
      if (transcriptRes.ok) {
        const vttText = await transcriptRes.text();
        const parsedCues = parseVTT(vttText);
        setCues(parsedCues);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current || cues.length === 0) return;

    const currentTime = audioRef.current.currentTime;
    const index = cues.findIndex(
      (cue) => currentTime >= cue.start && currentTime < cue.end
    );
    setCurrentCueIndex(index);
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
    setCurrentCueIndex(-1);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const seekToCue = (cue: VTTCue) => {
    if (audioRef.current) {
      audioRef.current.currentTime = cue.start;
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-2xl border border-white/20 shadow-2xl">
        {!audioUrl ? (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-teal-500/20 rounded-full flex items-center justify-center mb-4">
                <HiOutlineLockClosed className="w-8 h-8 text-teal-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Protected Content</h1>
              <p className="text-slate-400 text-sm">Enter the password to listen</p>
            </div>

            <div className="space-y-4 max-w-md mx-auto">
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
            </div>

            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={handleAudioEnded}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={handleTimeUpdate}
              controls
              className="w-full mb-6"
            />

            {cues.length > 0 && (
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <h2 className="text-sm font-medium text-teal-400 mb-3">Transcript</h2>
                <div
                  ref={transcriptRef}
                  className="text-slate-300 text-sm leading-relaxed max-h-64 overflow-y-auto space-y-2"
                >
                  {cues.map((cue, index) => (
                    <div
                      key={index}
                      ref={index === currentCueIndex ? activeCueRef : null}
                      onClick={() => seekToCue(cue)}
                      className={`p-2 rounded cursor-pointer transition-all ${
                        index === currentCueIndex
                          ? "bg-teal-500/30 text-white"
                          : "hover:bg-white/10"
                      }`}
                    >
                      {cue.text}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-teal-500 hover:bg-teal-600 rounded-full flex items-center justify-center shadow-lg transition-all"
          aria-label="Scroll to top"
        >
          <HiOutlineChevronUp className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
}
