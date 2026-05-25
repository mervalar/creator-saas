import { DashboardTopbar } from '@/components/layout/DashboardTopbar'
import { CalendarCheck, Sparkles } from 'lucide-react'

const platforms = [
  { name: 'YouTube', emoji: '▶️', color: '#EF4444' },
  { name: 'TikTok', emoji: '🎵', color: '#F9FAFB' },
  { name: 'Instagram', emoji: '📸', color: '#E1306C' },
]

export default function PostingPage() {
  return (
    <>
      <DashboardTopbar
        title="Publication Automatique"
        subtitle="Planifiez et publiez sur toutes vos plateformes"
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Platform toggles */}
          <div className="grid gap-4 md:grid-cols-3">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-[#121A2A] p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{p.emoji}</span>
                  <span className="font-heading text-sm font-semibold text-[#F9FAFB]">
                    {p.name}
                  </span>
                </div>
                <div className="h-6 w-11 cursor-pointer rounded-full border border-white/10 bg-white/5 p-0.5 transition-all">
                  <div className="h-5 w-5 rounded-full bg-[#94A3B8]" />
                </div>
              </div>
            ))}
          </div>

          {/* Calendar placeholder */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-[#121A2A] p-16 text-center">
            <CalendarCheck className="mb-4 h-12 w-12 text-[#94A3B8]/30" />
            <p className="font-heading text-lg font-semibold text-[#F9FAFB]">
              Calendrier de publication
            </p>
            <p className="mt-2 text-sm text-[#94A3B8]">
              Générez d&apos;abord des shorts pour les planifier ici
            </p>
          </div>

          {/* Coming soon */}
          <div className="flex items-center justify-center gap-2 rounded-xl border border-[#22D3EE]/20 bg-[#22D3EE]/5 px-4 py-3">
            <Sparkles className="h-4 w-4 text-[#22D3EE]" />
            <p className="text-sm text-[#94A3B8]">
              <span className="font-medium text-[#22D3EE]">Disponible prochainement</span> —
              publication automatique via n8n
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
