import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

// POST: Add a new hero slide
export async function POST(req: Request) {
  try {
    const { category, title, subtitle, tagline, badge, bg_color, image, elements } = await req.json();

    if (!category || !title || !subtitle || !tagline) {
      return NextResponse.json({ success: false, error: 'Missing required slide text fields.' }, { status: 400 });
    }

    const query = `
      INSERT INTO hero_slides (category, title, subtitle, tagline, badge, bg_color, image, elements)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result]: any = await pool.query(query, [
      category,
      title,
      subtitle,
      tagline,
      badge || null,
      bg_color || 'from-[#FFEBE5] via-[#FFCFC0] to-[#E7977D]',
      image || '/product3.png',
      elements ? JSON.stringify(elements) : '[]'
    ]);

    return NextResponse.json({
      success: true,
      message: 'Slide added successfully!',
      slideId: result.insertId
    });

  } catch (error: any) {
    console.error('Add Slide Error:', error);
    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json({ 
        success: false, 
        error: 'Database connection failed. Please ensure MySQL is running in your XAMPP Control Panel on port 3306.' 
      }, { status: 503 });
    }
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}

// PUT: Edit an existing hero slide
export async function PUT(req: Request) {
  try {
    const { id, category, title, subtitle, tagline, badge, bg_color, image, elements } = await req.json();

    if (!id || !category || !title || !subtitle || !tagline) {
      return NextResponse.json({ success: false, error: 'Missing slide ID or required fields.' }, { status: 400 });
    }

    const query = `
      UPDATE hero_slides 
      SET category = ?, title = ?, subtitle = ?, tagline = ?, badge = ?, bg_color = ?, image = ?, elements = ?
      WHERE id = ?
    `;
    const [result]: any = await pool.query(query, [
      category,
      title,
      subtitle,
      tagline,
      badge || null,
      bg_color || 'from-[#FFEBE5] via-[#FFCFC0] to-[#E7977D]',
      image || '/product3.png',
      elements ? (typeof elements === 'string' ? elements : JSON.stringify(elements)) : '[]',
      parseInt(id, 10)
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ success: false, error: 'Slide not found.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Slide updated successfully!'
    });

  } catch (error: any) {
    console.error('Update Slide Error:', error);
    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json({ 
        success: false, 
        error: 'Database connection failed. Please ensure MySQL is running in your XAMPP Control Panel on port 3306.' 
      }, { status: 503 });
    }
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}

// DELETE: Remove a slide by ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing slide ID parameter.' }, { status: 400 });
    }

    const [result]: any = await pool.query('DELETE FROM hero_slides WHERE id = ?', [parseInt(id, 10)]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ success: false, error: 'Slide not found.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Slide deleted successfully!'
    });

  } catch (error: any) {
    console.error('Delete Slide Error:', error);
    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json({ 
        success: false, 
        error: 'Database connection failed. Please ensure MySQL is running in your XAMPP Control Panel on port 3306.' 
      }, { status: 503 });
    }
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}
