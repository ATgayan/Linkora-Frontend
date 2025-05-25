"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Modal } from "@/components/ui/modal"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { PlusIcon, X } from "lucide-react"

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { toast } = useToast()
  const [name, setName] = React.useState("Jamie Smith")
  const [bio, setBio] = React.useState(
    "Music producer and audio engineer with 3 years of experience. Currently studying Music Technology at MIT. Passionate about creating innovative sounds and collaborating with talented artists.",
  )
  const [university, setUniversity] = React.useState("MIT")
  const [location, setLocation] = React.useState("Cambridge, MA")
  const [avatar, setAvatar] = React.useState("/placeholder.svg?height=120&width=120")
  const [skills, setSkills] = React.useState(["Music", "Production", "Mixing", "Mastering", "Logic Pro", "Ableton"])
  const [lookingFor, setLookingFor] = React.useState("Vocalists, Songwriters")
  const [newSkill, setNewSkill] = React.useState("")

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this to your server
      const imageUrl = URL.createObjectURL(file)
      setAvatar(imageUrl)
    }
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handleSubmit = () => {
    // In a real app, you would send this to your backend
    toast({
      title: "Profile updated!",
      description: "Your profile has been successfully updated.",
    })

    onClose()
  }

  return (
    <Modal title="Edit Profile" isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 py-4">
        <div className="flex justify-center">
          <div className="relative cursor-pointer" onClick={handleAvatarClick}>
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-background bg-gradient-to-r from-purple-600 to-blue-500 p-1">
              <img
                src={avatar || "/placeholder.svg"}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 rounded-full bg-primary p-1">
              <PlusIcon className="h-4 w-4 text-white" />
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="space-y-2">
          <label htmlFor="bio" className="text-sm font-medium">
            Bio
          </label>
          <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} className="min-h-[100px]" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="university" className="text-sm font-medium">
              University
            </label>
            <Input id="university" value={university} onChange={(e) => setUniversity(e.target.value)} />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location
            </label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="skills" className="text-sm font-medium">
            Skills
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="rounded-full flex items-center gap-1">
                {skill}
                <button onClick={() => handleRemoveSkill(skill)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              id="skills"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddSkill()
                }
              }}
            />
            <Button
              variant="outline"
              onClick={handleAddSkill}
              disabled={!newSkill.trim() || skills.includes(newSkill.trim())}
            >
              Add
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="lookingFor" className="text-sm font-medium">
            Looking For
          </label>
          <Input
            id="lookingFor"
            value={lookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
            placeholder="What skills or collaborators are you looking for?"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
    </Modal>
  )
}
