import { NextResponse } from 'next/server';
import Question from '../../models/question';

export const GET = async () => {
  const questions = await Question.findAllWithAnswers();

  return NextResponse.json(questions);
};
