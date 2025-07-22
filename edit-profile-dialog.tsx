"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Upload } from "lucide-react";

interface EditProfileDialogProps {
  isOpen: boolean
  onClose: () => void
  userData: any
  onSave: (updatedData: any) => void
}

export function EditProfileDialog({ isOpen, onClose, userData, onSave }: EditProfileDialogProps) {
  const [formData, setFormData] = useState({
    ...userData,
    university: userData.university || {},
    personality: userData.personality || {},
    professional: userData.professional || {},
    socialLinks: userData.socialLinks || {},
    activity: userData.activity || {},
    skills: userData.skills || [],
    thingsYouLikeToDo: userData.personality?.hobbies || userData.thingsYouLikeToDo || [],
    abilities: userData.personality?.talents || userData.abilities || [],
  })
  const [newActivity, setNewActivity] = useState("")
  const [newAbility, setNewAbility] = useState("")
  const [newSkill, setNewSkill] = useState("")
  const [avatarPreview, setAvatarPreview] = useState(userData.profilePicture)

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleNestedInputChange = (section: string, field: string, value: string) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
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

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills?.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...(formData.skills || []), newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: (formData.skills || []).filter((s: string) => s !== skill),
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

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/update-profile/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify({
          DegreeCard: formData.DegreeCard,
          fullName: formData.fullName,
          profilePicture: formData.profilePicture,
          relationshipState: formData.relationshipState,
          location: formData.location || "",

          university: {
            name: formData.university?.name || formData.universityName || "",
            faculty: formData.university?.faculty || formData.facultyName || "",
            degree: formData.university?.degree || formData.degreeName || "",
            positions: formData.university?.positions || "",
          },

          universityName: formData.university?.name || formData.universityName || "",
          facultyName: formData.university?.faculty || formData.facultyName || "",
          degreeName: formData.university?.degree || formData.degreeName || "",
          universityYear: formData.universityYear || "",

          personality: {
            hobbies: formData.thingsYouLikeToDo || [],
            talents: formData.abilities || [],
          },

          professional: {
            currentJobs: formData.professional?.currentJobs || "",
            societyPositions: formData.professional?.societyPositions || "",
            workWithPeople: formData.professional?.workWithPeople || "",
            beAroundPeople: formData.professional?.beAroundPeople || "",
          },

          socialLinks: {
            github: formData.socialLinks?.github || "",
            linkedin: formData.socialLinks?.linkedin || "",
            twitter: formData.socialLinks?.twitter || "",
            instagram: formData.socialLinks?.instagram || "",
            facebook: formData.socialLinks?.facebook || "",
            personalWebsite: formData.socialLinks?.personalWebsite || "",
          },

          activity: {
            posts: formData.activity?.posts || 0,
            collaborations: formData.activity?.collaborations || 0,
            connections: formData.activity?.connections || 0,
          },

          whoAmI: formData.whoAmI || "",
          interests: formData.interests || "",
          achievements: formData.achievements || "",
          abilities: formData.abilities?.join(", ") || "",
          skills: formData.skills || [],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      onSave(formData);
      onClose();
    } catch (err: any) {
      console.error("Profile update failed:", err.message);
      alert("Something went wrong while saving. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Profile</DialogTitle>
          <DialogDescription>Update your profile information to help others get to know you better.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="mt-4">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="university">University</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-4">
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={avatarPreview || "/placeholder.svg"} alt={formData.fullName} />
                  <AvatarFallback>{formData.fullName?.charAt(0)}</AvatarFallback>
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
                <Label htmlFor="DegreeCard">Degree Card</Label>
                <Input
                  id="DegreeCard"
                  value={formData.DegreeCard || ""}
                  onChange={(e) => handleInputChange("DegreeCard",e.target.value)}
                  placeholder="Degree card"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName || ""}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="relationshipState">Relationship State</Label>
                <Select
                  value={formData.relationshipState || ""}
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
                  value={formData.university?.name || formData.universityName || ""}
                  onChange={(e) => handleNestedInputChange("university", "name", e.target.value)}
                  placeholder="E.g., Stanford University"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facultyName">Faculty Name</Label>
                <Input
                  id="facultyName"
                  value={formData.university?.faculty || formData.facultyName || ""}
                  onChange={(e) => handleNestedInputChange("university", "faculty", e.target.value)}
                  placeholder="E.g., Computer Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="degreeName">Degree Name</Label>
                <Input
                  id="degreeName"
                  value={formData.university?.degree || formData.degreeName || ""}
                  onChange={(e) => handleNestedInputChange("university", "degree", e.target.value)}
                  placeholder="E.g., Bachelor of Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="positions">University Positions</Label>
                <Input
                  id="positions"
                  value={formData.university?.positions || ""}
                  onChange={(e) => handleNestedInputChange("university", "positions", e.target.value)}
                  placeholder="E.g., Student Council President"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="universityYear">University Year</Label>
                <Select
                  value={formData.universityYear || ""}
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
                  value={formData.whoAmI || ""}
                  onChange={(e) => handleInputChange("whoAmI", e.target.value)}
                  placeholder="Tell others about yourself..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">Interests</Label>
                <Textarea
                  id="interests"
                  value={formData.interests || ""}
                  onChange={(e) => handleInputChange("interests", e.target.value)}
                  placeholder="What are you interested in?"
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Hobbies (Things You Like to Do)</Label>
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
                    placeholder="Add a hobby"
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
                <Label>Talents</Label>
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
                    placeholder="Add a talent"
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
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(formData.skills || []).map((skill: string, index: number) => (
                    <Badge
                      key={index}
                      variant="default"
                      className="rounded-full flex items-center gap-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 border-green-200 dark:border-green-800"
                    >
                      {skill}
                      <button onClick={() => handleRemoveSkill(skill)} className="ml-1">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddSkill()
                      }
                    }}
                  />
                  <Button variant="outline" size="icon" onClick={handleAddSkill} disabled={!newSkill.trim()}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="achievements">Achievements</Label>
                <Textarea
                  id="achievements"
                  value={formData.achievements || ""}
                  onChange={(e) => handleInputChange("achievements", e.target.value)}
                  placeholder="List your achievements..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </TabsContent>

          {/* Professional Tab */}
          <TabsContent value="professional" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentJobs">Current Jobs</Label>
                <Input
                  id="currentJobs"
                  value={formData.professional?.currentJobs || ""}
                  onChange={(e) => handleNestedInputChange("professional", "currentJobs", e.target.value)}
                  placeholder="E.g., Software Engineer at Tech Corp"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="societyPositions">Society Positions</Label>
                <Input
                  id="societyPositions"
                  value={formData.professional?.societyPositions || ""}
                  onChange={(e) => handleNestedInputChange("professional", "societyPositions", e.target.value)}
                  placeholder="E.g., President of Computer Science Society"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workWithPeople">Work With People</Label>
                <Textarea
                  id="workWithPeople"
                  value={formData.professional?.workWithPeople || ""}
                  onChange={(e) => handleNestedInputChange("professional", "workWithPeople", e.target.value)}
                  placeholder="Describe your experience working with people..."
                  className="min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="beAroundPeople">Be Around People</Label>
                <Textarea
                  id="beAroundPeople"
                  value={formData.professional?.beAroundPeople || ""}
                  onChange={(e) => handleNestedInputChange("professional", "beAroundPeople", e.target.value)}
                  placeholder="How do you feel about being around people?"
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Social Links</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={formData.socialLinks?.github || ""}
                      onChange={(e) => handleNestedInputChange("socialLinks", "github", e.target.value)}
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={formData.socialLinks?.linkedin || ""}
                      onChange={(e) => handleNestedInputChange("socialLinks", "linkedin", e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="personalWebsite">Personal Website</Label>
                    <Input
                      id="personalWebsite"
                      value={formData.socialLinks?.personalWebsite || ""}
                      onChange={(e) => handleNestedInputChange("socialLinks", "personalWebsite", e.target.value)}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
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