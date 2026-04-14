import { NextRequest, NextResponse } from 'next/server';
import { Course, Module, Lesson, Progress } from '@/lib/models';
import { verifyAuth, unauthorizedResponse } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const authUser = await verifyAuth(req);
    if (!authUser) return unauthorizedResponse();

    const courses = await Course.findAll({
      include: [
        {
          model: Module,
          as: 'modules',
          include: [
            {
              model: Lesson,
              as: 'lessons'
            }
          ]
        }
      ]
    });

    const progress = await Progress.findAll({
      where: { userId: authUser.id }
    });

    const progressMap: Record<number, boolean> = {};
    progress.forEach(p => {
      progressMap[p.lessonId] = p.completed;
    });

    const coursesWithProgress = courses.map(course => {
      let totalLessons = 0;
      let completedLessons = 0;

      if (course.modules) {
        course.modules.forEach((module: any) => {
          if (module.lessons) {
            module.lessons.forEach((lesson: any) => {
              totalLessons++;
              if (progressMap[lesson.id]) {
                completedLessons++;
              }
            });
          }
        });
      }

      const percentage = totalLessons > 0 
        ? Math.round((completedLessons / totalLessons) * 100) 
        : 0;

      return {
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail,
        totalLessons,
        completedLessons,
        progress: percentage
      };
    });

    return NextResponse.json({
      success: true,
      data: coursesWithProgress
    });
  } catch (error: any) {
    console.error('Get overall progress error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}
