import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";
import { parseTranscriptWithAI } from "@/lib/parseTranscript";
import { SURVEY_QUESTIONS } from "@/lib/questions";
import { RetellWebhookPayload } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const payload: RetellWebhookPayload = await request.json();

    // Only process call_ended events
    if (payload.event !== "call_ended" && payload.event !== "call_analyzed") {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const call = payload.call;
    const supabase = createServerClient();

    // Calculate duration in seconds
    const durationSeconds = Math.round(call.duration_ms / 1000);

    // Parse transcript to extract survey responses
    const transcriptObject = call.transcript_object || [];
    const parsedResponses = await parseTranscriptWithAI(transcriptObject);
    const questionsAnswered = parsedResponses.length;
    const completionRate =
      questionsAnswered > 0
        ? Math.round((questionsAnswered / 15) * 100 * 100) / 100
        : 0;

    // Insert call record
    const { data: callRecord, error: callError } = await supabase
      .from("calls")
      .upsert(
        {
          retell_call_id: call.call_id,
          phone_number: call.from_number || null,
          call_status: call.call_status || "completed",
          started_at: new Date(call.start_timestamp).toISOString(),
          ended_at: new Date(call.end_timestamp).toISOString(),
          duration_seconds: durationSeconds,
          questions_answered: questionsAnswered,
          total_questions: 15,
          completion_rate: completionRate,
          transcript: transcriptObject,
          recording_url: call.recording_url || null,
          call_summary: call.call_analysis?.call_summary || null,
          sentiment: call.call_analysis?.user_sentiment || null,
        },
        { onConflict: "retell_call_id" }
      )
      .select()
      .single();

    if (callError) {
      console.error("Error inserting call:", callError);
      return NextResponse.json(
        { error: "Failed to store call" },
        { status: 500 }
      );
    }

    // Insert survey responses
    if (parsedResponses.length > 0 && callRecord) {
      const responseRows = parsedResponses.map((response) => {
        const question = SURVEY_QUESTIONS.find(
          (q) => q.question_number === response.question_number
        );
        return {
          call_id: callRecord.id,
          question_number: response.question_number,
          question_section: question?.section || "Unknown",
          question_text: question?.question_text || "Unknown",
          response_type: question?.response_type || "open_ended",
          response_raw: response.response_raw,
          response_numeric: response.response_numeric,
          response_boolean: response.response_boolean,
        };
      });

      // Delete existing responses for this call (in case of re-processing)
      await supabase
        .from("survey_responses")
        .delete()
        .eq("call_id", callRecord.id);

      const { error: responsesError } = await supabase
        .from("survey_responses")
        .insert(responseRows);

      if (responsesError) {
        console.error("Error inserting responses:", responsesError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        call_id: callRecord?.id,
        questions_extracted: parsedResponses.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
