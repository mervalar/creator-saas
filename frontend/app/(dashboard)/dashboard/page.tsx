import { auth } from '@/lib/auth'
import { DashboardTopbar } from '@/components/layout/DashboardTopbar'
import { GrowthChart } from '@/components/dashboard/GrowthChart'
import { Eye, Film, TrendingUp, Zap, Video, ArrowUpRight, Clock } from 'lucide-react'

const stats = [
  {
    label: 'Vues totales',
    value: '1.2M',
    change: '+18%',
    positive: true,
    icon: Eye,
    color: '#7C3AED',
  },
  {
    label: 'Nouveaux abonnés',
    value: '+2 400',
    change: '+31%',
    positive: true,
    icon: TrendingUp,
    color: '#22D3EE',
  },
  {
    label: 'Shorts générés',
    value: '24',
    change: '7 en cours',
    positive: true,
    icon: Film,
    color: '#3B82F6',
  },
  {
    label: 'Publications auto',
    value: '18',
    change: '3 planifiées',
    positive: true,
    icon: Zap,
    color: '#22C55E',
  },
]

const recentShorts = [
  {
    id: '1',
    title: 'Les secrets du growth hacking en 2024',
    platform: 'YouTube',
    views: '48 200',
    duration: '0:58',
    status: 'Publié',
    ago: 'il y a 2j',
  },
  {
    id: '2',
    title: "Comment automatiser son business avec l'IA",
    platform: 'TikTok',
    views: '124 700',
    duration: '0:45',
    status: 'Publié',
    ago: 'il y a 3j',
  },
  {
    id: '3',
    title: 'Productivité : mes 5 outils indispensables',
    platform: 'Instagram',
    views: '31 400',
    duration: '1:02',
    status: 'Publié',
    ago: 'il y a 5j',
  },
  {
    id: '4',
    title: 'Podcast #42 — Interview Elon Musk clip',
    platform: 'YouTube',
    views: '—',
    duration: '0:52',
    status: 'Planifié',
    ago: 'demain 14h',
  },
]

const platforms = [
  { name: 'YouTube', pct: 60, color: '#EF4444', subscribers: '12 400' },
  { name: 'TikTok', pct: 25, color: '#F9FAFB', subscribers: '8 200' },
  { name: 'Instagram', pct: 15, color: '#a78bfa', subscribers: '3 900' },
]

export default async function DashboardPage() {
  const session = await auth()
  const firstName = session?.user?.name?.split(' ')[0] ?? 'Créateur'

  return (
    <>
      <DashboardTopbar
        title="Dashboard"
        subtitle={`Bienvenue, ${firstName} — voici vos performances`}
      />
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
                <p className="text-xs text-[#22C55E]">{s.change}</p>
              </div>
            ))}
          </div>

          {/* Chart + Platforms */}
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Growth chart */}
            <div className="col-span-2 rounded-2xl border border-white/[0.07] bg-[#121A2A] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-[#F9FAFB]">Croissance — 30 jours</h2>
                  <p className="text-xs text-[#94A3B8]">Vues et abonnés cumulés</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-[#7C3AED]" />
                    <span className="text-xs text-[#94A3B8]">Vues</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-[#22D3EE]" />
                    <span className="text-xs text-[#94A3B8]">Abonnés</span>
                  </div>
                </div>
              </div>
              <GrowthChart />
            </div>

            {/* Platforms */}
            <div className="rounded-2xl border border-white/[0.07] bg-[#121A2A] p-5">
              <h2 className="mb-4 text-sm font-semibold text-[#F9FAFB]">Répartition plateformes</h2>
              <div className="space-y-4">
                {platforms.map((p) => (
                  <div key={p.name}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs font-medium text-[#F9FAFB]">{p.name}</span>
                      <span className="text-xs text-[#94A3B8]">{p.subscribers} abonnés</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${p.pct}%`, backgroundColor: p.color }}
                      />
                    </div>
                    <p className="mt-1 text-right text-[10px] text-[#94A3B8]">{p.pct}%</p>
                  </div>
                ))}
              </div>

              {/* Connect CTA */}
              <div className="mt-6 rounded-xl border border-dashed border-white/10 p-3 text-center">
                <p className="text-xs text-[#94A3B8]">Connectez vos vraies chaînes</p>
                <button className="mt-2 text-xs font-medium text-[#a78bfa] hover:underline">
                  Gérer les intégrations →
                </button>
              </div>
            </div>
          </div>

          {/* Recent shorts */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#121A2A] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#F9FAFB]">Shorts récents</h2>
              <button className="flex items-center gap-1 text-xs text-[#a78bfa] hover:underline">
                Voir tout <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
            <div className="space-y-2">
              {recentShorts.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.03]"
                >
                  {/* Thumbnail placeholder */}
                  <div className="flex h-10 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-white/[0.05]">
                    <Video className="h-4 w-4 text-[#94A3B8]/50" />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#F9FAFB]">{s.title}</p>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-[#94A3B8]">
                      <span>{s.platform}</span>
                      <span>·</span>
                      <Clock className="h-3 w-3" />
                      <span>{s.duration}</span>
                    </div>
                  </div>

                  {/* Views */}
                  <div className="hidden text-right sm:block">
                    <p className="text-sm font-semibold text-[#F9FAFB]">{s.views}</p>
                    <p className="text-xs text-[#94A3B8]">vues</p>
                  </div>

                  {/* Status */}
                  <div className="flex-shrink-0 text-right">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        s.status === 'Publié'
                          ? 'bg-[#22C55E]/10 text-[#22C55E]'
                          : 'bg-[#F59E0B]/10 text-[#F59E0B]'
                      }`}
                    >
                      {s.status}
                    </span>
                    <p className="mt-1 text-[10px] text-[#94A3B8]">{s.ago}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
