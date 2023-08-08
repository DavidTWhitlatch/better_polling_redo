import { NextResponse } from 'next/server';
import { parse } from 'url';

import Answer from '../../models/answer';

export const POST = async (req) => {
  const { answers } = await req.json();

  await Answer.addAnswers(Object.values(answers).flat());

  return NextResponse.json('success', { status: 200 });
};

export const GET = async () => {
  const answers = await Answer.getHappinessAnswers();

  return NextResponse.json(answers, { status: 200 });
};
