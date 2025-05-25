"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UserIcon } from "lucide-react"

interface UserCardProps {
  user: {
    id: number
    name: string
    avatar: string
    university: string
    skills: string[]
    status: string
    lookingFor: string
    bio: string
  }
  onConnect?: (userId: number) => void
}

export function UserCard({ user, onConnect }: UserCardProps) {
  // Generate a URL-friendly username
  const usernameSlug = user.name.toLowerCase().replace(/\s+/g, "-")

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <Link href={`/profile/${usernameSlug}`}>
          <div className="flex items-center gap-4 border-b p-4 cursor-pointer hover:bg-muted/50 transition-colors">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-xs text-muted-foreground">{user.university}</p>
            </div>
          </div>
        </Link>
        <div className="p-4">
          <p className="mb-3 text-sm line-clamp-2">{user.bio}</p>
          <div className="mb-3 flex flex-wrap gap-1">
            {user.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="rounded-full">
                {skill}
              </Badge>
            ))}
          </div>
          <div className="mb-4">
            <Badge
              className={`rounded-full ${
                user.status === "Find"
                  ? "border-purple-500 bg-purple-500/10 text-purple-500"
                  : "border-blue-500 bg-blue-500/10 text-blue-500"
              }`}
              variant="outline"
            >
              {user.status === "Find" ? "Looking For: " : "Offering: "}
              {user.lookingFor}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 flex items-center justify-center gap-1" asChild>
              <Link href={`/profile/${usernameSlug}`}>
                <UserIcon className="h-4 w-4" />
                View Profile
              </Link>
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white"
              onClick={() => onConnect && onConnect(user.id)}
            >
              Connect
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
