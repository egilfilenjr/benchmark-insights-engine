
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function useSupabaseAuth() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  return { user }
}
