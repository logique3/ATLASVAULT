import { NextRequest, NextResponse } from 'next/server';
import { PROMOS_DATABASE } from '@/lib/services-db';

// GET all promos or active promos only
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const activeOnly = searchParams.get('active') === 'true';

  let promos = Object.values(PROMOS_DATABASE);

  if (activeOnly) {
    const now = new Date();
    promos = promos.filter(p => {
      const startDate = new Date(p.startDate);
      const endDate = new Date(p.endDate);
      return p.active && now >= startDate && now <= endDate;
    });
  }

  return NextResponse.json({
    success: true,
    data: promos,
    count: promos.length,
  });
}

// POST - Create or update promo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, discount, type, startDate, endDate, applicableTo, targetId, active } = body;

    if (!title || !discount || !startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const promo = {
      id: id || `promo-${Date.now()}`,
      title,
      discount: parseFloat(discount),
      type: type || 'percentage',
      startDate,
      endDate,
      applicableTo: applicableTo || 'all',
      targetId,
      active: active !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Promotion saved successfully',
      data: promo,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
