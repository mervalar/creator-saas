'use client'

import { motion } from 'framer-motion'
import { Film, BarChart3, CalendarCheck, Brain } from 'lucide-react'

const features = [
  {
    icon: Film,
    title: 'Génération automatique de shorts',
    desc: 'Uploadez votre podcast. Notre IA détecte les 5 moments les plus viraux, découpe les clips, ajoute les sous-titres animés et les formate en 9:16.',
    color: '#7C3AED',
    tag: 'Core feature',
  },
  {
    icon: BarChart3,
    title: 'Analytics intelligentes',
    desc: 'Visualisez vos performances YouTube, TikTok et Instagram en un seul endroit. Identifiez ce qui fonctionne et ce qui ne fonctionne pas.',
    color: '#3B82F6',
    tag: 'Insights',
  },
  {
    icon: CalendarCheck,
    title: 'Publication automatique',
    desc: "Planifiez et publiez sur toutes vos plateformes en un clic. L'IA génère les titres, descriptions et hashtags optimisés pour chaque réseau.",
    color: '#22D3EE',
    tag: 'Automation',
  },
  {
    icon: Brain,
    title: 'Assistant IA pour contenu viral',
    desc: "Votre équipe d'agents IA analyse les tendances et vous suggère les formats, angles et hooks qui maximisent votre croissance.",
    color: '#22C55E',
    tag: 'AI Assistant',
  },
]

export function FeaturesSection() {
  return (
    <section id="fonctionnalités" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 space-y-4 text-center"
        >
          <span className="text-xs font-semibold tracking-widest text-[#3B82F6] uppercase">
            Fonctionnalités
          </span>
          <h2 className="font-heading text-4xl font-bold text-[#F9FAFB] sm:text-5xl">
            Tout ce dont vous avez besoin, <br />
            <span className="gradient-text">rien de superflu</span>
          </h2>
        </motion.div>

        {/* Feature grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="shine-hover group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#121A2A] p-7 transition-all duration-300 hover:-translate-y-1"
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px -10px ${f.color}40`
                ;(e.currentTarget as HTMLElement).style.borderColor = `${f.color}20`
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'
              }}
            >
              {/* Subtle gradient bg */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse at top left, ${f.color}08 0%, transparent 60%)`,
                }}
              />

              <div className="relative">
                <div className="mb-5 flex items-start justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${f.color}18` }}
                  >
                    <f.icon className="h-5 w-5" style={{ color: f.color }} />
                  </div>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                    style={{ backgroundColor: `${f.color}15`, color: f.color }}
                  >
                    {f.tag}
                  </span>
                </div>
                <h3 className="font-heading mb-3 text-lg font-bold text-[#F9FAFB]">{f.title}</h3>
                <p className="text-sm leading-relaxed text-[#94A3B8]">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
