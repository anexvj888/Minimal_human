import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import { Product } from '@/lib/db/models';
import { productSchema } from '@/lib/validation/schemas';
import { verifyToken } from '@/lib/auth/auth';
import { cookies } from 'next/headers';

// GET all products
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const gender = searchParams.get('gender');
    const sort = searchParams.get('sort') || 'createdAt';
    const search = searchParams.get('search');

    let query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (gender && gender !== 'all') {
      query.gender = gender;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const sortMap = {
      'price-low': { price: 1 },
      'price-high': { price: -1 },
      'newest': { createdAt: -1 },
      'rating': { rating: -1 },
      'a-z': { name: 1 },
    };

    const sortOption = sortMap[sort] || { createdAt: -1 };

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    return NextResponse.json(
      {
        success: true,
        data: products,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST new product (admin only)
export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    await connectDB();

    const body = await request.json();
    const validation = productSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.errors },
        { status: 400 }
      );
    }

    const product = new Product(validation.data);
    await product.save();

    return NextResponse.json(
      {
        success: true,
        data: product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
