import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

// --- Helpers ---
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function weightedPick<T>(arr: T[], weights: number[]): T {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < arr.length; i++) {
    r -= weights[i];
    if (r <= 0) return arr[i];
  }
  return arr[arr.length - 1];
}

// --- Response Pools ---
const Q1_RESPONSES = [
  "Safe neighborhoods, good schools, and access to parks and recreation.",
  "Affordable healthcare, clean air and water, and strong community bonds.",
  "Access to mental health services, walkable streets, and good jobs.",
  "Healthy food options, safe places to exercise, and quality healthcare.",
  "Good public transportation, affordable housing, and access to doctors.",
  "Strong local economy, low crime, and community engagement.",
  "Clean environment, access to preventive care, and family support services.",
  "Parks and green spaces, good hospitals, and affordable medications.",
  "Quality education, community safety, and mental health resources.",
  "Low pollution, access to fresh food, and support for seniors.",
  "Youth programs, walkable neighborhoods, and substance abuse prevention.",
  "A sense of community, affordable healthcare, and safe streets.",
];

const Q2_RESPONSES = [
  "Mental health issues and substance abuse. Also obesity.",
  "Heart disease and diabetes. A lot of people are dealing with those.",
  "Mental health, especially anxiety and depression. Also drug use.",
  "Obesity and lack of exercise. Also alcohol abuse.",
  "Chronic diseases like diabetes, heart disease, and cancer.",
  "Substance abuse and mental health. Especially among young people.",
  "Aging population health issues and access to care.",
  "Stress and mental health. The pandemic made things worse.",
  "Drug and alcohol abuse, obesity, and mental health stigma.",
  "Healthcare access gaps, especially for lower income families.",
  "Mental health for teenagers and young adults. Also vaping.",
  "Loneliness and isolation, especially among older adults.",
];

const Q3_RESPONSES = [
  "Lack of exercise and poor eating habits. Also drug use among youth.",
  "Excessive drinking and smoking. Not going to the doctor regularly.",
  "Screen time, sedentary lifestyles, and vaping among teenagers.",
  "Substance abuse, unprotected sex, and reckless driving.",
  "Poor diet, not enough sleep, and too much alcohol.",
  "Drug use, especially opioids. Also distracted driving.",
  "Overeating, not exercising, and social media addiction.",
  "Smoking, binge drinking, and avoiding preventive healthcare.",
  "Vaping, drug experimentation, and poor nutrition choices.",
  "Not wearing seatbelts, texting while driving, and excessive drinking.",
];

const Q4_SCALE = [3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 2, 3]; // avg ~3.7
const Q4_RESPONSES: Record<number, string[]> = {
  2: ["A 2. There's a lot of room for improvement.", "I'd say 2. We need better healthcare access."],
  3: ["A 3. It's okay but could be better.", "I'd give it a 3. Average.", "Maybe a 3. Some things are good, some not."],
  4: ["A 4. It's pretty good here overall.", "I'd say 4. Franklin is a nice place to live.", "A 4. We have good parks and schools."],
  5: ["A 5! I love it here.", "Definitely a 5. Franklin is wonderful.", "5 out of 5. Great community."],
};

const Q5_SCALE = [2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 2, 3]; // avg ~3.5
const Q5_RESPONSES: Record<number, string[]> = {
  2: ["A 2. I mostly keep to myself.", "Maybe a 2. I'm fairly new here.", "A 2. I don't know many people."],
  3: ["A 3. Somewhat connected.", "I'd say a 3. I know my neighbors but that's about it.", "About a 3."],
  4: ["A 4. I feel connected through my kids' school and neighborhood.", "A 4. Pretty connected through church and community events.", "I'd say 4. Good connections through local organizations."],
  5: ["A 5! I've lived here for years and love it.", "Definitely a 5. Very connected.", "A 5. I know everyone on my block."],
};

const Q6_YES_NO = [true, true, true, true, true, false, false, true, true, false]; // ~70% yes
const Q6_RESPONSES: Record<string, string[]> = {
  yes: ["Yes, mostly. The city listens.", "Yes, I feel heard.", "Yeah, I think so. Our alderperson is responsive.", "Yes, through community meetings and events.", "Mostly yes. There are good channels to voice concerns."],
  no: ["Not really, no.", "Not always. I feel overlooked sometimes.", "No, I don't think the city pays attention to everyone equally.", "Honestly, not much. It's hard to get involved."],
};

const Q7_RESPONSES = [
  "More community events in the parks, especially during summer.",
  "A community center with regular programming for all ages.",
  "More volunteer opportunities and neighborhood meetups.",
  "Better communication from the city about events and meetings.",
  "Events for young adults, not just families.",
  "Senior center programs and better transportation for elderly.",
  "Block parties and neighborhood gatherings.",
  "More cultural events that celebrate diversity.",
  "Online community forums or a neighborhood app.",
  "After-school programs and youth sports leagues.",
  "Walking groups and outdoor fitness classes.",
  "Regular town halls where residents can share concerns.",
];

const Q8_SCALE = [1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 2, 3]; // avg ~2.7
const Q8_RESPONSES: Record<number, string[]> = {
  1: ["A 1. I have no idea where to even start.", "1. There's basically nothing available."],
  2: ["A 2. Very limited options.", "I'd say 2. Not many affordable options.", "A 2. Long wait times and few providers."],
  3: ["A 3. It could be better. Wait times are long.", "Maybe a 3. Some resources but hard to access.", "A 3. There are options but they're expensive."],
  4: ["A 4. I've had good luck finding help.", "A 4. Decent resources available.", "I'd say 4. My insurance covers most of it."],
};

const Q9_YES_NO = [true, true, true, false, false, true, false, true, true, false]; // ~60% yes
const Q9_RESPONSES: Record<string, string[]> = {
  yes: ["Yes, my teenager waited weeks for an appointment.", "Yes, I couldn't find a therapist accepting new patients.", "Yes, the wait times are terrible.", "Yes, my spouse needed help and we couldn't afford it.", "Yes, we had to drive 30 minutes to find someone."],
  no: ["No, we haven't needed it.", "No, thankfully not.", "No, haven't tried honestly.", "No, we've been okay."],
};

const Q10_RESPONSES = [
  "Cost and long wait times. Insurance doesn't cover enough.",
  "Not enough providers in the area. Had to go to Milwaukee.",
  "Stigma. People don't want to talk about it or be seen going.",
  "Transportation — hard to get to appointments without a car.",
  "Cost is the biggest barrier. Therapy is expensive.",
  "Availability. Most therapists have months-long waitlists.",
  "My insurance doesn't cover mental health well.",
  "Finding providers who accept Medicaid is really hard.",
  "Didn't know where to look. There's no central resource.",
  "Language barriers. Hard to find Spanish-speaking providers.",
  "Long wait times and lack of evening/weekend appointments.",
  "Cost, availability, and not knowing where to start looking.",
];

const Q11_VALUES = [0, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 7]; // avg ~3.3
const Q11_RESPONSES: Record<number, string[]> = {
  0: ["Honestly, zero. I don't exercise.", "None. I'm pretty sedentary."],
  1: ["Maybe once a week if I'm lucky.", "About 1 day."],
  2: ["About 2 days a week.", "Twice a week, usually weekends."],
  3: ["About 3 days. I try to walk regularly.", "3 times a week at the gym.", "Around 3 days."],
  4: ["4 days a week. I walk or jog most mornings.", "About 4 days."],
  5: ["5 days. I'm pretty active.", "5 times a week at the gym."],
  7: ["Every day! I love being active.", "All 7 days — even just a walk counts."],
};

const Q12_SCALE = [2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 3, 4]; // avg ~3.7
const Q12_RESPONSES: Record<number, string[]> = {
  2: ["A 2. The nearest grocery store is far.", "Maybe a 2. Healthy food is too expensive here."],
  3: ["A 3. It's okay. Healthy food is pricey though.", "A 3. The grocery store is a bit far.", "I'd say 3. Limited options in my area."],
  4: ["A 4. We have good grocery stores nearby.", "I'd give it a 4. Pretty good options.", "A 4. Farmer's market helps in summer."],
  5: ["A 5! Great grocery stores and farmer's markets.", "5. We have excellent options nearby."],
};

const Q13_SCALE = [2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 3, 4]; // avg ~3.7
const Q13_RESPONSES: Record<number, string[]> = {
  2: ["A 2. I have some chronic conditions.", "Maybe a 2. Could be much better."],
  3: ["A 3. Average I guess.", "I'd say 3. Getting older takes its toll.", "A 3 for my age."],
  4: ["A 4. Pretty healthy overall.", "I'd say a 4. I take care of myself.", "A 4. No major complaints."],
  5: ["A 5! Feeling great.", "5. I'm very healthy, thankfully.", "A 5. I prioritize my health."],
};

const Q14_RESPONSES = [
  { raw: "My family doctor, always.", value: "Family doctor" },
  { raw: "My primary care physician.", value: "Family doctor" },
  { raw: "I go to urgent care. Faster than waiting for my doctor.", value: "Urgent care" },
  { raw: "Urgent care, usually.", value: "Urgent care" },
  { raw: "The emergency room, unfortunately.", value: "Emergency room" },
  { raw: "I usually just wait it out, honestly.", value: "Stay home" },
  { raw: "My family doctor if I can get in. Otherwise urgent care.", value: "Family doctor" },
  { raw: "A walk-in clinic near my house.", value: "Walk-in clinic" },
  { raw: "Telehealth first, then my doctor if needed.", value: "Telehealth" },
  { raw: "Community health clinic.", value: "Community clinic" },
  { raw: "My family doctor. Same one for years.", value: "Family doctor" },
  { raw: "I go to the ER. I don't have a regular doctor.", value: "Emergency room" },
];

const AGE_RANGES = ["18-24", "25-34", "25-34", "35-44", "35-44", "35-44", "45-54", "45-54", "55-64", "55-64", "65+", "65+"];
const ZIP_CODES = ["53132", "53132", "53132", "53154", "53154", "53130", "53221", "53132", "53154", "53130"];

const SUMMARIES_POSITIVE = [
  "Engaged resident with thoughtful responses. Values community parks and healthcare access.",
  "Very enthusiastic about Franklin. Highlighted strong community bonds and good schools.",
  "Positive about the community. Concerned about mental health access but overall satisfied.",
  "Long-time resident who feels connected. Mentioned parks and recreation as key strengths.",
  "Parent focused on youth health and education. Appreciates Franklin's safety and schools.",
  "Active community member. Concerned about substance abuse but optimistic about Franklin's future.",
  "Resident values walkability and green spaces. Positive about food access and healthcare.",
  "Senior resident, very engaged. Appreciates the community's support for older adults.",
  "Young professional who feels Franklin is a great place to live. Wants more social events.",
  "Family-oriented resident. Praised schools and parks. Concerned about mental health wait times.",
];

const SUMMARIES_NEUTRAL = [
  "Resident completed the survey with mixed feelings. Some things are good, some need work.",
  "Middle-of-the-road responses. Concerned about healthcare costs and access.",
  "Newer resident still getting to know the community. Feels somewhat disconnected.",
  "Resident had balanced views. Appreciates safety but wants better mental health resources.",
  "Completed most questions. Feels Franklin is average compared to other communities.",
  "Pragmatic responses. Sees both strengths and weaknesses in community health.",
];

const SUMMARIES_NEGATIVE = [
  "Frustrated with mental health access and healthcare costs. Feels unheard by the city.",
  "Concerned about substance abuse and lack of resources. Pessimistic about change.",
  "Resident feels disconnected and overlooked. Difficulty accessing affordable healthcare.",
  "Unhappy with mental health services and community engagement opportunities.",
];

const SUMMARIES_SHORT = [
  "Caller ended early after a few questions.",
  "Partial survey — caller had to go but provided some useful data.",
  "Brief call. Answered initial questions before ending early.",
  "Caller started survey but didn't have time to finish.",
];

const GREETINGS_USER = [
  "Yes, I'd love to participate!",
  "Sure, let's do it!",
  "Yes please, sounds important.",
  "Okay, I can do that.",
  "Yeah, go ahead.",
  "Yes! I saw the poster about this.",
  "Sure thing. Happy to help.",
  "Hi, yes I'd like to take the survey.",
  "Go ahead, I have a few minutes.",
  "Yes, let's get started.",
  "Absolutely, I think this is a great initiative.",
  "Sure, I've got about 10 minutes.",
];

// --- Question Definitions ---
const QUESTIONS = [
  { num: 1, section: "Community Health Perception", text: "What are the most important factors for a healthy community?", type: "open_ended" },
  { num: 2, section: "Community Health Perception", text: "What are the most important health problems in Franklin?", type: "open_ended" },
  { num: 3, section: "Community Health Perception", text: "What risky behaviors have the biggest impact on community health?", type: "open_ended" },
  { num: 4, section: "Community Health Perception", text: "Rate Franklin as a healthy community (1-5)", type: "scale" },
  { num: 5, section: "Community Connectedness", text: "How connected do you feel to the Franklin community? (1-5)", type: "scale" },
  { num: 6, section: "Community Connectedness", text: "Do you feel seen and heard in your community?", type: "yes_no" },
  { num: 7, section: "Community Connectedness", text: "What would help you feel more connected?", type: "open_ended" },
  { num: 8, section: "Mental & Behavioral Health", text: "Rate your access to mental health resources (1-5)", type: "scale" },
  { num: 9, section: "Mental & Behavioral Health", text: "Have you or family had difficulty accessing mental health services in past 12 months?", type: "yes_no" },
  { num: 10, section: "Mental & Behavioral Health", text: "What barriers have you experienced accessing mental/behavioral health support?", type: "open_ended" },
  { num: 11, section: "Physical Activity & Nutrition", text: "How many days per week do you exercise for 30+ minutes?", type: "multiple_choice" },
  { num: 12, section: "Physical Activity & Nutrition", text: "Rate your access to affordable healthy food (1-5)", type: "scale" },
  { num: 13, section: "Healthcare Access", text: "Rate your own personal health (1-5)", type: "scale" },
  { num: 14, section: "Healthcare Access", text: "Where do you go first when sick?", type: "multiple_choice" },
  { num: 15, section: "Demographics", text: "Age range and zip code", type: "demographic" },
];

// --- Generate Responses for a Call ---
function generateResponses(questionsAnswered: number) {
  const responses: Array<{
    question_number: number;
    question_section: string;
    question_text: string;
    response_type: string;
    response_raw: string;
    response_numeric: number | null;
    response_boolean: boolean | null;
  }> = [];

  const questionsToAnswer = QUESTIONS.slice(0, questionsAnswered);
  // For partial completions, sometimes skip random questions
  const skipChance = questionsAnswered < 15 ? 0.15 : 0.05;

  for (const q of questionsToAnswer) {
    if (Math.random() < skipChance && q.num > 1) continue;

    let raw = "";
    let numeric: number | null = null;
    let bool: boolean | null = null;

    switch (q.num) {
      case 1: raw = pick(Q1_RESPONSES); break;
      case 2: raw = pick(Q2_RESPONSES); break;
      case 3: raw = pick(Q3_RESPONSES); break;
      case 4: { const v = pick(Q4_SCALE); numeric = v; raw = pick(Q4_RESPONSES[v] || Q4_RESPONSES[3]); break; }
      case 5: { const v = pick(Q5_SCALE); numeric = v; raw = pick(Q5_RESPONSES[v] || Q5_RESPONSES[3]); break; }
      case 6: { const v = pick(Q6_YES_NO); bool = v; raw = pick(Q6_RESPONSES[v ? "yes" : "no"]); break; }
      case 7: raw = pick(Q7_RESPONSES); break;
      case 8: { const v = pick(Q8_SCALE); numeric = v; raw = pick(Q8_RESPONSES[v] || Q8_RESPONSES[3]); break; }
      case 9: { const v = pick(Q9_YES_NO); bool = v; raw = pick(Q9_RESPONSES[v ? "yes" : "no"]); break; }
      case 10: raw = pick(Q10_RESPONSES); break;
      case 11: { const v = pick(Q11_VALUES); numeric = v; raw = pick(Q11_RESPONSES[v] || Q11_RESPONSES[3]); break; }
      case 12: { const v = pick(Q12_SCALE); numeric = v; raw = pick(Q12_RESPONSES[v] || Q12_RESPONSES[3]); break; }
      case 13: { const v = pick(Q13_SCALE); numeric = v; raw = pick(Q13_RESPONSES[v] || Q13_RESPONSES[3]); break; }
      case 14: { const r = pick(Q14_RESPONSES); raw = r.raw; break; }
      case 15: { const age = pick(AGE_RANGES); const zip = pick(ZIP_CODES); raw = `${age}, zip ${zip}.`; break; }
    }

    responses.push({
      question_number: q.num,
      question_section: q.section,
      question_text: q.text,
      response_type: q.type,
      response_raw: raw,
      response_numeric: numeric,
      response_boolean: bool,
    });
  }

  return responses;
}

// --- Generate 58 Calls across Jan-Feb 2026 ---
interface CallData {
  retell_call_id: string;
  call_status: string;
  started_at: string;
  ended_at: string;
  duration_seconds: number;
  questions_answered: number;
  completion_rate: number;
  sentiment: string;
  call_summary: string;
  transcript: Array<{ role: string; content: string }>;
}

function generateCalls(): CallData[] {
  const calls: CallData[] = [];

  // Jan 2026: 22 calls (slow start), Feb 2026: 36 calls (ramping up)
  const janDays = [3, 5, 7, 8, 10, 12, 13, 14, 16, 17, 19, 20, 21, 23, 24, 25, 27, 28, 29, 30, 31, 31];
  const febDays = [1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 21, 22, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 28];

  const allDates: { month: number; day: number }[] = [
    ...janDays.map((d) => ({ month: 1, day: d })),
    ...febDays.map((d) => ({ month: 2, day: d })),
  ];

  for (let i = 0; i < allDates.length; i++) {
    const { month, day } = allDates[i];
    const callNum = String(i + 1).padStart(3, "0");
    const hour = randInt(9, 19);
    const minute = randInt(0, 59);
    const startDate = `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00Z`;

    // Determine completion level: 65% full, 20% partial (8-14), 15% early drop (1-4)
    const completionType = weightedPick(["full", "partial", "early"], [65, 20, 15]);
    let questionsAnswered: number;
    let sentiment: string;
    let summary: string;

    if (completionType === "full") {
      questionsAnswered = 15;
      sentiment = weightedPick(["positive", "neutral", "negative"], [60, 30, 10]);
      summary = sentiment === "positive" ? pick(SUMMARIES_POSITIVE) :
                sentiment === "neutral" ? pick(SUMMARIES_NEUTRAL) : pick(SUMMARIES_NEGATIVE);
    } else if (completionType === "partial") {
      questionsAnswered = randInt(8, 14);
      sentiment = weightedPick(["positive", "neutral", "negative"], [30, 50, 20]);
      summary = sentiment === "negative" ? pick(SUMMARIES_NEGATIVE) : pick(SUMMARIES_NEUTRAL);
    } else {
      questionsAnswered = randInt(1, 4);
      sentiment = weightedPick(["neutral", "negative"], [40, 60]);
      summary = pick(SUMMARIES_SHORT);
    }

    const completionRate = Math.round((questionsAnswered / 15) * 10000) / 100;
    // Duration: ~30s per question + 30s for intro/closing
    const duration = questionsAnswered * randInt(25, 40) + randInt(20, 60);

    const endMinutes = minute + Math.floor(duration / 60);
    const endHour = hour + Math.floor(endMinutes / 60);
    const endDate = `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${String(endHour % 24).padStart(2, "0")}:${String(endMinutes % 60).padStart(2, "0")}:${String(duration % 60).padStart(2, "0")}Z`;

    const transcript = [
      { role: "agent", content: "Hi there! Thank you for calling the Franklin Community Health Survey Line. I'm here to help collect your input for the City of Franklin's Community Health Assessment. This is a short, confidential survey — it takes about 7 to 8 minutes. Would you like to go ahead?" },
      { role: "user", content: pick(GREETINGS_USER) },
    ];

    calls.push({
      retell_call_id: `call_cha_${callNum}`,
      call_status: "completed",
      started_at: startDate,
      ended_at: endDate,
      duration_seconds: duration,
      questions_answered: questionsAnswered,
      completion_rate: completionRate,
      sentiment,
      call_summary: summary,
      transcript,
    });
  }

  return calls;
}

// --- Seed ---
async function seed() {
  console.log("Clearing existing data...");
  await supabase.from("survey_responses").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("calls").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  console.log("Existing data cleared.\n");

  const calls = generateCalls();
  console.log(`Seeding ${calls.length} calls across Jan-Feb 2026...\n`);

  let successCount = 0;
  let responseCount = 0;

  for (const call of calls) {
    const { data: callRecord, error: callError } = await supabase
      .from("calls")
      .upsert(
        {
          retell_call_id: call.retell_call_id,
          call_status: call.call_status,
          started_at: call.started_at,
          ended_at: call.ended_at,
          duration_seconds: call.duration_seconds,
          questions_answered: call.questions_answered,
          total_questions: 15,
          completion_rate: call.completion_rate,
          transcript: call.transcript,
          sentiment: call.sentiment,
          call_summary: call.call_summary,
        },
        { onConflict: "retell_call_id" }
      )
      .select()
      .single();

    if (callError) {
      console.error(`Error inserting ${call.retell_call_id}:`, callError.message);
      continue;
    }

    const responses = generateResponses(call.questions_answered);
    if (responses.length > 0 && callRecord) {
      const rows = responses.map((r) => ({ ...r, call_id: callRecord.id }));
      const { error: respError } = await supabase.from("survey_responses").insert(rows);
      if (respError) {
        console.error(`Error inserting responses for ${call.retell_call_id}:`, respError.message);
      } else {
        responseCount += rows.length;
      }
    }

    successCount++;
    const date = call.started_at.slice(0, 10);
    console.log(`[${successCount}/${calls.length}] ${call.retell_call_id} | ${date} | ${call.questions_answered}Q | ${call.sentiment}`);
  }

  console.log(`\nDone! Inserted ${successCount} calls with ${responseCount} total survey responses.`);
}

seed();
