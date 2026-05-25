import { DashboardTopbar } from '@/components/layout/DashboardTopbar'
import { BarChart3, Eye, Film, TrendingUp, Zap } from 'lucide-react'

const stats = [
  { label: 'Vues totales', value: '—', icon: Eye, color: '#7C3AED' },
  { label: 'Shorts générés', value: '—', icon: Film, color: '#3B82F6' },
  { label: 'Engagement moyen', value: '—', icon: TrendingUp, color: '#22D3EE' },
  { label: 'Publications auto', value: '—', icon: Zap, color: '#22C55E' },
]

export default function DashboardPage() {
  return (
    <>
      <DashboardTopbar title="Dashboard" subtitle="Vue d'ensemble de vos performances" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-[#121A2A] p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#94A3B8]">{s.label}</span>
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${s.color}18` }}
                  >
                    <s.icon className="h-4 w-4" style={{ color: s.color }} />
                  </div>
                </div>
                <p className="font-heading text-2xl font-bold text-[#F9FAFB]">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Charts placeholder */}
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="col-span-2 flex items-center justify-center rounded-2xl border border-white/[0.07] bg-[#121A2A] p-8">
              <div className="text-center">
                <BarChart3 className="mx-auto mb-3 h-10 w-10 text-[#94A3B8]/30" />
                <p className="text-sm font-medium text-[#F9FAFB]">
                  Analytics disponibles après connexion
                </p>
                <p className="mt-1 text-xs text-[#94A3B8]">
                  Connectez vos chaînes YouTube, TikTok et Instagram
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-2xl border border-[#7C3AED]/20 bg-[#7C3AED]/5 p-8">
              <div className="text-center">
                <Zap className="mx-auto mb-3 h-10 w-10 text-[#7C3AED]/50" />
                <p className="text-sm font-medium text-[#F9FAFB]">Insights IA</p>
                <p className="mt-1 text-xs text-[#94A3B8]">Disponible avec des données</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
