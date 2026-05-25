'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, Sparkles } from 'lucide-react'

const agents = [
  { emoji: '👨‍🍳', name: 'Chef IA', role: 'Contrôle global', color: '#7C3AED', delay: 0 },
  { emoji: '🎬', name: 'Monteur IA', role: 'Crée les shorts', color: '#3B82F6', delay: 0.1 },
  { emoji: '📊', name: 'Analyste IA', role: 'Statistiques', color: '#22D3EE', delay: 0.2 },
  { emoji: '📅', name: 'Planificateur', role: 'Publication auto', color: '#22C55E', delay: 0.3 },
]

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-16">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C3AED]/10 blur-[100px]" />
        <div className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full bg-[#3B82F6]/8 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#22D3EE]/5 blur-[80px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-4 py-1.5"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#a78bfa]" />
          <span className="text-xs font-medium text-[#a78bfa]">
            Studio de production IA pour créateurs
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4 text-center"
        >
          <h1 className="font-heading text-5xl leading-[1.1] font-bold tracking-tight text-[#F9FAFB] sm:text-6xl lg:text-7xl">
            Votre équipe IA pour <br className="hidden sm:block" />
            <span className="gradient-text">créer, éditer et publier</span>
            <br className="hidden sm:block" />
            des podcasts automatiquement
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#94A3B8]">
            Un studio complet alimenté par l&apos;IA qui transforme vos podcasts en shorts viraux et
            les publie automatiquement sur YouTube, TikTok et Instagram.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/login"
            className="shine-hover flex items-center gap-2 rounded-xl bg-[#7C3AED] px-7 py-3.5 font-semibold text-white shadow-xl shadow-[#7C3AED]/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#6d28d9] hover:shadow-[#7C3AED]/50 active:scale-95"
          >
            Commencer gratuitement
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 font-semibold text-[#F9FAFB] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7C3AED]/20">
              <Play className="h-3 w-3 fill-[#a78bfa] text-[#a78bfa]" />
            </div>
            Voir la démo
          </button>
        </motion.div>

        {/* Agent cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {agents.map((agent) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + agent.delay }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="shine-hover group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.07] bg-[#121A2A] p-5 transition-all duration-300"
              style={{
                boxShadow: `0 0 0 0 ${agent.color}00`,
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px -5px ${agent.color}40`
                ;(e.currentTarget as HTMLElement).style.borderColor = `${agent.color}30`
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${agent.color}00`
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'
              }}
            >
              {/* Status dot */}
              <div className="absolute top-3 right-3 flex items-center gap-1">
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full"
                  style={{ backgroundColor: agent.color }}
                />
              </div>

              <div className="text-3xl">{agent.emoji}</div>
              <div className="mt-3">
                <p className="font-heading text-sm font-semibold text-[#F9FAFB]">{agent.name}</p>
                <p className="text-xs text-[#94A3B8]">{agent.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#94A3B8]"
        >
          {[
            { value: '+300%', label: 'croissance moyenne' },
            { value: '-80%', label: 'temps de montage' },
            { value: '+2x', label: "taux d'engagement" },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="font-heading font-bold text-[#F9FAFB]">{value}</span>
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
