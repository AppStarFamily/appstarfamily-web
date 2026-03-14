import EmpireDashboard from './EmpireDashboard'

async function getEmpireStatus() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

  try {
    const res = await fetch(`${baseUrl}/api/empire-status`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      return { error: `Status ${res.status}`, agents: {}, crons: {}, lessons: [] }
    }
    return res.json()
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Fetch failed'
    return { error: message, agents: {}, crons: {}, lessons: [] }
  }
}

export default async function EmpireDashboardPage() {
  const status = await getEmpireStatus()
  return <EmpireDashboard initialData={status} />
}
