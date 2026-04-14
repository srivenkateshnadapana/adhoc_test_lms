import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_EMAIL = process.env.EMAIL_FROM || 'onboarding@resend.dev';

export const sendEmail = async (to: string, subject: string, html: string) => {
  if (!resend) {
    console.log('='.repeat(50));
    console.log('📧 [MOCK] Email would be sent to:', to);
    console.log('   Subject:', subject);
    console.log('   Content Preview:', html?.substring(0, 200) + '...');
    console.log('='.repeat(50));
    return { success: true, mock: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('❌ Send email error:', err);
    return { success: false, error: err };
  }
};

export const sendWelcomeEmail = async (user: any, course: any, subscription: any) => {
  const subject = `Welcome to ${course.title}! 🎉`;
  const html = `<h2>Hi ${user.name},</h2><p>Thank you for purchasing <b>${course.title}</b>!</p><p>Your access is valid until ${new Date(subscription.endDate).toLocaleDateString()}.</p>`;
  return await sendEmail(user.email, subject, html);
};

export const send7DayReminder = async (user: any, course: any, subscription: any) => {
  const subject = `⚠️ Your access to ${course.title} expires in 7 days`;
  const html = `<h2>Hi ${user.name},</h2><p>Your access to <b>${course.title}</b> expires in 7 days!</p>`;
  return await sendEmail(user.email, subject, html);
};

export const send1DayReminder = async (user: any, course: any, subscription: any) => {
  const subject = `🚨 URGENT: Your ${course.title} access expires TOMORROW!`;
  const html = `<h2>Hi ${user.name},</h2><p>Your access to <b>${course.title}</b> expires TOMORROW!</p>`;
  return await sendEmail(user.email, subject, html);
};

export const sendExpiredNotification = async (user: any, course: any) => {
  const subject = `Your ${course.title} access has expired`;
  const html = `<h2>Hi ${user.name},</h2><p>Your access to <b>${course.title}</b> has expired. Renewal is available on your dashboard.</p>`;
  return await sendEmail(user.email, subject, html);
};

export const sendRenewalConfirmation = async (user: any, course: any, subscription: any) => {
  const subject = `✅ ${course.title} renewed successfully!`;
  const html = `<h2>Hi ${user.name},</h2><p>Your <b>${course.title}</b> access has been successfully renewed!</p>`;
  return await sendEmail(user.email, subject, html);
};
