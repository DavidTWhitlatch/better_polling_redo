'use client';

import { useState, useEffect } from 'react';

import { getAnswers } from '../../services/answerService';

export default function Happiness() {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      const answerList = await getAnswers();
      setAnswers(answerList);
    };

    fetchAnswers();
  }, []);

  return (
    <div>
      {answers.map((answer, hIndex) => (
        <div key={hIndex}>
          <h1>
            Most picked answers by{' '}
            {answer.description === 'Yes' ? 'happy' : 'sad'} people:
          </h1>
          {answer.answers.map((a, aIndex) => (
            <div key={aIndex}>
              <p>
                {a.question} {'=>'} {a.answer}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
