-- Franklin CHA Voice Survey - Initial Schema

-- Calls table
CREATE TABLE calls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  retell_call_id TEXT UNIQUE NOT NULL,
  phone_number TEXT,
  call_status TEXT NOT NULL DEFAULT 'completed',
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  questions_answered INTEGER DEFAULT 0,
  total_questions INTEGER DEFAULT 15,
  completion_rate DECIMAL(5,2),
  transcript JSONB,
  recording_url TEXT,
  call_summary TEXT,
  sentiment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Survey responses table
CREATE TABLE survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  call_id UUID REFERENCES calls(id) ON DELETE CASCADE,
  question_number INTEGER NOT NULL,
  question_section TEXT NOT NULL,
  question_text TEXT NOT NULL,
  response_type TEXT NOT NULL CHECK (response_type IN ('scale', 'open_ended', 'yes_no', 'multiple_choice', 'demographic')),
  response_raw TEXT,
  response_numeric INTEGER,
  response_boolean BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Survey questions reference table
CREATE TABLE survey_questions (
  id SERIAL PRIMARY KEY,
  question_number INTEGER UNIQUE NOT NULL,
  section TEXT NOT NULL,
  question_text TEXT NOT NULL,
  response_type TEXT NOT NULL,
  scale_min INTEGER,
  scale_max INTEGER,
  scale_min_label TEXT,
  scale_max_label TEXT
);

-- Seed survey questions
INSERT INTO survey_questions (question_number, section, question_text, response_type, scale_min, scale_max, scale_min_label, scale_max_label) VALUES
(1, 'Community Health Perception', 'What are the most important factors for a healthy community?', 'open_ended', NULL, NULL, NULL, NULL),
(2, 'Community Health Perception', 'What are the most important health problems in Franklin?', 'open_ended', NULL, NULL, NULL, NULL),
(3, 'Community Health Perception', 'What risky behaviors have the biggest impact on community health?', 'open_ended', NULL, NULL, NULL, NULL),
(4, 'Community Health Perception', 'Rate Franklin as a healthy community (1-5)', 'scale', 1, 5, 'Very Unhealthy', 'Very Healthy'),
(5, 'Community Connectedness', 'How connected do you feel to the Franklin community? (1-5)', 'scale', 1, 5, 'Not Connected', 'Very Connected'),
(6, 'Community Connectedness', 'Do you feel seen and heard in your community?', 'yes_no', NULL, NULL, NULL, NULL),
(7, 'Community Connectedness', 'What would help you feel more connected?', 'open_ended', NULL, NULL, NULL, NULL),
(8, 'Mental & Behavioral Health', 'Rate your access to mental health resources (1-5)', 'scale', 1, 5, 'Very Poor', 'Excellent'),
(9, 'Mental & Behavioral Health', 'Have you or family had difficulty accessing mental health services in past 12 months?', 'yes_no', NULL, NULL, NULL, NULL),
(10, 'Mental & Behavioral Health', 'What barriers have you experienced accessing mental/behavioral health support?', 'open_ended', NULL, NULL, NULL, NULL),
(11, 'Physical Activity & Nutrition', 'How many days per week do you exercise for 30+ minutes?', 'multiple_choice', NULL, NULL, NULL, NULL),
(12, 'Physical Activity & Nutrition', 'Rate your access to affordable healthy food (1-5)', 'scale', 1, 5, 'Very Poor', 'Excellent'),
(13, 'Healthcare Access', 'Rate your own personal health (1-5)', 'scale', 1, 5, 'Very Unhealthy', 'Very Healthy'),
(14, 'Healthcare Access', 'Where do you go first when sick?', 'multiple_choice', NULL, NULL, NULL, NULL),
(15, 'Demographics', 'Age range and zip code', 'demographic', NULL, NULL, NULL, NULL);

-- Enable real-time for calls table
ALTER PUBLICATION supabase_realtime ADD TABLE calls;

-- Row Level Security
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON calls FOR SELECT USING (true);

ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON survey_responses FOR SELECT USING (true);

ALTER TABLE survey_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON survey_questions FOR SELECT USING (true);

-- Indexes for performance
CREATE INDEX idx_calls_started_at ON calls(started_at DESC);
CREATE INDEX idx_survey_responses_call_id ON survey_responses(call_id);
CREATE INDEX idx_survey_responses_question_number ON survey_responses(question_number);
