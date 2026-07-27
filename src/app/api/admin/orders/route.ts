import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET: Fetch all orders
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM orders ORDER BY id DESC');
    return NextResponse.json({
      success: true,
      orders: rows
    });
  } catch (error: any) {
    console.error('Fetch Orders Error:', error);
    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json({ 
        success: false, 
        error: 'Database connection failed. Please ensure MySQL is running in your XAMPP Control Panel on port 3306.' 
      }, { status: 503 });
    }
    // If the table doesn't exist yet, return empty list rather than crashing
    return NextResponse.json({
      success: true,
      orders: [],
      warning: 'Database table orders might not be initialized yet.'
    });
  }
}

// PUT: Update shipment details for an order
export async function PUT(req: Request) {
  try {
    const { id, shipping_status, courier_partner, tracking_number } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing order ID.' }, { status: 400 });
    }

    const query = `
      UPDATE orders 
      SET shipping_status = ?, courier_partner = ?, tracking_number = ?
      WHERE id = ?
    `;
    const [result]: any = await pool.query(query, [
      shipping_status || 'processing',
      courier_partner || null,
      tracking_number || null,
      parseInt(id, 10)
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ success: false, error: 'Order not found.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Order shipment details updated successfully!'
    });

  } catch (error: any) {
    console.error('Update Order Error:', error);
    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json({ 
        success: false, 
        error: 'Database connection failed. Please ensure MySQL is running in your XAMPP Control Panel on port 3306.' 
      }, { status: 503 });
    }
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}
