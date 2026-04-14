import { NextRequest, NextResponse } from 'next/server';
import { Certificate, User, Course } from '@/lib/models';
import PDFDocument from 'pdfkit';
import { Readable } from 'stream';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const certificate = await Certificate.findByPk(id, {
      include: [
        { model: User, as: 'user' },
        { model: Course, as: 'course' }
      ]
    });
    
    if (!certificate) {
      return NextResponse.json({ success: false, message: 'Certificate not found' }, { status: 404 });
    }
    
    // Create PDF
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 50 });
    
    // Design certificate
    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
       .strokeColor('#4CAF50').lineWidth(5).stroke();
    
    doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60)
       .strokeColor('#FF9800').lineWidth(2).stroke();
    
    doc.fontSize(48).font('Helvetica-Bold').fillColor('#4CAF50')
       .text('CERTIFICATE OF COMPLETION', 0, 80, { align: 'center' });
    
    doc.fontSize(20).font('Helvetica').fillColor('#666')
       .text('This certificate is proudly presented to', 0, 180, { align: 'center' });
    
    doc.fontSize(42).font('Helvetica-Bold').fillColor('#2196F3')
       .text((certificate as any).user.name, 0, 250, { align: 'center' });
    
    doc.fontSize(18).font('Helvetica').fillColor('#666')
       .text('for successfully completing the course', 0, 330, { align: 'center' });
    
    doc.fontSize(28).font('Helvetica-Bold').fillColor('#FF9800')
       .text((certificate as any).course.title, 0, 380, { align: 'center' });
    
    doc.fontSize(14).font('Helvetica').fillColor('#666')
       .text(`with a score of ${certificate.quizScore}%`, 0, 450, { align: 'center' });
    
    doc.fontSize(12).text(`Issue Date: ${new Date(certificate.issueDate).toLocaleDateString()}`, 50, doc.page.height - 80);
    doc.fontSize(10).text(`Certificate No: ${certificate.certificateNumber}`, 50, doc.page.height - 60);
    doc.fontSize(10).text(`Verification Code: ${certificate.verificationCode}`, 50, doc.page.height - 40);
    
    // Finalize the PDF and return it as a stream
    const chunks: Uint8Array[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    
    return new Promise<NextResponse>((resolve) => {
      doc.on('end', () => {
        const result = Buffer.concat(chunks);
        resolve(new NextResponse(result, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=certificate_${certificate.certificateNumber}.pdf`,
          },
        }));
      });
      doc.end();
    });

  } catch (error: any) {
    console.error('Download certificate error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
