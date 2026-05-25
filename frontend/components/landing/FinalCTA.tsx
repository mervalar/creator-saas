'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Mic2 } from 'lucide-react'

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-28">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7C3AED]/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C3AED]/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          {/* Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7C3AED] shadow-2xl shadow-[#7C3AED]/40">
            <Mic2 className="h-8 w-8 text-white" />
          </div>

          {/* Headline */}
          <h2 className="font-heading text-4xl leading-[1.1] font-bold text-[#F9FAFB] sm:text-5xl lg:text-6xl">
            Transformez votre podcast en <span className="gradient-text">machine à contenu</span>
          </h2>

          <p className="mx-auto max-w-xl text-lg text-[#94A3B8]">
            Rejoignez les créateurs qui ont automatisé leur production et multiplient leur audience
            sans effort supplémentaire.
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/login"
              className="shine-hover flex w-full items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-8 py-4 font-semibold text-white shadow-2xl shadow-[#7C3AED]/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#6d28d9] hover:shadow-[#7C3AED]/50 sm:w-auto"
            >
              Commencer maintenant — c&apos;est gratuit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <p className="text-xs text-[#94A3B8]">Aucune carte bancaire requise · Accès immédiat</p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative mt-24 border-t border-white/[0.06] pt-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7C3AED]">
              <Mic2 className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-heading text-sm font-bold text-[#F9FAFB]">
              AI Podcast <span className="text-[#7C3AED]">Team</span>
            </span>
          </div>
          <p className="text-xs text-[#94A3B8]">© 2026 AI Podcast Team. Tous droits réservés.</p>
          <div className="flex gap-4 text-xs text-[#94A3B8]">
            <a href="#" className="hover:text-[#F9FAFB]">
              Confidentialité
            </a>
            <a href="#" className="hover:text-[#F9FAFB]">
              CGU
            </a>
            <a href="#" className="hover:text-[#F9FAFB]">
              Contact
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
