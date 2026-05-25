'use client'

import { Bell, Search, Sparkles } from 'lucide-react'

type DashboardTopbarProps = {
  title: string
  subtitle?: string
}

export function DashboardTopbar({ title, subtitle }: DashboardTopbarProps) {
  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#0B0F1A]/80 px-6 backdrop-blur-sm">
      {/* Title */}
      <div>
        <h1 className="font-heading text-lg font-bold text-[#F9FAFB]">{title}</h1>
        {subtitle && <p className="text-xs text-[#94A3B8]">{subtitle}</p>}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2 md:flex">
          <Search className="h-3.5 w-3.5 text-[#94A3B8]" />
          <span className="text-xs text-[#94A3B8]">Rechercher...</span>
          <kbd className="ml-2 rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-[#94A3B8]">
            ⌘K
          </kbd>
        </div>

        {/* AI Assistant button */}
        <button className="flex items-center gap-1.5 rounded-xl border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-3 py-2 text-xs font-medium text-[#a78bfa] transition-all hover:bg-[#7C3AED]/20">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="hidden sm:block">Assistant IA</span>
        </button>

        {/* Notifications */}
        <button className="relative rounded-xl border border-white/[0.07] bg-white/[0.03] p-2 text-[#94A3B8] transition-colors hover:text-[#F9FAFB]">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
        </button>

        {/* Avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#7C3AED]/20 text-sm font-bold text-[#a78bfa]">
          U
        </div>
      </div>
    </header>
  )
}
