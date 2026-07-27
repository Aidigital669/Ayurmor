import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

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
        svg_type VARCHAR(50) NOT NULL,
        image LONGTEXT DEFAULT NULL,
        description TEXT DEFAULT NULL,
        ingredients TEXT DEFAULT NULL,
        usage_instructions TEXT DEFAULT NULL,
        nutrition TEXT DEFAULT NULL,
        benefits TEXT DEFAULT NULL
      )
    `;
    await connection.query(createTableQuery);

    // Alter products table if it already exists to ensure all columns are upgraded
    const alterColumns = [
      'ALTER TABLE products MODIFY COLUMN image LONGTEXT DEFAULT NULL',
      'ALTER TABLE products ADD COLUMN description TEXT DEFAULT NULL',
      'ALTER TABLE products ADD COLUMN ingredients TEXT DEFAULT NULL',
      'ALTER TABLE products ADD COLUMN usage_instructions TEXT DEFAULT NULL',
      'ALTER TABLE products ADD COLUMN nutrition TEXT DEFAULT NULL',
      'ALTER TABLE products ADD COLUMN benefits TEXT DEFAULT NULL'
    ];
    for (const alterQuery of alterColumns) {
      try {
        await connection.query(alterQuery);
      } catch (err) {
        // Suppress if column already exists
      }
    }

    // Create orders table
    const createOrdersTableQuery = `
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(50) NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50) NOT NULL,
        shipping_address TEXT NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        payment_status VARCHAR(50) DEFAULT 'pending',
        payment_id VARCHAR(100) DEFAULT NULL,
        order_date VARCHAR(50) DEFAULT NULL,
        shipping_status VARCHAR(50) DEFAULT 'processing',
        courier_partner VARCHAR(100) DEFAULT NULL,
        tracking_number VARCHAR(100) DEFAULT NULL,
        items_json TEXT DEFAULT NULL,
        bigship_order_id VARCHAR(100) DEFAULT NULL,
        bigship_status VARCHAR(50) DEFAULT NULL,
        bigship_label_url TEXT DEFAULT NULL,
        bigship_invoice_url TEXT DEFAULT NULL,
        bigship_manifest_url TEXT DEFAULT NULL
      )
    `;
    await connection.query(createOrdersTableQuery);

    // Alter orders table if it already exists to ensure all columns are upgraded
    const alterOrderColumns = [
      'ALTER TABLE orders ADD COLUMN bigship_order_id VARCHAR(100) DEFAULT NULL',
      'ALTER TABLE orders ADD COLUMN bigship_status VARCHAR(50) DEFAULT NULL',
      'ALTER TABLE orders ADD COLUMN bigship_label_url TEXT DEFAULT NULL',
      'ALTER TABLE orders ADD COLUMN bigship_invoice_url TEXT DEFAULT NULL',
      'ALTER TABLE orders ADD COLUMN bigship_manifest_url TEXT DEFAULT NULL'
    ];
    for (const alterQuery of alterOrderColumns) {
      try {
        await connection.query(alterQuery);
      } catch (err) {
        // Suppress if column already exists
      }
    }

    // Create contacts table
    const createContactsTableQuery = `
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        mobile VARCHAR(50) NOT NULL,
        message TEXT DEFAULT NULL,
        type VARCHAR(50) DEFAULT 'contact',
        enquiry_type VARCHAR(100) DEFAULT NULL,
        status VARCHAR(50) DEFAULT 'new',
        created_at VARCHAR(100) DEFAULT NULL
      )
    `;
    await connection.query(createContactsTableQuery);

    const alterContactsColumns = [
      "ALTER TABLE contacts ADD COLUMN type VARCHAR(50) DEFAULT 'contact'",
      'ALTER TABLE contacts ADD COLUMN enquiry_type VARCHAR(100) DEFAULT NULL'
    ];
    for (const alterQuery of alterContactsColumns) {
      try {
        await connection.query(alterQuery);
      } catch (err) {
        // Suppress if column already exists
      }
    }

    // Create product_reviews table
    const createReviewsTableQuery = `
      CREATE TABLE IF NOT EXISTS product_reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id VARCHAR(100) NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) DEFAULT NULL,
        location VARCHAR(255) DEFAULT NULL,
        rating INT NOT NULL DEFAULT 5,
        title VARCHAR(255) NOT NULL,
        review TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'approved',
        created_at VARCHAR(100) DEFAULT NULL
      )
    `;
    await connection.query(createReviewsTableQuery);

    // Seed product reviews if empty
    const [reviewRows]: any = await connection.query('SELECT COUNT(*) as count FROM product_reviews');
    if (reviewRows[0].count === 0) {
      const insertReviewsQuery = `
        INSERT INTO product_reviews (product_id, name, email, location, rating, title, review, status, created_at) VALUES
        ('abc-latte-mix', 'Priya Sharma', 'priya@gmail.com', 'Bengaluru, KA', 5, 'Smooth and delicious morning malt!', 'I have been drinking the ABC Latte Mix every morning with warm milk. It mixes easily without any lumps and tastes so comforting!', 'approved', '2026-07-20 10:30 AM'),
        ('abc-latte-mix', 'Aisha Mohammed', 'aisha@gmail.com', 'Hyderabad, TS', 5, 'Quick 1-minute breakfast booster', 'Takes less than a minute to make before leaving for work. Clear ingredient declaration and great quality packaging.', 'approved', '2026-07-22 08:15 AM'),
        ('moringa-premix-soup', 'Rahul Kulkarni', 'rahul@gmail.com', 'Pune, MH', 5, 'Very comforting office soup', 'The Moringa Premix Soup is warm, savoury and ready in just 60 seconds. Perfect for office breaks!', 'approved', '2026-07-21 04:45 PM'),
        ('choco-multigrain-millet-malt', 'Suresh Hegde', 'suresh@gmail.com', 'Mangaluru, KA', 5, 'Kids love the chocolate taste!', 'Rich chocolate flavour with sprouted millet body. Whole family enjoys it daily.', 'approved', '2026-07-24 07:10 PM')
      `;
      await connection.query(insertReviewsQuery);
    }

    // Create hero_slides table
    const createSlidesTableQuery = `
      CREATE TABLE IF NOT EXISTS hero_slides (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255) NOT NULL,
        tagline TEXT NOT NULL,
        badge VARCHAR(255) DEFAULT NULL,
        bg_color VARCHAR(255) DEFAULT 'from-[#FFEBE5] via-[#FFCFC0] to-[#E7977D]',
        image LONGTEXT DEFAULT NULL,
        elements VARCHAR(255) DEFAULT '[]'
      )
    `;
    await connection.query(createSlidesTableQuery);

    // Seed hero slides if table is empty
    const [slideRows]: any = await connection.query('SELECT COUNT(*) as count FROM hero_slides');
    if (slideRows[0].count === 0) {
      const insertSlidesQuery = `
        INSERT INTO hero_slides (category, title, subtitle, tagline, badge, bg_color, image, elements) VALUES
        ('Daily Cellular Energy', 'Nourish from Within', 'ABC Malt Powder', 'Our signature ABC Malt Powder merges the biological goodness of fresh apples, pure beetroots, and crisp carrots. Fortified with premium almonds and raw cashews for sustained vigor.', 'Rich in Iron', 'from-[#FFEBE5] via-[#FFCFC0] to-[#E7977D]', '/product3.png', '["apple", "beetroot", "carrot"]'),
        ('Detoxification & Immunity', 'Pure Green Vitality', 'Moringa Premix Soup', 'Cold-process milled moringa leaves blended into an instant herbal soup. Restore metabolic equilibrium, flush out toxins, and activate clean cellular energy in 10 seconds.', '100% Wild-Crafted', 'from-[#EEF5F1] via-[#D0E2D7] to-[#88B29C]', '/product1.png', '["leaf1", "leaf2", "steam"]'),
        ('Family Active Nutrition', 'Rich Cocoa Strength', 'Choco Multigrain Millet Malt', 'A luxurious blend of premium dark cocoa and sprouted ancient grains. Sweetened naturally, packed with essential minerals, and designed for active minds of all ages.', 'Zero Refined Sugar', 'from-[#FDFBF7] via-[#EADBCE] to-[#AC8C7D]', '/product2.png', '["almond", "cocoa", "millet"]')
      `;
      await connection.query(insertSlidesQuery);
    } else {
      // Revert existing slides to use the original images
      await connection.query("UPDATE hero_slides SET image = '/product3.png' WHERE subtitle LIKE '%ABC%'");
      await connection.query("UPDATE hero_slides SET image = '/product1.png' WHERE subtitle LIKE '%Moringa%'");
      await connection.query("UPDATE hero_slides SET image = '/product2.png' WHERE subtitle LIKE '%Choco%'");
    }

    // Check if products exist to prevent duplicate seed entries
    const [rows]: any = await connection.query('SELECT COUNT(*) as count FROM products');
    if (rows[0].count === 0) {
      const insertQuery = `
        INSERT INTO products (title, category, price, rating_count, tag, svg_type, image) VALUES
        ('Moringa Premix Soup Powder', 'Premix Soups', 299.00, 124, 'Best Seller', 'moringa', '/product1.png'),
        ('ABC Latte Mix (Malt) Powder', 'Superfood Malts', 299.00, 98, NULL, 'abc', '/product3.png'),
        ('Choco Multigrain Millet Malt Mix', 'Superfood Malts', 299.00, 182, NULL, 'choco', '/product2.png')
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
