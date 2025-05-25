"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Modal } from "@/components/ui/modal"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface CollaborationModalProps {
  isOpen: boolean
  onClose: () => void
  post?: {
    id: number
    user: {
      name: string
      avatar: string
      university: string
    }
    content: string
    tags: string[]
  }
}

export function CollaborationModal({ isOpen, onClose, post }: CollaborationModalProps) {
  const { toast } = useToast()
  const [message, setMessage] = React.useState("")

  const handleSubmit = () => {
    if (!message.trim()) return

    // In a real app, you would send this to your backend
    toast({
      title: "Collaboration request sent!",
      description: "Your request has been sent to the user.",
    })

    setMessage("")
    onClose()
  }

  return (
    <Modal
      title="Request Collaboration"
      description="Send a message to start collaborating"
      isOpen={isOpen}
      onClose={onClose}
    >
      {post && (
        <div className="mb-4 rounded-lg border p-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{post.user.name}</p>
              <p className="text-xs text-muted-foreground">{post.user.university}</p>
            </div>
          </div>
          <p className="mt-2 text-sm line-clamp-2">{post.content}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="rounded-full text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4 py-4">
        <Textarea
          placeholder="Introduce yourself and explain why you'd like to collaborate..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[120px]"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white"
          onClick={handleSubmit}
          disabled={!message.trim()}
        >
          Send Request
        </Button>
      </div>
    </Modal>
  )
}
