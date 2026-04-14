import { NextRequest, NextResponse } from 'next/server';
import { Certificate, User, Course } from '@/lib/models';
import { verifyAuth, unauthorizedResponse } from '@/lib/auth';

const generateCertificateNumber = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `LMS-${timestamp}-${random}`;
};

const generateVerificationCode = () => {
  return Math.random().toString(36).substring(2, 15).toUpperCase();
};

export async function GET(req: NextRequest) {
  try {
    const authUser = await verifyAuth(req);
    if (!authUser) return unauthorizedResponse();
    
    const certificates = await Certificate.findAll({
      where: { userId: authUser.id },
      include: [{ model: Course, as: 'course', attributes: ['id', 'title', 'thumbnail'] }],
      order: [['issueDate', 'DESC']]
    });
    
    return NextResponse.json({ success: true, data: certificates });
  } catch (error: any) {
    console.error('Get certificates error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await verifyAuth(req);
    if (!authUser) return unauthorizedResponse();

    const { courseId, quizScore } = await req.json();
    
    if (quizScore < 70) {
      return NextResponse.json({
        success: false,
        message: 'You need at least 70% score to get certificate'
      }, { status: 400 });
    }
    
    const existing = await Certificate.findOne({ where: { userId: authUser.id, courseId } });
    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'Certificate already exists',
        data: existing
      });
    }
    
    const certificate = await Certificate.create({
      userId: authUser.id,
      courseId,
      certificateNumber: generateCertificateNumber(),
      verificationCode: generateVerificationCode(),
      quizScore,
      issueDate: new Date(),
      isVerified: true
    });
    
    return NextResponse.json({
      success: true,
      message: 'Certificate generated successfully',
      data: {
        id: certificate.id,
        certificateNumber: certificate.certificateNumber,
        verificationCode: certificate.verificationCode,
        downloadUrl: `/api/certificates/${certificate.id}/download`,
        verifyUrl: `/api/certificates/verify/${certificate.verificationCode}`
      }
    });
  } catch (error: any) {
    console.error('Generate certificate error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
