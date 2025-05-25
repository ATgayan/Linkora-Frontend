"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Modal } from "@/components/ui/modal"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PostCollaborationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PostCollaborationModal({ isOpen, onClose }: PostCollaborationModalProps) {
  const { toast } = useToast()
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [timeframe, setTimeframe] = React.useState("")
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])
  const [newTag, setNewTag] = React.useState("")

  const availableTags = [
    "UI/UX",
    "Design",
    "Mobile App",
    "Web Dev",
    "Game Dev",
    "Music",
    "Film",
    "Art",
    "Writing",
    "Photography",
    "Sound Design",
    "Programming",
  ]

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !selectedTags.includes(newTag.trim())) {
      setSelectedTags([...selectedTags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || !timeframe || selectedTags.length === 0) return

    // In a real app, you would send this to your backend
    toast({
      title: "Collaboration posted!",
      description: "Your collaboration request has been posted.",
    })

    // Reset form
    setTitle("")
    setDescription("")
    setTimeframe("")
    setSelectedTags([])

    onClose()
  }

  return (
    <Modal
      title="Post Collaboration"
      description="Share your project and find collaborators"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <Input
            id="title"
            placeholder="E.g., Mobile App for Campus Events"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <Textarea
            id="description"
            placeholder="Describe your project and what kind of collaborators you're looking for..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="timeframe" className="text-sm font-medium">
            Timeframe
          </label>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger id="timeframe">
              <SelectValue placeholder="Select a timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-week">1 week</SelectItem>
              <SelectItem value="2-weeks">2 weeks</SelectItem>
              <SelectItem value="1-month">1 month</SelectItem>
              <SelectItem value="3-months">3 months</SelectItem>
              <SelectItem value="6-months">6 months</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {availableTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer rounded-full ${
                  selectedTags.includes(tag) ? "bg-gradient-to-r from-purple-600 to-blue-500" : ""
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add a custom tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddTag()
                }
              }}
            />
            <Button
              variant="outline"
              onClick={handleAddTag}
              disabled={!newTag.trim() || selectedTags.includes(newTag.trim())}
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white"
          onClick={handleSubmit}
          disabled={!title.trim() || !description.trim() || !timeframe || selectedTags.length === 0}
        >
          Post Collaboration
        </Button>
      </div>
    </Modal>
  )
}
