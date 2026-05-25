'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { date: '1 mai', views: 12400, subscribers: 340 },
  { date: '3 mai', views: 18200, subscribers: 520 },
  { date: '5 mai', views: 15800, subscribers: 410 },
  { date: '7 mai', views: 24600, subscribers: 780 },
  { date: '9 mai', views: 21300, subscribers: 640 },
  { date: '11 mai', views: 31200, subscribers: 920 },
  { date: '13 mai', views: 28900, subscribers: 850 },
  { date: '15 mai', views: 38400, subscribers: 1200 },
  { date: '17 mai', views: 35100, subscribers: 1050 },
  { date: '19 mai', views: 42700, subscribers: 1380 },
  { date: '21 mai', views: 48200, subscribers: 1540 },
  { date: '23 mai', views: 44800, subscribers: 1420 },
  { date: '25 mai', views: 52300, subscribers: 1690 },
]

type CustomTooltipProps = {
  active?: boolean
  payload?: Array<{ value: number; name: string; color: string }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-white/10 bg-[#121A2A] p-3 shadow-xl">
      <p className="mb-2 text-xs text-[#94A3B8]">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-xs text-[#F9FAFB]">
            {p.name === 'views'
              ? `${p.value.toLocaleString()} vues`
              : `+${p.value.toLocaleString()} abonnés`}
          </span>
        </div>
      ))}
    </div>
  )
}

export function GrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="subsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis
          dataKey="date"
          tick={{ fill: '#94A3B8', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="views"
          stroke="#7C3AED"
          strokeWidth={2}
          fill="url(#viewsGrad)"
        />
        <Area
          type="monotone"
          dataKey="subscribers"
          stroke="#22D3EE"
          strokeWidth={2}
          fill="url(#subsGrad)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
