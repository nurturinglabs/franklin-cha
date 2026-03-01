"use client";

import { useEffect, useState, useCallback } from "react";
import { getSupabase } from "@/lib/supabase-browser";
import { Call, SurveyResponse } from "@/lib/types";
import StatCard from "@/components/StatCard";
import ScaleDistributionChart from "@/components/charts/ScaleDistributionChart";
import TopHealthConcernsChart from "@/components/charts/TopHealthConcernsChart";
import CallsOverTimeChart from "@/components/charts/CallsOverTimeChart";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

/* ─── Helpers ───────────────────────────────────────────────────────── */

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of",
  "with", "by", "is", "it", "that", "this", "was", "are", "be", "have", "has",
  "had", "do", "does", "did", "will", "would", "could", "should", "may",
  "might", "i", "you", "he", "she", "we", "they", "me", "my", "your", "our",
  "their", "its", "not", "no", "so", "if", "just", "also", "very", "really",
  "think", "like", "know", "about", "from", "up", "out", "some", "there",
  "than", "then", "when", "what", "which", "who", "how", "all", "each",
  "every", "both", "few", "more", "most", "other", "into", "over", "such",
  "can", "much", "been", "being", "well", "lot", "things", "thing", "yeah",
  "yes", "no", "um", "uh", "oh", "okay", "ok",
]);

function extractTopics(responses: SurveyResponse[]): { topic: string; count: number }[] {
  const wordCounts: Record<string, number> = {};
  responses.forEach((r) => {
    if (!r.response_raw) return;
    r.response_raw
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOP_WORDS.has(w))
      .forEach((word) => {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      });
  });
  return Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([topic, count]) => ({
      topic: topic.charAt(0).toUpperCase() + topic.slice(1),
      count,
    }));
}

function getScaleDistribution(
  responses: SurveyResponse[],
  questionNumber: number
): { rating: number; count: number }[] {
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  responses
    .filter((r) => r.question_number === questionNumber && r.response_numeric != null)
    .forEach((r) => {
      const val = r.response_numeric!;
      if (val >= 1 && val <= 5) counts[val]++;
    });
  return [1, 2, 3, 4, 5].map((rating) => ({ rating, count: counts[rating] }));
}

function getScaleAverage(responses: SurveyResponse[], qn: number): number {
  const vals = responses
    .filter((r) => r.question_number === qn && r.response_numeric != null)
    .map((r) => r.response_numeric!);
  return vals.length === 0 ? 0 : vals.reduce((a, b) => a + b, 0) / vals.length;
}

function getYesNoPct(responses: SurveyResponse[], qn: number): number {
  let yes = 0, total = 0;
  responses
    .filter((r) => r.question_number === qn && r.response_boolean != null)
    .forEach((r) => { total++; if (r.response_boolean) yes++; });
  return total > 0 ? Math.round((yes / total) * 100) : 0;
}

function getCallsByDay(calls: Call[]): { date: string; calls: number }[] {
  const counts: Record<string, number> = {};
  calls.forEach((call) => {
    const day = new Date(call.started_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    counts[day] = (counts[day] || 0) + 1;
  });
  return Object.entries(counts).map(([date, c]) => ({ date, calls: c }));
}

/* ─── Icons ─────────────────────────────────────────────────────────── */

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function DocIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  );
}
function BarIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

/* ─── Config ────────────────────────────────────────────────────────── */

const COMPLETION_COLORS = ["#059669", "#f59e0b", "#475569"];

const TOOLTIP_STYLE = {
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.1)",
  fontSize: "12px",
  background: "#0f1929",
  color: "#fff",
};

/* ─── Page ──────────────────────────────────────────────────────────── */

export default function DashboardPage() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const sb = getSupabase();
    const [callsRes, responsesRes] = await Promise.all([
      sb.from("calls").select("*").order("started_at", { ascending: false }),
      sb.from("survey_responses").select("*"),
    ]);
    if (callsRes.data) setCalls(callsRes.data);
    if (responsesRes.data) setResponses(responsesRes.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
    const sb = getSupabase();
    const channel = sb
      .channel("calls-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "calls" }, () => fetchData())
      .subscribe();
    return () => { sb.removeChannel(channel); };
  }, [fetchData]);

  /* ── Stats ─────────────────────────────────────────────────────── */

  const totalCalls = calls.length;
  const avgDuration = totalCalls > 0
    ? Math.round(calls.reduce((s, c) => s + (c.duration_seconds || 0), 0) / totalCalls) : 0;
  const avgDurStr = `${Math.floor(avgDuration / 60)}m ${(avgDuration % 60).toString().padStart(2, "0")}s`;
  const avgQ = totalCalls > 0
    ? (calls.reduce((s, c) => s + c.questions_answered, 0) / totalCalls).toFixed(1) : "0";
  const compRate = totalCalls > 0
    ? Math.round((calls.filter((c) => (c.completion_rate || 0) >= 90).length / totalCalls) * 100) : 0;
  const totalResp = responses.length;
  const healthAvg = getScaleAverage(responses, 4);

  // Donut
  const completed = calls.filter((c) => (c.completion_rate || 0) >= 90).length;
  const partial = calls.filter((c) => (c.completion_rate || 0) >= 30 && (c.completion_rate || 0) < 90).length;
  const abandoned = calls.filter((c) => (c.completion_rate || 0) < 30).length;
  const donutData = [
    { name: "Completed", value: completed },
    { name: "Partial", value: partial },
    { name: "Abandoned", value: abandoned },
  ];

  // Key findings
  const findings = [
    { label: "Community Health", val: healthAvg, max: 5, fmt: "scale" as const },
    { label: "Connectedness", val: getScaleAverage(responses, 5), max: 5, fmt: "scale" as const },
    { label: "Feel Seen & Heard", val: getYesNoPct(responses, 6), max: 100, fmt: "pct" as const },
    { label: "Mental Health Access", val: getScaleAverage(responses, 8), max: 5, fmt: "scale" as const },
    { label: "Food Access", val: getScaleAverage(responses, 12), max: 5, fmt: "scale" as const },
    { label: "Mental Health Difficulty", val: getYesNoPct(responses, 9), max: 100, fmt: "pct" as const },
  ];

  // Charts
  const q4Data = getScaleDistribution(responses, 4);
  const q4Avg = getScaleAverage(responses, 4);
  const topConcerns = extractTopics(responses.filter((r) => r.question_number === 2));
  const callsByDay = getCallsByDay(calls);

  /* ── Loading ───────────────────────────────────────────────────── */

  if (loading) {
    return (
      <div className="h-[calc(100vh-4rem)] flex flex-col gap-4 p-6 overflow-hidden">
        <div className="h-10 w-64 bg-white/[0.03] rounded-lg animate-pulse" />
        <div className="grid grid-cols-6 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-24 bg-white/[0.03] rounded-xl border border-white/10 animate-pulse" />
          ))}
        </div>
        <div className="flex-1 min-h-0 grid grid-cols-3 grid-rows-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`bg-white/[0.03] rounded-xl border border-white/10 animate-pulse ${i <= 2 ? "" : ""}`}
            />
          ))}
        </div>
      </div>
    );
  }

  /* ── Render ─────────────────────────────────────────────────────── */

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col gap-4 px-6 py-5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-bold text-white">Survey Analytics</h1>
          <p className="text-xs text-white/40 mt-0.5">
            Franklin Community Health Assessment
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/40">
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
          Real-time
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-6 gap-3 shrink-0">
        <StatCard icon={<PhoneIcon />} label="Total Calls" value={totalCalls} iconClassName="bg-amber-500/10 text-amber-400" />
        <StatCard icon={<CheckIcon />} label="Completion" value={`${compRate}%`} iconClassName="bg-emerald-500/10 text-emerald-400" />
        <StatCard icon={<ClockIcon />} label="Avg Duration" value={avgDurStr} iconClassName="bg-sky-500/10 text-sky-400" />
        <StatCard icon={<DocIcon />} label="Responses" value={totalResp} iconClassName="bg-violet-500/10 text-violet-400" />
        <StatCard icon={<HeartIcon />} label="Health Score" value={healthAvg > 0 ? healthAvg.toFixed(1) : "—"} subtitle="out of 5" iconClassName="bg-rose-500/10 text-rose-400" />
        <StatCard icon={<BarIcon />} label="Avg Questions" value={avgQ} subtitle="out of 15" iconClassName="bg-white/5 text-white/50" />
      </div>

      {/* Chart Grid — fills remaining viewport */}
      <div className="flex-1 min-h-0 grid grid-cols-3 grid-rows-2 gap-4">
        {/* Row 1: Call Volume (2 cols) + Completion Donut (1 col) */}
        <CallsOverTimeChart data={callsByDay} className="col-span-2 h-full" />

        <div className="bg-white/[0.03] rounded-xl border border-white/10 p-4 flex flex-col h-full">
          <h3 className="text-sm font-semibold text-white/70 mb-2 shrink-0">
            Completion Status
          </h3>
          <div className="flex-1 min-h-0 flex items-center justify-center">
            {totalCalls === 0 ? (
              <p className="text-xs text-white/30">No data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius="55%"
                    outerRadius="80%"
                    dataKey="value"
                    strokeWidth={0}
                    animationDuration={800}
                  >
                    {donutData.map((_, i) => (
                      <Cell key={i} fill={COMPLETION_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          {totalCalls > 0 && (
            <div className="flex justify-center gap-3 pt-2 border-t border-white/5 shrink-0">
              {donutData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: COMPLETION_COLORS[i] }} />
                  <span className="text-[10px] text-white/40">
                    {d.name} <span className="font-semibold text-white/70">{d.value}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Row 2: Health Rating + Top Concerns + Key Findings */}
        <ScaleDistributionChart
          title="Community Health Rating"
          data={q4Data}
          average={q4Avg}
          minLabel="Very Unhealthy"
          maxLabel="Very Healthy"
          className="h-full"
        />

        <TopHealthConcernsChart
          title="Top Health Concerns"
          data={topConcerns}
          className="h-full"
        />

        {/* Key Findings Panel */}
        <div className="bg-white/[0.03] rounded-xl border border-white/10 p-4 flex flex-col h-full">
          <h3 className="text-sm font-semibold text-white/70 mb-3 shrink-0">
            Key Findings
          </h3>
          <div className="flex-1 min-h-0 overflow-y-auto space-y-3 panel-scroll">
            {findings.map((f) => {
              const pct = f.fmt === "pct" ? f.val : (f.val / f.max) * 100;
              const display = f.fmt === "pct"
                ? `${Math.round(f.val)}%`
                : f.val > 0 ? `${f.val.toFixed(1)} / ${f.max}` : "—";
              return (
                <div key={f.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-white/50">{f.label}</span>
                    <span className="text-xs font-semibold text-white/80">{display}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
