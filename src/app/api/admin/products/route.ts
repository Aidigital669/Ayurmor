import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

// POST: Add a new product
export async function POST(req: Request) {
  try {
    const { title, category, price, rating_count, tag, svg_type, image, description, ingredients, usage_instructions, nutrition, benefits } = await req.json();

    if (!title || !category || price === undefined || !svg_type) {
      return NextResponse.json({ success: false, error: 'Missing required product fields.' }, { status: 400 });
    }

    const query = `
      INSERT INTO products (title, category, price, rating_count, tag, svg_type, image, description, ingredients, usage_instructions, nutrition, benefits)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result]: any = await pool.query(query, [
      title,
      category,
      parseFloat(price),
      parseInt(rating_count || 0, 10),
      tag || null,
      svg_type,
      image || '/product1.png',
      description || null,
      ingredients || null,
      usage_instructions || null,
      nutrition || null,
      benefits || null
    ]);

    return NextResponse.json({
      success: true,
      message: 'Product added successfully!',
      productId: result.insertId
    });

  } catch (error: any) {
    console.error('Add Product Error:', error);
    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json({ 
        success: false, 
        error: 'Database connection failed. Please ensure MySQL is running in your XAMPP Control Panel on port 3306.' 
      }, { status: 503 });
    }
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}

// PUT: Edit an existing product
export async function PUT(req: Request) {
  try {
    const { id, title, category, price, rating_count, tag, svg_type, image, description, ingredients, usage_instructions, nutrition, benefits } = await req.json();

    if (!id || !title || !category || price === undefined || !svg_type) {
      return NextResponse.json({ success: false, error: 'Missing product ID or required fields.' }, { status: 400 });
    }

    const query = `
      UPDATE products 
      SET title = ?, category = ?, price = ?, rating_count = ?, tag = ?, svg_type = ?, image = ?, description = ?, ingredients = ?, usage_instructions = ?, nutrition = ?, benefits = ?
      WHERE id = ?
    `;
    const [result]: any = await pool.query(query, [
      title,
      category,
      parseFloat(price),
      parseInt(rating_count || 0, 10),
      tag || null,
      svg_type,
      image || '/product1.png',
      description || null,
      ingredients || null,
      usage_instructions || null,
      nutrition || null,
      benefits || null,
      parseInt(id, 10)
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ success: false, error: 'Product not found.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully!'
    });

  } catch (error: any) {
    console.error('Update Product Error:', error);
    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json({ 
        success: false, 
        error: 'Database connection failed. Please ensure MySQL is running in your XAMPP Control Panel on port 3306.' 
      }, { status: 503 });
    }
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}

// DELETE: Remove a product by ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing product ID parameter.' }, { status: 400 });
    }

    const [result]: any = await pool.query('DELETE FROM products WHERE id = ?', [parseInt(id, 10)]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ success: false, error: 'Product not found.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully!'
    });

  } catch (error: any) {
    console.error('Delete Product Error:', error);
    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json({ 
        success: false, 
        error: 'Database connection failed. Please ensure MySQL is running in your XAMPP Control Panel on port 3306.' 
      }, { status: 503 });
    }
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}
