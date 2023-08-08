import db from '../../db/connection';

export default class Question {
  static async findAllWithAnswers(userId) {
    const answers = await db.any(
      'SELECT ' +
        'answers.id AS answer_id, ' +
        'answers.description AS answer_description, ' +
        'answers.q_order AS answer_order, ' +
        'questions.id, ' +
        'questions.description, ' +
        'questions.type ' +
        'FROM answers ' +
        'RIGHT JOIN questions ON questions.id = answers.question_id;'
    );

    const questions = answers.reduce((acc, answer) => {
      const question = acc.find((q) => q.id === answer.id);

      const formattedAnswer = {
        id: answer.answer_id,
        description: answer.answer_description,
        order: answer.answer_order,
      };

      if (!question) {
        acc.push({
          id: answer.id,
          description: answer.description,
          type: answer.type,
          answers: [formattedAnswer],
        });
      } else {
        question.answers.push(formattedAnswer);
      }

      return acc;
    }, []);
        
    return questions;
  }

}
