import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cfeqmydpfhjjwxpardbl.supabase.co";
const serviceRoleKey = "***REDACTED***";

const supabase = createClient(supabaseUrl, serviceRoleKey);

const DUMMY_CALLS = [
  {
    retell_call_id: "call_demo_001",
    call_status: "completed",
    started_at: "2026-02-25T14:14:00Z",
    ended_at: "2026-02-25T14:21:23Z",
    duration_seconds: 443,
    questions_answered: 15,
    completion_rate: 100,
    sentiment: "positive",
    call_summary: "Enthusiastic resident, concerned about mental health access and community parks. Feels connected to the community.",
    transcript: [
      { role: "agent", content: "Hi there! Thank you for calling the Franklin Community Health Survey Line. I'm here to help collect your input for the City of Franklin's Community Health Assessment. This is a short, confidential survey — it takes about 7 to 8 minutes. Would you like to go ahead?" },
      { role: "user", content: "Yes, I'd love to participate!" },
      { role: "agent", content: "Great! Let's start with a big-picture question. What do you think are the most important factors for a healthy community?" },
      { role: "user", content: "I think safe neighborhoods, good schools, and access to parks and recreation are the most important. Also having good healthcare nearby." },
      { role: "agent", content: "That's really helpful, thank you. Now, what do you think are the most important health problems in the Franklin community?" },
      { role: "user", content: "Mental health is a big one. I also think substance abuse is growing, and obesity is a concern for a lot of families." },
      { role: "agent", content: "Thank you for sharing that. What about risky behaviors? What behaviors do you think have the biggest impact on health in our community?" },
      { role: "user", content: "Probably lack of exercise and poor eating habits. Also drug use, especially among younger people." },
      { role: "agent", content: "Good insights. On a scale of 1 to 5, with 1 being very unhealthy and 5 being very healthy, how would you rate Franklin overall as a healthy community?" },
      { role: "user", content: "I'd say a 4. It's pretty good here overall." },
      { role: "agent", content: "Great. Now, how connected do you feel to the Franklin community? On a scale of 1 to 5?" },
      { role: "user", content: "I'd say about a 4. I feel pretty connected through my kids' school and the local parks." },
      { role: "agent", content: "That's wonderful. Do you feel seen and heard in your community?" },
      { role: "user", content: "Yes, mostly. The city does a decent job of listening to residents." },
      { role: "agent", content: "What is one thing that would help you feel more connected to your community?" },
      { role: "user", content: "More community events in the parks, especially during summer. Family-friendly events." },
      { role: "agent", content: "Love that idea. How would you rate your access to mental health resources in Franklin? 1 to 5?" },
      { role: "user", content: "Hmm, I'd say a 3. It could be better. Wait times are long." },
      { role: "agent", content: "Have you or a family member needed mental health services but had difficulty accessing them in the past 12 months?" },
      { role: "user", content: "Yes, my teenager needed counseling and we had to wait 6 weeks for an appointment." },
      { role: "agent", content: "I'm sorry to hear that. What barriers have you experienced?" },
      { role: "user", content: "Mainly availability. There just aren't enough providers. Cost is also a factor since our insurance doesn't cover everything." },
      { role: "agent", content: "Thank you for sharing. During a normal week, how many days do you exercise for at least 30 minutes?" },
      { role: "user", content: "About 4 days a week. I try to walk or jog most mornings." },
      { role: "agent", content: "That's great! How would you rate your access to affordable, healthy food? 1 to 5?" },
      { role: "user", content: "I'd give it a 4. We have some good grocery stores nearby." },
      { role: "agent", content: "How would you rate your own personal health overall? 1 to 5?" },
      { role: "user", content: "I'd say a 4. Pretty healthy overall." },
      { role: "agent", content: "When you're sick, where do you typically go first?" },
      { role: "user", content: "My family doctor, always." },
      { role: "agent", content: "Last quick question — could you share your approximate age range and zip code?" },
      { role: "user", content: "I'm in the 40 to 54 range and my zip code is 53132." },
      { role: "agent", content: "That's all the questions! Thank you so much for taking the time. Your input will directly help improve health and wellness in Franklin. Have a wonderful day!" },
    ],
  },
  {
    retell_call_id: "call_demo_002",
    call_status: "completed",
    started_at: "2026-02-25T15:01:00Z",
    ended_at: "2026-02-25T15:05:12Z",
    duration_seconds: 252,
    questions_answered: 9,
    completion_rate: 60,
    sentiment: "neutral",
    call_summary: "Resident completed most questions but ended early. Concerned about healthcare costs.",
    transcript: [
      { role: "agent", content: "Hi there! Thank you for calling the Franklin Community Health Survey Line." },
      { role: "user", content: "Hi, sure, let's do this." },
    ],
  },
  {
    retell_call_id: "call_demo_003",
    call_status: "completed",
    started_at: "2026-02-26T09:22:00Z",
    ended_at: "2026-02-26T09:30:05Z",
    duration_seconds: 485,
    questions_answered: 15,
    completion_rate: 100,
    sentiment: "positive",
    call_summary: "Senior resident, very engaged. Strong feelings about community connectedness and healthcare access.",
    transcript: [
      { role: "agent", content: "Hi! Thank you for calling the Franklin Community Health Survey Line." },
      { role: "user", content: "Hello dear, I saw the number and thought I'd call in." },
    ],
  },
  {
    retell_call_id: "call_demo_004",
    call_status: "completed",
    started_at: "2026-02-26T11:10:00Z",
    ended_at: "2026-02-26T11:11:30Z",
    duration_seconds: 90,
    questions_answered: 2,
    completion_rate: 13.33,
    sentiment: "negative",
    call_summary: "Caller ended early after 2 questions.",
    transcript: [
      { role: "agent", content: "Hi there! Thank you for calling the Franklin Community Health Survey Line." },
      { role: "user", content: "Actually, I don't have time right now. Sorry." },
    ],
  },
  {
    retell_call_id: "call_demo_005",
    call_status: "completed",
    started_at: "2026-02-27T14:45:00Z",
    ended_at: "2026-02-27T14:51:58Z",
    duration_seconds: 418,
    questions_answered: 15,
    completion_rate: 100,
    sentiment: "positive",
    call_summary: "Young adult, focused on mental health and food access. Very supportive of the survey initiative.",
    transcript: [
      { role: "agent", content: "Hi there! Thank you for calling." },
      { role: "user", content: "Hey! Yeah, I want to give my input." },
    ],
  },
  {
    retell_call_id: "call_demo_006",
    call_status: "completed",
    started_at: "2026-02-27T16:30:00Z",
    ended_at: "2026-02-27T16:37:42Z",
    duration_seconds: 462,
    questions_answered: 15,
    completion_rate: 100,
    sentiment: "positive",
    call_summary: "Engaged parent, concerned about youth substance abuse and nutrition in schools.",
    transcript: [
      { role: "agent", content: "Hi! Thank you for calling the Franklin Community Health Survey Line." },
      { role: "user", content: "Yes, happy to help!" },
    ],
  },
  {
    retell_call_id: "call_demo_007",
    call_status: "completed",
    started_at: "2026-02-28T10:15:00Z",
    ended_at: "2026-02-28T10:21:30Z",
    duration_seconds: 390,
    questions_answered: 12,
    completion_rate: 80,
    sentiment: "neutral",
    call_summary: "Resident skipped some questions. Concerned about healthcare costs and mental health stigma.",
    transcript: [
      { role: "agent", content: "Hi there! Thank you for calling." },
      { role: "user", content: "Hi, let's get started." },
    ],
  },
  {
    retell_call_id: "call_demo_008",
    call_status: "completed",
    started_at: "2026-02-28T13:45:00Z",
    ended_at: "2026-02-28T13:52:15Z",
    duration_seconds: 435,
    questions_answered: 15,
    completion_rate: 100,
    sentiment: "positive",
    call_summary: "Very positive about Franklin. Highlighted parks and recreation as strengths.",
    transcript: [
      { role: "agent", content: "Hi! Thank you for calling." },
      { role: "user", content: "Hello! I love that you're doing this." },
    ],
  },
];

const RESPONSES_DATA: Record<string, Array<{
  question_number: number;
  question_section: string;
  question_text: string;
  response_type: string;
  response_raw: string;
  response_numeric: number | null;
  response_boolean: boolean | null;
}>> = {
  call_demo_001: [
    { question_number: 1, question_section: "Community Health Perception", question_text: "What are the most important factors for a healthy community?", response_type: "open_ended", response_raw: "Safe neighborhoods, good schools, access to parks and recreation, and good healthcare nearby.", response_numeric: null, response_boolean: null },
    { question_number: 2, question_section: "Community Health Perception", question_text: "What are the most important health problems in Franklin?", response_type: "open_ended", response_raw: "Mental health is a big one. Substance abuse is growing, and obesity is a concern for families.", response_numeric: null, response_boolean: null },
    { question_number: 3, question_section: "Community Health Perception", question_text: "What risky behaviors have the biggest impact on community health?", response_type: "open_ended", response_raw: "Lack of exercise, poor eating habits, and drug use among younger people.", response_numeric: null, response_boolean: null },
    { question_number: 4, question_section: "Community Health Perception", question_text: "Rate Franklin as a healthy community (1-5)", response_type: "scale", response_raw: "I'd say a 4. It's pretty good here overall.", response_numeric: 4, response_boolean: null },
    { question_number: 5, question_section: "Community Connectedness", question_text: "How connected do you feel to the Franklin community? (1-5)", response_type: "scale", response_raw: "About a 4. Connected through school and local parks.", response_numeric: 4, response_boolean: null },
    { question_number: 6, question_section: "Community Connectedness", question_text: "Do you feel seen and heard in your community?", response_type: "yes_no", response_raw: "Yes, mostly. The city does a decent job of listening.", response_numeric: null, response_boolean: true },
    { question_number: 7, question_section: "Community Connectedness", question_text: "What would help you feel more connected?", response_type: "open_ended", response_raw: "More community events in the parks, especially during summer. Family-friendly events.", response_numeric: null, response_boolean: null },
    { question_number: 8, question_section: "Mental & Behavioral Health", question_text: "Rate your access to mental health resources (1-5)", response_type: "scale", response_raw: "I'd say a 3. Wait times are long.", response_numeric: 3, response_boolean: null },
    { question_number: 9, question_section: "Mental & Behavioral Health", question_text: "Have you or family had difficulty accessing mental health services in past 12 months?", response_type: "yes_no", response_raw: "Yes, my teenager waited 6 weeks for an appointment.", response_numeric: null, response_boolean: true },
    { question_number: 10, question_section: "Mental & Behavioral Health", question_text: "What barriers have you experienced accessing mental/behavioral health support?", response_type: "open_ended", response_raw: "Availability — not enough providers. Cost is also a factor.", response_numeric: null, response_boolean: null },
    { question_number: 11, question_section: "Physical Activity & Nutrition", question_text: "How many days per week do you exercise for 30+ minutes?", response_type: "multiple_choice", response_raw: "About 4 days a week.", response_numeric: 4, response_boolean: null },
    { question_number: 12, question_section: "Physical Activity & Nutrition", question_text: "Rate your access to affordable healthy food (1-5)", response_type: "scale", response_raw: "I'd give it a 4. Good grocery stores nearby.", response_numeric: 4, response_boolean: null },
    { question_number: 13, question_section: "Healthcare Access", question_text: "Rate your own personal health (1-5)", response_type: "scale", response_raw: "I'd say a 4. Pretty healthy overall.", response_numeric: 4, response_boolean: null },
    { question_number: 14, question_section: "Healthcare Access", question_text: "Where do you go first when sick?", response_type: "multiple_choice", response_raw: "My family doctor, always.", response_numeric: null, response_boolean: null },
    { question_number: 15, question_section: "Demographics", question_text: "Age range and zip code", response_type: "demographic", response_raw: "40 to 54 range, zip 53132.", response_numeric: null, response_boolean: null },
  ],
  call_demo_002: [
    { question_number: 1, question_section: "Community Health Perception", question_text: "What are the most important factors for a healthy community?", response_type: "open_ended", response_raw: "Good jobs, affordable housing, and access to healthcare.", response_numeric: null, response_boolean: null },
    { question_number: 2, question_section: "Community Health Perception", question_text: "What are the most important health problems in Franklin?", response_type: "open_ended", response_raw: "Heart disease and diabetes. A lot of people I know are dealing with those.", response_numeric: null, response_boolean: null },
    { question_number: 3, question_section: "Community Health Perception", question_text: "What risky behaviors have the biggest impact on community health?", response_type: "open_ended", response_raw: "Alcohol use and smoking. Also people not going to the doctor regularly.", response_numeric: null, response_boolean: null },
    { question_number: 4, question_section: "Community Health Perception", question_text: "Rate Franklin as a healthy community (1-5)", response_type: "scale", response_raw: "A 3 I guess.", response_numeric: 3, response_boolean: null },
    { question_number: 5, question_section: "Community Connectedness", question_text: "How connected do you feel to the Franklin community? (1-5)", response_type: "scale", response_raw: "Maybe a 2. I mostly keep to myself.", response_numeric: 2, response_boolean: null },
    { question_number: 6, question_section: "Community Connectedness", question_text: "Do you feel seen and heard in your community?", response_type: "yes_no", response_raw: "Not really, no.", response_numeric: null, response_boolean: false },
    { question_number: 8, question_section: "Mental & Behavioral Health", question_text: "Rate your access to mental health resources (1-5)", response_type: "scale", response_raw: "A 2. I wouldn't even know where to go.", response_numeric: 2, response_boolean: null },
    { question_number: 9, question_section: "Mental & Behavioral Health", question_text: "Have you or family had difficulty accessing mental health services in past 12 months?", response_type: "yes_no", response_raw: "No, haven't tried.", response_numeric: null, response_boolean: false },
    { question_number: 13, question_section: "Healthcare Access", question_text: "Rate your own personal health (1-5)", response_type: "scale", response_raw: "A 3.", response_numeric: 3, response_boolean: null },
  ],
  call_demo_003: [
    { question_number: 1, question_section: "Community Health Perception", question_text: "What are the most important factors for a healthy community?", response_type: "open_ended", response_raw: "Good healthcare, safe streets for walking, and activities for seniors. Also affordable medications.", response_numeric: null, response_boolean: null },
    { question_number: 2, question_section: "Community Health Perception", question_text: "What are the most important health problems in Franklin?", response_type: "open_ended", response_raw: "Aging population issues, loneliness among seniors, and mental health. Also diabetes.", response_numeric: null, response_boolean: null },
    { question_number: 4, question_section: "Community Health Perception", question_text: "Rate Franklin as a healthy community (1-5)", response_type: "scale", response_raw: "I'd say a 4. It's been a good place to live.", response_numeric: 4, response_boolean: null },
    { question_number: 5, question_section: "Community Connectedness", question_text: "How connected do you feel to the Franklin community? (1-5)", response_type: "scale", response_raw: "A 5! I've lived here 30 years.", response_numeric: 5, response_boolean: null },
    { question_number: 6, question_section: "Community Connectedness", question_text: "Do you feel seen and heard in your community?", response_type: "yes_no", response_raw: "Yes, absolutely.", response_numeric: null, response_boolean: true },
    { question_number: 7, question_section: "Community Connectedness", question_text: "What would help you feel more connected?", response_type: "open_ended", response_raw: "Senior center programs and transportation services for those who can't drive.", response_numeric: null, response_boolean: null },
    { question_number: 8, question_section: "Mental & Behavioral Health", question_text: "Rate your access to mental health resources (1-5)", response_type: "scale", response_raw: "A 2. Not many options for seniors.", response_numeric: 2, response_boolean: null },
    { question_number: 9, question_section: "Mental & Behavioral Health", question_text: "Have you or family had difficulty accessing mental health services in past 12 months?", response_type: "yes_no", response_raw: "Yes, my husband needed help after his surgery.", response_numeric: null, response_boolean: true },
    { question_number: 10, question_section: "Mental & Behavioral Health", question_text: "What barriers have you experienced accessing mental/behavioral health support?", response_type: "open_ended", response_raw: "Transportation is the biggest one. And cost. Medicare doesn't cover everything.", response_numeric: null, response_boolean: null },
    { question_number: 11, question_section: "Physical Activity & Nutrition", question_text: "How many days per week do you exercise for 30+ minutes?", response_type: "multiple_choice", response_raw: "About 3 days. I walk around the neighborhood.", response_numeric: 3, response_boolean: null },
    { question_number: 12, question_section: "Physical Activity & Nutrition", question_text: "Rate your access to affordable healthy food (1-5)", response_type: "scale", response_raw: "A 3. The grocery store is a bit far.", response_numeric: 3, response_boolean: null },
    { question_number: 13, question_section: "Healthcare Access", question_text: "Rate your own personal health (1-5)", response_type: "scale", response_raw: "A 3 for my age. Could be worse!", response_numeric: 3, response_boolean: null },
    { question_number: 14, question_section: "Healthcare Access", question_text: "Where do you go first when sick?", response_type: "multiple_choice", response_raw: "My family doctor. Same one for 20 years.", response_numeric: null, response_boolean: null },
    { question_number: 15, question_section: "Demographics", question_text: "Age range and zip code", response_type: "demographic", response_raw: "65 and over, zip 53132.", response_numeric: null, response_boolean: null },
  ],
  call_demo_004: [
    { question_number: 1, question_section: "Community Health Perception", question_text: "What are the most important factors for a healthy community?", response_type: "open_ended", response_raw: "Safety and clean environment.", response_numeric: null, response_boolean: null },
    { question_number: 4, question_section: "Community Health Perception", question_text: "Rate Franklin as a healthy community (1-5)", response_type: "scale", response_raw: "3", response_numeric: 3, response_boolean: null },
  ],
  call_demo_005: [
    { question_number: 1, question_section: "Community Health Perception", question_text: "What are the most important factors for a healthy community?", response_type: "open_ended", response_raw: "Mental health resources, affordable housing, and walkable neighborhoods.", response_numeric: null, response_boolean: null },
    { question_number: 2, question_section: "Community Health Perception", question_text: "What are the most important health problems in Franklin?", response_type: "open_ended", response_raw: "Mental health and anxiety, especially post-pandemic. Also substance abuse.", response_numeric: null, response_boolean: null },
    { question_number: 4, question_section: "Community Health Perception", question_text: "Rate Franklin as a healthy community (1-5)", response_type: "scale", response_raw: "A 3.", response_numeric: 3, response_boolean: null },
    { question_number: 5, question_section: "Community Connectedness", question_text: "How connected do you feel to the Franklin community? (1-5)", response_type: "scale", response_raw: "A 3.", response_numeric: 3, response_boolean: null },
    { question_number: 6, question_section: "Community Connectedness", question_text: "Do you feel seen and heard in your community?", response_type: "yes_no", response_raw: "Somewhat. I wish there were more ways for young people to get involved.", response_numeric: null, response_boolean: true },
    { question_number: 7, question_section: "Community Connectedness", question_text: "What would help you feel more connected?", response_type: "open_ended", response_raw: "More events for people in their 20s and 30s. Not just family stuff.", response_numeric: null, response_boolean: null },
    { question_number: 8, question_section: "Mental & Behavioral Health", question_text: "Rate your access to mental health resources (1-5)", response_type: "scale", response_raw: "A 2. It's really hard to find affordable therapy.", response_numeric: 2, response_boolean: null },
    { question_number: 9, question_section: "Mental & Behavioral Health", question_text: "Have you or family had difficulty accessing mental health services in past 12 months?", response_type: "yes_no", response_raw: "Yes, I've been on a waitlist for months.", response_numeric: null, response_boolean: true },
    { question_number: 10, question_section: "Mental & Behavioral Health", question_text: "What barriers have you experienced accessing mental/behavioral health support?", response_type: "open_ended", response_raw: "Cost and long wait times. Stigma too — people don't talk about it.", response_numeric: null, response_boolean: null },
    { question_number: 11, question_section: "Physical Activity & Nutrition", question_text: "How many days per week do you exercise for 30+ minutes?", response_type: "multiple_choice", response_raw: "5 days. I go to the gym.", response_numeric: 5, response_boolean: null },
    { question_number: 12, question_section: "Physical Activity & Nutrition", question_text: "Rate your access to affordable healthy food (1-5)", response_type: "scale", response_raw: "A 3. Healthy food is expensive.", response_numeric: 3, response_boolean: null },
    { question_number: 13, question_section: "Healthcare Access", question_text: "Rate your own personal health (1-5)", response_type: "scale", response_raw: "A 4. I'm in good shape.", response_numeric: 4, response_boolean: null },
    { question_number: 14, question_section: "Healthcare Access", question_text: "Where do you go first when sick?", response_type: "multiple_choice", response_raw: "Urgent care. I don't have a regular doctor.", response_numeric: null, response_boolean: null },
    { question_number: 15, question_section: "Demographics", question_text: "Age range and zip code", response_type: "demographic", response_raw: "Under 25, zip 53132.", response_numeric: null, response_boolean: null },
  ],
  call_demo_006: [
    { question_number: 4, question_section: "Community Health Perception", question_text: "Rate Franklin as a healthy community (1-5)", response_type: "scale", response_raw: "A 5. I love it here.", response_numeric: 5, response_boolean: null },
    { question_number: 5, question_section: "Community Connectedness", question_text: "How connected do you feel to the Franklin community? (1-5)", response_type: "scale", response_raw: "A 4.", response_numeric: 4, response_boolean: null },
    { question_number: 6, question_section: "Community Connectedness", question_text: "Do you feel seen and heard in your community?", response_type: "yes_no", response_raw: "Yes, definitely.", response_numeric: null, response_boolean: true },
    { question_number: 8, question_section: "Mental & Behavioral Health", question_text: "Rate your access to mental health resources (1-5)", response_type: "scale", response_raw: "A 4.", response_numeric: 4, response_boolean: null },
    { question_number: 9, question_section: "Mental & Behavioral Health", question_text: "Have you or family had difficulty accessing mental health services in past 12 months?", response_type: "yes_no", response_raw: "No, we've been fine.", response_numeric: null, response_boolean: false },
    { question_number: 12, question_section: "Physical Activity & Nutrition", question_text: "Rate your access to affordable healthy food (1-5)", response_type: "scale", response_raw: "A 5. We have great options.", response_numeric: 5, response_boolean: null },
    { question_number: 13, question_section: "Healthcare Access", question_text: "Rate your own personal health (1-5)", response_type: "scale", response_raw: "A 5. Feeling great!", response_numeric: 5, response_boolean: null },
  ],
  call_demo_007: [
    { question_number: 4, question_section: "Community Health Perception", question_text: "Rate Franklin as a healthy community (1-5)", response_type: "scale", response_raw: "A 3.", response_numeric: 3, response_boolean: null },
    { question_number: 5, question_section: "Community Connectedness", question_text: "How connected do you feel to the Franklin community? (1-5)", response_type: "scale", response_raw: "A 2. I'm new here.", response_numeric: 2, response_boolean: null },
    { question_number: 6, question_section: "Community Connectedness", question_text: "Do you feel seen and heard in your community?", response_type: "yes_no", response_raw: "No, not yet.", response_numeric: null, response_boolean: false },
    { question_number: 8, question_section: "Mental & Behavioral Health", question_text: "Rate your access to mental health resources (1-5)", response_type: "scale", response_raw: "A 1. No idea where to even start.", response_numeric: 1, response_boolean: null },
    { question_number: 13, question_section: "Healthcare Access", question_text: "Rate your own personal health (1-5)", response_type: "scale", response_raw: "A 2.", response_numeric: 2, response_boolean: null },
  ],
  call_demo_008: [
    { question_number: 4, question_section: "Community Health Perception", question_text: "Rate Franklin as a healthy community (1-5)", response_type: "scale", response_raw: "A 5!", response_numeric: 5, response_boolean: null },
    { question_number: 5, question_section: "Community Connectedness", question_text: "How connected do you feel to the Franklin community? (1-5)", response_type: "scale", response_raw: "A 5. Very connected.", response_numeric: 5, response_boolean: null },
    { question_number: 6, question_section: "Community Connectedness", question_text: "Do you feel seen and heard in your community?", response_type: "yes_no", response_raw: "Yes!", response_numeric: null, response_boolean: true },
    { question_number: 8, question_section: "Mental & Behavioral Health", question_text: "Rate your access to mental health resources (1-5)", response_type: "scale", response_raw: "A 3.", response_numeric: 3, response_boolean: null },
    { question_number: 9, question_section: "Mental & Behavioral Health", question_text: "Have you or family had difficulty accessing mental health services in past 12 months?", response_type: "yes_no", response_raw: "No.", response_numeric: null, response_boolean: false },
    { question_number: 12, question_section: "Physical Activity & Nutrition", question_text: "Rate your access to affordable healthy food (1-5)", response_type: "scale", response_raw: "A 4.", response_numeric: 4, response_boolean: null },
    { question_number: 13, question_section: "Healthcare Access", question_text: "Rate your own personal health (1-5)", response_type: "scale", response_raw: "A 4.", response_numeric: 4, response_boolean: null },
    { question_number: 14, question_section: "Healthcare Access", question_text: "Where do you go first when sick?", response_type: "multiple_choice", response_raw: "Family doctor.", response_numeric: null, response_boolean: null },
    { question_number: 15, question_section: "Demographics", question_text: "Age range and zip code", response_type: "demographic", response_raw: "26-39, zip 53154.", response_numeric: null, response_boolean: null },
  ],
};

async function seed() {
  console.log("Seeding dummy data...");

  for (const call of DUMMY_CALLS) {
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
      console.error(`Error inserting call ${call.retell_call_id}:`, callError);
      continue;
    }

    console.log(`Inserted call: ${call.retell_call_id} -> ${callRecord.id}`);

    const responses = RESPONSES_DATA[call.retell_call_id];
    if (responses && callRecord) {
      await supabase.from("survey_responses").delete().eq("call_id", callRecord.id);
      const rows = responses.map((r) => ({ ...r, call_id: callRecord.id }));
      const { error: respError } = await supabase.from("survey_responses").insert(rows);
      if (respError) {
        console.error(`Error inserting responses for ${call.retell_call_id}:`, respError);
      } else {
        console.log(`  -> Inserted ${rows.length} responses`);
      }
    }
  }

  console.log("Done!");
}

seed();
