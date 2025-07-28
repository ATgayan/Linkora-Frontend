"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EditProfileDialog } from "./edit-profile-dialog"
import {
  Heart,
  Briefcase,
  GraduationCap,
  User,
  Users,
  MapPin,
  Calendar,
  LinkIcon,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Edit,
  Loader2,
  Share2,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProtectedRoute from "./components/ProtectedRoute"

import { User as Usermodel} from "./model/User";





export default function ProfileViewEnhanced() {
  const { user: authUser  } = useAuth()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [user, setUser] = useState<Usermodel | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      // Only fetch if we have an authenticated user with a UID
      if (authUser?.uid)  {
        const fetchProfileData = async () => {
          setIsLoading(true)
          setError(null)
          try {
            // Use the environment variable for the base URL
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
            const response = await fetch(`${baseUrl}/profile/get-profile/
              `, {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
             
              },
            })

            if (!response.ok) {
              const errorData = await response.json()
              throw new Error(errorData.message || "Failed to fetch profile data")
            }

            const data: Usermodel = await response.json()
            console.log("Fetched profile data:", data)
              setUser(data?.profile);
          } catch (err: any) {
            setError(err.message)
          } finally {
            setIsLoading(false)
          }
        }

        await fetchProfileData()
      } else if (!authUser) {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [authUser])

  console.log(user);

  const handleProfileUpdate = (updatedData: Usermodel) => {
    setUser(updatedData)
    setIsEditDialogOpen(false)
    // TODO: Add a fetch call to your backend to save the updated data
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-center text-red-500">
        <p>Error loading profile: {error}</p>
      </div>
    )
  }

  if (!user) return null 

  return (
    
    
    <ProtectedRoute>
    <div className="container mx-auto py-6 px-4 md:px-6">
      {/* Profile Header */}
      <div className="relative mb-8">
        <div className="h-48 w-full rounded-xl bg-gradient-to-r from-purple-600/30 to-blue-500/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-blue-500/20 rounded-xl"></div>
        </div>

        <div className="absolute top-32 left-8 flex items-end">
          <Avatar className="h-32 w-32 border-4 border-background">
  <AvatarImage src={user?.profilePicture || "/profile_Pic/nopic.jpg"} alt={user?.fullName || "User"} />
  <AvatarFallback>{user?.fullName?.charAt(0) || "U"}</AvatarFallback>
</Avatar>

        </div>

        <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="ml-40">
            <h1 className="text-3xl font-bold tracking-tight">{user?.fullName || "User"}</h1>
            <p className="text-muted-foreground">@{user?.degreeCard || "N/A"}</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0 ml-40 md:ml-0 z-10">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button
              onClick={() => setIsEditDialogOpen(!isEditDialogOpen)}
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white flex items-center gap-1"
              size="sm"
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Completeness */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex-1">
              <p className="text-sm font-medium mb-2">Profile Completeness: {user?.profileCompleteness || 50}%</p>
              <Progress value={user?.profileCompleteness || 50} className="h-2" />
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
              Complete Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="md:col-span-1 space-y-6">
         <Card>
  <CardHeader>
    <CardTitle className="flex items-center">
      <User className="h-5 w-5 mr-2" />
      About
    </CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="text-sm text-muted-foreground">{user?.whoAmI || "Tell us who you are..."}</div>

    <div className="flex items-center gap-2">
      <Heart className="h-4 w-4 text-pink-500" />
      <span className="text-sm">{user.relationshipState || "Single?"}</span>
    </div>

    <div className="flex items-center gap-2">
      <GraduationCap className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm">{user.university?.name || "University not set"}</span>
    </div>
    <div className="text-sm text-muted-foreground">
      {user.university?.faculty || "N/A"} - {user.university?.degree || "N/A"} ({user.university?.universityYear || "N/A"})
    </div>
  </CardContent>
</Card>


          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                University
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <div className="text-sm">{user?.university?.name || "N/A"}</div>
                <p className="text-sm text-muted-foreground">{user?.university?.faculty || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Degree</p>
                <p className="text-sm text-muted-foreground">{user?.university?.degree || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Positions Held at University</p>
                <p className="text-sm text-muted-foreground">{user?.university?.positions}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LinkIcon className="h-5 w-5 mr-2" />
                Social Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {user?.socialLinks?.github && (
  <a href={`https://${user.socialLinks.github}`} target="_blank" rel="noopener noreferrer">
    <Github className="h-4 w-4" />
    <span>{user.socialLinks.github}</span>
  </a>
)}

              {user.socialLinks.github && (
                <a
                  href={`https://${user.socialLinks.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary"
                >
                  <Github className="h-4 w-4" />
                  <span>{user.socialLinks.github}</span>
                </a>
              )}
              {user.socialLinks.linkedin && (
                <a
                  href={`https://${user.socialLinks.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>{user.socialLinks.linkedin}</span>
                </a>
              )}
              {user.socialLinks.twitter && (
                <a
                  href={`https://${user.socialLinks.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary"
                >
                  <Twitter className="h-4 w-4" />
                  <span>{user.socialLinks.twitter}</span>
                </a>
              )}
              {user.socialLinks.instagram && (
                <a
                  href={`https://${user.socialLinks.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary"
                >
                  <Instagram className="h-4 w-4" />
                  <span>{user.socialLinks.instagram}</span>
                </a>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="collabs">Collaborations</TabsTrigger>
              <TabsTrigger value="connections">Connections</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Professional
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">What Jobs Do You Have</p>
                    <p className="text-muted-foreground">{user?.professional?.currentJobs}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">What Positions Do You Hold in Society</p>
                    <p className="text-muted-foreground">{user?.professional?.societyPositions}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Social Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">What Kind of People Do You Like to Work With</p>
                    <p className="text-muted-foreground">{user?.professional?.workWithPeople}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">What Kind of People Do You Like to Be Around</p>
                    <p className="text-muted-foreground">{user?.professional?.beAroundPeople}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personality & Skills
                  </CardTitle>
                </CardHeader>
               <CardContent className="space-y-4">
  {/* Hobbies & Talents can go here */}

  <div>
    <p className="text-sm font-medium">Interests</p>
    <p className="text-muted-foreground">{user.interests || "No interests specified."}</p>
  </div>

  <div>
    <p className="text-sm font-medium">Achievements</p>
    <p className="text-muted-foreground">{user.achievements || "No achievements listed."}</p>
  </div>

  <div>
    <p className="text-sm font-medium">Abilities</p>
    <p className="text-muted-foreground">{user.abilities || "No abilities added."}</p>
  </div>
</CardContent>

              </Card>
            </TabsContent>

            <TabsContent value="posts" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-4 mb-4">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Posts Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Share your thoughts, projects, or ideas with the community
                    </p>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">Create a Post</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="collabs" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-4 mb-4">
                      <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Collaborations Yet</h3>
                    <p className="text-muted-foreground mb-4">Start collaborating with other students on projects</p>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                      Find Collaborators
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="connections" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-4 mb-4">
                      <LinkIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Connections Yet</h3>
                    <p className="text-muted-foreground mb-4">Connect with other students who share your interests</p>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">Discover People</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <EditProfileDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        userData={user as Usermodel}
        onSave={handleProfileUpdate}
      />
    </div>
    </ProtectedRoute>
  )
}
