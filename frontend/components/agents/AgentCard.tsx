'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export type AgentConfig = {
  id: string
  name: string
  role: string
  description: string
  href: string
  icon: React.ReactNode
  status: 'online' | 'busy' | 'standby'
  tags: string[]
}

const statusColors = {
  online: 'bg-emerald-400',
  busy: 'bg-amber-400',
  standby: 'bg-slate-500',
}

const statusLabels = {
  online: 'En ligne',
  busy: 'En cours',
  standby: 'Veille',
}

export function AgentCard({ agent, index }: { agent: AgentConfig; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Subtle border glow on hover */}
      <div
        className="absolute -inset-[1px] rounded-2xl bg-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />

      {/* Card body */}
      <Link
        href={agent.href}
        className="relative flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.05]"
      >
        {/* Header row */}
        <div className="flex items-start justify-between">
          {/* Agent icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-xl">
            {agent.icon}
          </div>

          {/* Status badge */}
          <div className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1">
            <span
              className={`h-1.5 w-1.5 animate-pulse rounded-full ${statusColors[agent.status]}`}
            />
            <span className="text-muted-foreground text-[11px] font-medium">
              {statusLabels[agent.status]}
            </span>
          </div>
        </div>

        {/* Name + role */}
        <div className="space-y-0.5">
          <h3 className="text-foreground text-base font-semibold">{agent.name}</h3>
          <p className="text-muted-foreground/50 text-[11px] font-medium tracking-widest uppercase">
            {agent.role}
          </p>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed">{agent.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {agent.tags.map((tag) => (
            <span
              key={tag}
              className="text-muted-foreground/60 rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[11px] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Enter CTA */}
        <div className="text-foreground/50 group-hover:text-foreground/80 mt-auto flex items-center gap-1.5 text-sm font-medium transition-colors duration-200">
          Accéder
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  )
}
