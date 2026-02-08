import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { order_id, amount, method, transaction_id } = await request.json()

    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert([{
        order_id,
        amount,
        method,
        transaction_id,
        status: 'completed'
      }])
      .select()
      .single()

    if (paymentError) throw paymentError

    // Update order status to processing
    const { error: updateError } = await supabase
      .from('orders')
      .update({ status: 'processing' })
      .eq('id', order_id)

    if (updateError) throw updateError

    return NextResponse.json({ success: true, payment })
  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process payment' },
      { status: 400 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const orderId = request.nextUrl.searchParams.get('orderId')

    if (!orderId) {
      return NextResponse.json(
        { error: 'orderId is required' },
        { status: 400 }
      )
    }

    const { data: payments, error } = await supabase
      .from('payments')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ success: true, payments })
  } catch (error) {
    console.error('Fetch payments error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch payments' },
      { status: 400 }
    )
  }
}
