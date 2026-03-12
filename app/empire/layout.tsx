import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Pruttius Empire — Meet the Agents',
  description: 'Seven autonomous AI agents running 24/7. Meet the team behind App Star Family.',
}

export default function EmpireLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
