import { NextRequest, NextResponse } from 'next/server';
import { Quiz, QuizQuestion, QuizAttempt } from '@/lib/models';
import { verifyAuth, unauthorizedResponse } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await verifyAuth(req);
    if (!authUser) return unauthorizedResponse();

    const { id } = await params;
    const quiz = await Quiz.findByPk(id, {
      include: [{ model: QuizQuestion, as: 'questions' }]
    });

    if (!quiz) {
      return NextResponse.json({ success: false, message: 'Quiz not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: quiz });
  } catch (error: any) {
    console.error('Get quiz error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await verifyAuth(req);
    if (!authUser) return unauthorizedResponse();

    const { id } = await params;
    const { answers } = await req.json();
    
    const quiz = await Quiz.findByPk(id, {
      include: [{ model: QuizQuestion, as: 'questions' }]
    });
    
    if (!quiz) {
      return NextResponse.json({ success: false, message: 'Quiz not found' }, { status: 404 });
    }
    
    let totalPoints = 0;
    let earnedPoints = 0;
    
    if (quiz.questions) {
        for (const question of quiz.questions) {
          totalPoints += question.points || 1;
          if (answers[question.id] === question.correctAnswer) {
            earnedPoints += question.points || 1;
          }
        }
    }
    
    const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    const passed = percentage >= quiz.passingScore;
    
    const attempt = await QuizAttempt.create({
      userId: authUser.id,
      quizId: quiz.id,
      score: earnedPoints,
      percentage,
      answers,
      passed,
      completedAt: new Date()
    });
    
    return NextResponse.json({
      success: true,
      data: {
        attemptId: attempt.id,
        score: earnedPoints,
        totalPoints,
        percentage,
        passed,
        passingScore: quiz.passingScore
      }
    });
  } catch (error: any) {
    console.error('Submit quiz error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
