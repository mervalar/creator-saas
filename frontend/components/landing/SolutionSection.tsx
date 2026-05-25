'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Upload, Cpu, Film, Send } from 'lucide-react'

const steps = [
  { icon: Upload, label: 'Upload', desc: 'Déposez votre podcast', color: '#7C3AED' },
  { icon: Cpu, label: 'IA analyse', desc: 'Détection des moments viraux', color: '#3B82F6' },
  { icon: Film, label: '5 Shorts générés', desc: 'Découpés, sous-titrés', color: '#22D3EE' },
  { icon: Send, label: 'Publication', desc: 'YouTube, TikTok, Instagram', color: '#22C55E' },
]

export function SolutionSection() {
  return (
    <section className="relative px-6 py-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C3AED]/6 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 space-y-4 text-center"
        >
          <span className="text-xs font-semibold tracking-widest text-[#22D3EE] uppercase">
            La solution
          </span>
          <h2 className="font-heading text-4xl font-bold text-[#F9FAFB] sm:text-5xl">
            Nous automatisons <span className="gradient-text">80% de votre travail</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-[#94A3B8]">
            En quelques minutes, votre podcast devient une machine à contenu multiplateforme.
          </p>
        </motion.div>

        {/* Pipeline steps */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-stretch md:justify-between">
          {steps.map((step, i) => (
            <div key={step.label} className="flex flex-1 items-center gap-4 md:flex-col md:gap-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="shine-hover flex flex-1 flex-col items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#121A2A] p-6 text-center transition-all duration-300 md:w-full"
                style={{ '--glow-color': step.color } as React.CSSProperties}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow =
                    `0 0 30px -8px ${step.color}50`
                  ;(e.currentTarget as HTMLElement).style.borderColor = `${step.color}25`
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'
                }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${step.color}20` }}
                >
                  <step.icon className="h-6 w-6" style={{ color: step.color }} />
                </div>
                <div>
                  <p className="font-heading font-semibold text-[#F9FAFB]">{step.label}</p>
                  <p className="mt-1 text-sm text-[#94A3B8]">{step.desc}</p>
                </div>
              </motion.div>

              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <div className="flex-shrink-0 md:my-auto">
                  <ArrowRight className="h-5 w-5 rotate-90 text-[#94A3B8]/30 md:rotate-0" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Time saved badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 rounded-2xl border border-[#22C55E]/20 bg-[#22C55E]/8 px-6 py-4">
            <span className="text-2xl font-bold text-[#22C55E]">⚡</span>
            <div>
              <p className="font-heading font-bold text-[#F9FAFB]">De 16h à moins de 15 minutes</p>
              <p className="text-sm text-[#94A3B8]">par épisode de podcast</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
