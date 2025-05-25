"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Send, Paperclip, ImageIcon, Calendar, CheckCircle } from "lucide-react"

interface CollaborationFeedProps {
  collaborationId: number
  members: any[]
}

export function CollaborationFeed({ collaborationId, members }: CollaborationFeedProps) {
  const [message, setMessage] = React.useState("")
  const [feedItems, setFeedItems] = React.useState([
    {
      id: 1,
      type: "message",
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content: "Hey everyone! Welcome to the team. Let's start by discussing our timeline and milestones.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "milestone",
      user: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content: "Created milestone: UI Wireframes",
      timestamp: "1 hour ago",
      milestone: {
        title: "UI Wireframes",
        dueDate: "Next Friday",
        status: "pending",
      },
    },
    {
      id: 3,
      type: "message",
      user: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content: "I've started working on the initial wireframes. Should have something to share by tomorrow!",
      timestamp: "45 minutes ago",
    },
    {
      id: 4,
      type: "file",
      user: {
        name: "Marcus Rodriguez",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content: "Shared file: project-requirements.pdf",
      timestamp: "30 minutes ago",
      file: {
        name: "project-requirements.pdf",
        size: "2.4 MB",
      },
    },
    {
      id: 5,
      type: "update",
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content: "Updated project status to 'In Progress'",
      timestamp: "15 minutes ago",
    },
  ])

  const handleSendMessage = () => {
    if (message.trim() === "") return

    const newMessage = {
      id: feedItems.length + 1,
      type: "message",
      user: {
        name: "You",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content: message,
      timestamp: "Just now",
    }

    setFeedItems([...feedItems, newMessage])
    setMessage("")
  }

  const renderFeedItem = (item: any) => {
    switch (item.type) {
      case "message":
        return (
          <div key={item.id} className="flex gap-2 sm:gap-3 p-3 sm:p-4">
            <Avatar className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
              <AvatarImage src={item.user.avatar || "/placeholder.svg"} alt={item.user.name} />
              <AvatarFallback className="text-xs">{item.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-xs sm:text-sm truncate">{item.user.name}</span>
                <span className="text-xs text-muted-foreground flex-shrink-0">{item.timestamp}</span>
              </div>
              <p className="text-xs sm:text-sm break-words">{item.content}</p>
            </div>
          </div>
        )

      case "milestone":
        return (
          <div key={item.id} className="flex gap-2 sm:gap-3 p-3 sm:p-4">
            <Avatar className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
              <AvatarImage src={item.user.avatar || "/placeholder.svg"} alt={item.user.name} />
              <AvatarFallback className="text-xs">{item.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-xs sm:text-sm truncate">{item.user.name}</span>
                <span className="text-xs text-muted-foreground flex-shrink-0">{item.timestamp}</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2">{item.content}</p>
              <div className="bg-muted/50 rounded-lg p-2 sm:p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0" />
                    <span className="font-medium text-xs sm:text-sm truncate">{item.milestone.title}</span>
                  </div>
                  <Badge
                    variant={item.milestone.status === "pending" ? "secondary" : "default"}
                    className="text-xs flex-shrink-0"
                  >
                    {item.milestone.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Due: {item.milestone.dueDate}</p>
              </div>
            </div>
          </div>
        )

      case "file":
        return (
          <div key={item.id} className="flex gap-2 sm:gap-3 p-3 sm:p-4">
            <Avatar className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
              <AvatarImage src={item.user.avatar || "/placeholder.svg"} alt={item.user.name} />
              <AvatarFallback className="text-xs">{item.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-xs sm:text-sm truncate">{item.user.name}</span>
                <span className="text-xs text-muted-foreground flex-shrink-0">{item.timestamp}</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2">{item.content}</p>
              <div className="bg-muted/50 rounded-lg p-2 sm:p-3 flex items-center gap-2 sm:gap-3">
                <Paperclip className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-xs sm:text-sm truncate">{item.file.name}</p>
                  <p className="text-xs text-muted-foreground">{item.file.size}</p>
                </div>
                <Button variant="outline" size="sm" className="text-xs h-7 px-2 flex-shrink-0">
                  Download
                </Button>
              </div>
            </div>
          </div>
        )

      case "update":
        return (
          <div key={item.id} className="flex gap-2 sm:gap-3 p-3 sm:p-4">
            <Avatar className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
              <AvatarImage src={item.user.avatar || "/placeholder.svg"} alt={item.user.name} />
              <AvatarFallback className="text-xs">{item.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                <span className="font-medium text-xs sm:text-sm truncate">{item.user.name}</span>
                <span className="text-xs text-muted-foreground flex-shrink-0">{item.timestamp}</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">{item.content}</p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="p-3 sm:p-4 border-b">
        <CardTitle className="text-base sm:text-lg">Team Feed</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-muted-foreground">{members.length} team members</span>
          <div className="flex -space-x-1 sm:-space-x-2">
            {members.slice(0, 4).map((member, index) => (
              <Avatar key={index} className="h-5 w-5 sm:h-6 sm:w-6 border-2 border-background">
                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
            {members.length > 4 && (
              <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                <span className="text-xs text-muted-foreground">+{members.length - 4}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-y-auto max-h-[300px] sm:max-h-[500px]">
        <div className="space-y-0">
          {feedItems.map((item, index) => (
            <div key={item.id}>
              {renderFeedItem(item)}
              {index < feedItems.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>

      <div className="border-t p-3 sm:p-4">
        <div className="flex gap-2">
          <Avatar className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
            <AvatarFallback className="text-xs">Y</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex gap-1 sm:gap-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
              className="flex-1 text-sm"
            />
            <div className="hidden sm:flex gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleSendMessage} size="icon" className="h-9 w-9 flex-shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
