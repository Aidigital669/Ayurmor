import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ayurmor — Natural Goodness, Instant Wellness',
  description: 'Premium, organic, instant health mixes. Made from 100% natural ingredients like Moringa, Millet, and ABC mixes to support your active wellness.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
