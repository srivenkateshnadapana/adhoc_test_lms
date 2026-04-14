import { NextRequest, NextResponse } from 'next/server';
import { Subscription, User, Course } from '@/lib/models';
import { verifyAuth, unauthorizedResponse } from '@/lib/auth';
import { Op } from 'sequelize';

const PLANS = {
  '1month': { name: '1 Month Access', duration: 30 },
  '3months': { name: '3 Months Access', duration: 90 },
  '6months': { name: '6 Months Access', duration: 180 }
};

export async function GET(req: NextRequest) {
  try {
    const authUser = await verifyAuth(req);
    if (!authUser) return unauthorizedResponse();

    const subscriptions = await Subscription.findAll({
      where: {
        userId: authUser.id,
        status: 'active',
        endDate: { [Op.gt]: new Date() }
      },
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'title', 'description', 'thumbnail']
        }
      ],
      order: [['endDate', 'ASC']]
    });

    const subscriptionsWithDetails = subscriptions.map((sub: any) => ({
      id: sub.id,
      courseId: sub.courseId,
      course: sub.course,
      plan: sub.plan,
      startDate: sub.startDate,
      endDate: sub.endDate,
      amount: sub.amount,
      status: sub.status,
      daysRemaining: Math.ceil((new Date(sub.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    }));

    return NextResponse.json({
      success: true,
      count: subscriptions.length,
      data: subscriptionsWithDetails
    });
  } catch (error: any) {
    console.error('Get my subscriptions error:', error);
    return NextResponse.json({ success: false, message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await verifyAuth(req);
    if (!authUser) return unauthorizedResponse();

    const { courseId, plan } = await req.json();

    const course = await Course.findByPk(courseId);
    if (!course) {
      return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
    }

    if (!PLANS[plan as keyof typeof PLANS]) {
      return NextResponse.json({ success: false, message: 'Invalid plan selected' }, { status: 400 });
    }

    let price;
    switch(plan) {
      case '1month': price = course.price_1month; break;
      case '3months': price = course.price_3months; break;
      case '6months': price = course.price_6months; break;
      default: price = 499;
    }

    const existingSubscription = await Subscription.findOne({
      where: {
        userId: authUser.id,
        courseId: courseId,
        status: 'active',
        endDate: { [Op.gt]: new Date() }
      }
    });

    if (existingSubscription) {
      return NextResponse.json({
        success: false,
        message: 'You already have an active subscription for this course',
      }, { status: 400 });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + PLANS[plan as keyof typeof PLANS].duration);

    const subscription = await Subscription.create({
      userId: authUser.id,
      courseId: courseId,
      plan: plan,
      startDate: startDate,
      endDate: endDate,
      status: 'active',
      amount: price
    });

    return NextResponse.json({
      success: true,
      message: 'Course purchased successfully',
      data: {
        id: subscription.id,
        courseId: subscription.courseId,
        plan: subscription.plan,
        endDate: subscription.endDate,
        amount: subscription.amount
      }
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create subscription error:', error);
    return NextResponse.json({ success: false, message: 'Server error', error: error.message }, { status: 500 });
  }
}
