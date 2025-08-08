'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import ProfileViewEnhanced from '@/profile-view-enhanced'
import OtherProfileView from '@/other-profile-view'
import { auth } from '@/lib/firebase' // your Firebase app config

export default function ProfilePage() {
  const params = useParams<{ Card: string }>()
  const profileUid = params.Card
  console.log('profile uid',profileUid);
  const [currentUid, setCurrentUid] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUid(user.uid)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) return null;

  const isOwnProfile = currentUid === profileUid;

  return isOwnProfile ? (
    <ProfileViewEnhanced/>
  ) : (
    <OtherProfileView uid={profileUid} />
  )
}
