export interface Call {
  id: string;
  retell_call_id: string;
  phone_number: string | null;
  call_status: string;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
  questions_answered: number;
  total_questions: number;
  completion_rate: number | null;
  transcript: TranscriptTurn[] | null;
  recording_url: string | null;
  call_summary: string | null;
  sentiment: string | null;
  created_at: string;
}

export interface TranscriptTurn {
  role: "agent" | "user";
  content: string;
}

export interface SurveyResponse {
  id: string;
  call_id: string;
  question_number: number;
  question_section: string;
  question_text: string;
  response_type: "scale" | "open_ended" | "yes_no" | "multiple_choice" | "demographic";
  response_raw: string | null;
  response_numeric: number | null;
  response_boolean: boolean | null;
  created_at: string;
}

export interface SurveyQuestion {
  id: number;
  question_number: number;
  section: string;
  question_text: string;
  response_type: string;
  scale_min: number | null;
  scale_max: number | null;
  scale_min_label: string | null;
  scale_max_label: string | null;
}

export interface RetellWebhookPayload {
  event: string;
  call: {
    call_id: string;
    call_status: string;
    start_timestamp: number;
    end_timestamp: number;
    duration_ms: number;
    transcript: string;
    transcript_object: Array<{
      role: "agent" | "user";
      content: string;
    }>;
    recording_url?: string;
    call_analysis?: {
      call_summary?: string;
      user_sentiment?: string;
    };
    from_number?: string;
    to_number?: string;
  };
}

export interface ParsedResponse {
  question_number: number;
  response_raw: string;
  response_numeric: number | null;
  response_boolean: boolean | null;
}
