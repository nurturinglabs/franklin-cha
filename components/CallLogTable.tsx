"use client";

import { useRouter } from "next/navigation";
import { Call } from "@/lib/types";

interface CallLogTableProps {
  calls: Call[];
}

function formatDuration(seconds: number | null): string {
  if (!seconds) return "—";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs.toString().padStart(2, "0")}s`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getStatusIcon(questionsAnswered: number, total: number): string {
  const rate = questionsAnswered / total;
  if (rate >= 0.9) return "completed";
  if (rate >= 0.3) return "partial";
  return "abandoned";
}

export default function CallLogTable({ calls }: CallLogTableProps) {
  const router = useRouter();

  if (calls.length === 0) {
    return (
      <div className="bg-white/[0.03] rounded-xl border border-white/10 p-12 text-center">
        <p className="text-white/40">No calls recorded yet.</p>
        <p className="text-sm text-white/25 mt-1">
          Calls will appear here in real-time once residents start calling.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/[0.03] rounded-xl border border-white/10 overflow-hidden">
      <div className="px-6 py-4 border-b border-white/5">
        <h3 className="text-sm font-semibold text-white/70">Call Log</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-white/[0.02] text-left">
              <th className="px-6 py-3 text-xs font-medium text-white/30 uppercase tracking-wider">
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
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {calls.map((call, index) => {
              const status = getStatusIcon(
                call.questions_answered,
                call.total_questions
              );
              return (
                <tr
                  key={call.id}
                  onClick={() => router.push(`/dashboard/${call.id}`)}
                  className="hover:bg-amber-500/5 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-white/25">
                    {calls.length - index}
                  </td>
                  <td className="px-6 py-4 text-sm text-white/70">
                    {formatDate(call.started_at)}
                  </td>
                  <td className="px-6 py-4 text-sm text-white/40">
                    {formatDuration(call.duration_seconds)}
                  </td>
                  <td className="px-6 py-4 text-sm text-white/40">
                    {call.questions_answered} / {call.total_questions}
                  </td>
                  <td className="px-6 py-4">
                    {status === "completed" && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        Completed
                      </span>
                    )}
                    {status === "partial" && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                        Partial
                      </span>
                    )}
                    {status === "abandoned" && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                        Abandoned
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
