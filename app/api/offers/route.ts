import { NextRequest, NextResponse } from 'next/server';
import { OFFERS_DATABASE } from '@/lib/services-db';

// GET all offers or active offers only
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const activeOnly = searchParams.get('active') === 'true';

  let offers = Object.values(OFFERS_DATABASE);

  if (activeOnly) {
    const now = new Date();
    offers = offers.filter(o => {
      const expiresAt = new Date(o.expiresAt);
      return o.active && now <= expiresAt;
    });
  }

  return NextResponse.json({
    success: true,
    data: offers,
    count: offers.length,
  });
}

// POST - Create or update offer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, condition, priority, expiresAt, isLimited, limitedQuantity, active } = body;

    if (!name || !description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const offer = {
      id: id || `offer-${Date.now()}`,
      name,
      description,
      condition,
      priority: priority || 'medium',
      expiresAt,
      isLimited: isLimited || false,
      limitedQuantity: isLimited ? parseInt(limitedQuantity) : undefined,
      active: active !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Offer saved successfully',
      data: offer,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
