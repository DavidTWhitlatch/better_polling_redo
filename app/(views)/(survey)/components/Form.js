'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { submitAnswers } from '../../../services/answerService';
import { getQuestions } from '../../../services/questionService';

export default function Form() {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({});
  const { push } = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionList = await getQuestions();
      setQuestions(questionList);
      setFormData(
        questionList.reduce((acc, question) => {
          acc[question.id] = [];
          return acc;
        }, {})
      );
    };

    fetchQuestions();
  }, []);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    const [questionIdStr, answerIdStr] = name.split('-');
    const questionId = Number(questionIdStr);
    const answerId = Number(answerIdStr);
    const question = questions.find((q) => q.id === questionId);
    if (question.type === 'radio') {
      setFormData({ ...formData, [questionId]: [answerId] });
    } else {
      const newFormData = { ...formData };
      if (checked) {
        newFormData[questionId].push(answerId);
      } else {
        newFormData[questionId] = newFormData[questionId].filter(
          (id) => id !== answerId
        );
      }
      setFormData(newFormData);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitAnswers(formData);
    push('/happiness');
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((question) => (
        <div key={question.id}>
          <h1>{question.description}</h1>
          {question.answers.map((answer) => (
            <div key={answer.id}>
              <label htmlFor={answer.id}>{answer.description}</label>
              <input
                name={`${question.id}-${answer.id}`}
                type={question.type}
                value={answer.description}
                checked={formData[question.id]?.includes(answer.id)}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
      ))}
      <button>Submit Survey</button>
    </form>
  );
}
