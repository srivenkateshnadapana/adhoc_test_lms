import { NextRequest, NextResponse } from 'next/server';
import { Certificate, User, Course } from '@/lib/models';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    
    const certificate = await Certificate.findOne({
      where: { verificationCode: code },
      include: [
        { model: User, as: 'user', attributes: ['id', 'name'] },
        { model: Course, as: 'course', attributes: ['id', 'title'] }
      ]
    });
    
    if (!certificate) {
      return NextResponse.json({ valid: false, message: 'Certificate not found' });
    }
    
    return NextResponse.json({
      valid: true,
      data: {
        studentName: (certificate as any).user.name,
        courseTitle: (certificate as any).course.title,
        issueDate: certificate.issueDate,
        certificateNumber: certificate.certificateNumber,
        score: certificate.quizScore
      }
    });
  } catch (error: any) {
    console.error('Verify certificate error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
