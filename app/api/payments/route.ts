import { NextRequest, NextResponse } from 'next/server';
import { Subscription, Course } from '@/lib/models';
import { verifyAuth, unauthorizedResponse } from '@/lib/auth';
import { Op } from 'sequelize';

const PLANS = {
    '1month': { name: '1 Month Access', duration: 30 },
    '3months': { name: '3 Months Access', duration: 90 },
    '6months': { name: '6 Months Access', duration: 180 }
};

const getPlanPrice = (course: any, plan: string) => {
    switch (plan) {
        case '1month': return course.price_1month;
        case '3months': return course.price_3months;
        case '6months': return course.price_6months;
        default: return 499;
    }
};

export async function POST(req: NextRequest) {
    try {
        const authUser = await verifyAuth(req);
        if (!authUser) return unauthorizedResponse();

        const body = await req.json();
        const { action } = body; // action can be 'create-order' or 'verify'

        if (action === 'create-order') {
            const { courseId, plan } = body;
            const course = await Course.findByPk(courseId);
            if (!course) return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });

            const amount = getPlanPrice(course, plan);
            const mockOrderId = `mock_order_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;

            return NextResponse.json({
                success: true,
                mockMode: true,
                data: {
                    orderId: mockOrderId,
                    amount: amount,
                    currency: 'INR',
                    course: { id: course.id, title: course.title },
                }
            });
        }

        if (action === 'verify') {
            const { orderId, paymentId, courseId, plan, amount } = body;
            
            const course = await Course.findByPk(courseId);
            if (!course) return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });

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
                amount: amount || getPlanPrice(course, plan),
                paymentId: `mock_${paymentId}`,
                orderId: orderId
            });

            return NextResponse.json({
                success: true,
                message: 'Payment successful! (Mock Mode).',
                data: { subscriptionId: subscription.id, expiresAt: endDate }
            });
        }

        return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
    } catch (error: any) {
        console.error('Payment error:', error);
        return NextResponse.json({ success: false, message: 'Payment process failed', error: error.message }, { status: 500 });
    }
}
