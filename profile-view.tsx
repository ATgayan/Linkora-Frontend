"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EditProfileDialog } from "./edit-profile-dialog"
import { Heart, Briefcase, GraduationCap, User, Users } from "lucide-react"

// Sample user data
const userData = {
  nickname: "Alex_J",
  fullName: "Alex Johnson",
  profilePicture: "/placeholder.svg?height=128&width=128",

  // University Information
  universityName: "Stanford University",
  facultyName: "Computer Science",
  degreeName: "Bachelor of Science",
  universityYear: "3rd Year (Junior)",

  // Personal Information
  relationshipState: "Looking for a relationship", // Options: "Looking for a relationship", "I doesn't want relationship", "I have relationship"
  whoAmI:
    "I'm a passionate computer science student who loves creating innovative solutions and connecting with like-minded individuals. I enjoy problem-solving and am always eager to learn new technologies.",
  thingsYouLikeToDo: ["Photography", "Hiking", "Chess", "Coding", "Reading", "Playing Guitar", "Cooking"],
  achievementsReceived:
    "Dean's List 2022-2023, 1st Place University Hackathon 2022, Published Research Paper on AI Ethics, Student Council Representative Award",
  abilities: [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Public Speaking",
    "Creative Writing",
    "Project Management",
  ],
}

export default function ProfileView() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [user, setUser] = useState(userData)

  const handleProfileUpdate = (updatedData: typeof userData) => {
    setUser(updatedData)
    setIsEditDialogOpen(false)
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <Button
          onClick={() => setIsEditDialogOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white"
        >
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="md:col-span-1 space-y-6">
          <Card className="overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-purple-600/20 to-blue-500/20"></div>
            <div className="p-6 -mt-16 flex flex-col items-center">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={user.profilePicture || "/placeholder.svg"} alt={user.fullName} />
                <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-2xl font-bold">{user.fullName}</h2>
              <p className="text-muted-foreground">@{user.nickname}</p>

              <div className="mt-4 w-full">
                <Badge className="w-full justify-center py-1.5 rounded-full bg-gradient-to-r from-pink-500/10 to-rose-500/10 text-pink-500 border-pink-200 dark:border-pink-800">
                  <Heart className="h-3.5 w-3.5 mr-1" />
                  {user.relationshipState}
                </Badge>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                University Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium">University</p>
                <p className="text-muted-foreground">{user.universityName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Faculty</p>
                <p className="text-muted-foreground">{user.facultyName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Degree</p>
                <p className="text-muted-foreground">{user.degreeName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Year</p>
                <p className="text-muted-foreground">{user.universityYear}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Who Am I?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{user.whoAmI}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Things You Like to Do
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {(user.thingsYouLikeToDo || []).map((activity, index) => (
                  <Badge key={index} variant="secondary" className="rounded-full">
                    {activity}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Abilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {(user.abilities || []).map((ability, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-500 border-purple-200 dark:border-purple-800"
                  >
                    {ability}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Achievements Received
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{user.achievementsReceived}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <EditProfileDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        userData={user}
        onSave={handleProfileUpdate}
      />
    </div>
  )
}
