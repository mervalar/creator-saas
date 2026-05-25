import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Podcast Team — Votre studio de production IA',
  description:
    'Transformez vos podcasts en shorts viraux automatiquement. Générez, éditez et publiez sur YouTube, TikTok et Instagram grâce à votre équipe IA.',
  keywords: [
    'podcast',
    'IA',
    'shorts',
    'créateur de contenu',
    'automatisation',
    'YouTube',
    'TikTok',
  ],
}

export const viewport: Viewport = {
  themeColor: '#0B0F1A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${geistMono.variable} dark`}>
      <body className="noise min-h-screen bg-[#0B0F1A] text-[#F9FAFB] antialiased">{children}</body>
    </html>
  )
}
