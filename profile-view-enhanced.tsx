"use client"

import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { User as Usermodel } from "./model/User"
import AchievementCard from "@/components/profile/Achievements"
import AboutCard from "@/components/profile/AboutCard"
import SocialPreferences from "./components/profile/SocialPreferences"
import PersonalitySkillsCard from "@/components/profile/Skill"
import Diary from "@/components/profile/Diary"


// Lazy load EditProfileDialog and ProtectedRoute
const EditProfileDialog = dynamic(() => import("./edit-profile-dialog").then(mod => mod.EditProfileDialog), { ssr: false })
const ProtectedRoute = dynamic(() => import("./components/ProtectedRoute"), { ssr: false })





export default function ProfileViewEnhanced() {
  const { user: authUser } = useAuth()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [user, setUser] = useState<Usermodel | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [profileCompleteness, setProfileCompleteness] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      // Only fetch if we have an authenticated user with a UID
      if (authUser?.uid) {
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
            console.log('fetch data', data);
            setUser(data);
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

  console.log("user data", user);

//profile compleatness calculation
  useEffect(() => {
  if (user) {
    const fields = [
      user.fullName,
      user.profilePicture,
      user.bannerImage,
      user.personality?.type,
      user.relationshipState,
      user.university?.name,
      user.university?.degree,
      user.university?.faculty,
      user.university?.universityYear,
      user.university?.positions,
      user.personality?.skills,
      user.personality?.achievements,
      user.socialPreferences?.workWithPeople,
      user.socialPreferences?.beAroundPeople,
    ];

    const filledCount = fields.filter(field => {
      if (typeof field === 'string') {
        return field.trim() !== '';
      } else if (Array.isArray(field)) {
        return field.length > 0;
      }
      return false;
    }).length;
    const completeness = Math.round((filledCount / fields.length) * 100);
    setProfileCompleteness(completeness);
  }
}, [user]);





  const handleProfileUpdate = (updatedData: Usermodel) => {
    setUser(updatedData)
    setIsEditDialogOpen(false)

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
            <div className="h-48 w-full rounded-xl bg-gradient-to-r from-purple-600/30 to-blue-500/30 overflow-hidden relative">
            {/* Banner Image */}
            <img
              src={user?.bannerImage || "/Banner_image/image.png"}
              alt="Banner"
              className="absolute inset-0 w-full h-full object-cover"
              onError={e => {
              const target = e.target as HTMLImageElement
              target.onerror = null
              target.src = "/profile_Pic/default-banner.jpg"
              }}
            />
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
              <h1 className="flex items-center text-3xl font-bold tracking-tight">
  {user?.fullName || "User"}
  
  {user?.profile_state === "Banned" && (
    <span className="ml-2 inline-block w-4 h-4 mt-2 bg-red-600 rounded-full" title="Banned"></span>
  )}
  
  {user?.profile_state === "Approved" && (
    <span className="ml-2 inline-block w-4 h-4 mt-2 bg-green-600 rounded-full" title="Approved"></span>
  )}
</h1>

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
            <div className="items-center justify-between ">
              <p className="text-sm font-medium mb-3">Profile Completeness</p>
              <div className="flex justify-between mb-2">
                <Progress value={profileCompleteness} className="mb-4" />
                <span className="text-lg font-semibold pl-3">{profileCompleteness}%</span>
              
               </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Panel */}
          <div className="md:col-span-1 space-y-6">
           <AboutCard users={user as any}/>


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
       <p className="text-sm font-medium pt-3">Faculty</p>
      <p className="text-sm text-muted-foreground">{user?.university?.faculty || "N/A"}</p>
      <div>
      <p className="text-sm font-medium pt-3">Degree</p>
      <p className="text-sm text-muted-foreground">{user?.university?.degree || "N/A"}</p>
    </div>
      <p className="text-sm font-medium pt-3">Degree</p>
      <p className="text-sm text-muted-foreground">{user?.university?.universityYear || "N/A"}</p>
    </div>
    
    <div>
      <p className="text-sm font-medium">Positions Held at University</p>
      <p className="text-sm text-muted-foreground">{user?.university?.positions || "N/A"}</p>
    </div>
  </CardContent>
</Card>

          </div>

          {/* Right Panel */}
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="about" className="w-full">
  <TabsList className="w-full justify-start">
    <TabsTrigger value="about">About</TabsTrigger>
    <TabsTrigger value="post">Diary</TabsTrigger>
  </TabsList>

  <TabsContent value="about" className="space-y-6 mt-6">
    <AchievementCard achievement={user?.personality?.achievements || []}/>
    <SocialPreferences user={{
      socialPreferences: {
        workWithPeople: user?.socialPreferences?.workWithPeople || "Not specified",
        beAroundPeople: user?.socialPreferences?.beAroundPeople || "Not specified"
      }
    }}/>
    
    <PersonalitySkillsCard
      users={user.personality?.skills ? { skills: user.personality.skills } : undefined}
    />
  </TabsContent>

  <TabsContent value="post" className="space-y-6 mt-6">
    <Diary />
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
