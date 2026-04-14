import { NextRequest, NextResponse } from 'next/server';
import { Course } from '@/lib/models';
import { verifyAuth, unauthorizedResponse, forbiddenResponse } from '@/lib/auth';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await verifyAuth(req);
    if (!authUser) return unauthorizedResponse();
    if (authUser.role !== 'admin') return forbiddenResponse();

    const { id } = await params;
    const course = await Course.findByPk(id);
    
    if (!course) {
      return NextResponse.json(
        { success: false, message: 'Course not found' },
        { status: 404 }
      );
    }
    
    const { title, description, thumbnail, price_1month, price_3months, price_6months } = await req.json();
    
    await course.update({
      title: title || course.title,
      description: description !== undefined ? description : course.description,
      thumbnail: thumbnail !== undefined ? thumbnail : course.thumbnail,
      price_1month: price_1month !== undefined ? price_1month : course.price_1month,
      price_3months: price_3months !== undefined ? price_3months : course.price_3months,
      price_6months: price_6months !== undefined ? price_6months : course.price_6months
    });
    
    return NextResponse.json({
      success: true,
      message: 'Course updated successfully',
      data: {
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail,
        prices: {
          '1month': course.price_1month,
          '3months': course.price_3months,
          '6months': course.price_6months
        }
      }
    });
  } catch (error: any) {
    console.error('Update course error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await verifyAuth(req);
    if (!authUser) return unauthorizedResponse();
    if (authUser.role !== 'admin') return forbiddenResponse();

    const { id } = await params;
    const course = await Course.findByPk(id);
    
    if (!course) {
      return NextResponse.json(
        { success: false, message: 'Course not found' },
        { status: 404 }
      );
    }
    
    await course.destroy();
    
    return NextResponse.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete course error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}
