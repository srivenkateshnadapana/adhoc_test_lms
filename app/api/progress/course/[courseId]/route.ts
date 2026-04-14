import { NextRequest, NextResponse } from 'next/server';
import { Progress, Lesson, Module } from '@/lib/models';
import { verifyAuth, unauthorizedResponse } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const authUser = await verifyAuth(req);
    if (!authUser) return unauthorizedResponse();

    const { courseId } = await params;

    const lessons = await Lesson.findAll({
      include: [
        {
          model: Module,
          as: 'module',
          where: { courseId },
          attributes: ['id', 'title', 'order']
        }
      ],
      attributes: ['id', 'title', 'order', 'duration']
    });

    const progress = await Progress.findAll({
      where: { userId: authUser.id },
      attributes: ['lessonId', 'completed', 'completedAt']
    });

    const progressMap: Record<number, any> = {};
    progress.forEach(p => {
      progressMap[p.lessonId] = {
        completed: p.completed,
        completedAt: p.completedAt
      };
    });

    const totalLessons = lessons.length;
    const completedLessons = lessons.filter(lesson => 
      progressMap[lesson.id]?.completed === true
    ).length;

    const percentage = totalLessons > 0 
      ? Math.round((completedLessons / totalLessons) * 100) 
      : 0;

    const lessonsWithProgress = lessons.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      order: lesson.order,
      duration: lesson.duration,
      moduleId: (lesson as any).module.id,
      moduleTitle: (lesson as any).module.title,
      completed: progressMap[lesson.id]?.completed || false,
      completedAt: progressMap[lesson.id]?.completedAt || null
    }));

    return NextResponse.json({
      success: true,
      data: {
        courseId: parseInt(courseId),
        totalLessons,
        completedLessons,
        percentage,
        lessons: lessonsWithProgress
      }
    });
  } catch (error: any) {
    console.error('Get course progress error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}
