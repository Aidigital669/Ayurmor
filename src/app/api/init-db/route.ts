import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  try {
    // Connect without selecting a database first
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: parseInt(process.env.DB_PORT || '3306', 10),
    });

    // Create database if not exists
    await connection.query('CREATE DATABASE IF NOT EXISTS ayurmor');
    await connection.query('USE ayurmor');

    // Create products table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        rating_count INT DEFAULT 0,
        tag VARCHAR(50) DEFAULT NULL,
        svg_type VARCHAR(50) NOT NULL
      )
    `;
    await connection.query(createTableQuery);

    // Check if products exist to prevent duplicate seed entries
    const [rows]: any = await connection.query('SELECT COUNT(*) as count FROM products');
    if (rows[0].count === 0) {
      const insertQuery = `
        INSERT INTO products (title, category, price, rating_count, tag, svg_type) VALUES
        ('Moringa Premix Soup Powder', 'Premix Soups', 299.00, 124, 'Best Seller', 'moringa'),
        ('ABC Latte Mix (Malt) Powder', 'Superfood Malts', 299.00, 98, NULL, 'abc'),
        ('Choco Multigrain Millet Malt Mix', 'Superfood Malts', 299.00, 182, NULL, 'choco')
      `;
      await connection.query(insertQuery);
    }

    await connection.end();
    return NextResponse.json({ 
      success: true, 
      message: 'Database "ayurmor" and "products" table initialized successfully!' 
    });
  } catch (error: any) {
    console.error('Database initialization error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      help: 'Make sure your XAMPP MySQL database is running on localhost:3306'
    }, { status: 500 });
  }
}
