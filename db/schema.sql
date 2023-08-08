-- This table stores information about users.
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- This table stores information about surveys.
CREATE TABLE surveys (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- This table stores information about questions that can be asked in a poll.
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  survey_id INTEGER REFERENCES surveys(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- This table stores information about answers that can be selected for a question in a poll.
CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  q_order INTEGER NOT NULL,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- This table stores information about which answers a user has selected for a question in a poll.
CREATE TABLE answers_submissions (
  id SERIAL PRIMARY KEY,
  submission_id INTEGER REFERENCES submissions(id) ON DELETE CASCADE,
  answer_id INTEGER REFERENCES answers(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);