'use client'

import { AgentCard, type AgentConfig } from './AgentCard'

const agents: AgentConfig[] = [
  {
    id: 'chef',
    name: 'Chef',
    role: 'Gestionnaire de studio',
    description:
      'Votre tableau de bord central. Suivez vos performances sur toutes les plateformes et obtenez une vue unifiée de votre activité créative.',
    href: '/dashboard',
    icon: '🧠',
    status: 'online',
    tags: ['Analytics', 'YouTube', 'TikTok', 'Instagram'],
  },
  {
    id: 'editor',
    name: 'Éditeur',
    role: 'Ingénieur vidéo IA',
    description:
      "Déposez votre podcast brut. L'Éditeur transcrit, détecte vos moments viraux, découpe 5 shorts verticaux et génère les sous-titres — entièrement automatisé.",
    href: '/shorts',
    icon: '🎬',
    status: 'standby',
    tags: ['Transcription', 'Détection de clips', 'FFmpeg', 'Sous-titres'],
  },
  {
    id: 'scheduler',
    name: 'Planificateur',
    role: 'Agent de distribution',
    description:
      'Choisissez une heure et une plateforme. Le Planificateur gère les publications sur YouTube, TikTok et Instagram avec des descriptions et hashtags générés par IA.',
    href: '/posting',
    icon: '📅',
    status: 'online',
    tags: ['Auto-publication', 'n8n', 'Calendrier', 'Copywriting IA'],
  },
]

export function AgentGrid() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent, i) => (
          <AgentCard key={agent.id} agent={agent} index={i} />
        ))}
      </div>
    </section>
  )
}
