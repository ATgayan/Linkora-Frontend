'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type UserCardProps = {
  user: {
    uid: string
    name: string
    photoURL?: string
    university?: { name?: string; faculty?: string; degree?: string }
    location?: string
    relationshipStatus?: string
    bio?: string
    skills?: string[]
    socialLinks?: Record<string, string>
  }
  onConnect: (uid: string) => void
}

export const UserCard: React.FC<UserCardProps> = ({ user, onConnect }) => {
  const router = useRouter()

  const {
    uid,
    name,
    photoURL,
    university,
    location,
    relationshipStatus,
    bio,
    skills = [],
  } = user

  const handleConnect = () => {
    if (user) {
      onConnect(uid)
      router.push(`/messages/${uid}`)
    } else {
      console.log(`Connection request sent to user ${uid}`)
      router.push(`/messages/${uid}`)
    }
  }

  return (
    <div className="w-100 h-64 mx-auto rounded-2xl border bg-card p-6 shadow-lg transition hover:shadow-xl dark:border-border overflow-hidden">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full border overflow-hidden flex-shrink-0">
          <Image
            src={photoURL || '/profile_Pic/nopic.jpg'}
            alt={name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-foreground truncate">{name}</h2>
          
          {university && (
            <div className="text-xs text-muted-foreground mt-1 leading-tight">
              {university.name && <p className="truncate">{university.name}</p>}
              {university.faculty && <p className="truncate">Faculty of {university.faculty}</p>}
              {university.degree && <p className="truncate">{university.degree}</p>}
            </div>
          )}
          
          {location && (
            <div className="text-xs text-muted-foreground mt-1 truncate">{location}</div>
          )}
          
          {relationshipStatus && (
            <div className="text-xs italic text-muted-foreground mt-1 truncate">
              {relationshipStatus}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex gap-3 mt-20">
        <Button
          size="sm"
          className="flex-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90 text-sm"
          onClick={handleConnect}
        >
          Message
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1 rounded-full border-primary text-primary hover:bg-primary/10 text-sm"
          onClick={() => router.push(`/profile/${uid}`)}
        >
          View Profile
        </Button>
      </div>
    </div>
  )
}