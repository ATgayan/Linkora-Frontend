'use client'

import React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation" // ✅ correct one for App Router

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
    onConnect(uid);
    router.push(`/messages/${uid}`);
  } else {
    console.log(`Connection request sent to user ${uid}`);
    router.push(`/messages/${uid}`);
  }
};

  return (
    <div className="rounded-xl border p-4 shadow-sm bg-white dark:bg-gray-900 transition hover:shadow-md">
      <div className="flex items-center gap-4 mb-3">
        {/* Profile Picture */}
        <Image
          src={photoURL || "/default-avatar.png"}
          alt={name}
          width={64}
          height={64}
          className="rounded-full border object-cover"
        />

        <div>
          <div className="text-lg font-semibold">{name}</div>

          {university && (
            <div className="text-sm text-muted-foreground">
              {university.name}<br />
              {`Faculty of ${university.faculty}`}<br />
              {university.degree}
            </div>
          )}

          {location && <div className="text-sm text-muted-foreground">{location}</div>}

          {relationshipStatus && (
            <div className="text-sm italic text-gray-500">{relationshipStatus}</div>
          )}
        </div>
      </div>

      {bio && <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{bio}</p>}

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, idx) => (
            <Badge key={idx} variant="secondary" className="rounded-full">
              {skill}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <Button
          size="sm"
          className="w-50 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90"
          onClick={() => handleConnect()}
        >
          Message
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="w-50 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90"
          onClick={() => router.push(`/profile/${uid}`)} // ✅ use router directly
        >
          View profile
        </Button>
      </div>
    </div>
  )
}
