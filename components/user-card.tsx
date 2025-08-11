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
    <div className="w-full max-w-md mx-auto rounded-2xl border bg-card p-6 shadow-lg transition hover:shadow-xl dark:border-border">
      <div className="flex items-center gap-4">
        <Image
          src={photoURL || '/default-avatar.png'}
          alt={name}
          width={72}
          height={72}
          className=" h-20 w-20 rounded-full border object-cover"
        />

        <div>
          <h2 className="text-xl font-semibold text-foreground">{name}</h2>

          {university && (
            <div className="text-sm text-muted-foreground mt-1 leading-tight">
              {university.name && <p>{university.name}</p>}
              {university.faculty && <p>Faculty of {university.faculty}</p>}
              {university.degree && <p>{university.degree}</p>}
            </div>
          )}

          {location && (
            <div className="text-sm text-muted-foreground mt-1">{location}</div>
          )}

          {relationshipStatus && (
            <div className="text-sm italic text-muted-foreground mt-1">
              {relationshipStatus}
            </div>
          )}
        </div>
      </div>

     

      <div className="mt-6 flex gap-3">
        <Button
          size="sm"
          className="flex-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90"
          onClick={handleConnect}
        >
          Message
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1 rounded-full border-primary text-primary hover:bg-primary/10"
          onClick={() => router.push(`/profile/${uid}`)}
        >
          View Profile
        </Button>
      </div>
    </div>
  )
}
