import { NextRequest, NextResponse } from 'next/server';
import { User, Course, Subscription } from '@/lib/models';
import * as emailService from '@/lib/email-service';
import { verifyAuth, unauthorizedResponse, forbiddenResponse } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const authUser = await verifyAuth(req);
    if (!authUser) return unauthorizedResponse();
    if (authUser.role !== 'admin') return forbiddenResponse();

    const { email, type, subscriptionId } = await req.json();
    
    let user, course, subscription;
    
    if (subscriptionId) {
      subscription = await Subscription.findByPk(subscriptionId, {
        include: [
          { model: User, as: 'user' },
          { model: Course, as: 'course' }
        ]
      });
      
      if (!subscription) {
        return NextResponse.json({ success: false, message: 'Subscription not found' }, { status: 404 });
      }
      
      user = (subscription as any).user;
      course = (subscription as any).course;
    } else if (email) {
      user = await User.findOne({ where: { email } });
      if (!user) {
        return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
      }
      
      subscription = await Subscription.findOne({
        where: { userId: user.id, status: 'active' },
        include: [{ model: Course, as: 'course' }]
      });
      
      if (subscription) {
        course = (subscription as any).course;
      }
    }
    
    if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    
    let result;
    switch(type) {
      case 'welcome':
        result = await emailService.sendWelcomeEmail(user, course, subscription);
        break;
      case '7days':
        result = await emailService.send7DayReminder(user, course, subscription);
        break;
      case '1day':
        result = await emailService.send1DayReminder(user, course, subscription);
        break;
      case 'expired':
        result = await emailService.sendExpiredNotification(user, course);
        break;
      case 'renewal':
        result = await emailService.sendRenewalConfirmation(user, course, subscription);
        break;
      default:
        return NextResponse.json({ success: false, message: 'Invalid email type' }, { status: 400 });
    }
    
    return NextResponse.json({ success: true, message: `Test ${type} email sent`, result });
  } catch (error: any) {
    console.error('Test email error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send test email', error: error.message }, { status: 500 });
  }
}
