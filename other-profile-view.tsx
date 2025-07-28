"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation" // or your routing solution
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
  LinkIcon,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Share2,
  MessageSquare,
  UserPlus,
  Flag,
  MoreHorizontal,
  Loader2,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostCard } from "@/components/post-card"
import { CollaborationModal } from "@/components/collaboration-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User as UserType } from "./model/User"

// Initial empty user data structure
const initialUserData: UserType = {
  uid: "",
  fullName: "",
  degreeCard: "",
  profilePicture: "",
  relationshipState: "",
  whoAmI: "",
  thingsYouLikeToDo: [],
  abilities: [],
  activity: {
    posts: 0,
    collaborations: 0,
  },
  socialLinks: {},
  profileCompleteness: 0,

}

// API function to fetch other user's profile data
const fetchOtherUserProfile = async (userId: string): Promise<UserType> => {
  try {
    const response = await fetch(`http://localhost:5000/friends-profile/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const userData = await response.json()
    return userData
  } catch (error) {
    console.error("Failed to fetch user profile:", error)
    throw error
  }
}

// API function to send connection request
const sendConnectionRequest = async (userId: string): Promise<boolean> => {
  try {
    const response = await fetch(`http://localhost:5000/send-connection-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ targetUserId: userId }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error("Failed to send connection request:", error)
    return false
  }
}

// API function to cancel connection request
const cancelConnectionRequest = async (userId: string): Promise<boolean> => {
  try {
    const response = await fetch(`http://localhost:5000/cancel-connection-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ targetUserId: userId }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error("Failed to cancel connection request:", error)
    return false
  }
}

export default function OtherProfileView() {
  // State management
  const [userData, setUserData] = useState<UserType>(initialUserData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [isActionLoading, setIsActionLoading] = useState(false)

  // Get user ID from URL parameters (adjust based on your routing solution)
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') || searchParams.get('id')

  // Fetch user data on component mount
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!userId) {
        setError("User ID is required")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        
        const profileData = await fetchOtherUserProfile(userId)
        setUserData(profileData)
        // setIsConnected(profileData.isConnected || false)
        
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile")
        console.error("Error loading user profile:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserProfile()
  }, [userId])

  // Handle connection request
  const handleConnect = async () => {
    if (!userId || isActionLoading) return

    setIsActionLoading(true)
    
    try {
      if (isPending) {
        // Cancel connection request
        const success = await cancelConnectionRequest(userId)
        if (success) {
          setIsPending(false)
        }
      } else if (!isConnected) {
        // Send connection request
        const success = await sendConnectionRequest(userId)
        if (success) {
          setIsPending(true)
        }
      } else {
        // Disconnect (you'll need to implement this API endpoint)
        // const success = await disconnectUser(userId)
        // if (success) {
        //   setIsConnected(false)
        // }
        console.log("Disconnect functionality not implemented yet")
      }
    } catch (error) {
      console.error("Connection action failed:", error)
      // You might want to show a toast or error message here
    } finally {
      setIsActionLoading(false)
    }
  }

  const handleMessage = () => {
    // Navigate to messages page with this user's conversation
    // This depends on your routing solution
    console.log("Navigate to messages with user:", userId)
    // router.push(`/messages/${userId}`)
  }

  const handleCollaborate = () => {
    setIsCollabModalOpen(true)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${userData.fullName}'s Profile`,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      // Show success message
      console.log("Profile link copied to clipboard")
    }
  }

  const handleReport = () => {
    // Implement report functionality
    console.log("Report user:", userId)
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading profile...</span>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-red-500 mb-4">
            <User className="h-12 w-12 mx-auto mb-2" />
            <h2 className="text-xl font-semibold">Profile Not Found</h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      {/* Profile Header */}
      <div className="relative mb-8">
        <div className="h-48 w-full rounded-xl bg-gradient-to-r from-purple-600/30 to-blue-500/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-blue-500/20 rounded-xl"></div>
        </div>

        <div className="absolute top-32 left-8 flex items-end">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={userData.profilePicture || "/placeholder.svg"} alt={userData.fullName} />
            <AvatarFallback>{userData.fullName?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </div>

        <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="ml-40">
            <h1 className="text-3xl font-bold tracking-tight">{userData.fullName}</h1>
            <p className="text-muted-foreground">@{userData.degreeCard}</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0 ml-40 md:ml-0">
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleMessage}>
              <MessageSquare className="h-4 w-4" />
              Message
            </Button>
            <Button
              variant={isConnected ? "outline" : isPending ? "secondary" : "default"}
              size="sm"
              className={`flex items-center gap-1 ${
                !isConnected && !isPending ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white" : ""
              }`}
              onClick={handleConnect}
              disabled={isActionLoading}
            >
              {isActionLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <UserPlus className="h-4 w-4" />
              )}
              {isConnected ? "Connected" : isPending ? "Pending" : "Connect"}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleCollaborate}>
              <Users className="h-4 w-4" />
              Collaborate
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  <span>Share Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center text-red-500" onClick={handleReport}>
                  <Flag className="mr-2 h-4 w-4" />
                  <span>Report Profile</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

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
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-pink-500" />
                <span className="text-sm">{userData.relationshipState || "Not specified"}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{userData.university?.faculty|| "University not specified"}</span>
              </div>

              <div className="pt-2">
                <p className="text-sm font-medium mb-2">Activity</p>
                <div className="flex justify-between text-sm">
                  <div className="text-center">
                    <p className="font-bold">{userData.activity?.posts || 0}</p>
                    <p className="text-xs text-muted-foreground">Posts</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold">{userData.activity?.collaborations || 0}</p>
                    <p className="text-xs text-muted-foreground">Collabs</p>
                  </div>
                  {/* <div className="text-center">
                    <p className="font-bold">{userData.activity?.connections || 0}</p>
                    <p className="text-xs text-muted-foreground">Connections</p>
                  </div> */}
                </div>
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
                <p className="font-medium">{userData.university?.faculty || "Not specified"}</p>
                <p className="text-sm text-muted-foreground">{userData.university?.name || "Faculty not specified"}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Degree</p>
                <p className="text-sm text-muted-foreground">{userData.university?.degree || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Year</p>
                <p className="text-sm text-muted-foreground">{userData.university?.universityYear || "Not specified"}</p>
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
              {/* {userData.socialLinks?.website && (
                <a
                  href={userData.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary"
                >
                  <LinkIcon className="h-4 w-4" />
                  <span>{userData.socialLinks.website}</span>
                </a>
              )} */}
              {userData.socialLinks?.github && (
                <a
                  href={`https://${userData.socialLinks.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary"
                >
                  <Github className="h-4 w-4" />
                  <span>{userData.socialLinks.github}</span>
                </a>
              )}
              {userData.socialLinks?.linkedin && (
                <a
                  href={`https://${userData.socialLinks.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>{userData.socialLinks.linkedin}</span>
                </a>
              )}
              {userData.socialLinks?.twitter && (
                <a
                  href={`https://${userData.socialLinks.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary"
                >
                  <Twitter className="h-4 w-4" />
                  <span>{userData.socialLinks.twitter}</span>
                </a>
              )}
              {userData.socialLinks?.instagram && (
                <a
                  href={`https://${userData.socialLinks.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary"
                >
                  <Instagram className="h-4 w-4" />
                  <span>{userData.socialLinks.instagram}</span>
                </a>
              )}
              {!userData.socialLinks || Object.keys(userData.socialLinks).length === 0 && (
                <p className="text-sm text-muted-foreground">No social links available</p>
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
                    <User className="h-5 w-5 mr-2" />
                    About Me
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Who am I?</p>
                    <p className="text-muted-foreground">{userData.whoAmI || "No description available"}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 mr-2" />
                    Things I like to do
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* <div className="flex flex-wrap gap-2">
                    {(userData.thingsYouLikeToDo || []).length > 0 ? (
                      userData.thingsYouLikeToDo.map((item, index) => (
                        <Badge key={index} variant="secondary" className="rounded-full">
                          {item}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No interests listed</p>
                    )}
                  </div> */}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Achievements Received
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* <div>
                    <p className="text-muted-foreground">{userData.achievementsReceived || "No achievements listed"}</p>
                  </div> */}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Abilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {/* {(userData.abilities || []).length > 0 ? (
                      userData.abilities.map((item, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-500 border-purple-200 dark:border-purple-800"
                        >
                          {item}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No abilities listed</p>
                    )} */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* <TabsContent value="posts" className="mt-6 space-y-4">
              {userData.posts && userData.posts.length > 0 ? (
                userData.posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="rounded-full bg-muted p-4 mb-4">
                        <MessageSquare className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No Posts Yet</h3>
                      <p className="text-muted-foreground">
                        {userData.fullName} hasn't shared any posts yet
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent> */}

            <TabsContent value="collabs" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-4 mb-4">
                      <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Public Collaborations</h3>
                    <p className="text-muted-foreground mb-4">
                      {userData.fullName} hasn't shared any public collaborations yet
                    </p>
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                      onClick={handleCollaborate}
                    >
                      Invite to Collaborate
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
                    <h3 className="text-lg font-medium mb-2">Connections are Private</h3>
                    <p className="text-muted-foreground mb-4">
                      {userData.fullName}'s connections are not publicly visible
                    </p>
                    {!isConnected && !isPending ? (
                      <Button
                        className="bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                        onClick={handleConnect}
                        disabled={isActionLoading}
                      >
                        {isActionLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : null}
                        Connect with {userData.fullName?.split(" ")[0] || "User"}
                      </Button>
                    ) : isPending ? (
                      <Button variant="secondary" onClick={handleConnect} disabled={isActionLoading}>
                        {isActionLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : null}
                        Cancel Connection Request
                      </Button>
                    ) : (
                      <Button variant="outline">Already Connected</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Collaboration Modal */}
      
      {/* <CollaborationModal
        isOpen={isCollabModalOpen}
        onClose={() => setIsCollabModalOpen(false)}
        post={{
          id: 999,
          user: {
            name: userData.fullName,
            avatar: userData.profilePicture,
            university: userData.universityName,
          },
          content: `I'm interested in collaborating on projects related to ${userData.abilities?.join(", ") || "various topics"}.`,
          tags: userData.abilities?.slice(0, 3) || [],
        }}
      /> */}
    </div>
  )
}