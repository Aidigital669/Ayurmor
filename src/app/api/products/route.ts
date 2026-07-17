import { NextResponse } from 'next/server';
import pool from '@/lib/db';

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: 'Moringa Premix Soup Powder',
    category: 'Premix Soups',
    price: 299.00,
    rating_count: 124,
    tag: 'Best Seller',
    svg_type: 'moringa',
    image: '/product1.png'
  },
  {
    id: 2,
    title: 'ABC Latte Mix (Malt) Powder',
    category: 'Superfood Malts',
    price: 299.00,
    rating_count: 98,
    tag: null,
    svg_type: 'abc',
    image: '/product3.png'
  },
  {
    id: 3,
    title: 'Choco Multigrain Millet Malt Mix',
    category: 'Superfood Malts',
    price: 299.00,
    rating_count: 182,
    tag: null,
    svg_type: 'choco',
    image: '/product2.png'
  }
];

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    return NextResponse.json({ 
      success: true, 
      products: rows, 
      source: 'database' 
    });
  } catch (error: any) {
    console.warn('MySQL connection failed. Falling back to mock data. Error:', error.message);
    return NextResponse.json({ 
      success: true, 
      products: MOCK_PRODUCTS, 
      source: 'mock',
      warning: 'MySQL connection failed. Using fallback mock products. Run /api/init-db to provision MySQL database.'
    });
  }
}
