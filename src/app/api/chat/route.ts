import { NextRequest, NextResponse } from 'next/server';

// Ayurmor Website Knowledge Base Context (Updated with Official Client Docs & Registrations)
const AYURMOR_KNOWLEDGE_BASE = `
You are Ayurmor AI, the official intelligent wellness assistant for Ayurmor (Saish Technofarms).
Your goal is to warmly assist customers, answer questions about Ayurmor's products, health benefits, ingredients, usage instructions, pricing, shipping, WhatsApp ordering, certifications, founder story, and order tracking.

=== ABOUT AYURMOR & FOUNDER STORY ===
- Brand: Ayurmor — Natural Goodness, Instant Wellness
- Manufacturer & FBO: Saish Technofarms, 137/5 Kagal Maneer, Manaki, Kumta, Uttara Kannada, Karnataka - 581362, India.
- Founder's Story ("Rooted in Tradition. Crafted for the World."):
  Ayurmor was founded with a clear purpose—to bring the timeless wisdom of nature to modern lifestyles through thoughtfully crafted, premium nutrition. India has long been home to nourishing ingredients such as millets, mushrooms, herbs, and botanicals that supported generations. As fast-paced food habits evolved, many of these traditional super-ingredients became less common in everyday diets. Ayurmor reimagines them in a way that is convenient, highly enjoyable, and relevant for today's consumers.

=== CERTIFICATIONS & LICENSES ===
- FSSAI Registration: FSSAI License Reg No. 21224169000054 (Under FSS Act, 2006, Govt. of Karnataka / FSSAI).
- ISO 9001:2015 Certification: Certificate Number QCCI/25Q/SES/5850 (Quality Management System, QCCI LLP & UGAC Accredited).
- Standards: 100% Organic, Chemical-Free, Zero Refined Sugars, GMP Compliant.

=== AYURMOR PRODUCTS CATALOG ===
1. MORINGA PREMIX SOUP:
   - Category: Instant Herbal Soup / Detox & Immunity
   - Price: Rs. 299 per pack
   - Description: Nutrient-dense, warm, comforting herbal soup mix crafted from 100% wild-crafted Moringa leaves. Milled fresh to preserve raw enzymes, delivering a clean green energy boost while aiding digestion and metabolic detox.
   - Ingredients: Organic Moringa Oleifera leaves, Roasted cumin, Black salt, Lemon peel powder, Ginger, Black pepper, Rock salt.
   - Usage Instructions: Add 1 tablespoon (10g) of premix to a cup. Pour 150ml of boiling water. Stir well and let it sit for 10 seconds. Enjoy warm!
   - Nutrition (per 100g): Energy 320 kcal, Protein 22g, Carbohydrates 48g, Dietary Fiber 12g, Iron 25mg.
   - Key Benefits: Rich in Antioxidants, Enhances Immune Function, Supports Natural Detoxification, Improves Energy Levels.

2. ABC MALT POWDER (Apple, Beetroot, Carrot):
   - Category: Daily Cellular Energy / Vigor & Skin Health
   - Price: Rs. 299 per pack
   - Description: Signature ABC Latte Mix fusing raw apples, sweet red beetroots, and clean carrots into a powerhouse malt. Fortified with roasted almonds and cashews for sustained daily vigor, natural skin glow, and blood purification.
   - Ingredients: Dehydrated apple powder, Beetroot extract, Carrot crystals, Sprouted Ragi malt, Roasted almonds, Cashew kernels, Cardamom, Raw palm sugar.
   - Usage Instructions: Add 2 spoonfuls (20g) to 200ml of hot milk or warm water. Stir briskly until smooth. Drink every morning for best results.
   - Nutrition (per 100g): Energy 385 kcal, Protein 12g, Iron 32mg, Vitamin A 1200 mcg, Calcium 180mg.
   - Key Benefits: Enriched with Iron, Boosts Hemoglobin levels, Natural Skin Radiance, Sustained Energy.

3. CHOCO MULTIGRAIN MILLET MALT:
   - Category: Family Active Nutrition / Bone & Mind Strength
   - Price: Rs. 299 per pack
   - Description: Luxurious, rich dark cocoa blend paired with sprouted ancient grains (Finger Millet/Ragi, Pearl Millet/Bajra, Foxtail Millet). Sweetened naturally without refined sugars. Ideal health malt for growing children and active adults.
   - Ingredients: Premium Dark Cocoa powder, Sprouted Finger Millet (Ragi), Sprouted Pearl Millet (Bajra), Sprouted Foxtail Millet, Almond flour, Coconut sugar, Cardamom, Pinch of sea salt.
   - Usage Instructions: Add 2 tablespoons (25g) to a glass of hot milk (or vegan milk). Stir well. No boiling needed!
   - Nutrition (per 100g): Energy 360 kcal, Protein 14g, Calcium 410mg, Dietary Fiber 9g, Zinc 4.5mg.
   - Key Benefits: Rich in Calcium, Zero Refined Sugar, High Dietary Fiber, Great for Bone & Mind Health.

=== SHIPPING, PAYMENT & WHATSAPP ORDERS ===
- Shipping Fee: FREE express shipping across India on all orders!
- Cash on Delivery (COD): Available nationwide!
- Payment Gateway: Instant online payments via Razorpay.
- WhatsApp Direct Order: Customers can order directly on WhatsApp (+91 7483 849 998).
- Logistics Partner: Integrated with Bigship courier logistics for automated dispatch & live tracking IDs.

=== CONVERSATION GUIDELINES ===
- Be polite, welcoming, helpful, and concise. Use bullet points or short paragraphs for readability.
- Use emojis tastefully (🌿, 🥤, 🍫, ✨, 🚚, 💚).
- If asked about non-Ayurmor topics, politely steer the conversation back to Ayurmor wellness products and nutrition.
- Keep answers accurate according to the product specifications listed above.
`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Message content is required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (apiKey && apiKey.trim() !== '') {
      try {
        const formattedHistory = Array.isArray(history) 
          ? history.map((item: { sender: string; text: string }) => ({
              role: item.sender === 'user' ? 'user' : 'model',
              parts: [{ text: item.text }]
            }))
          : [];

        const payload = {
          systemInstruction: {
            parts: [{ text: AYURMOR_KNOWLEDGE_BASE }]
          },
          contents: [
            ...formattedHistory,
            {
              role: 'user',
              parts: [{ text: message }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800
          }
        };

        let res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        }

        if (res.ok) {
          const data = await res.json();
          const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

          if (responseText) {
            return NextResponse.json({
              success: true,
              reply: responseText,
              source: 'gemini'
            });
          }
        }
      } catch (geminiError) {
        console.error('Error invoking Gemini API:', geminiError);
      }
    }

    const reply = getLocalKnowledgeFallback(message);
    return NextResponse.json({
      success: true,
      reply,
      source: 'local_fallback'
    });

  } catch (error: any) {
    console.error('Chat API Route error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function getLocalKnowledgeFallback(msg: string): string {
  const query = msg.toLowerCase();

  if (query.includes('fssai') || query.includes('iso') || query.includes('certif') || query.includes('address') || query.includes('company')) {
    return `📜 **Ayurmor Certifications & Company Details**
• **FSSAI License**: Reg. No. 21224169000054 (Govt. of Karnataka / FSSAI)
• **ISO Standard**: ISO 9001:2015 Quality Management System (Cert: QCCI/25Q/SES/5850)
• **Manufacturer**: Saish Technofarms, 137/5 Kagal Maneer, Kumta, Uttara Kannada, Karnataka - 581362, India.`;
  }

  if (query.includes('moringa') || query.includes('soup') || query.includes('green')) {
    return `🌿 **Moringa Premix Soup** (Rs. 299)
• **Description**: 100% wild-crafted Moringa leaves instant soup to restore metabolic equilibrium and flush out toxins.
• **Ingredients**: Organic Moringa leaves, Roasted cumin, Black salt, Lemon peel, Ginger, Black pepper, Rock salt.
• **Preparation**: Add 1 tbsp (10g) to a cup, pour 150ml boiling water, stir well, and enjoy warm!
• **Benefits**: Antioxidant-rich, immunity boost, natural detox & clean cellular energy.`;
  }

  if (query.includes('abc') || query.includes('apple') || query.includes('beetroot') || query.includes('carrot')) {
    return `🥤 **ABC Malt Powder** (Rs. 299)
• **Description**: Blends raw apples, beetroots, and carrots fortified with almonds and cashews.
• **Ingredients**: Apple powder, Beetroot extract, Carrot crystals, Sprouted Ragi malt, Roasted almonds, Cashews, Cardamom, Raw palm sugar.
• **Preparation**: Mix 2 spoonfuls (20g) into 200ml hot milk or warm water every morning.
• **Benefits**: Iron-rich, hemoglobin booster, natural skin glow & sustained energy.`;
  }

  if (query.includes('choco') || query.includes('millet') || query.includes('cocoa') || query.includes('kid')) {
    return `🍫 **Choco Multigrain Millet Malt** (Rs. 299)
• **Description**: Luxurious dark cocoa blended with sprouted ancient millets (Ragi, Bajra, Foxtail Millet).
• **Ingredients**: Dark Cocoa, Sprouted Ragi, Bajra, Foxtail Millet, Almond flour, Coconut sugar, Cardamom.
• **Preparation**: Mix 2 tbsp (25g) in hot milk or vegan milk. No boiling required!
• **Benefits**: High calcium, 100% zero refined sugar, high fiber for bone strength & active minds.`;
  }

  if (query.includes('ship') || query.includes('delivery') || query.includes('cod') || query.includes('whatsapp') || query.includes('order')) {
    return `🚚 **Shipping, Payment & WhatsApp Order**
• **Shipping**: FREE express shipping across India on all orders!
• **Cash on Delivery (COD)**: Available nationwide.
• **Payment**: Razorpay instant checkout or Direct WhatsApp order.
• **WhatsApp Support**: Chat or order directly at +91 7483 849 998!`;
  }

  return `✨ **Ayurmor Natural Botanical Health Blends**

We offer 3 signature 100% organic wellness mixes:
1. 🌿 **Moringa Premix Soup** — Instant detox & immunity boost (Rs. 299)
2. 🥤 **ABC Malt Powder** — Apple, Beetroot & Carrot hemoglobin booster (Rs. 299)
3. 🍫 **Choco Multigrain Millet Malt** — Sprouted millets & cocoa for bone health (Rs. 299)

📜 **FSSAI Reg: 21224169000054 | ISO 9001:2015 Certified**
🚚 **FREE Shipping & COD across India!**

Feel free to ask me anything about ingredients, usage, or certifications!`;
}
