"use client";

import { useEffect, useState, useCallback } from "react";
import { getSupabase } from "@/lib/supabase-browser";
import { Call, SurveyResponse } from "@/lib/types";
import CallDetailPanel from "@/components/CallDetailPanel";

function formatDuration(seconds: number | null): string {
  if (!seconds) return "—";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs.toString().padStart(2, "0")}s`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getStatus(rate: number): "completed" | "partial" | "abandoned" {
  if (rate >= 90) return "completed";
  if (rate >= 30) return "partial";
  return "abandoned";
}

const statusConfig = {
  completed: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400", label: "Completed" },
  partial: { bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400", label: "Partial" },
  abandoned: { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400", label: "Abandoned" },
};

const sentimentStyles: Record<string, string> = {
  positive: "bg-amber-500/10 text-amber-400",
  neutral: "bg-white/10 text-white/60",
  negative: "bg-red-500/10 text-red-400",
};

export default function CallsPage() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);

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
      .channel("calls-realtime-list")
      .on("postgres_changes", { event: "*", schema: "public", table: "calls" }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      sb.removeChannel(channel);
    };
  }, [fetchData]);

  const totalCalls = calls.length;
  const completedCalls = calls.filter((c) => (c.completion_rate || 0) >= 90).length;
  const incompleteCalls = totalCalls - completedCalls;
  const avgDuration =
    totalCalls > 0
      ? Math.round(calls.reduce((sum, c) => sum + (c.duration_seconds || 0), 0) / totalCalls)
      : 0;
  const avgQuestions =
    totalCalls > 0
      ? (calls.reduce((sum, c) => sum + c.questions_answered, 0) / totalCalls).toFixed(1)
      : "0";
  const totalResponses = responses.length;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/[0.03] rounded-xl h-28 border border-white/10" />
            ))}
          </div>
          <div className="bg-white/[0.03] rounded-xl h-96 border border-white/10" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">All Calls</h1>
        <p className="text-sm text-white/40 mt-1">
          Browse and explore individual survey conversations
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/[0.03] rounded-xl border border-white/10 p-6 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-l-xl" />
          <p className="text-xs font-medium text-white/40 uppercase tracking-wider">Total Calls</p>
          <p className="mt-2 text-4xl font-bold text-white">{totalCalls}</p>
          <p className="text-xs text-white/30 mt-1">{totalResponses} responses collected</p>
        </div>
        <div className="bg-white/[0.03] rounded-xl border border-white/10 p-6 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-l-xl" />
          <p className="text-xs font-medium text-white/40 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Completed
          </p>
          <p className="mt-2 text-4xl font-bold text-white">{completedCalls}</p>
          <p className="text-xs text-white/30 mt-1">
            {totalCalls > 0 ? Math.round((completedCalls / totalCalls) * 100) : 0}% of calls
          </p>
        </div>
        <div className="bg-white/[0.03] rounded-xl border border-white/10 p-6 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20 rounded-l-xl" />
          <p className="text-xs font-medium text-white/40 uppercase tracking-wider">Avg Duration</p>
          <p className="mt-2 text-4xl font-bold text-white">
            {Math.floor(avgDuration / 60)}
            <span className="text-lg font-medium text-white/30">m</span>{" "}
            {(avgDuration % 60).toString().padStart(2, "0")}
            <span className="text-lg font-medium text-white/30">s</span>
          </p>
          <p className="text-xs text-white/30 mt-1">{avgQuestions} avg questions</p>
        </div>
        <div className="bg-white/[0.03] rounded-xl border border-white/10 p-6 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 rounded-l-xl" />
          <p className="text-xs font-medium text-white/40 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Incomplete
          </p>
          <p className="mt-2 text-4xl font-bold text-white">{incompleteCalls}</p>
          <p className="text-xs text-white/30 mt-1">partial or dropped early</p>
        </div>
      </div>

      {/* Calls Table */}
      {calls.length === 0 ? (
        <div className="bg-white/[0.03] rounded-xl border border-white/10 p-12 text-center">
          <p className="text-white/40">No calls recorded yet.</p>
          <p className="text-sm text-white/25 mt-1">
            Calls will appear here in real-time once residents start calling.
          </p>
        </div>
      ) : (
        <div className="bg-white/[0.03] rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/[0.02] text-left border-b border-white/5">
                  <th className="px-6 py-3 text-xs font-medium text-white/30 uppercase tracking-wider w-12">
                    #
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-white/30 uppercase tracking-wider">
                    Date / Time
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-white/30 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-white/30 uppercase tracking-wider">
                    Questions
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-white/30 uppercase tracking-wider">
                    Sentiment
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-white/30 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {calls.map((call, index) => {
                  const status = getStatus(call.completion_rate || 0);
                  const sc = statusConfig[status];
                  return (
                    <tr
                      key={call.id}
                      onClick={() => setSelectedCall(call)}
                      className="hover:bg-amber-500/5 cursor-pointer transition-colors group"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-white/25">
                        {calls.length - index}
                      </td>
                      <td className="px-6 py-4 text-sm text-white/70 font-medium">
                        {formatDate(call.started_at)}
                      </td>
                      <td className="px-6 py-4 text-sm text-white/40">
                        {formatDuration(call.duration_seconds)}
                      </td>
                      <td className="px-6 py-4 text-sm text-white/40">
                        <span className="font-medium text-white/70">{call.questions_answered}</span>
                        <span className="text-white/25"> / {call.total_questions}</span>
                      </td>
                      <td className="px-6 py-4">
                        {call.sentiment && (
                          <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md capitalize ${sentimentStyles[call.sentiment] || sentimentStyles.neutral}`}>
                            {call.sentiment}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md ${sc.bg} ${sc.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {sc.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <svg
                          className="w-4 h-4 text-white/15 group-hover:text-amber-400 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <CallDetailPanel
        call={selectedCall}
        responses={responses}
        onClose={() => setSelectedCall(null)}
      />
    </div>
  );
}
