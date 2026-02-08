import { NextRequest, NextResponse } from 'next/server';
import { CATEGORIES_DATABASE } from '@/lib/services-db';

// GET all categories
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const active = searchParams.get('active') === 'true';

  let categories = Object.values(CATEGORIES_DATABASE);

  if (active) {
    categories = categories.filter(c => c.active);
  }

  return NextResponse.json({
    success: true,
    data: categories,
    count: categories.length,
  });
}

// POST - Create or update category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, icon, color, active } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    const category = {
      id: id || name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description,
      icon: icon || '📦',
      color: color || 'from-[#0066CC] to-[#4A90E2]',
      productCount: 0,
      active: active !== false,
    };

    return NextResponse.json({
      success: true,
      message: 'Category saved successfully',
      data: category,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
