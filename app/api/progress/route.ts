import { NextRequest, NextResponse } from 'next/server';
import { Progress, Lesson } from '@/lib/models';
import { verifyAuth, unauthorizedResponse } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const authUser = await verifyAuth(req);
    if (!authUser) return unauthorizedResponse();

    const { lessonId, completed = true } = await req.json();

    if (!lessonId) {
      return NextResponse.json(
        { success: false, message: 'Lesson calculation error' },
        { status: 400 }
      );
    }

    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) {
      return NextResponse.json({ success: false, message: 'Lesson not found' }, { status: 404 });
    }

    const [progress, created] = await Progress.findOrCreate({
      where: { userId: authUser.id, lessonId },
      defaults: { completed: completed, completedAt: completed ? new Date() : null }
    });

    if (!created) {
      await progress.update({
        completed: completed,
        completedAt: completed ? new Date() : null
      });
    }

    return NextResponse.json({
      success: true,
      message: completed ? 'Lesson marked as complete' : 'Lesson marked as incomplete',
      data: progress
    });
  } catch (error: any) {
    console.error('Progress update error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}
