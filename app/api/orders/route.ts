import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { user_id, items, total_amount, payment_method } = await request.json()

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        user_id,
        total_amount,
        status: 'pending',
        payment_method: payment_method || 'card'
      }])
      .select()
      .single()

    if (orderError) throw orderError

    // Create order items
    if (items && items.length > 0) {
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(items.map((item: any) => ({
          order_id: order.id,
          service_id: item.service_id,
          quantity: item.quantity,
          unit_price: item.unit_price
        })))

      if (itemsError) throw itemsError
    }

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create order' },
      { status: 400 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          service:services(name, price)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ success: true, orders })
  } catch (error) {
    console.error('Fetch orders error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch orders' },
      { status: 400 }
    )
  }
}
