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
    const totalAdmins = await User.count({ where: { role: 'admin' } });
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
    
    return NextResponse.json({
      success: true,
      data: {
        users: {
          total: totalStudents + totalAdmins,
          students: totalStudents,
          admins: totalAdmins
        },
        subscriptions: {
          active: activeSubscriptions
        },
        content: {
          courses: totalCourses
        },
        revenue: {
          total: totalRevenue,
          currency: 'INR'
        }
      }
    });
  } catch (error: any) {
    console.error('Get stats error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}
