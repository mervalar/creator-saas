'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mic, Zap } from 'lucide-react'

export function TopBar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-background/60 sticky top-0 z-40 flex items-center justify-between border-b border-white/[0.06] px-6 py-3.5 backdrop-blur-md"
    >
      {/* Logo */}
      <Link href="/" className="group flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30">
          <Mic className="h-4 w-4 text-white" />
        </div>
        <span className="text-foreground text-sm font-semibold tracking-tight">
          Podcast<span className="text-violet-400"> IA</span>
        </span>
      </Link>

      {/* Status pill */}
      <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
        <Zap className="h-3 w-3" />
        Tous les systèmes actifs
      </div>
    </motion.header>
  )
}
