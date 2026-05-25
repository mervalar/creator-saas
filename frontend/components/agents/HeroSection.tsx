'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <motion.div
      className="flex flex-col items-center gap-6 text-center"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Eyebrow badge */}
      <div className="flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-300">
        <Sparkles className="h-3.5 w-3.5" />
        Studio de production IA
      </div>

      {/* Main headline */}
      <h1 className="max-w-2xl text-4xl leading-[1.15] font-bold tracking-tight sm:text-5xl lg:text-6xl">
        Votre{' '}
        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
          équipe IA
        </span>
        <br />
        <span className="text-foreground/70">faite pour les créateurs</span>
      </h1>

      {/* Subheadline */}
      <p className="text-muted-foreground max-w-lg text-base leading-relaxed sm:text-lg">
        Vos agents IA gèrent la transcription, le montage de shorts et la publication — pour que
        vous vous concentriez sur l&apos;essentiel : créer.
      </p>

      {/* Stat pills */}
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        {[
          { label: '3 agents IA', sub: 'prêts à déployer' },
          { label: '5 shorts', sub: 'par podcast uploadé' },
          { label: '3 plateformes', sub: 'publication automatique' },
        ].map(({ label, sub }) => (
          <div
            key={label}
            className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-2.5 text-center"
          >
            <p className="text-foreground text-sm font-semibold">{label}</p>
            <p className="text-muted-foreground/70 text-xs">{sub}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
