"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, MoreHorizontal, Users } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface PostCardProps {
  post: {
    id: number
    user: {
      name: string
      avatar: string
      university: string
    }
    content: string
    image?: string
    tags: string[]
    status: "Have" | "Find"
    likes: number
    comments: number
    timeAgo: string
  }
  onLike?: (postId: number) => void
  onComment?: (postId: number) => void
  onShare?: (postId: number) => void
  onCollaborate?: (post: any) => void
}

export function PostCard({ post, onLike, onComment, onShare, onCollaborate }: PostCardProps) {
  const [isLiked, setIsLiked] = React.useState(false)
  const [likeCount, setLikeCount] = React.useState(post.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
    onLike?.(post.id)
  }

  const handleComment = () => {
    onComment?.(post.id)
  }

  const handleShare = () => {
    onShare?.(post.id)
  }

  const handleCollaborate = () => {
    onCollaborate?.(post)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">{post.user.name}</h3>
              <p className="text-xs text-muted-foreground">{post.user.university}</p>
              <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={post.status === "Have" ? "default" : "secondary"}
              className={`text-xs ${
                post.status === "Have"
                  ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                  : "border-orange-500 bg-orange-500/10 text-orange-500"
              }`}
            >
              {post.status === "Have" ? "Offering" : "Looking For"}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleCollaborate}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Collaborate</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  <span>Report</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <p className="text-sm mb-3 leading-relaxed">{post.content}</p>

        {post.image && (
          <div className="mb-3 rounded-lg overflow-hidden">
            <img src={post.image || "/placeholder.svg"} alt="Post content" className="w-full h-48 object-cover" />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="rounded-full text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 ${isLiked ? "text-red-500" : ""}`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              <span className="text-sm">{likeCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={handleComment}>
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{post.comments}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              <span className="text-sm">Share</span>
            </Button>
          </div>
          <Button
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white"
            onClick={handleCollaborate}
          >
            <Users className="h-4 w-4 mr-1" />
            Collaborate
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
