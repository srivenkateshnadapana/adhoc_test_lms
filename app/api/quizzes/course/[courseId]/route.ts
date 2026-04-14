import { NextRequest, NextResponse } from 'next/server';
import { Quiz, QuizQuestion } from '@/lib/models';
import { verifyAuth, unauthorizedResponse } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const authUser = await verifyAuth(req);
    if (!authUser) return unauthorizedResponse();

    const { courseId } = await params;
    const quizzes = await Quiz.findAll({
      where: { courseId },
      include: [{ model: QuizQuestion, as: 'questions' }]
    });

    return NextResponse.json({ success: true, data: quizzes });
  } catch (error: any) {
    console.error('Get course quizzes error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
