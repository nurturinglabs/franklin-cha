import Anthropic from "@anthropic-ai/sdk";
import { SURVEY_QUESTIONS } from "./questions";
import { ParsedResponse } from "./types";

const EXTRACTION_PROMPT = `You are analyzing a transcript from a community health survey phone call for the City of Franklin, Wisconsin. The survey has 15 questions. Extract the caller's responses to each question asked.

The 15 questions are:
1. What are the most important factors for a healthy community? (open-ended)
2. What are the most important health problems in Franklin? (open-ended)
3. What risky behaviors have the biggest impact on community health? (open-ended)
4. Rate Franklin as a healthy community, 1-5 scale (scale)
5. How connected do you feel to the Franklin community, 1-5 scale (scale)
6. Do you feel seen and heard in your community? (yes/no)
7. What would help you feel more connected? (open-ended)
8. Rate your access to mental health resources, 1-5 scale (scale)
9. Have you or family had difficulty accessing mental health services in past 12 months? (yes/no)
10. What barriers have you experienced accessing mental/behavioral health support? (open-ended)
11. How many days per week do you exercise for 30+ minutes? (number)
12. Rate your access to affordable healthy food, 1-5 scale (scale)
13. Rate your own personal health, 1-5 scale (scale)
14. Where do you go first when sick? (multiple choice - family doctor, urgent care, ER, community clinic, other)
15. Age range and zip code (demographic)

Return a JSON array of objects. Only include questions that were actually asked and answered. Each object must have:
- "question_number": integer 1-15
- "response_raw": the caller's exact or near-exact words
- "response_numeric": integer 1-5 for scale questions, or the number of days for Q11, or null
- "response_boolean": true/false for yes/no questions (Q6, Q9), or null

For scale questions: Extract the numeric value 1-5. If they say things like "pretty good" or "about a 4", interpret it as the closest number.
For yes/no questions: true = yes/affirmative, false = no/negative.
For open-ended questions: Capture the full response text.
For Q11: Extract the number of days (0-7).
For Q15: Include both age range and zip code in response_raw.

If a question was skipped or not asked, do NOT include it in the array.

Return ONLY the JSON array, no other text.`;

export async function parseTranscriptWithAI(
  transcript: Array<{ role: string; content: string }>
): Promise<ParsedResponse[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY not set, falling back to basic parsing");
    return parseTranscriptBasic(transcript);
  }

  const client = new Anthropic({ apiKey });

  const transcriptText = transcript
    .map((turn) => `${turn.role === "agent" ? "Agent" : "Caller"}: ${turn.content}`)
    .join("\n\n");

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: `${EXTRACTION_PROMPT}\n\nTranscript:\n${transcriptText}`,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";

    const parsed = JSON.parse(responseText) as ParsedResponse[];
    return parsed;
  } catch (error) {
    console.error("AI parsing failed, falling back to basic parsing:", error);
    return parseTranscriptBasic(transcript);
  }
}

function parseTranscriptBasic(
  transcript: Array<{ role: string; content: string }>
): ParsedResponse[] {
  const responses: ParsedResponse[] = [];
  const questionKeywords: Record<number, string[]> = {
    1: ["healthy community", "important factors"],
    2: ["health problems", "important health"],
    3: ["risky behaviors", "biggest impact"],
    4: ["rate franklin", "healthy community", "scale of 1"],
    5: ["connected", "feel to the franklin"],
    6: ["seen and heard"],
    7: ["more connected", "help you feel"],
    8: ["mental health resources", "access to mental"],
    9: ["difficulty accessing", "mental health services"],
    10: ["barriers", "mental", "behavioral"],
    11: ["physical activity", "exercise", "how many days"],
    12: ["healthy food", "affordable"],
    13: ["personal health", "rate your own"],
    14: ["when you're sick", "where do you", "go first"],
    15: ["age range", "zip code", "statistical"],
  };

  for (let i = 0; i < transcript.length; i++) {
    const turn = transcript[i];
    if (turn.role !== "agent") continue;

    const agentText = turn.content.toLowerCase();

    for (const [qNumStr, keywords] of Object.entries(questionKeywords)) {
      const qNum = parseInt(qNumStr);
      if (responses.some((r) => r.question_number === qNum)) continue;

      const matches = keywords.some((kw) => agentText.includes(kw));
      if (!matches) continue;

      // Find the next user response
      const userTurn = transcript.slice(i + 1).find((t) => t.role === "user");
      if (!userTurn) continue;

      const question = SURVEY_QUESTIONS.find((q) => q.question_number === qNum);
      if (!question) continue;

      const parsed: ParsedResponse = {
        question_number: qNum,
        response_raw: userTurn.content,
        response_numeric: null,
        response_boolean: null,
      };

      if (question.response_type === "scale") {
        const match = userTurn.content.match(/\b([1-5])\b/);
        if (match) parsed.response_numeric = parseInt(match[1]);
      } else if (question.response_type === "yes_no") {
        const lower = userTurn.content.toLowerCase();
        if (lower.includes("yes") || lower.includes("yeah") || lower.includes("definitely")) {
          parsed.response_boolean = true;
        } else if (lower.includes("no") || lower.includes("not really") || lower.includes("nope")) {
          parsed.response_boolean = false;
        }
      } else if (qNum === 11) {
        const match = userTurn.content.match(/\b([0-7])\b/);
        if (match) parsed.response_numeric = parseInt(match[1]);
      }

      responses.push(parsed);
    }
  }

  return responses;
}
