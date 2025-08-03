"use client"

import { useState, useEffect } from "react"
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
  Link,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Share2,
  MessageSquare,
  UserPlus,
  Flag,
  MoreHorizontal,
  LinkIcon
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// User model interface
interface UserModel {
  uid: string;
  fullName: string;
  email: string;
  profileCompleteness: number;
  profilePicture?: string;
  degreeCard?: string;

  university: {
    name: string;
    faculty: string;
    degree: string;
    positions: string;
    universityYear: string;
  };

  personality: {
    hobbies: string[];
    talents: string[];
  };

  professional: {
    currentJobs: string;
    societyPositions: string;
    workWithPeople: string;
    beAroundPeople: string;
  };

  activity: {
    posts: number;
    collaborations: number;
  };

  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    facebook: string;
    personalWebsite: string;
  };

  whoAmI: string;
  relationshipState: string;
  location: string;
  joinDate: string;
  interests: string;
  achievements: string;
  abilities: string[];
  skills: string[];
  thingsYouLikeToDo: string[];
}

// Initial empty user data
const initialUserData: UserModel = {
  uid: '',
  fullName: 'Loading...',
  email: '',
  profileCompleteness: 0,

  university: {
    name: '',
    faculty: '',
    degree: '',
    positions: '',
    universityYear: '',
  },

  personality: {
    hobbies: [],
    talents: [],
  },

  professional: {
    currentJobs: '',
    societyPositions: '',
    workWithPeople: '',
    beAroundPeople: '',
  },

  activity: {
    posts: 0,
    collaborations: 0,
  },

  socialLinks: {
    github: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    facebook: '',
    personalWebsite: '',
  },

  whoAmI: '',
  relationshipState: '',
  location: '',
  joinDate: '',
  interests: '',
  achievements: '',
  abilities: [],
  skills: [],
  thingsYouLikeToDo: [],
}

const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log("Base URL:", baseurl); 

async function getProfileData(uid: string): Promise<UserModel | null> {
  try {
    const response = await fetch(`${baseurl}/profile/friends-profile/${uid}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile data");
    }

    const data = await response.json();
    return data as UserModel;
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return null;
  }
}


interface OtherProfileViewProps {
  uid: string;
}

export default function OtherProfileView({ uid }: OtherProfileViewProps) {
  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(true)
  const [isPending, setIsPending] = useState(false)
  const [formData, setFormData] = useState<UserModel>(initialUserData);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile data on mount
  useEffect(() => {
    let isMounted = true;
    if (uid) {
      setIsLoading(true);
      getProfileData(uid).then((data) => {
        if (isMounted && data) {
          setFormData(data);
        }
        if (isMounted) {
          setIsLoading(false);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [uid]);

  const handleConnect = () => {
    if (isPending) {
      // Cancel connection request
      setIsPending(false)
    } else if (!isConnected) {
      // Send connection request
      setIsPending(true)
    } else {
      // Disconnect
      setIsConnected(false)
    }
  }

  const handleMessage = () => {
    // In a real app, this would navigate to the messages page with this user's conversation
    console.log("Navigate to messages with this user")
  }

  const handleCollaborate = () => {
    setIsCollabModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </div>
    );
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
            <AvatarImage src={formData.profilePicture || "/placeholder.svg"} alt={formData.fullName} />
            <AvatarFallback>{formData.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="ml-40">
            <h1 className="text-3xl font-bold tracking-tight">{formData.fullName}</h1>
            <p className="text-muted-foreground">@{formData.degreeCard || 'student'}</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0 ml-40 md:ml-0">
            <Button variant="outline" size="sm" className="flex items-center gap-1 mr-10" onClick={handleMessage}>
              <MessageSquare className="h-4 w-4" />
              Message
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center">
                  <Share2 className="mr-2 h-4 w-4" />
                  <span>Share Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center text-red-500">
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
              {formData.relationshipState && (
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-pink-500" />
                  <span className="text-sm">{formData.relationshipState}</span>
                </div>
              )}
              {formData.university?.name && (
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formData.university.name}</span>
                </div>
              )}

              <div className="pt-2">
                <p className="text-sm font-medium mb-2">Activity</p>
                <div className="flex justify-between text-sm">
                  <div className="text-center">
                    <p className="font-bold">{formData.activity?.posts || 0}</p>
                    <p className="text-xs text-muted-foreground">Posts</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold">{formData.activity?.collaborations || 0}</p>
                    <p className="text-xs text-muted-foreground">Collabs</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {formData.university?.name && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  University
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="font-medium">{formData.university.name}</p>
                  {formData.university.faculty && (
                    <p className="text-sm text-muted-foreground">{formData.university.faculty}</p>
                  )}
                </div>
                {formData.university.degree && (
                  <div>
                    <p className="text-sm font-medium">Degree</p>
                    <p className="text-sm text-muted-foreground">{formData.university.degree}</p>
                  </div>
                )}
                {formData.university.universityYear && (
                  <div>
                    <p className="text-sm font-medium">Year</p>
                    <p className="text-sm text-muted-foreground">{formData.university.universityYear}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {(formData.socialLinks?.facebook || formData.socialLinks?.github || formData.socialLinks?.linkedin || formData.socialLinks?.twitter || formData.socialLinks?.instagram) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LinkIcon className="h-5 w-5 mr-2" />
                  Social Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {formData.socialLinks?.facebook && (
                  <a
                    href={formData.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:text-primary"
                  >
                    <Link className="h-4 w-4" />
                    <span>{formData.socialLinks.facebook}</span>
                  </a>
                )}
                {formData.socialLinks?.github && (
                  <a
                    href={formData.socialLinks.github.startsWith('http') ? formData.socialLinks.github : `https://${formData.socialLinks.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:text-primary"
                  >
                    <Github className="h-4 w-4" />
                    <span>{formData.socialLinks.github}</span>
                  </a>
                )}
                {formData.socialLinks?.linkedin && (
                  <a
                    href={formData.socialLinks.linkedin.startsWith('http') ? formData.socialLinks.linkedin : `https://${formData.socialLinks.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:text-primary"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>{formData.socialLinks.linkedin}</span>
                  </a>
                )}
                {formData.socialLinks?.twitter && (
                  <a
                    href={formData.socialLinks.twitter.startsWith('http') ? formData.socialLinks.twitter : `https://${formData.socialLinks.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:text-primary"
                  >
                    <Twitter className="h-4 w-4" />
                    <span>{formData.socialLinks.twitter}</span>
                  </a>
                )}
                {formData.socialLinks?.instagram && (
                  <a
                    href={formData.socialLinks.instagram.startsWith('http') ? formData.socialLinks.instagram : `https://${formData.socialLinks.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:text-primary"
                  >
                    <Instagram className="h-4 w-4" />
                    <span>{formData.socialLinks.instagram}</span>
                  </a>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Panel */}
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="about">About</TabsTrigger>
              {/* <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="collabs">Collaborations</TabsTrigger>
              <TabsTrigger value="connections">Connections</TabsTrigger> */}
            </TabsList>

            <TabsContent value="about" className="space-y-6 mt-6">
              {formData.whoAmI && (
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
                      <p className="text-muted-foreground">{formData.whoAmI}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {formData.thingsYouLikeToDo && formData.thingsYouLikeToDo.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="h-5 w-5 mr-2" />
                      Things I like to do
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {formData.thingsYouLikeToDo.map((item, index) => (
                        <Badge key={index} variant="secondary" className="rounded-full">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {formData.achievements && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2" />
                      Achievements Received
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-muted-foreground">{formData.achievements}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {formData.abilities && formData.abilities.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2" />
                      Abilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {/* {formData.abilities.map((item, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-500 border-purple-200 dark:border-purple-800"
                        >
                          {item}
                        </Badge>
                      ))} */}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="posts" className="mt-6 space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-4 mb-4">
                      <MessageSquare className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Posts Yet</h3>
                    <p className="text-muted-foreground">
                      {formData.fullName} hasn't shared any posts yet
                    </p>
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
                    <h3 className="text-lg font-medium mb-2">No Public Collaborations</h3>
                    <p className="text-muted-foreground mb-4">
                      {formData.fullName} hasn't shared any public collaborations yet
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
                      <Link className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Connections are Private</h3>
                    <p className="text-muted-foreground mb-4">
                      {formData.fullName}'s connections are not publicly visible
                    </p>
                    {!isConnected && !isPending ? (
                      <Button
                        className="bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                        onClick={handleConnect}
                      >
                        Connect with {formData.fullName.split(" ")[0]}
                      </Button>
                    ) : isPending ? (
                      <Button variant="secondary" onClick={handleConnect}>
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
    </div>
  )
}