import { NextRequest, NextResponse } from 'next/server';
import { Course, Subscription } from '@/lib/models';
import { verifyAuth, unauthorizedResponse } from '@/lib/auth';
import { Op } from 'sequelize';

export async function GET(req: NextRequest) {
  try {
    const authUser = await verifyAuth(req);
    if (!authUser) return unauthorizedResponse();

    const subscriptions = await Subscription.findAll({
      where: {
        userId: authUser.id,
        status: 'active',
        endDate: { [Op.gt]: new Date() }
      }
    });

    if (subscriptions.length === 0) {
      return NextResponse.json({
        success: true,
        count: 0,
        data: []
      });
    }

    const courses = [];
    for (const sub of subscriptions) {
      const course = await Course.findByPk(sub.courseId);
      if (course) {
        courses.push({
          id: course.id,
          title: course.title,
          description: course.description,
          thumbnail: course.thumbnail,
          subscription: {
            id: sub.id,
            plan: sub.plan,
            expiresAt: sub.endDate,
            daysRemaining: Math.ceil((new Date(sub.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
            purchasedAt: sub.createdAt,
            amount: sub.amount
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error: any) {
    console.error('Get my courses error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}
