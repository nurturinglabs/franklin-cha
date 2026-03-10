"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ─── Color tokens ─── */
const C = {
  bg: "#0A1628",
  bgElevated: "#122240",
  bgWarm: "#0F1D35",
  card: "#1B3A5C",
  text: "#F5F0E8",
  textMuted: "#A8B4C4",
  accent: "#D4A843",
  accentLight: "#E8C96A",
  danger: "#E85A4F",
  border: "#1E3550",
};

/* ─── Slide component helpers ─── */
function Headline({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h1
      className={`font-[family-name:var(--font-garamond)] leading-tight ${className}`}
      style={{ color: C.text }}
    >
      {children}
    </h1>
  );
}

function Body({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <p className={`text-lg md:text-xl leading-relaxed ${className}`} style={{ color: C.textMuted, ...style }}>
      {children}
    </p>
  );
}

function Stat({
  value,
  color = "accent",
  className = "",
}: {
  value: string;
  color?: "accent" | "danger";
  className?: string;
}) {
  return (
    <span
      className={`font-[family-name:var(--font-jetbrains)] font-bold ${className}`}
      style={{ color: color === "accent" ? C.accent : C.danger }}
    >
      {value}
    </span>
  );
}

function ChapterTitle({ num, title, subtitle }: { num: string; title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col items-start gap-4 max-w-[720px] mx-auto px-6 md:px-12">
      <span
        className="font-[family-name:var(--font-jetbrains)] text-6xl md:text-8xl font-bold"
        style={{ color: C.accent }}
      >
        {num}
      </span>
      <Headline className="text-3xl md:text-5xl">{title}</Headline>
      {subtitle && <Body>{subtitle}</Body>}
    </div>
  );
}

function GoldBullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: C.accent }} />
      <span className="text-base md:text-lg leading-relaxed" style={{ color: C.textMuted }}>
        {children}
      </span>
    </div>
  );
}

/* ─── Slide definitions ─── */
function slideContent(i: number) {
  switch (i) {
    /* ── Slide 1: Hero ── */
    case 0:
      return (
        <div className="flex flex-col items-center justify-center text-center px-6 md:px-12 gap-6 relative">
          <Headline className="text-3xl sm:text-4xl md:text-6xl max-w-3xl">
            What If Your Residents Could Take the CHA Survey by Just Making a Phone Call?
          </Headline>
          <Body className="text-base md:text-lg max-w-xl">
            Voice AI for Community Health Assessments
          </Body>
          <div className="w-24 h-0.5 mt-2" style={{ background: C.accent }} />
          <p
            className="absolute bottom-12 text-sm animate-pulse"
            style={{ color: C.accent }}
          >
            tap to begin &rarr;
          </p>
        </div>
      );

    /* ── Slide 2: Chapter – The Problem ── */
    case 1:
      return <ChapterTitle num="01" title="The CHA Problem" subtitle="Why traditional surveys miss the people who matter most" />;

    /* ── Slide 3: The mandate ── */
    case 2:
      return (
        <div className="max-w-[720px] mx-auto px-6 md:px-12 flex flex-col gap-6">
          <Headline className="text-2xl md:text-4xl">
            Every city in Wisconsin is required by state law to conduct a Community Health Assessment every 5 years.
          </Headline>
          <Body>
            It&apos;s how your Health Department identifies what residents need &mdash; mental health access, food security, healthcare gaps, substance abuse trends.
          </Body>
          <Body>
            The CHA shapes your CHIP, your grant applications, your accreditation, and your budget priorities for the next 5 years.
          </Body>
          <Body>
            It starts with one thing: <span className="font-semibold" style={{ color: C.accent }}>hearing from residents.</span>
          </Body>
        </div>
      );

    /* ── Slide 4: The real numbers ── */
    case 3:
      return (
        <div className="max-w-[720px] mx-auto px-6 md:px-12 flex flex-col gap-5">
          <Body>Here&apos;s what a typical Wisconsin CHA looks like:</Body>
          <Body>A city of 37,000 residents. The health department mails 1,600 surveys to a random sample of households.</Body>
          <Body>They get back:</Body>
          <div className="text-center py-4">
            <Stat value="330" color="danger" className="text-6xl md:text-8xl block" />
            <Body className="mt-2">out of 37,000</Body>
          </div>
          <div className="text-center">
            <Body>That&apos;s</Body>
            <Stat value="0.9%" color="danger" className="text-5xl md:text-7xl block my-2" />
            <Body>of the community.</Body>
          </div>
          <Body>
            Every health priority, every grant application, every resource allocation for the next 5 years &mdash;{" "}
            <span className="font-semibold" style={{ color: C.accent }}>based on 330 voices.</span>
          </Body>
        </div>
      );

    /* ── Slide 5: Who's missing ── */
    case 4:
      return (
        <div className="max-w-[720px] mx-auto px-6 md:px-12 flex flex-col gap-5">
          <Headline className="text-2xl md:text-3xl">
            The residents who don&apos;t respond to surveys are often the ones who need to be heard most.
          </Headline>
          <div className="flex flex-col gap-4 mt-4">
            {[
              { icon: "👴", text: "Seniors who don't use the internet" },
              { icon: "🗓️", text: "Working families too busy to sit down with a form" },
              { icon: "🌐", text: "Non-English speakers who can't navigate an online survey" },
              { icon: "♿", text: "Residents with visual or cognitive disabilities" },
            ].map((item) => (
              <div key={item.icon} className="flex items-start gap-4">
                <span className="text-2xl">{item.icon}</span>
                <Body className="!text-base md:!text-lg">{item.text}</Body>
              </div>
            ))}
          </div>
          <Body className="mt-4">
            Paper forms get lost. Online links get ignored.{" "}
            <span className="font-bold" style={{ color: C.danger }}>
              These voices disappear from your data.
            </span>
          </Body>
        </div>
      );

    /* ── Slide 6: Chapter – The Solution ── */
    case 5:
      return (
        <div className="flex flex-col items-start gap-4 max-w-[720px] mx-auto px-6 md:px-12">
          <span
            className="font-[family-name:var(--font-jetbrains)] text-6xl md:text-8xl font-bold"
            style={{ color: C.accent }}
          >
            02
          </span>
          <Headline className="text-3xl md:text-5xl">
            What If They Could{" "}
            <span style={{ color: C.accent }}>Just Call?</span>
          </Headline>
        </div>
      );

    /* ── Slide 7: How it works ── */
    case 6:
      return (
        <div className="max-w-[720px] mx-auto px-6 md:px-12 flex flex-col gap-5">
          <Headline className="text-2xl md:text-3xl">A resident dials a local phone number.</Headline>
          <Body>A warm, friendly AI voice greets them:</Body>
          <div
            className="rounded-lg px-5 py-4 border-l-4 my-2"
            style={{ background: C.card, borderColor: C.accent }}
          >
            <p className="italic text-base md:text-lg" style={{ color: C.text }}>
              &ldquo;Hi there! Thank you for calling the Community Health Survey Line. This is a short, confidential survey &mdash; it takes about 7 to 8 minutes...&rdquo;
            </p>
          </div>
          <Body>
            The AI asks 15 questions conversationally. It listens. It clarifies. It thanks them.
          </Body>
          <Body>
            When they hang up, structured data flows into your dashboard automatically.
          </Body>
          <div className="flex flex-col gap-1 mt-2">
            {["No data entry.", "No transcription.", "No manual work."].map((t) => (
              <span key={t} className="font-semibold text-lg" style={{ color: C.accent }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      );

    /* ── Slide 8: The experience ── */
    case 7:
      return (
        <div className="max-w-[720px] mx-auto px-6 md:px-12 flex flex-col gap-5">
          <Headline className="text-2xl md:text-3xl italic">
            It&apos;s not a robot reading a script.
          </Headline>
          <Body>It&apos;s a patient, conversational AI that:</Body>
          <div className="flex flex-col gap-3 mt-2">
            {[
              "Asks follow-up questions when answers are unclear",
              'Says "take your time" when someone pauses to think',
              "Lets people elaborate on open-ended questions without cutting them off",
              'Handles "I\'d rather not answer that" gracefully',
              "Works 24/7 — nights, weekends, holidays",
            ].map((t) => (
              <GoldBullet key={t}>{t}</GoldBullet>
            ))}
          </div>
          <div className="flex gap-8 mt-4">
            <div>
              <Body className="!text-sm">Average call</Body>
              <Stat value="7 min" className="text-2xl md:text-3xl" />
            </div>
            <div>
              <Body className="!text-sm">Completion rate</Body>
              <Stat value="80%+" className="text-2xl md:text-3xl" />
            </div>
          </div>
        </div>
      );

    /* ── Slide 9: Chapter – The Reach ── */
    case 8:
      return (
        <div className="flex flex-col items-start gap-4 max-w-[720px] mx-auto px-6 md:px-12">
          <span
            className="font-[family-name:var(--font-jetbrains)] text-6xl md:text-8xl font-bold"
            style={{ color: C.accent }}
          >
            03
          </span>
          <Headline className="text-3xl md:text-5xl">
            What If You Heard From{" "}
            <span style={{ color: C.accent }}>1,500</span> Instead of{" "}
            <span style={{ color: C.danger }}>330</span>?
          </Headline>
        </div>
      );

    /* ── Slide 10: The bottleneck ── */
    case 9:
      return (
        <div className="max-w-[720px] mx-auto px-6 md:px-12 flex flex-col gap-5">
          <Headline className="text-2xl md:text-3xl">
            The reason CHAs hear from so few people isn&apos;t that residents don&apos;t care.
          </Headline>
          <Body>It&apos;s that every traditional method has a ceiling:</Body>
          <div className="flex flex-col gap-3 mt-2">
            {[
              { icon: "💬", method: "Mail surveys:", limit: "20-25% return rate (and you can only afford to mail so many)" },
              { icon: "💻", method: "Online forms:", limit: "requires internet, a device, and digital literacy" },
              { icon: "🗓️", method: "Focus groups:", limit: "10-30 people who can show up at a specific time and place" },
              { icon: "📞", method: "Phone interviews with staff:", limit: "limited by how many hours your team has" },
            ].map((item) => (
              <div key={item.method} className="flex items-start gap-3">
                <span className="text-xl">{item.icon}</span>
                <Body className="!text-base">
                  <span className="font-semibold" style={{ color: C.text }}>{item.method}</span>{" "}
                  {item.limit}
                </Body>
              </div>
            ))}
          </div>
          <Headline className="text-xl md:text-2xl mt-4">
            <span style={{ color: C.accent }}>A voice AI phone line has no ceiling.</span>
          </Headline>
          <Body>
            It handles 50 calls at once, 24/7, for months &mdash; without adding a single hour to your staff&apos;s workload.
          </Body>
        </div>
      );

    /* ── Slide 11: Spread the word ── */
    case 10:
      return (
        <div className="max-w-[720px] mx-auto px-6 md:px-12 flex flex-col gap-5">
          <Headline className="text-2xl md:text-3xl">
            Getting the word out is easy.
          </Headline>
          <Body>
            Put the number on your <span className="font-semibold" style={{ color: C.accent }}>water bill</span>. Every household gets one.
          </Body>
          <Body>
            Post it on the <span className="font-semibold" style={{ color: C.accent }}>city website</span>. Share it on <span className="font-semibold" style={{ color: C.accent }}>social media</span>. Mention it at <span className="font-semibold" style={{ color: C.accent }}>community events</span>.
          </Body>
          <Body>
            Place banners at the entrance of <span className="font-semibold" style={{ color: C.text }}>Pick &apos;n Save, Target, Walmart, Costco, Sam&apos;s Club</span> &mdash; go where your residents already are.
          </Body>
          <Body>
            The phone line stays live for <span className="font-semibold" style={{ color: C.accent }}>months</span>. A resident calls at <span style={{ color: C.text }}>9 PM on a Saturday</span>? It works. <span style={{ color: C.text }}>Tuesday afternoon between errands</span>? It works.
          </Body>
        </div>
      );

    /* ── Slide 12: The math ── */
    case 11:
      return (
        <div className="max-w-[720px] mx-auto px-6 md:px-12 flex flex-col gap-5">
          <div className="text-center py-4">
            <Body>Even reaching</Body>
            <Stat value="5%" className="text-5xl md:text-7xl block my-2" />
            <Body>of your city means going from 330 responses to</Body>
            <Stat value="1,500+" className="text-5xl md:text-7xl block my-2" />
          </div>
          <Body>
            That&apos;s not an incremental improvement.{" "}
            <span className="font-bold" style={{ color: C.accent }}>
              That&apos;s a fundamentally different dataset.
            </span>
          </Body>
        </div>
      );

    /* ── Slide 13: Better data changes everything ── */
    case 12:
      return (
        <div className="max-w-[720px] mx-auto px-6 md:px-12 flex flex-col gap-5">
          <Headline className="text-2xl md:text-3xl">Better data changes everything.</Headline>
          <Body>Your CHA feeds your CHIP &mdash; the plan that sets your health priorities for 5 years. Better data means:</Body>
          <div className="flex flex-col gap-3 mt-2">
            {[
              "A stronger CHIP backed by broad community input, not guesswork from a small sample",
              "Stronger PHAB accreditation submissions — Domain 1 asks: did you hear from underserved populations?",
              "More competitive grant applications — CDC, PHIG, and state reviewers notice rigorous methodology",
              "Better hospital partnerships — nonprofit hospitals are required to do CHNAs with local health departments. Your data helps them direct millions in community benefit spending.",
            ].map((t) => (
              <GoldBullet key={t}>{t}</GoldBullet>
            ))}
          </div>
          <div className="mt-4">
            <span style={{ color: C.danger }} className="font-semibold text-lg">
              330 voices
            </span>
            <span style={{ color: C.textMuted }} className="text-lg">
              {" "}set your direction.
            </span>
            <br />
            <span style={{ color: C.accent }} className="font-semibold text-lg">
              1,500 voices
            </span>
            <span style={{ color: C.textMuted }} className="text-lg">
              {" "}set it right.
            </span>
          </div>
        </div>
      );

    /* ── Slide 14: Accessibility ── */
    case 13:
      return (
        <div className="max-w-[720px] mx-auto px-6 md:px-12 flex flex-col gap-5">
          <Headline className="text-2xl md:text-3xl">
            Voice AI isn&apos;t just cheaper.{" "}
            <span style={{ color: C.accent }}>It&apos;s more equitable.</span>
          </Headline>
          <Body>
            A phone call requires no internet, no computer, no literacy, no English.
          </Body>
          <div className="flex flex-col gap-4 mt-2">
            <Body>
              It reaches the 78-year-old widow who&apos;s never opened a browser.
            </Body>
            <Body>
              The night-shift worker who can call at 11 PM on a Tuesday.
            </Body>
            <Body>
              The Spanish-speaking family that finally has a survey in their language.
            </Body>
          </div>
          <Body className="mt-4">
            This is how you hear from everyone &mdash;{" "}
            <span className="italic font-semibold" style={{ color: C.accent }}>
              not just the people who are easy to reach.
            </span>
          </Body>
        </div>
      );

    /* ── Slide 15: Chapter – Get Started ── */
    case 14:
      return <ChapterTitle num="04" title="Ready to Modernize Your CHA?" />;

    /* ── Slide 16: CTA ── */
    case 15:
      return (
        <div className="max-w-[720px] mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-6">
          <Headline className="text-2xl md:text-3xl">
            We&apos;ll build a Voice AI survey system customized for your city&apos;s CHA.
          </Headline>
          <Body>
            Your questions. Your community. Your dashboard. Your data.
          </Body>
          <Body className="font-semibold" style={{ color: C.accent }}>
            Ready in weeks, not months.
          </Body>
          <div
            className="rounded-xl px-8 py-6 mt-4 w-full max-w-sm border"
            style={{ background: C.bgElevated, borderColor: C.accent }}
          >
            <a
              href="https://franklin-cha.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full rounded-lg px-6 py-3 font-semibold text-lg mb-4 transition-opacity hover:opacity-90"
              style={{
                background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,
                color: C.bg,
              }}
            >
              See the Live Demo
            </a>
            <p
              className="font-[family-name:var(--font-jetbrains)] text-sm"
              style={{ color: C.accent }}
            >
              franklin-cha.vercel.app
            </p>
          </div>
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="w-16 h-0.5" style={{ background: C.accent }} />
            <p className="text-xs" style={{ color: C.textMuted }}>
              Voice AI for Community Health &bull; Milwaukee, WI
            </p>
          </div>
        </div>
      );

    default:
      return null;
  }
}

/* ─── Background for each slide ─── */
function slideBg(i: number): string {
  // Warm dark blue for human/story slides
  if (i === 4 || i === 11 || i === 13) return C.bgWarm;
  return C.bg;
}

const TOTAL_SLIDES = 16;

/* ─── Main Pitch Component ─── */
export default function PitchPage() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const touchStartX = useRef(0);
  const transitioning = useRef(false);

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= TOTAL_SLIDES || transitioning.current) return;
      transitioning.current = true;
      setVisible(false);
      setTimeout(() => {
        setCurrent(next);
        setVisible(true);
        transitioning.current = false;
      }, 250);
    },
    []
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  /* Keyboard navigation */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (["ArrowRight", "Space", "Enter"].includes(e.code)) {
        e.preventDefault();
        next();
      } else if (["ArrowLeft", "Backspace"].includes(e.code)) {
        e.preventDefault();
        prev();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  /* Click navigation (tap right half = next, left half = prev) */
  function handleClick(e: React.MouseEvent) {
    // Don't navigate if clicking a link/button
    if ((e.target as HTMLElement).closest("a, button")) return;
    const x = e.clientX / window.innerWidth;
    if (x > 0.35) next();
    else prev();
  }

  /* Swipe navigation */
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden cursor-pointer select-none"
      style={{ background: slideBg(current) }}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress bar */}
      {current > 0 && (
        <div className="fixed top-0 left-0 right-0 h-1 z-50" style={{ background: `${C.accent}22` }}>
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{
              width: `${((current + 1) / TOTAL_SLIDES) * 100}%`,
              background: C.accent,
            }}
          />
        </div>
      )}

      {/* Slide content */}
      <div
        className="h-full flex items-center justify-center transition-opacity duration-250"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {slideContent(current)}
      </div>

      {/* Bottom UI (hidden on hero) */}
      {current > 0 && (
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-50">
          <span className="text-xs" style={{ color: C.textMuted }}>
            Voice AI for Community Health
          </span>
          <span
            className="text-xs font-[family-name:var(--font-jetbrains)]"
            style={{ color: C.textMuted }}
          >
            {current + 1} / {TOTAL_SLIDES}
          </span>
          {current < TOTAL_SLIDES - 1 && (
            <span className="text-sm" style={{ color: C.accent }}>
              &rarr;
            </span>
          )}
          {current === TOTAL_SLIDES - 1 && <span className="w-4" />}
        </div>
      )}
    </div>
  );
}
