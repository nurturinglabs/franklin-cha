"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase-browser";
import { Call, SurveyResponse, TranscriptTurn } from "@/lib/types";
import { SURVEY_QUESTIONS } from "@/lib/questions";

function formatDuration(seconds: number | null): string {
  if (!seconds) return "—";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs.toString().padStart(2, "0")}s`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function ScaleBar({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: max }, (_, i) => (
          <div
            key={i}
            className={`w-5 h-3 rounded-sm ${
              i < value ? "bg-amber-500" : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-white/60">
        {value} / {max}
      </span>
    </div>
  );
}

function ResponseDisplay({ response }: { response: SurveyResponse }) {
  if (response.response_type === "scale" && response.response_numeric != null) {
    return <ScaleBar value={response.response_numeric} />;
  }
  if (response.response_type === "yes_no" && response.response_boolean != null) {
    return (
      <span
        className={`inline-flex items-center gap-1 text-sm font-medium px-2.5 py-1 rounded-full ${
          response.response_boolean
            ? "bg-emerald-500/10 text-emerald-400"
            : "bg-white/10 text-white/50"
        }`}
      >
        {response.response_boolean ? "Yes" : "No"}
      </span>
    );
  }
  return (
    <p className="text-sm text-white/50 leading-relaxed">
      &ldquo;{response.response_raw}&rdquo;
    </p>
  );
}

export default function CallDetailPage() {
  const params = useParams();
  const callId = params.callId as string;
  const [call, setCall] = useState<Call | null>(null);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const sb = getSupabase();
      const [callRes, responsesRes] = await Promise.all([
        sb.from("calls").select("*").eq("id", callId).single(),
        sb
          .from("survey_responses")
          .select("*")
          .eq("call_id", callId)
          .order("question_number", { ascending: true }),
      ]);

      if (callRes.data) setCall(callRes.data);
      if (responsesRes.data) setResponses(responsesRes.data);
      setLoading(false);
    }

    fetchData();
  }, [callId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-6">
          <div className="bg-white/[0.03] rounded-xl h-8 w-48 border border-white/10" />
          <div className="bg-white/[0.03] rounded-xl h-32 border border-white/10" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/[0.03] rounded-xl h-96 border border-white/10" />
            <div className="bg-white/[0.03] rounded-xl h-96 border border-white/10" />
          </div>
        </div>
      </div>
    );
  }

  if (!call) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-white/50">Call not found.</p>
        <Link href="/dashboard" className="text-amber-400 hover:underline mt-2 inline-block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const transcript = (call.transcript || []) as TranscriptTurn[];

  type Question = (typeof SURVEY_QUESTIONS)[number];
  const sections = SURVEY_QUESTIONS.reduce<Record<string, Question[]>>(
    (acc, q) => {
      if (!acc[q.section]) acc[q.section] = [];
      acc[q.section].push(q);
      return acc;
    },
    {}
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-amber-400 mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </Link>

      {/* Call Header */}
      <div className="bg-white/[0.03] rounded-xl border border-white/10 p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white">Call Details</h1>
            <p className="text-sm text-white/40 mt-1">{formatDate(call.started_at)}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm bg-white/10 text-white/60 px-3 py-1.5 rounded-lg">
              Duration: {formatDuration(call.duration_seconds)}
            </span>
            <span className="text-sm bg-white/10 text-white/60 px-3 py-1.5 rounded-lg">
              Questions: {call.questions_answered} / {call.total_questions}
            </span>
            {call.sentiment && (
              <span className="text-sm bg-amber-500/10 text-amber-400 px-3 py-1.5 rounded-lg capitalize">
                Sentiment: {call.sentiment}
              </span>
            )}
            {(call.completion_rate || 0) >= 90 ? (
              <span className="text-sm bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg">
                Completed
              </span>
            ) : (call.completion_rate || 0) >= 30 ? (
              <span className="text-sm bg-amber-500/10 text-amber-400 px-3 py-1.5 rounded-lg">
                Partial
              </span>
            ) : (
              <span className="text-sm bg-red-500/10 text-red-400 px-3 py-1.5 rounded-lg">
                Abandoned
              </span>
            )}
          </div>
        </div>
        {call.call_summary && (
          <p className="mt-4 text-sm text-white/50 border-t border-white/10 pt-4">
            <span className="font-medium text-white/70">Summary:</span> {call.call_summary}
          </p>
        )}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Structured Responses */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Survey Responses
          </h2>
          <div className="space-y-6">
            {Object.entries(sections).map(([sectionName, questions]) => (
              <div
                key={sectionName}
                className="bg-white/[0.03] rounded-xl border border-white/10 p-5"
              >
                <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-4">
                  {sectionName}
                </h3>
                <div className="space-y-4">
                  {questions.map((q) => {
                    const response = responses.find(
                      (r) => r.question_number === q.question_number
                    );
                    return (
                      <div key={q.question_number}>
                        <p className="text-xs font-medium text-white/30 mb-1">
                          Q{q.question_number}
                        </p>
                        <p className="text-sm font-medium text-white/70 mb-2">
                          {q.question_text}
                        </p>
                        {response ? (
                          <ResponseDisplay response={response} />
                        ) : (
                          <p className="text-sm text-white/20 italic">
                            Not answered
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Full Transcript */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Full Transcript
          </h2>
          <div className="bg-white/[0.03] rounded-xl border border-white/10 p-5 max-h-[800px] overflow-y-auto panel-scroll">
            {transcript.length === 0 ? (
              <p className="text-sm text-white/30 text-center py-8">
                No transcript available
              </p>
            ) : (
              <div className="space-y-4">
                {transcript.map((turn, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      turn.role === "agent" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        turn.role === "agent"
                          ? "bg-white/[0.06] text-white/70 rounded-tl-sm"
                          : "bg-amber-500/15 text-amber-200 rounded-tr-sm"
                      }`}
                    >
                      <p className="text-xs font-medium mb-1 opacity-50">
                        {turn.role === "agent" ? "Agent" : "Caller"}
                      </p>
                      <p className="text-sm leading-relaxed">{turn.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
