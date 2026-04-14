import { NextRequest, NextResponse } from 'next/server';
import { Course } from '@/lib/models';
import { verifyAuth, unauthorizedResponse, forbiddenResponse } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const authUser = await verifyAuth(req);
    if (!authUser) return unauthorizedResponse();
    if (authUser.role !== 'admin') return forbiddenResponse();

    const { title, description, thumbnail, price_1month, price_3months, price_6months } = await req.json();

    if (!title) {
      return NextResponse.json(
        { success: false, message: 'Course title is required' },
        { status: 400 }
      );
    }

    const course = await Course.create({
      title,
      description: description || null,
      thumbnail: thumbnail || null,
      price_1month: price_1month || 499,
      price_3months: price_3months || 1299,
      price_6months: price_6months || 2499
    });

    return NextResponse.json({
      success: true,
      message: 'Course created successfully',
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
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create course error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
    // Admin list courses - similar to public but maybe with more info
    try {
        const authUser = await verifyAuth(req);
        if (!authUser) return unauthorizedResponse();
        if (authUser.role !== 'admin') return forbiddenResponse();

        const courses = await Course.findAll({
            order: [['createdAt', 'DESC']]
        });

        return NextResponse.json({
            success: true,
            data: courses
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
