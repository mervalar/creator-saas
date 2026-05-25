import { DashboardTopbar } from '@/components/layout/DashboardTopbar'
import { Upload, Sparkles } from 'lucide-react'

export default function ShortsPage() {
  return (
    <>
      <DashboardTopbar
        title="Générateur de Shorts"
        subtitle="Transformez votre podcast en 5 shorts viraux"
      />
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-6 text-center">
          {/* Upload zone */}
          <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border-2 border-dashed border-[#7C3AED]/30 bg-[#7C3AED]/5 p-16 transition-all duration-300 hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7C3AED]/15">
              <Upload className="h-7 w-7 text-[#7C3AED]" />
            </div>
            <div>
              <p className="font-heading text-lg font-semibold text-[#F9FAFB]">
                Déposez votre podcast ici
              </p>
              <p className="mt-1 text-sm text-[#94A3B8]">MP4, MOV, MKV jusqu&apos;à 5GB</p>
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-[#7C3AED] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7C3AED]/30 transition-all hover:bg-[#6d28d9]">
              <Upload className="h-4 w-4" />
              Choisir un fichier
            </button>
          </div>

          {/* Coming soon note */}
          <div className="flex items-center justify-center gap-2 rounded-xl border border-[#7C3AED]/20 bg-[#7C3AED]/5 px-4 py-3">
            <Sparkles className="h-4 w-4 text-[#a78bfa]" />
            <p className="text-sm text-[#94A3B8]">
              <span className="font-medium text-[#a78bfa]">Disponible prochainement</span> —
              l&apos;IA génère vos shorts automatiquement
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
