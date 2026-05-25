'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Karim B.',
    handle: '@karimcreates',
    avatar: '🎙️',
    text: "J'uploadais 1 épisode par semaine et je passais 12h en production. Maintenant c'est 20 minutes. Mon audience a triplé en 3 mois.",
    platform: 'YouTube · 48K abonnés',
    stars: 5,
  },
  {
    name: 'Sarah M.',
    handle: '@sarahpodcast',
    avatar: '🎧',
    text: "Les shorts générés par l'IA sont meilleurs que ceux que je montais manuellement. L'engagement sur TikTok est fou.",
    platform: 'TikTok · 120K followers',
    stars: 5,
  },
  {
    name: 'Thomas L.',
    handle: '@thomastech',
    avatar: '🎤',
    text: "La publication automatique m'a sauvé la vie. Je poste sur 3 plateformes sans lever le petit doigt. Game changer.",
    platform: 'Instagram · 35K abonnés',
    stars: 5,
  },
]

const stats = [
  { value: '+300%', label: 'croissance moyenne', sub: 'en 90 jours' },
  { value: '-80%', label: 'temps de montage', sub: 'économisé' },
  { value: '+2x', label: "taux d'engagement", sub: 'vs. moyenne' },
  { value: '5min', label: 'pour 5 shorts', sub: 'générés par IA' },
]

export function SocialProofSection() {
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl space-y-20">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-white/[0.07] bg-[#121A2A] p-6 text-center"
            >
              <p className="font-heading gradient-text text-3xl font-bold">{s.value}</p>
              <p className="mt-1 text-sm font-medium text-[#F9FAFB]">{s.label}</p>
              <p className="text-xs text-[#94A3B8]">{s.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 space-y-3 text-center"
          >
            <span className="text-xs font-semibold tracking-widest text-[#FACC15] uppercase">
              Témoignages
            </span>
            <h2 className="font-heading text-4xl font-bold text-[#F9FAFB]">
              Ils ont transformé leur workflow
            </h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-[#121A2A] p-6"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-[#FACC15] text-[#FACC15]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="flex-1 text-sm leading-relaxed text-[#94A3B8]">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#F9FAFB]">{t.name}</p>
                    <p className="text-xs text-[#94A3B8]">{t.platform}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
