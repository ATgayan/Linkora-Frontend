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
import { X, Plus, Upload, Loader2 } from "lucide-react";

import { User } from "./model/User";

interface EditProfileDialogProps {
  isOpen: boolean
  onClose: () => void
  userData: User
  onSave: (updatedData: User) => void
}

export function EditProfileDialog({ isOpen, onClose, userData, onSave }: EditProfileDialogProps) {
  const [formData, setFormData] = useState({
    ...userData,
    degreeCard: userData.degreeCard || "",
    fullName: userData.fullName || "",
    profilePicture: userData.profilePicture || "",
    bannerImage: userData.bannerImage || "", 
    relationshipState: userData.relationshipState || "",
    university: userData.university || {},
    socialPreferences: {
      workWithPeople: userData?.socialPreferences?.workWithPeople || "",
      beAroundPeople: userData?.socialPreferences?.beAroundPeople || "",
    },
    
    personality: {
      whoAmI: userData.personality?.whoAmI || "",
      type: userData.personality?.type || "",
      hobbies: userData.personality?.hobbies || [],
      interests: userData.personality?.interests || "",
      achievements: userData.personality?.achievements || [], 
      skills: userData.personality?.skills || [],
      abilities: userData.personality?.abilities || [],
    }
  })
  const [newActivity, setNewActivity] = useState("")
  const [newSkill, setNewSkill] = useState("")
  const [avatarPreview, setAvatarPreview] = useState(userData.profilePicture)
  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleNestedInputChange = (section: string, field: string, value: string) => {
    setFormData({
      ...formData,
      [section]: {
        ...(formData[section as keyof typeof formData] as object),
        [field]: value,
      },
    })
  }

  const handleAddActivity = () => {
    if (newActivity.trim() && !(formData.personality.hobbies || []).includes(newActivity.trim())) {
      setFormData({
        ...formData,
        personality: {
          ...formData.personality,
          hobbies: [...(formData.personality.hobbies || []), newActivity.trim()],
        },
      })
      setNewActivity("")
    }
  }

  const handleRemoveActivity = (activity: string) => {
    setFormData({
      ...formData,
      personality: {
        ...formData.personality,
        hobbies: (formData.personality.hobbies || []).filter((a: string) => a !== activity),
      },
    })
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.personality.skills?.includes(newSkill.trim())) {
      setFormData({
        ...formData,
 personality: {
 ...formData.personality,
 skills: [...(formData.personality?.skills || []), newSkill.trim()],
 },
      })
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData({
      ...formData,
 personality: {
 ...formData.personality,
 skills: (formData.personality.skills || []).filter((s: string) => s !== skill),
 },
    })
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarPreview(base64String);
        handleInputChange("profilePicture", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAchievementChange = (index: number, field: string, value: string) => {
    const updated = [...(formData.personality.achievements || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({
      ...formData,
      personality: {
        ...formData.personality,
        achievements: updated
      }
    });
  }

  const handleRemoveAchievement = (index: number) => {
    const updated = (formData.personality.achievements || []).filter(
      (_: any, i: number) => i !== index
    );
    setFormData({
      ...formData,
      personality: {
        ...formData.personality,
        achievements: updated
      }
    });
  }

  const handleAddAchievement = () => {
    setFormData({
      ...formData,
      personality: {
        ...formData.personality,
        achievements: [
          ...(formData.personality.achievements || []),
          {
            title: "",
            description: "",
            year: new Date().getFullYear().toString(),
          },
        ]
      }
    });
  }

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      const userPayload: User = {
        uid: userData.uid || "",
        fullName: formData.fullName || "",
        degreeCard: formData.degreeCard || null,
        profilePicture: formData.profilePicture || null,
        bannerImage: formData.bannerImage || null,
        email: userData.email || null,
        profileCompleteness: userData.profileCompleteness || 0,

        university: {
          name: formData.university?.name || null,
          faculty: formData.university?.faculty || null,
          degree: formData.university?.degree || null,
          universityYear: formData.university?.universityYear || null,
          positions: formData.university?.positions || null,
        },

       
        relationshipState: formData.relationshipState || null,
        location: formData.location || null,
        joinDate: userData.joinDate || new Date().toISOString(),

        personality: {
          type: formData.personality?.type || "",
          whoAmI: formData.personality.whoAmI || null,
          hobbies: formData.personality?.hobbies || [],
          interests: formData.personality?.interests || null,
          achievements: formData.personality?.achievements || [],
          skills: formData.personality.skills || [],
        },

        socialPreferences: {
          workWithPeople: formData?.socialPreferences?.workWithPeople || "",
          beAroundPeople: formData?.socialPreferences?.beAroundPeople || "",
        },

        activity: {
          posts: formData.activity?.posts || 0,
         
        },
      };

      

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/update-profile/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(userPayload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      onSave(userPayload);
      onClose();
    } catch (err: any) {
      console.error("Profile update failed:", err.message);
      alert("Something went wrong while saving. Please try again.");
    } finally {
      setIsSaving(false);
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
            {/* Banner Image Upload */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-full max-w-xl">
                <img
                  src={formData.bannerImage || "/Banner_image/image.png"}
                  alt="Banner"
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <div className="absolute bottom-2 right-2 rounded-full bg-primary p-1 cursor-pointer">
                  <label htmlFor="banner-upload" className="cursor-pointer flex items-center gap-1">
                    <Upload className="h-4 w-4 text-white" />
                    <input
                      id="banner-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const base64String = reader.result as string;
                            handleInputChange("bannerImage", base64String);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
              <span className="text-xs text-muted-foreground mt-2">Banner Image</span>
            </div>

            {/* Profile Photo Upload */}
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
              <span className="text-xs text-muted-foreground mt-2">Profile Photo</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="degreeCard">Card Name</Label>
                <Input
                  id="degreeCard"
                  value={formData.degreeCard || ""}
                  onChange={(e) => handleInputChange("degreeCard", e.target.value)}
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
                  value={formData.university?.name || ""}
                  onChange={(e) => handleNestedInputChange("university", "name", e.target.value)}
                  placeholder="E.g., Stanford University"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facultyName">Faculty Name</Label>
                <Input
                  id="facultyName"
                  value={formData.university?.faculty || ""}
                  onChange={(e) => handleNestedInputChange("university", "faculty", e.target.value)}
                  placeholder="E.g., Computer Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="degreeName">Degree Name</Label>
                <Input
                  id="degreeName"
                  value={formData.university?.degree || ""}
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
                  value={formData.university?.universityYear || ""}
                  onValueChange={(value) => handleNestedInputChange("university", "universityYear", value)}
                >
                  <SelectTrigger id="universityYear">
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                    <SelectItem value="Graduate Student">Graduate Student</SelectItem>
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
                  value={formData.personality.whoAmI || ""}
                  onChange={(e) => handleNestedInputChange("personality", "whoAmI", e.target.value)}
                  placeholder="Tell others about yourself..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="personalityType">Personality Type</Label>
                <Select
                  value={formData.personality?.type || ""}
                  onValueChange={(value) =>
                    handleNestedInputChange("personality", "type", value)
                  }
                >
                  <SelectTrigger id="personalityType">
                    <SelectValue placeholder="Select your personality type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Introvert">Introvert</SelectItem>
                    <SelectItem value="Extrovert">Extrovert</SelectItem>
                    <SelectItem value="Ambivert">Ambivert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Hobbies (Things You Like to Do)</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(formData.personality.hobbies || []).map((activity: string, index: number) => (
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
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(formData.personality.skills || []).map((skill: string, index: number) => (
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

              <div className="space-y-4">
                <Label htmlFor="achievements">Achievements</Label>
                {(formData.personality.achievements || []).map((achievement: any, index: number) => (
                  <div key={achievement.id || index} className="flex gap-2 items-center">
                    {/* Title Input */}
                    <Input
                      type="text"
                      value={achievement.title || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleAchievementChange(index, "title", e.target.value);
                      }}
                      placeholder={`Title ${index + 1}`}
                      className="flex-1"
                    />

                    {/* Description Input */}
                    <Input
                      type="text"
                      value={achievement.description || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleAchievementChange(index, "description", e.target.value);
                      }}
                      placeholder={`Description ${index + 1}`}
                      className="flex-1"
                    />

                    {/* Year Input */}
                    <Input
                      type="text"
                      value={achievement.year || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleAchievementChange(index, "year", e.target.value);
                      }}
                      placeholder={`Year ${index + 1}`}
                      className="w-24"
                    />

                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => handleRemoveAchievement(index)}
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                ))}

                <Button
                  className="mt-4"
                  type="button"
                  variant="secondary"
                  onClick={handleAddAchievement}
                >
                  + Add Achievement
                </Button>
              </div>

            </div>
          </TabsContent>

          {/* Professional Tab */}
          <TabsContent value="professional" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="workWithPeople">What Kind of People Do You Like to Work With?</Label>
                <Textarea
                  id="workWithPeople"
                  value={formData.socialPreferences?.workWithPeople || ""}
                  onChange={(e) => handleNestedInputChange("socialPreferences", "workWithPeople", e.target.value)}
                  placeholder="Describe your experience working with people..."
                  className="min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="beAroundPeople">What Kind of People Do You Like to Be Around?</Label>
                <Textarea
                  id="beAroundPeople"
                  value={formData.socialPreferences?.beAroundPeople || ""}
                  onChange={(e) => handleNestedInputChange("socialPreferences", "beAroundPeople", e.target.value)}
                  placeholder="How do you feel about being around people?"
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-purple-600 to-blue-500 text-white" disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}