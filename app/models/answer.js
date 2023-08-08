import db from '../../db/connection';

export default class Answer {
  static async addAnswers(answerIds) {
    const newSubmission = await db.one(
      'INSERT INTO submissions DEFAULT VALUES RETURNING id;'
    );

    const answers = answerIds.forEach(async (answerId) => {
      await db.none(
        'INSERT INTO answers_submissions (answer_id, submission_id) VALUES ($1, $2);',
        [answerId, newSubmission.id]
      );
    });
    return answers;
  }

  static async getHappinessAnswers() {
    const targetAnswers = await db.any(
      'SELECT answers.id, answers.description FROM answers ' +
        'JOIN questions ON answers.question_id = questions.id ' +
        "WHERE questions.description = 'Are you happy?';"
    );

    const answers = [];
    for (const targetAnswer of targetAnswers) {
      const answer = await this.#queryForAnswers(targetAnswer.id);
      answers.push({
        description: targetAnswer.description,
        answers: answer.map((a) => ({
          question: a.question_description,
          answer: a.answer_description,
        })),
      });
    }

    return answers;
  }

  static async #queryForAnswers(happinessId) {
    const answers = await db.any(
      'SELECT ' +
        'DISTINCT ON (questions.description) ' +
        'questions.description AS question_description, ' +
        'answers.description AS answer_description, ' +
        'COUNT(*) AS answer_count ' +
        'FROM questions ' +
        'JOIN answers ON answers.question_id = questions.id ' +
        'JOIN answers_submissions ON answers_submissions.answer_id = answers.id ' +
        'WHERE answers_submissions.submission_id IN(' +
        'SELECT submission_id FROM answers_submissions ' +
        'WHERE answers_submissions.answer_id = $1' +
        ') AND questions.id != 2' +
        'GROUP BY questions.description, answers.description ' +
        'ORDER BY questions.description, answer_count DESC;',
      [happinessId]
    );
    return answers;
  }
}
