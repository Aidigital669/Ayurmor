import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

const MOCK_PRODUCTS = [
  {
    id: 2,
    title: 'Ayurmor ABC Latte Mix - Apple, Beetroot & Carrot Malt Drink',
    category: 'Instant Malt Drinks',
    price: 299.00,
    mrp: 349.00,
    rating_count: 98,
    tag: 'Bestseller',
    svg_type: 'abc',
    image: '/hero_abc.png',
    net_weight: '200g Pouch',
    servings: '20 Servings',
    one_liner: 'Apple, Beetroot & Carrot instant malt drink with almond and cashew. Ready with hot milk or water.',
    manufacturer: 'Saish Technofarms (FSSAI Reg No: 21224169000054)',
    marketed_by: 'Zeyora Global Trading Co. (GSTIN: 33AEQPT6920G1Z6, FSSAI No: 124250140000673)',
    description: 'Ayurmor ABC Latte Mix is a delicious instant wellness beverage made with apple, beetroot, carrot, almonds and cashews. Designed for busy lifestyles, it mixes easily with hot milk or water to create a smooth, satisfying drink in less than a minute - no boiling required.',
    ingredients: 'Dehydrated apple powder, Beetroot powder, Carrot powder, Almond powder, Cashew powder, Sprouted Ragi malt base, Cardamom powder, Raw palm sugar. Allergen advice: Contains nuts (Almonds & Cashews).',
    usage_instructions: 'Add 2-3 teaspoons to 150-200 ml hot milk or warm water. Stir well until smooth. Add sweetener only if desired. Serve warm or chilled.',
    nutrition: 'Energy: 385 kcal (per 100g)\nProtein: 12g\nCarbohydrates: 68g\nDietary Fiber: 8g\nCalcium: 180mg\nIron: 18mg',
    benefits: 'Instant drink ready in less than a minute\nMade with real apple, beetroot, carrot, almond and cashew\nSmooth, creamy & satisfying taste\nIdeal for breakfast, office breaks & evening refreshment'
  },
  {
    id: 1,
    title: 'Ayurmor Moringa Premix Soup - Instant Moringa Soup Powder',
    category: 'Premix Soups',
    price: 299.00,
    mrp: 349.00,
    rating_count: 124,
    tag: 'Ready in 60s',
    svg_type: 'moringa',
    image: '/hero_moringa.png',
    net_weight: '150g Pouch',
    servings: '15 Servings',
    one_liner: 'Warm, savoury moringa soup ready in 60 seconds. Ideal for office breaks and evening snacks.',
    manufacturer: 'Saish Technofarms (FSSAI Reg No: 21224169000054)',
    marketed_by: 'Zeyora Global Trading Co. (GSTIN: 33AEQPT6920G1Z6, FSSAI No: 124250140000673)',
    description: 'Enjoy the comforting taste of moringa in a warm, savoury soup that is ready in just one minute. Ayurmor Moringa Premix Soup is crafted for busy lifestyles - simply add hot water, stir well and enjoy a light, satisfying soup at home, work or while travelling.',
    ingredients: 'Pure Moringa Oleifera leaf powder, Roasted cumin powder, Black salt, Lemon peel powder, Ginger powder, Black pepper, Rock salt, Spices & Herbs. Allergen advice: Processed in a facility handling milk solids, gluten & nuts.',
    usage_instructions: 'Empty one serving into a cup or bowl. Add 180-200 ml hot water. Stir well until completely dissolved. Let stand for 1 minute if needed. Serve hot.',
    nutrition: 'Energy: 320 kcal (per 100g)\nProtein: 22g\nCarbohydrates: 48g\nDietary Fiber: 12g\nSodium: 850mg\nIron: 25mg',
    benefits: 'Ready in 60 seconds (no cooking required)\nWarm, savoury and comforting herbal flavour\nConvenient light snack for home, office & travel\nEasy way to enjoy moringa in daily food routines'
  },
  {
    id: 3,
    title: 'Ayurmor Choco Multigrain Millet Malt Mix - Instant Chocolate Millet Drink',
    category: 'Instant Malt Drinks',
    price: 299.00,
    mrp: 349.00,
    rating_count: 182,
    tag: 'Family Favorite',
    svg_type: 'choco',
    image: '/hero_choco.png',
    net_weight: '200g Pouch',
    servings: '20 Servings',
    one_liner: 'Chocolate-flavoured millet malt drink for the whole family. No boiling required.',
    manufacturer: 'Saish Technofarms (FSSAI Reg No: 21224169000054)',
    marketed_by: 'Zeyora Global Trading Co. (GSTIN: 33AEQPT6920G1Z6, FSSAI No: 124250140000673)',
    description: 'Ayurmor Choco Multigrain Millet Malt Mix brings together carefully selected millets with rich chocolate flavour. Ready in less than a minute, it mixes easily with hot milk or water and makes a creamy, satisfying drink for breakfast, evening refreshment or daily family routines.',
    ingredients: 'Sprouted Finger Millet (Ragi), Sprouted Pearl Millet (Bajra), Sprouted Foxtail Millet, Cocoa powder, Almond powder, Milk solids, Natural sugar, Cardamom. Allergen advice: Contains milk solids and nuts (Almond powder). Processed in a facility handling milk, gluten, soy or nuts.',
    usage_instructions: 'Add 2-3 teaspoons (10g) to 150-200 ml hot milk. Stir until smooth. For a lighter drink, use warm water. Add sweetener only if desired.',
    nutrition: 'Energy: 360 kcal (per 100g) | 36 kcal (per serving)\nProtein: 14g (per 100g) | 1.4g (per serving)\nCarbohydrates: 65g (per 100g) | 6.5g (per serving)\nTotal Sugar: 20g (per 100g) | 2.0g (per serving)\nAdded Sugar: 10g (per 100g) | 1.0g (per serving)\nDietary Fibre: 9g (per 100g) | 0.9g (per serving)\nFat: 5.5g (per 100g) | 0.55g (per serving)\nSodium: 60mg (per 100g) | 6mg (per serving)\nCalcium: 410mg (per 100g) | 41mg (per serving)',
    benefits: 'Delicious chocolate flavour with rich cocoa strength\nMade with sprouted multigrain millet ingredients\nInstant preparation — no boiling required\nSmooth and creamy taste with comforting millet body\nSuitable for older children, students, working professionals & families'
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
    if (pidLower === '1' || pidLower.includes('moringa') || pidLower.includes('moringa-soup')) {
      product = MOCK_PRODUCTS[1];
    } else if (pidLower === '2' || pidLower.includes('abc') || pidLower.includes('latte')) {
      product = MOCK_PRODUCTS[0];
    } else if (pidLower === '3' || pidLower.includes('choco') || pidLower.includes('millet')) {
      product = MOCK_PRODUCTS[2];
    } else {
      product = MOCK_PRODUCTS[0];
    }
  }

  return NextResponse.json(product);
}
