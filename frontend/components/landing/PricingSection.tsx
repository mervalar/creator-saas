'use client'

import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Gratuit',
    price: '0€',
    period: 'pour toujours',
    desc: 'Pour découvrir la plateforme',
    features: ['2 podcasts / mois', '5 shorts générés', 'Analytics basiques', 'Export manuel'],
    cta: 'Commencer gratuitement',
    highlighted: false,
    color: '#94A3B8',
  },
  {
    name: 'Creator',
    price: '29€',
    period: '/ mois',
    desc: 'Pour les créateurs actifs',
    features: [
      '10 podcasts / mois',
      'Shorts illimités',
      'Analytics avancées',
      'Publication automatique',
      'Assistant IA',
      'Support prioritaire',
    ],
    cta: 'Essayer 14 jours gratuits',
    highlighted: true,
    color: '#7C3AED',
    badge: 'Populaire',
  },
  {
    name: 'Pro',
    price: '79€',
    period: '/ mois',
    desc: 'Pour les studios et pros',
    features: [
      'Podcasts illimités',
      'Shorts illimités',
      'Analytics enterprise',
      'Multi-comptes',
      'API access',
      'Onboarding dédié',
    ],
    cta: 'Contacter les ventes',
    highlighted: false,
    color: '#3B82F6',
  },
]

export function PricingSection() {
  return (
    <section id="tarifs" className="relative px-6 py-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C3AED]/6 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 space-y-4 text-center"
        >
          <span className="text-xs font-semibold tracking-widest text-[#7C3AED] uppercase">
            Tarifs
          </span>
          <h2 className="font-heading text-4xl font-bold text-[#F9FAFB] sm:text-5xl">
            Simple, transparent, <span className="gradient-text">sans surprise</span>
          </h2>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
                plan.highlighted
                  ? 'border-[#7C3AED]/40 bg-gradient-to-b from-[#7C3AED]/10 to-[#121A2A]'
                  : 'border-white/[0.07] bg-[#121A2A]'
              }`}
              style={plan.highlighted ? { boxShadow: '0 0 60px -15px rgba(124,58,237,0.4)' } : {}}
            >
              {plan.badge && (
                <div className="absolute top-5 right-5 flex items-center gap-1 rounded-full bg-[#7C3AED] px-2.5 py-0.5 text-[11px] font-bold text-white">
                  <Zap className="h-3 w-3" />
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <p className="font-heading text-sm font-semibold tracking-widest text-[#94A3B8] uppercase">
                  {plan.name}
                </p>
                <div className="mt-2 flex items-end gap-1">
                  <span className="font-heading text-4xl font-bold text-[#F9FAFB]">
                    {plan.price}
                  </span>
                  <span className="mb-1 text-sm text-[#94A3B8]">{plan.period}</span>
                </div>
                <p className="mt-1 text-sm text-[#94A3B8]">{plan.desc}</p>
              </div>

              <div className="mb-8 flex flex-col gap-3">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 flex-shrink-0" style={{ color: plan.color }} />
                    <span className="text-sm text-[#94A3B8]">{f}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/login"
                className={`mt-auto flex w-full items-center justify-center rounded-xl py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                  plan.highlighted
                    ? 'bg-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/30 hover:bg-[#6d28d9]'
                    : 'border border-white/10 bg-white/5 text-[#F9FAFB] hover:bg-white/10'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
