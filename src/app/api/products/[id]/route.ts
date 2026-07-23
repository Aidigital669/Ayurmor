import { NextRequest, NextResponse } from 'next/server';
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
    image: '/hero_moringa.png',
    description: 'Moringa Premix Soup is a nutrient-dense, warm, comforting herbal soup mix crafted from 100% wild-crafted Moringa leaves. Milled fresh to preserve raw enzymes, it delivers a clean, green energy boost while aiding digestion and natural metabolic detox.',
    ingredients: 'Pure Moringa Oleifera leaves, Roasted cumin, Black salt, Lemon peel powder, Ginger, Black pepper, Rock salt.',
    usage_instructions: 'Add 1 tablespoon (10g) of premix to a cup. Pour 150ml of boiling water. Stir well and let it sit for 10 seconds. Enjoy warm!',
    nutrition: 'Energy: 320 kcal (per 100g)\nProtein: 22g\nCarbohydrates: 48g\nDietary Fiber: 12g\nIron: 25mg',
    benefits: 'Rich in Antioxidants\nEnhances Immune Function\nSupports Natural Detoxification\nImproves Energy Levels'
  },
  {
    id: 2,
    title: 'ABC Latte Mix (Malt) Powder',
    category: 'Superfood Malts',
    price: 299.00,
    rating_count: 98,
    tag: 'Iron Rich',
    svg_type: 'abc',
    image: '/hero_abc.png',
    description: 'Our signature ABC Latte Mix fuses raw apples, sweet red beetroots, and clean carrots into a powerhouse malt. Fortified with roasted almonds and cashews, it offers sustained daily vigor, natural skin glow, and supports blood purification.',
    ingredients: 'Dehydrated apple powder, Beetroot extract, Carrot crystals, Sprouted Ragi malt, Roasted almonds, Cashew kernels, Cardamom, Raw palm sugar.',
    usage_instructions: 'Add 2 spoonfuls (20g) to 200ml of hot milk or warm water. Stir briskly until smooth. Drink every morning for best results.',
    nutrition: 'Energy: 385 kcal (per 100g)\nProtein: 12g\nIron: 32mg\nVitamin A: 1200 mcg\nCalcium: 180mg',
    benefits: 'Enriched with Iron\nBoosts Hemoglobin levels\nNatural Skin Radiance\nSustained Energy'
  },
  {
    id: 3,
    title: 'Choco Multigrain Millet Malt Mix',
    category: 'Superfood Malts',
    price: 299.00,
    rating_count: 182,
    tag: 'Kids Choice',
    svg_type: 'choco',
    image: '/hero_choco.png',
    description: 'A luxurious, rich dark cocoa blend paired with sprouted ancient grains (Finger Millet, Pearl Millet, Foxtail Millet). Sweetened naturally without refined sugars, it is the ultimate health malt for growing children and active adults.',
    ingredients: 'Premium Dark Cocoa powder, Sprouted Finger Millet (Ragi), Sprouted Pearl Millet (Bajra), Sprouted Foxtail Millet, Almond flour, Coconut sugar, Cardamom, Pinch of sea salt.',
    usage_instructions: 'Add 2 tablespoons (25g) to a glass of hot milk (or vegan milk). Stir well. No boiling needed!',
    nutrition: 'Energy: 360 kcal (per 100g)\nProtein: 14g\nCalcium: 410mg\nDietary Fiber: 9g\nZinc: 4.5mg',
    benefits: 'Rich in Calcium\nZero Refined Sugar\nHigh Dietary Fiber\nGreat for Bone Health'
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const productId = params.id;
  const pidLower = String(productId).toLowerCase();

  try {
    const [rows]: any = await pool.query('SELECT * FROM products WHERE id = ? OR LOWER(svg_type) = ?', [productId, pidLower]);
    if (rows && rows.length > 0) {
      return NextResponse.json(rows[0]);
    }
  } catch (error) {
    // Database fallback to MOCK_PRODUCTS
  }

  // Fallback matching
  let product = MOCK_PRODUCTS.find(p => 
    String(p.id) === productId || 
    p.svg_type.toLowerCase() === pidLower
  );

  if (!product) {
    if (pidLower === '1' || pidLower.includes('moringa') || pidLower.includes('soup')) {
      product = MOCK_PRODUCTS[0];
    } else if (pidLower === '2' || pidLower.includes('abc') || pidLower.includes('latte')) {
      product = MOCK_PRODUCTS[1];
    } else if (pidLower === '3' || pidLower.includes('choco') || pidLower.includes('millet')) {
      product = MOCK_PRODUCTS[2];
    } else {
      product = MOCK_PRODUCTS[0];
    }
  }

  return NextResponse.json(product);
}
