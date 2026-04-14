import { NextRequest, NextResponse } from 'next/server';
import { Subscription, User, Course } from '@/lib/models';
import { Op } from 'sequelize';
import * as emailService from '@/lib/email-service';

export async function GET(req: NextRequest) {
  // Authorization check for Vercel Cron (Optional but recommended)
  const authHeader = req.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    console.log('🕐 Running expiry tasks...', new Date().toISOString());
    
    const today = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
    const oneDayLater = new Date();
    oneDayLater.setDate(oneDayLater.getDate() + 1);

    // 1. Send reminders
    const expiring7Days = await Subscription.findAll({
      where: { status: 'active', endDate: { [Op.between]: [sevenDaysLater, sevenDaysLater] } },
      include: [{ model: User, as: 'user' }, { model: Course, as: 'course' }]
    });

    const expiring1Day = await Subscription.findAll({
      where: { status: 'active', endDate: { [Op.between]: [oneDayLater, oneDayLater] } },
      include: [{ model: User, as: 'user' }, { model: Course, as: 'course' }]
    });

    for (const sub of expiring7Days) {
      await emailService.send7DayReminder((sub as any).user, (sub as any).course, sub);
    }

    for (const sub of expiring1Day) {
      await emailService.send1DayReminder((sub as any).user, (sub as any).course, sub);
    }

    // 2. Update expired
    const [updatedCount] = await Subscription.update(
      { status: 'expired' },
      { where: { status: 'active', endDate: { [Op.lt]: today } } }
    );

    if (updatedCount > 0) {
      const expiredSubs = await Subscription.findAll({
        where: { status: 'expired', updatedAt: { [Op.gte]: new Date(Date.now() - 3600000) } }, // Last hour
        include: [{ model: User, as: 'user' }, { model: Course, as: 'course' }]
      });

      for (const sub of expiredSubs) {
        await emailService.sendExpiredNotification((sub as any).user, (sub as any).course);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Expiry tasks completed',
      reminders: { sevenDay: expiring7Days.length, oneDay: expiring1Day.length },
      expiredUpdated: updatedCount
    });
  } catch (error: any) {
    console.error('Cron error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
