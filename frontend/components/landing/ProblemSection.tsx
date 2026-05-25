'use client'

import { motion } from 'framer-motion'
import { Camera, Scissors, Send } from 'lucide-react'

const problems = [
  {
    icon: Camera,
    title: 'Le tournage',
    desc: 'Des heures à préparer, cadrer et enregistrer chaque épisode. Le temps passe avant même de commencer à éditer.',
    time: '3–5h / épisode',
  },
  {
    icon: Scissors,
    title: 'Le montage',
    desc: 'Découper, sous-titrer, reformater en vertical, adapter chaque clip à chaque plateforme. Répétitif et épuisant.',
    time: '4–8h / épisode',
    highlighted: true,
  },
  {
    icon: Send,
    title: 'La publication',
    desc: 'Rédiger les titres, hashtags, descriptions. Poster au bon moment sur chaque plateforme. Une tâche de plus.',
    time: '2–3h / épisode',
  },
]

export function ProblemSection() {
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 space-y-4 text-center"
        >
          <span className="text-xs font-semibold tracking-widest text-[#7C3AED] uppercase">
            Le problème
          </span>
          <h2 className="font-heading text-4xl font-bold text-[#F9FAFB] sm:text-5xl">
            Créer du contenu prend <span className="gradient-text">trop de temps</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-[#94A3B8]">
            Un seul épisode de podcast peut nécessiter jusqu&apos;à 16 heures de travail de
            production. C&apos;est insoutenable.
          </p>
        </motion.div>

        {/* Problem cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 ${
                p.highlighted
                  ? 'border-[#EF4444]/30 bg-[#EF4444]/5'
                  : 'border-white/[0.07] bg-[#121A2A]'
              }`}
            >
              {p.highlighted && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#EF4444]/5 to-transparent" />
              )}
              <div className="relative">
                <div
                  className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                    p.highlighted ? 'bg-[#EF4444]/15' : 'bg-white/[0.05]'
                  }`}
                >
                  <p.icon
                    className={`h-5 w-5 ${p.highlighted ? 'text-[#EF4444]' : 'text-[#94A3B8]'}`}
                  />
                </div>
                <h3 className="font-heading mb-2 text-lg font-semibold text-[#F9FAFB]">
                  {p.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-[#94A3B8]">{p.desc}</p>
                <div
                  className={`inline-flex rounded-lg px-3 py-1 text-xs font-semibold ${
                    p.highlighted
                      ? 'bg-[#EF4444]/15 text-[#EF4444]'
                      : 'bg-white/[0.05] text-[#94A3B8]'
                  }`}
                >
                  ⏱ {p.time}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
