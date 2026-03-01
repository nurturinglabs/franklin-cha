"use client";

import { useEffect, useState } from "react";
import { Call, SurveyResponse, TranscriptTurn } from "@/lib/types";
import { SURVEY_QUESTIONS } from "@/lib/questions";

interface CallDetailPanelProps {
  call: Call | null;
  responses: SurveyResponse[];
  onClose: () => void;
}

function formatDuration(seconds: number | null): string {
  if (!seconds) return "—";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs.toString().padStart(2, "0")}s`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
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

const sentimentConfig: Record<string, { bg: string; text: string }> = {
  positive: { bg: "bg-amber-500/10", text: "text-amber-400" },
  neutral: { bg: "bg-white/10", text: "text-white/60" },
  negative: { bg: "bg-red-500/10", text: "text-red-400" },
};

export default function CallDetailPanel({ call, responses, onClose }: CallDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<"responses" | "transcript">("responses");
  const isOpen = call !== null;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (call) setActiveTab("responses");
  }, [call]);

  if (!call) return null;

  const callResponses = responses.filter((r) => r.call_id === call.id);
  const transcript = (call.transcript || []) as TranscriptTurn[];
  const status = getStatus(call.completion_rate || 0);
  const sc = statusConfig[status];
  const sentCfg = call.sentiment ? sentimentConfig[call.sentiment] || sentimentConfig.neutral : null;

  type Question = (typeof SURVEY_QUESTIONS)[number];
  const sections = SURVEY_QUESTIONS.reduce<Record<string, Question[]>>((acc, q) => {
    if (!acc[q.section]) acc[q.section] = [];
    acc[q.section].push(q);
    return acc;
  }, {});

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-2xl bg-[#0f1929] z-50 shadow-2xl border-l border-white/10 flex flex-col animate-slide-in">
        {/* Sticky Header */}
        <div className="shrink-0 bg-[#0f1929] border-b border-white/10 px-6 py-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Call Details</h2>
              <p className="text-sm text-white/40 mt-0.5">{formatDate(call.started_at)}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white -mt-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Quick stat pills */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-xs bg-white/10 text-white/60 px-2.5 py-1 rounded-md font-medium">
              {formatDuration(call.duration_seconds)}
            </span>
            <span className="text-xs bg-white/10 text-white/60 px-2.5 py-1 rounded-md font-medium">
              {call.questions_answered}/{call.total_questions} questions
            </span>
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md ${sc.bg} ${sc.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
              {sc.label}
            </span>
            {sentCfg && call.sentiment && (
              <span className={`text-xs font-medium px-2.5 py-1 rounded-md capitalize ${sentCfg.bg} ${sentCfg.text}`}>
                {call.sentiment}
              </span>
            )}
          </div>

          {/* Tab bar */}
          <div className="flex gap-1 bg-white/[0.06] rounded-lg p-1 mt-4">
            <button
              onClick={() => setActiveTab("responses")}
              className={`flex-1 text-xs font-medium px-3 py-2 rounded-md transition-all ${
                activeTab === "responses"
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              Responses ({callResponses.length})
            </button>
            <button
              onClick={() => setActiveTab("transcript")}
              className={`flex-1 text-xs font-medium px-3 py-2 rounded-md transition-all ${
                activeTab === "transcript"
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              Transcript ({transcript.length})
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto panel-scroll px-6 py-5">
          {/* Call Summary */}
          {call.call_summary && (
            <div className="mb-5">
              <p className="text-xs font-medium text-white/30 uppercase tracking-wider mb-1.5">Summary</p>
              <p className="text-sm text-white/60 leading-relaxed">{call.call_summary}</p>
            </div>
          )}

          {/* Responses Tab */}
          {activeTab === "responses" && (
            <div className="space-y-4">
              {callResponses.length === 0 ? (
                <p className="text-sm text-white/30 text-center py-8">No responses recorded</p>
              ) : (
                Object.entries(sections).map(([sectionName, questions]) => {
                  const sectionResponses = questions.filter((q) =>
                    callResponses.some((r) => r.question_number === q.question_number)
                  );
                  if (sectionResponses.length === 0) return null;
                  return (
                    <div key={sectionName} className="border border-white/10 rounded-lg p-4">
                      <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
                        {sectionName}
                      </h4>
                      <div className="space-y-4">
                        {sectionResponses.map((q) => {
                          const response = callResponses.find(
                            (r) => r.question_number === q.question_number
                          );
                          if (!response) return null;
                          return (
                            <div key={q.question_number}>
                              <p className="text-[11px] text-white/30 mb-0.5">Q{q.question_number}</p>
                              <p className="text-sm font-medium text-white/70 mb-1.5">{q.question_text}</p>
                              {response.response_type === "scale" && response.response_numeric != null ? (
                                <div className="flex items-center gap-2">
                                  <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                      <div
                                        key={i}
                                        className={`w-6 h-2.5 rounded-sm ${
                                          i <= response.response_numeric!
                                            ? "bg-amber-500"
                                            : "bg-white/10"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs font-medium text-white/50">
                                    {response.response_numeric}/5
                                  </span>
                                </div>
                              ) : response.response_type === "yes_no" && response.response_boolean != null ? (
                                <span
                                  className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full ${
                                    response.response_boolean
                                      ? "bg-emerald-500/10 text-emerald-400"
                                      : "bg-white/10 text-white/50"
                                  }`}
                                >
                                  {response.response_boolean ? "Yes" : "No"}
                                </span>
                              ) : (
                                <p className="text-sm text-white/50 leading-relaxed">
                                  &ldquo;{response.response_raw}&rdquo;
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Transcript Tab */}
          {activeTab === "transcript" && (
            <div>
              {transcript.length === 0 ? (
                <p className="text-sm text-white/30 text-center py-8">No transcript available</p>
              ) : (
                <div className="space-y-3">
                  {transcript.map((turn, index) => (
                    <div
                      key={index}
                      className={`flex ${turn.role === "agent" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                          turn.role === "agent"
                            ? "bg-white/[0.06] text-white/70 rounded-tl-sm"
                            : "bg-amber-500/15 text-amber-200 rounded-tr-sm"
                        }`}
                      >
                        <p className="text-[10px] font-semibold mb-1 opacity-50 uppercase tracking-wider">
                          {turn.role === "agent" ? "Agent" : "Caller"}
                        </p>
                        <p className="text-sm leading-relaxed">{turn.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
}
