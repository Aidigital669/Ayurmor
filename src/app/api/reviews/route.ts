import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const DATA_DIR = path.join(process.cwd(), 'data');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');

const DEFAULT_REVIEWS = [
  {
    id: 1,
    product_id: 'abc-latte-mix',
    name: 'Priya Sharma',
    email: 'priya@gmail.com',
    location: 'Bengaluru, KA',
    rating: 5,
    title: 'Smooth and delicious morning malt!',
    review: 'I have been drinking the ABC Latte Mix every morning with warm milk. It mixes easily without any lumps and tastes so comforting!',
    status: 'approved',
    created_at: '2026-07-20 10:30 AM'
  },
  {
    id: 2,
    product_id: 'abc-latte-mix',
    name: 'Aisha Mohammed',
    email: 'aisha@gmail.com',
    location: 'Hyderabad, TS',
    rating: 5,
    title: 'Quick 1-minute breakfast booster',
    review: 'Takes less than a minute to make before leaving for work. Clear ingredient declaration and great quality packaging.',
    status: 'approved',
    created_at: '2026-07-22 08:15 AM'
  },
  {
    id: 3,
    product_id: 'moringa-premix-soup',
    name: 'Rahul Kulkarni',
    email: 'rahul@gmail.com',
    location: 'Pune, MH',
    rating: 5,
    title: 'Very comforting office soup',
    review: 'The Moringa Premix Soup is warm, savoury and ready in just 60 seconds. Perfect for office breaks!',
    status: 'approved',
    created_at: '2026-07-21 04:45 PM'
  },
  {
    id: 4,
    product_id: 'choco-multigrain-millet-malt',
    name: 'Suresh Hegde',
    email: 'suresh@gmail.com',
    location: 'Mangaluru, KA',
    rating: 5,
    title: 'Kids love the chocolate taste!',
    review: 'Rich chocolate flavour with sprouted millet body. Whole family enjoys it daily.',
    status: 'approved',
    created_at: '2026-07-24 07:10 PM'
  },
  {
    id: 5,
    product_id: 'mushroom-premix-soup',
    name: 'Vikram Desai',
    email: 'vikram.d@gmail.com',
    location: 'Mumbai, MH',
    rating: 5,
    title: 'Incredible creamy mushroom flavour!',
    review: 'The oyster mushroom soup is super creamy, comforting and ready in a minute. No MSG taste, just pure natural goodness!',
    status: 'approved',
    created_at: '2026-08-05 06:20 PM'
  },
  {
    id: 6,
    product_id: 'mushroom-soup-premix',
    name: 'Ananya Roy',
    email: 'ananya.r@gmail.com',
    location: 'Kolkata, WB',
    rating: 5,
    title: 'Perfect warm evening soup',
    review: 'Loved the subtle hint of garlic and black pepper. Easy to prepare with hot water, no lumps at all.',
    status: 'approved',
    created_at: '2026-08-10 07:45 PM'
  }
];

function ensureLocalFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(REVIEWS_FILE)) {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(DEFAULT_REVIEWS, null, 2), 'utf-8');
  }
}

function getLocalReviews() {
  ensureLocalFile();
  try {
    const raw = fs.readFileSync(REVIEWS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return DEFAULT_REVIEWS;
  }
}

function saveLocalReviews(data: any[]) {
  ensureLocalFile();
  fs.writeFileSync(REVIEWS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// GET: Retrieve reviews for a product (or all reviews for admin)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    let allReviews: any[] = [];

    try {
      if (productId) {
        const [rows]: any = await pool.query(
          "SELECT * FROM product_reviews WHERE (product_id = ? OR product_id LIKE ?) AND status = 'approved' ORDER BY id DESC",
          [productId, `%${productId}%`]
        );
        allReviews = rows;
      } else {
        const [rows]: any = await pool.query("SELECT * FROM product_reviews ORDER BY id DESC");
        allReviews = rows;
      }
    } catch (dbErr) {
      console.warn('DB reviews fetch failed, using local file:', dbErr);
      const local = getLocalReviews();
      if (productId) {
        allReviews = local.filter((r: any) => 
          (r.product_id === productId || String(r.product_id).includes(productId)) && r.status !== 'hidden'
        );
      } else {
        allReviews = local;
      }
    }

    // Calculate rating statistics
    const totalCount = allReviews.length;
    const avgRating = totalCount > 0 
      ? (allReviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0) / totalCount).toFixed(1) 
      : '5.0';

    const breakdown = {
      5: allReviews.filter(r => Number(r.rating) === 5).length,
      4: allReviews.filter(r => Number(r.rating) === 4).length,
      3: allReviews.filter(r => Number(r.rating) === 3).length,
      2: allReviews.filter(r => Number(r.rating) === 2).length,
      1: allReviews.filter(r => Number(r.rating) === 1).length,
    };

    return NextResponse.json({
      success: true,
      reviews: allReviews,
      stats: {
        total: totalCount,
        average: parseFloat(avgRating),
        breakdown
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Customer submits a new star & text review
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { product_id, name, email, location, rating, title, review } = body;

    if (!product_id || !name || !rating || !title || !review) {
      return NextResponse.json(
        { success: false, error: 'Product, Name, Rating, Title, and Review text are required.' },
        { status: 400 }
      );
    }

    const numRating = Math.min(5, Math.max(1, parseInt(rating, 10) || 5));
    const createdAt = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    let savedInDb = false;

    try {
      const query = `
        INSERT INTO product_reviews (product_id, name, email, location, rating, title, review, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'approved', ?)
      `;
      const [result]: any = await pool.query(query, [
        String(product_id),
        name.trim(),
        email ? email.trim() : null,
        location ? location.trim() : 'Verified Customer',
        numRating,
        title.trim(),
        review.trim(),
        createdAt
      ]);

      if (result.insertId) {
        savedInDb = true;
      }
    } catch (dbErr) {
      console.warn('DB Review Insert failed, falling back to local storage:', dbErr);
    }

    const local = getLocalReviews();
    const newReview = {
      id: Date.now(),
      product_id: String(product_id),
      name: name.trim(),
      email: email ? email.trim() : null,
      location: location ? location.trim() : 'Verified Customer',
      rating: numRating,
      title: title.trim(),
      review: review.trim(),
      status: 'approved',
      created_at: createdAt,
      storage: savedInDb ? 'database' : 'file'
    };
    local.unshift(newReview);
    saveLocalReviews(local);

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your review has been published successfully.',
      review: newReview
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT: Moderation status update (approved / hidden)
export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Missing ID or status.' }, { status: 400 });
    }

    try {
      await pool.query('UPDATE product_reviews SET status = ? WHERE id = ?', [status, id]);
    } catch (dbErr) {
      console.warn('DB review status update failed, updating local file:', dbErr);
    }

    const local = getLocalReviews();
    const updated = local.map((r: any) =>
      r.id === id || String(r.id) === String(id) ? { ...r, status } : r
    );
    saveLocalReviews(updated);

    return NextResponse.json({ success: true, message: 'Review status updated successfully!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE: Delete a review
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing ID parameter' }, { status: 400 });
    }

    try {
      await pool.query('DELETE FROM product_reviews WHERE id = ?', [id]);
    } catch (dbErr) {
      console.warn('DB review delete failed, deleting from local file:', dbErr);
    }

    const local = getLocalReviews();
    const filtered = local.filter((r: any) => String(r.id) !== String(id));
    saveLocalReviews(filtered);

    return NextResponse.json({ success: true, message: 'Review deleted successfully!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
