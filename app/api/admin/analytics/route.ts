import { NextRequest, NextResponse } from 'next/server';
import { User, Subscription, Course } from '@/lib/models';
import { verifyAuth, unauthorizedResponse, forbiddenResponse } from '@/lib/auth';
import { Op } from 'sequelize';

export async function GET(req: NextRequest) {
  try {
    const authUser = await verifyAuth(req);
    if (!authUser) return unauthorizedResponse();
    if (authUser.role !== 'admin') return forbiddenResponse();

    const totalStudents = await User.count({ where: { role: 'student' } });
    const totalCourses = await Course.count();
    
    const activeSubscriptions = await Subscription.count({
      where: {
        status: 'active',
        endDate: { [Op.gt]: new Date() }
      }
    });
    
    const revenueResult = await Subscription.sum('amount', {
      where: {
        status: 'active',
        endDate: { [Op.gt]: new Date() }
      }
    });
    const totalRevenue = revenueResult || 0;
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const monthlyRevenue: any[] = [];
    
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      monthlyRevenue.push({
        month: months[monthIndex],
        revenue: 0
      });
    }
    
    const newUsers = monthlyRevenue.map(m => ({ month: m.month, users: 0 }));
    
    const subscriptions = await Subscription.findAll({
      where: { status: 'active' },
      attributes: ['courseId'],
      include: [{ model: Course, as: 'course', attributes: ['id', 'title'] }],
      limit: 100
    });
    
    const courseCount: Record<number, number> = {};
    for (const sub of subscriptions) {
      const courseId = sub.courseId;
      courseCount[courseId] = (courseCount[courseId] || 0) + 1;
    }
    
    const popularCourses = Object.entries(courseCount)
      .map(([courseId, count]) => ({
        courseId: parseInt(courseId),
        enrollmentCount: count,
        course: subscriptions.find(s => s.courseId === parseInt(courseId))?.course || null
      }))
      .sort((a, b) => b.enrollmentCount - a.enrollmentCount)
      .slice(0, 5);
    
    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalStudents,
          totalCourses,
          activeSubscriptions,
          totalRevenue
        },
        monthlyRevenue,
        newUsers,
        popularCourses,
        completionRate: 0
      }
    });
  } catch (error: any) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
