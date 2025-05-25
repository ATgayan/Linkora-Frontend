"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Upload } from "lucide-react"

interface EditProfileDialogProps {
  isOpen: boolean
  onClose: () => void
  userData: any
  onSave: (updatedData: any) => void
}

export function EditProfileDialog({ isOpen, onClose, userData, onSave }: EditProfileDialogProps) {
  const [formData, setFormData] = useState({
    ...userData,
    thingsYouLikeToDo: userData.thingsYouLikeToDo || [],
    abilities: userData.abilities || [],
  })
  const [newActivity, setNewActivity] = useState("")
  const [newAbility, setNewAbility] = useState("")
  const [avatarPreview, setAvatarPreview] = useState(userData.profilePicture)

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleAddActivity = () => {
    if (newActivity.trim() && !formData.thingsYouLikeToDo?.includes(newActivity.trim())) {
      setFormData({
        ...formData,
        thingsYouLikeToDo: [...(formData.thingsYouLikeToDo || []), newActivity.trim()],
      })
      setNewActivity("")
    }
  }

  const handleRemoveActivity = (activity: string) => {
    setFormData({
      ...formData,
      thingsYouLikeToDo: (formData.thingsYouLikeToDo || []).filter((a: string) => a !== activity),
    })
  }

  const handleAddAbility = () => {
    if (newAbility.trim() && !formData.abilities?.includes(newAbility.trim())) {
      setFormData({
        ...formData,
        abilities: [...(formData.abilities || []), newAbility.trim()],
      })
      setNewAbility("")
    }
  }

  const handleRemoveAbility = (ability: string) => {
    setFormData({
      ...formData,
      abilities: (formData.abilities || []).filter((a: string) => a !== ability),
    })
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setAvatarPreview(imageUrl)
      handleInputChange("profilePicture", imageUrl)
    }
  }

  const handleSubmit = () => {
    onSave(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Profile</DialogTitle>
          <DialogDescription>Update your profile information to help others get to know you better.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="university">University</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-4">
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={avatarPreview || "/placeholder.svg"} alt={formData.fullName} />
                  <AvatarFallback>{formData.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 rounded-full bg-primary p-1 cursor-pointer">
                  <label htmlFor="avatar-upload" className="cursor-pointer">
                    <Upload className="h-4 w-4 text-white" />
                    <input
                      id="avatar-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nickname">Nickname</Label>
                <Input
                  id="nickname"
                  value={formData.nickname}
                  onChange={(e) => handleInputChange("nickname", e.target.value)}
                  placeholder="E.g., Alex_J"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="E.g., Alex Johnson"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="relationshipState">Relationship State</Label>
                <Select
                  value={formData.relationshipState}
                  onValueChange={(value) => handleInputChange("relationshipState", value)}
                >
                  <SelectTrigger id="relationshipState">
                    <SelectValue placeholder="Select relationship state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Looking for a relationship">Looking for a relationship</SelectItem>
                    <SelectItem value="I doesn't want relationship">I doesn't want relationship</SelectItem>
                    <SelectItem value="I have relationship">I have relationship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          {/* University Tab */}
          <TabsContent value="university" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="universityName">University Name</Label>
                <Input
                  id="universityName"
                  value={formData.universityName}
                  onChange={(e) => handleInputChange("universityName", e.target.value)}
                  placeholder="E.g., Stanford University"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facultyName">Faculty Name</Label>
                <Input
                  id="facultyName"
                  value={formData.facultyName}
                  onChange={(e) => handleInputChange("facultyName", e.target.value)}
                  placeholder="E.g., Computer Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="degreeName">Degree Name</Label>
                <Input
                  id="degreeName"
                  value={formData.degreeName}
                  onChange={(e) => handleInputChange("degreeName", e.target.value)}
                  placeholder="E.g., Bachelor of Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="universityYear">University Year</Label>
                <Select
                  value={formData.universityYear}
                  onValueChange={(value) => handleInputChange("universityYear", value)}
                >
                  <SelectTrigger id="universityYear">
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st Year (Freshman)">1st Year (Freshman)</SelectItem>
                    <SelectItem value="2nd Year (Sophomore)">2nd Year (Sophomore)</SelectItem>
                    <SelectItem value="3rd Year (Junior)">3rd Year (Junior)</SelectItem>
                    <SelectItem value="4th Year (Senior)">4th Year (Senior)</SelectItem>
                    <SelectItem value="Graduate Student">Graduate Student</SelectItem>
                    <SelectItem value="PhD Student">PhD Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          {/* Personal Tab */}
          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label htmlFor="whoAmI">Who Am I?</Label>
                <Textarea
                  id="whoAmI"
                  value={formData.whoAmI}
                  onChange={(e) => handleInputChange("whoAmI", e.target.value)}
                  placeholder="Tell others about yourself..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Things You Like to Do</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(formData.thingsYouLikeToDo || []).map((activity: string, index: number) => (
                    <Badge key={index} variant="secondary" className="rounded-full flex items-center gap-1">
                      {activity}
                      <button onClick={() => handleRemoveActivity(activity)} className="ml-1">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add an activity"
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddActivity()
                      }
                    }}
                  />
                  <Button variant="outline" size="icon" onClick={handleAddActivity} disabled={!newActivity.trim()}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Abilities</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(formData.abilities || []).map((ability: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="rounded-full flex items-center gap-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-500 border-purple-200 dark:border-purple-800"
                    >
                      {ability}
                      <button onClick={() => handleRemoveAbility(ability)} className="ml-1">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add an ability"
                    value={newAbility}
                    onChange={(e) => setNewAbility(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddAbility()
                      }
                    }}
                  />
                  <Button variant="outline" size="icon" onClick={handleAddAbility} disabled={!newAbility.trim()}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="achievementsReceived">Achievements Received</Label>
                <Textarea
                  id="achievementsReceived"
                  value={formData.achievementsReceived}
                  onChange={(e) => handleInputChange("achievementsReceived", e.target.value)}
                  placeholder="List your achievements..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
