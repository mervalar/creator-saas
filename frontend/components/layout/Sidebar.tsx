'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Film,
  CalendarCheck,
  Mic2,
  ChevronLeft,
  Settings,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', emoji: '🧠' },
  { icon: Film, label: 'Shorts', href: '/shorts', emoji: '🎬' },
  { icon: CalendarCheck, label: 'Publication', href: '/posting', emoji: '📅' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-white/[0.06] bg-[#0B0F1A]">
      {/* Logo */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7C3AED] shadow-lg shadow-[#7C3AED]/30">
            <Mic2 className="h-4 w-4 text-white" />
          </div>
          <span className="font-heading text-sm font-bold text-[#F9FAFB]">
            AI Podcast <span className="text-[#7C3AED]">Team</span>
          </span>
        </Link>
        <button className="rounded-lg p-1.5 text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-[#F9FAFB]">
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      {/* Status */}
      <div className="mx-4 mt-4 flex items-center gap-2.5 rounded-xl border border-[#22C55E]/15 bg-[#22C55E]/8 px-3.5 py-2.5">
        <div className="h-2 w-2 animate-pulse rounded-full bg-[#22C55E]" />
        <span className="text-xs font-medium text-[#22C55E]">Tous les agents actifs</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-5">
        <p className="mb-2 px-2 text-[10px] font-semibold tracking-widest text-[#94A3B8]/50 uppercase">
          Studio
        </p>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-[#7C3AED]/15 text-[#F9FAFB]'
                  : 'text-[#94A3B8] hover:bg-white/[0.04] hover:text-[#F9FAFB]'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-[#7C3AED]/15"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative text-base">{item.emoji}</span>
              <span className="relative">{item.label}</span>
              {isActive && (
                <div className="relative ml-auto h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="space-y-1 border-t border-white/[0.06] px-3 py-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#94A3B8] transition-colors hover:bg-white/[0.04] hover:text-[#F9FAFB]">
          <Settings className="h-4 w-4" />
          Paramètres
        </button>
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#94A3B8] transition-colors hover:bg-white/[0.04] hover:text-[#EF4444]">
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}
