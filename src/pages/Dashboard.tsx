
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Dashboard() {
  const [aecr, setAecr] = useState(null)

  useEffect(() => {
    const fetchAECR = async () => {
      const { data } = await supabase
        .from('aecr_scores')
        .select('*')
        .order('date_calculated', { ascending: false })
        .limit(1)
        .single()
      setAecr(data)
    }
    fetchAECR()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AECR Dashboard</h1>
      {aecr ? (
        <div>
          <p>Score: {aecr.score}</p>
          <p>Percentile Rank: {aecr.percentile_rank}</p>
        </div>
      ) : (
        <p>Loading AECR Score...</p>
      )}
    </div>
  )
}
