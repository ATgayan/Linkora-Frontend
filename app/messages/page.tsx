'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/useAuth'



export default function ChatPage() {
  const [channel, setChannel] = useState<any>(null)
  const [ready, setReady] = useState(false)
  
  const {user } =useAuth();



  if (!ready || !channel) return <div>Loading chat...</div>

  return (
    <div>
      <h1>Chat Page</h1>

    </div>
  )
}
