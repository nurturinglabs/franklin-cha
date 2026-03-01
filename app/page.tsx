import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#0b1120] min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Main Content — single viewport */}
      <div className="relative flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-6 lg:px-8 py-10 lg:py-0 gap-8 lg:gap-16 items-center">
        {/* Background ECG heartbeat line */}
        <div
          className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <svg
            className="w-full max-w-5xl animate-ecg-fade"
            viewBox="0 0 600 60"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 30 L120 30 L140 30 L155 12 L170 48 L185 5 L200 55 L215 30 L235 30 L600 30"
              stroke="url(#ecg-gradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-ecg-draw"
            />
            <defs>
              <linearGradient id="ecg-gradient" x1="0" y1="0" x2="600" y2="0">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
                <stop offset="20%" stopColor="#fbbf24" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.5" />
                <stop offset="80%" stopColor="#fbbf24" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Left Column — Text & CTA */}
        <div className="flex-1 flex flex-col justify-center relative">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase mb-6 w-fit">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
            2025-2026 Community Health Assessment
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-[1.1] tracking-tight">
            City of Franklin
            <br />
            <span className="text-amber-400">Voice Health Survey</span>
          </h1>

          <p className="text-lg text-white/50 mb-8 max-w-lg leading-relaxed">
            Share your voice on the health of our community. Call in to complete
            the Franklin Health Department&apos;s Community Health Assessment —
            powered by AI, guided by you.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
            <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-1">
                Call to participate
              </p>
              <div className="flex items-center gap-3">
                <p className="text-2xl font-bold text-amber-400 tracking-wide">
                  (414) XXX-XXXX
                </p>
                {/* Voice waveform bars */}
                <div className="flex items-end gap-[3px] h-6">
                  {[0, 0.2, 0.4, 0.1, 0.3, 0.5, 0.25].map((delay, i) => (
                    <div
                      key={i}
                      className="w-[3px] bg-amber-400/60 rounded-full animate-waveform"
                      style={{
                        height: "100%",
                        animationDelay: `${delay}s`,
                        animationDuration: `${0.8 + (i % 3) * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 px-6 py-4 rounded-xl font-semibold transition-colors text-sm"
            >
              View Dashboard
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-8">
            <div>
              <p className="text-2xl font-bold text-white">~7 min</p>
              <p className="text-xs text-white/40">Survey duration</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-white">15</p>
              <p className="text-xs text-white/40">Questions</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-xs text-white/40">Anonymous</p>
            </div>
          </div>
        </div>

        {/* Right Column — Info Card */}
        <div className="flex-1 max-w-md w-full relative">
          {/* Sound wave rings — background accent */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          >
            <div className="relative w-48 h-48 lg:w-64 lg:h-64">
              <div className="absolute inset-0 rounded-full border border-amber-400/10 animate-ring" />
              <div
                className="absolute inset-0 rounded-full border border-amber-400/10 animate-ring"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute inset-0 rounded-full border border-amber-400/10 animate-ring"
                style={{ animationDelay: "2s" }}
              />
              <div
                className="absolute inset-0 rounded-full border border-amber-400/10 animate-ring"
                style={{ animationDelay: "3s" }}
              />
            </div>
          </div>

          <div className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-5">
            {/* Active indicator */}
            <div className="flex items-center gap-2 text-amber-400 text-xs font-medium uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400/40 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
              </span>
              Survey Active — Franklin Health Department
            </div>

            {/* Simulated conversation — animated */}
            <div className="space-y-3 min-h-[220px]">
              {/* Typing indicator 1 */}
              <div className="typing-indicator-1 bg-white/[0.06] rounded-xl rounded-tl-sm px-4 py-3 flex gap-1 items-center h-10">
                <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-typing-dot" />
                <span
                  className="w-1.5 h-1.5 bg-white/30 rounded-full animate-typing-dot"
                  style={{ animationDelay: "0.15s" }}
                />
                <span
                  className="w-1.5 h-1.5 bg-white/30 rounded-full animate-typing-dot"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
              {/* Bubble 1 — AI greeting */}
              <div className="animate-bubble-in animate-bubble-in-1 bg-white/[0.06] rounded-xl rounded-tl-sm px-4 py-3">
                <p className="text-sm text-white/70">
                  &ldquo;Hi! Thank you for calling the Franklin Community Health
                  Survey Line. This takes about 7 minutes. Shall we
                  begin?&rdquo;
                </p>
              </div>

              {/* Typing indicator 2 */}
              <div className="typing-indicator-2 bg-amber-500/15 border border-amber-500/20 rounded-xl rounded-tr-sm px-4 py-3 ml-8 flex gap-1 items-center h-10">
                <span className="w-1.5 h-1.5 bg-amber-400/50 rounded-full animate-typing-dot" />
                <span
                  className="w-1.5 h-1.5 bg-amber-400/50 rounded-full animate-typing-dot"
                  style={{ animationDelay: "0.15s" }}
                />
                <span
                  className="w-1.5 h-1.5 bg-amber-400/50 rounded-full animate-typing-dot"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
              {/* Bubble 2 — User reply */}
              <div className="animate-bubble-in animate-bubble-in-2 bg-amber-500/15 border border-amber-500/20 rounded-xl rounded-tr-sm px-4 py-3 ml-8">
                <p className="text-sm text-amber-300/90">
                  &ldquo;Yes, I&apos;d like to share my thoughts about our
                  community.&rdquo;
                </p>
              </div>

              {/* Typing indicator 3 */}
              <div className="typing-indicator-3 bg-white/[0.06] rounded-xl rounded-tl-sm px-4 py-3 flex gap-1 items-center h-10">
                <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-typing-dot" />
                <span
                  className="w-1.5 h-1.5 bg-white/30 rounded-full animate-typing-dot"
                  style={{ animationDelay: "0.15s" }}
                />
                <span
                  className="w-1.5 h-1.5 bg-white/30 rounded-full animate-typing-dot"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
              {/* Bubble 3 — AI follow-up */}
              <div className="animate-bubble-in animate-bubble-in-3 bg-white/[0.06] rounded-xl rounded-tl-sm px-4 py-3">
                <p className="text-sm text-white/70">
                  &ldquo;Great! What do you think are the most important factors
                  for a healthy community?&rdquo;
                </p>
              </div>
            </div>

            {/* Topic tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                "Community Health",
                "Mental Health",
                "Nutrition Access",
                "Connectedness",
                "Healthcare",
                "Demographics",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom info */}
          <div className="relative mt-6 grid grid-cols-2 gap-4">
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
              <p className="text-xs text-white/40 mb-1">Conducted by</p>
              <p className="text-sm font-medium text-white">Franklin Health Dept.</p>
              <p className="text-xs text-white/30 mt-0.5">City of Franklin, WI</p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
              <p className="text-xs text-white/40 mb-1">Powered by</p>
              <p className="text-sm font-medium text-white">Voice AI</p>
              <p className="text-xs text-white/30 mt-0.5">Natural conversation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="border-t border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/25">
          <p>All responses are anonymous and confidential. No personal information is stored.</p>
          <p>&copy; 2026 City of Franklin Health Department</p>
        </div>
      </div>
    </div>
  );
}
