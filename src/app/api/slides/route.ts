import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

const MOCK_SLIDES = [
  {
    id: 1,
    category: "Daily Cellular Energy",
    title: "Nourish from Within",
    subtitle: "ABC Malt Powder",
    tagline: "Our signature ABC Malt Powder merges the biological goodness of fresh apples, pure beetroots, and crisp carrots. Fortified with premium almonds and raw cashews for sustained vigor.",
    badge: "Rich in Iron",
    bgColor: "from-[#FFEBE5] via-[#FFCFC0] to-[#E7977D]",
    image: "/product3.png",
    elements: '["apple", "beetroot", "carrot"]'
  },
  {
    id: 2,
    category: "Detoxification & Immunity",
    title: "Pure Green Vitality",
    subtitle: "Moringa Premix Soup",
    tagline: "Cold-process milled moringa leaves blended into an instant herbal soup. Restore metabolic equilibrium, flush out toxins, and activate clean cellular energy in 10 seconds.",
    badge: "100% Wild-Crafted",
    bgColor: "from-[#EEF5F1] via-[#D0E2D7] to-[#88B29C]",
    image: "/product1.png",
    elements: '["leaf1", "leaf2", "steam"]'
  },
  {
    id: 3,
    category: "Family Active Nutrition",
    title: "Rich Cocoa Strength",
    subtitle: "Choco Multigrain Millet Malt",
    tagline: "A luxurious blend of premium dark cocoa and sprouted ancient grains. Sweetened naturally, packed with essential minerals, and designed for active minds of all ages.",
    badge: "Zero Refined Sugar",
    bgColor: "from-[#FDFBF7] via-[#EADBCE] to-[#AC8C7D]",
    image: "/product2.png",
    elements: '["almond", "cocoa", "millet"]'
  },
  {
    id: 4,
    category: "Comforting Evening Nutrition",
    title: "Creamy & Nourishing",
    subtitle: "Mushroom Premix Soup",
    tagline: "Rich gourmet oyster mushroom soup with garlic and aromatic herbs. Enjoy deep restaurant-quality comfort in 60 seconds with zero added MSG.",
    badge: "New Launch",
    bgColor: "from-[#FBF8F3] via-[#EFE6DB] to-[#D5C2AF]",
    image: "/Mushroom3.jpeg",
    elements: '["mushroom", "garlic", "herbs"]'
  }
];

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM hero_slides ORDER BY id ASC');
    return NextResponse.json({ 
      success: true, 
      slides: rows, 
      source: 'database' 
    });
  } catch (error: any) {
    console.warn('MySQL connection failed for slides. Falling back to mock slides. Error:', error.message);
    return NextResponse.json({ 
      success: true, 
      slides: MOCK_SLIDES, 
      source: 'mock'
    });
  }
}
