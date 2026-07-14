import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import { SiteSettings } from '@/lib/db/models';

const DEFAULT_CATEGORIES = [
  { id: 'men',          name: 'Men',          image: '/mens.webp' },
  { id: 'women',        name: 'Women',        image: '/womens.webp' },
  { id: 'new_arrivals', name: 'New Arrivals', image: '/new arrival.webp' },
];

// GET /api/featured-categories
export async function GET() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne({ key: 'main' }).lean();

    if (settings && settings.featuredCategories?.length > 0) {
      return NextResponse.json({ categories: settings.featuredCategories });
    }

    // Return defaults if nothing saved yet
    return NextResponse.json({ categories: DEFAULT_CATEGORIES });
  } catch (err) {
    console.error('[featured-categories GET]', err);
    return NextResponse.json({ categories: DEFAULT_CATEGORIES });
  }
}

// POST /api/featured-categories
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { categories } = body;

    if (!Array.isArray(categories)) {
      return NextResponse.json({ error: 'categories must be an array' }, { status: 400 });
    }

    // Validate each entry
    const valid = categories.filter((c) => c.id && c.name?.trim() && c.image);
    if (valid.length === 0) {
      return NextResponse.json({ error: 'No valid categories provided' }, { status: 400 });
    }

    const settings = await SiteSettings.findOneAndUpdate(
      { key: 'main' },
      { $set: { featuredCategories: valid } },
      { upsert: true, new: true }
    );

    return NextResponse.json({ categories: settings.featuredCategories });
  } catch (err) {
    console.error('[featured-categories POST]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
