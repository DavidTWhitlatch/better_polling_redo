INSERT INTO
  "surveys" ("name")
VALUES
  ('Survey 1');

INSERT INTO
  "questions" ("description", "type", "survey_id")
VALUES
  ('How old are you?', 'radio', 1),
  ('Are you happy?', 'radio', 1),
  ('What countries have you visited?', 'checkbox', 1),
  ('What is your favorite sport?', 'radio', 1),
  (
    'What programming languages do you know?',
    'checkbox', 1
  );

INSERT INTO
  "answers" ("description", "q_order", "question_id")
VALUES
  ('Less than 18', 1, 1),
  ('18-99', 2, 1),
  ('More than 99', 3, 1),
  ('Yes', 1, 2),
  ('No', 2, 2),
  ('Spain', 1, 3),
  ('France', 2, 3),
  ('Italy', 3, 3),
  ('England', 4, 3),
  ('Portugal', 5, 3),
  ('Football', 1, 4),
  ('Basketball', 2, 4),
  ('Soccer', 3, 4),
  ('Volleyball', 4, 4),
  ('PHP', 1, 5),
  ('Ruby', 2, 5),
  ('Javascript', 3, 5),
  ('Python', 4, 5);