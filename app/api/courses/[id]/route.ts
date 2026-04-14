import { NextRequest, NextResponse } from 'next/server';
import { Course, Module, Lesson, Quiz, Subscription } from '@/lib/models';
import { verifyAuth } from '@/lib/auth';
import { Op } from 'sequelize';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const course = await Course.findByPk(id, {
      include: [
        {
          model: Module,
          as: 'modules',
          include: [
            {
              model: Lesson,
              as: 'lessons',
            }
          ],
        },
        {
          model: Quiz,
          as: 'quizzes'
        }
      ]
    });

    if (!course) {
      return NextResponse.json(
        { success: false, message: 'Course not found' },
        { status: 404 }
      );
    }

    // Sort modules and lessons
    if (course.modules) {
      course.modules.sort((a: any, b: any) => a.order - b.order);
      course.modules.forEach((mod: any) => {
        if (mod.lessons) {
          mod.lessons.sort((a: any, b: any) => a.order - b.order);
        }
      });
    }

    const authUser = await verifyAuth(req);
    let hasAccess = false;
    let accessInfo = null;

    if (authUser) {
      const subscription = await Subscription.findOne({
        where: {
          userId: authUser.id,
          courseId: course.id,
          status: 'active',
          endDate: { [Op.gt]: new Date() }
        }
      });

      hasAccess = !!subscription;
      if (hasAccess) {
        accessInfo = {
          plan: subscription.plan,
          expiresAt: subscription.endDate,
          daysRemaining: Math.ceil((new Date(subscription.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
          purchasedAt: subscription.createdAt,
          amount: subscription.amount
        };
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail,
        prices: {
          '1month': course.price_1month,
          '3months': course.price_3months,
          '6months': course.price_6months
        },
        modules: course.modules || [],
        quizzes: course.quizzes || [],
        userAccess: {
          hasAccess,
          ...accessInfo
        }
      }
    });
  } catch (error: any) {
    console.error('Get course by ID error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}
