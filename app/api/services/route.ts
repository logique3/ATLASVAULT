import { NextRequest, NextResponse } from 'next/server';
import { SERVICES_DATABASE } from '@/lib/services-db';

// GET all services or filter by category
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const active = searchParams.get('active') === 'true';

  let services = Object.values(SERVICES_DATABASE);

  if (category) {
    services = services.filter(s => s.category === category);
  }

  if (active) {
    services = services.filter(s => s.active);
  }

  return NextResponse.json({
    success: true,
    data: services,
    count: services.length,
  });
}

// POST - Create or update service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, slug, name, category, price, description, active } = body;

    if (!name || !slug || !price) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In a real app, this would update a database
    // For now, we're just validating the data
    const service = {
      id: id || Date.now().toString(),
      slug,
      name,
      category,
      price: parseFloat(price),
      description,
      active: active !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Service saved successfully',
      data: service,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
