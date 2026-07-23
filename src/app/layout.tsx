import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ayurmor — Natural Goodness, Instant Wellness | FSSAI & ISO Certified',
  description: 'Ayurmor crafts 100% natural, pure botanical health mixes including Moringa Premix Soup, ABC Malt Powder (Apple, Beetroot, Carrot), and Choco Multigrain Millet Malt. FSSAI Reg. No. 21224169000054 & ISO 9001:2015 Certified. Free Shipping & Cash on Delivery across India.',
  keywords: [
    'Ayurmor', 'Moringa Soup', 'ABC Malt Powder', 'Choco Millet Malt', 
    'Sprouted Millets', 'Pure Botanical Health Mix', 'FSSAI Certified', 'Natural Detox Soup', 
    'Zero Refined Sugar', 'Saish Technofarms', 'Botanical Wellness India'
  ],
  authors: [{ name: 'Saish Technofarms' }],
  openGraph: {
    title: 'Ayurmor — Natural Goodness, Instant Wellness',
    description: '100% pure, zero-refined-sugar botanical mixes and instant soups. FSSAI Registered & ISO 9001:2015 Certified.',
    url: 'https://ayurmor.com',
    siteName: 'Ayurmor',
    locale: 'en_IN',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'Ayurmor (Saish Technofarms)',
  'url': 'https://ayurmor.com',
  'logo': 'https://ayurmor.com/product1.png',
  'description': 'Manufacturer of premium pure botanical health mixes, instant Moringa soup, and sprouted millet malts.',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Building No 330, Sy No 137/1, 137/5 Kagal Maneer, Manaki, Kumta',
    'addressLocality': 'Uttara Kannada',
    'addressRegion': 'Karnataka',
    'postalCode': '581362',
    'addressCountry': 'IN'
  },
  'telephone': '+917483849998',
  'email': 'support@ayurmor.com',
  'hasCredential': [
    {
      '@type': 'EducationalOccupationalCredential',
      'name': 'FSSAI Registration Certificate',
      'credentialId': '21224169000054'
    },
    {
      '@type': 'EducationalOccupationalCredential',
      'name': 'ISO 9001:2015 Quality Management System',
      'credentialId': 'QCCI/25Q/SES/5850'
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
