import { NextRequest, NextResponse } from 'next/server';
import { Course, Subscription } from '@/lib/models';
import { verifyAuth } from '@/lib/auth';
import { Op } from 'sequelize';

export async function GET(req: NextRequest) {
  try {
    const courses = await Course.findAll({
      attributes: ['id', 'title', 'description', 'thumbnail', 'price_1month', 'price_3months', 'price_6months'],
      order: [['createdAt', 'DESC']]
    });

    const authUser = await verifyAuth(req);
    let userAccess: Record<number, any> = {};

    if (authUser) {
      const subscriptions = await Subscription.findAll({
        where: {
          userId: authUser.id,
          status: 'active',
          endDate: { [Op.gt]: new Date() }
        }
      });
      
      userAccess = subscriptions.reduce((acc: any, sub: any) => {
        acc[sub.courseId] = {
          hasAccess: true,
          expiresAt: sub.endDate,
          plan: sub.plan
        };
        return acc;
      }, {});
    }

    const coursesWithAccess = courses.map(course => ({
      ...course.toJSON(),
      userAccess: userAccess[course.id] || { hasAccess: false }
    }));

    return NextResponse.json({
      success: true,
      count: coursesWithAccess.length,
      data: coursesWithAccess
    });
  } catch (error: any) {
    console.error('Get all courses error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}
