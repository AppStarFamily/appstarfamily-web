import EmpireDashboard from './EmpireDashboard'
import https from 'https'

const STATUS_URL = 'https://100.103.172.60:7823/empire-status?token=733aca2e27413d1ce72ab711fd890a83abb9fe56e17575fa835cd55ae61a3609'

const agent = new https.Agent({ rejectUnauthorized: false })

async function getEmpireStatus() {
  try {
    const res = await fetch(STATUS_URL, {
      // @ts-ignore — Node.js https agent to bypass self-signed cert
      agent,
      cache: 'no-store',
    })
    if (!res.ok) {
      return { error: `Upstream returned ${res.status}`, agents: {}, crons: {}, lessons: [] }
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
