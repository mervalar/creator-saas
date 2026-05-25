'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mic2, Zap } from 'lucide-react'

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 z-50 w-full"
    >
      <div className="mx-auto max-w-7xl px-6 pt-4">
        <div className="glass flex items-center justify-between rounded-2xl px-5 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7C3AED] shadow-lg shadow-[#7C3AED]/40">
              <Mic2 className="h-4 w-4 text-white" />
            </div>
            <span className="font-heading text-sm font-bold text-[#F9FAFB]">
              AI Podcast <span className="text-[#7C3AED]">Team</span>
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden items-center gap-6 md:flex">
            {['Fonctionnalités', 'Tarifs', 'Démo'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-[#94A3B8] transition-colors duration-200 hover:text-[#F9FAFB]"
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-sm text-[#94A3B8] transition-colors hover:text-[#F9FAFB] md:block"
            >
              Connexion
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-xl bg-[#7C3AED] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#7C3AED]/30 transition-all duration-200 hover:bg-[#6d28d9] hover:shadow-[#7C3AED]/50 active:scale-95"
            >
              <Zap className="h-3.5 w-3.5" />
              Commencer
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
