"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CollaborationModal } from "@/components/collaboration-modal"
import { PostCollaborationModal } from "@/components/post-collaboration-modal"
import { CollaborationDetailModal } from "@/components/collaboration-detail-modal"
import { Edit, Trash2, Users, Search, Filter } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function CollabPage() {
  const [isPostModalOpen, setIsPostModalOpen] = React.useState(false)
  const [isCollabModalOpen, setIsCollabModalOpen] = React.useState(false)
  const [selectedCollab, setSelectedCollab] = React.useState<any>(null)

  const [selectedCollaboration, setSelectedCollaboration] = React.useState<any>(null)
  const [isCollabDetailOpen, setIsCollabDetailOpen] = React.useState(false)

  // Current user (for demo purposes)
  const currentUser = {
    id: 1,
    name: "Alex Johnson",
    university: "Stanford University",
  }

  // Sample collaboration data
  const allCollabs = [
    {
      id: 1,
      title: "Mobile App for Campus Events",
      description:
        "Looking for a UI/UX designer to collaborate on a mobile app that helps students discover campus events. Backend development is already in progress.",
      tags: ["Mobile App", "UI/UX", "Design"],
      author: {
        id: 1,
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        university: "Stanford University",
      },
      timeframe: "2-3 months",
      applicantCount: 2,
      status: "Open",
      createdAt: "2 days ago",
      applicants: [
        {
          id: 1,
          name: "Sarah Chen",
          avatar: "/placeholder.svg?height=40&width=40",
          university: "MIT",
          skills: ["UI/UX", "Figma", "Prototyping"],
          appliedAt: "2 hours ago",
          message:
            "Hi! I'm a UI/UX designer with 2 years of experience. I'd love to help with your mobile app design. I've attached my portfolio for your review.",
        },
        {
          id: 2,
          name: "Marcus Rodriguez",
          avatar: "/placeholder.svg?height=40&width=40",
          university: "Stanford University",
          skills: ["Mobile Design", "React Native", "Sketch"],
          appliedAt: "5 hours ago",
          message:
            "Hello! I'm interested in collaborating on this project. I have experience with mobile app design and would love to contribute.",
        },
      ],
      teamMembers: [
        {
          id: 1,
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "Project Lead",
        },
        {
          id: 2,
          name: "Sarah Chen",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "UI/UX Designer",
        },
      ],
    },
    {
      id: 2,
      title: "Short Film Sound Design",
      description:
        "Need someone who can help with sound design and possibly original score composition for my final project short film. The film is already shot and in editing.",
      tags: ["Film", "Sound Design", "Music"],
      author: {
        id: 2,
        name: "Taylor Reed",
        avatar: "/placeholder.svg?height=40&width=40",
        university: "NYU",
      },
      timeframe: "1 month",
      applicantCount: 1,
      status: "Open",
      createdAt: "1 day ago",
      applicants: [
        {
          id: 3,
          name: "Emma Wilson",
          avatar: "/placeholder.svg?height=40&width=40",
          university: "Berklee College of Music",
          skills: ["Sound Design", "Pro Tools", "Audio Engineering"],
          appliedAt: "1 day ago",
          message:
            "I'm a sound design student with experience in film audio. I'd love to help with your short film project!",
        },
      ],
    },
    {
      id: 3,
      title: "Indie Game Development",
      description:
        "Building a 2D platformer game and looking for artists, programmers, and sound designers to join the team. We have a working prototype and concept art.",
      tags: ["Game Dev", "Art", "Programming"],
      author: {
        id: 3,
        name: "Jordan Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        university: "UC Berkeley",
      },
      timeframe: "6 months",
      applicantCount: 2,
      status: "Open",
      createdAt: "3 days ago",
      applicants: [
        {
          id: 4,
          name: "David Kim",
          avatar: "/placeholder.svg?height=40&width=40",
          university: "Carnegie Mellon",
          skills: ["Unity", "C#", "Game Programming"],
          appliedAt: "3 hours ago",
          message:
            "I'm a game programming student interested in joining your indie game project. I have experience with Unity and 2D game development.",
        },
        {
          id: 5,
          name: "Lisa Zhang",
          avatar: "/placeholder.svg?height=40&width=40",
          university: "Art Center College of Design",
          skills: ["2D Art", "Character Design", "Illustration"],
          appliedAt: "6 hours ago",
          message:
            "Hi! I'm a digital artist specializing in character design and 2D art. I'd love to contribute to your platformer game!",
        },
      ],
      teamMembers: [
        {
          id: 3,
          name: "Jordan Patel",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "Project Lead",
        },
        {
          id: 4,
          name: "David Kim",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "Programmer",
        },
        {
          id: 5,
          name: "Lisa Zhang",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "Artist",
        },
      ],
    },
    {
      id: 4,
      title: "Podcast About Student Life",
      description:
        "Starting a podcast about student life and academic experiences. Looking for co-hosts and guests. I have the equipment and editing skills.",
      tags: ["Podcast", "Audio", "Content Creation"],
      author: {
        id: 4,
        name: "Jamie Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        university: "MIT",
      },
      timeframe: "Ongoing",
      applicantCount: 0,
      status: "Open",
      createdAt: "5 days ago",
      applicants: [],
    },
    {
      id: 5,
      title: "Web Development Portfolio",
      description:
        "Looking for a designer to help create a stunning portfolio website. I'll handle all the development work, just need someone with great design skills.",
      tags: ["Web Dev", "Design", "Portfolio"],
      author: {
        id: 1,
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        university: "Stanford University",
      },
      timeframe: "1 month",
      applicantCount: 3,
      status: "Open",
      createdAt: "1 week ago",
      applicants: [
        {
          id: 6,
          name: "Sophie Martinez",
          avatar: "/placeholder.svg?height=40&width=40",
          university: "RISD",
          skills: ["Web Design", "Figma", "UI/UX"],
          appliedAt: "1 day ago",
          message:
            "I'd love to help with your portfolio design! I have experience creating modern, clean portfolio websites.",
        },
        {
          id: 7,
          name: "Ryan Cooper",
          avatar: "/placeholder.svg?height=40&width=40",
          university: "Art Center",
          skills: ["Graphic Design", "Branding", "Web Design"],
          appliedAt: "2 days ago",
          message:
            "Hi! I'm a graphic designer with web design experience. I can help create a unique and professional portfolio.",
        },
        {
          id: 8,
          name: "Maya Patel",
          avatar: "/placeholder.svg?height=40&width=40",
          university: "Stanford University",
          skills: ["UI Design", "Prototyping", "User Research"],
          appliedAt: "3 days ago",
          message:
            "I'm interested in collaborating on your portfolio project. I focus on user-centered design approaches.",
        },
      ],
    },
  ]

  // Separate collaborations by author
  const myCollaborations = allCollabs.filter((collab) => collab.author.id === currentUser.id)
  const otherCollaborations = allCollabs.filter((collab) => collab.author.id !== currentUser.id)

  const handleApplyClick = (collab: any) => {
    setSelectedCollaboration(collab)
    setIsCollabDetailOpen(true)
  }

  const handleEditCollaboration = (collab: any) => {
    // In a real app, this would open an edit modal
    console.log("Edit collaboration:", collab.id)
  }

  const handleDeleteCollaboration = (collab: any) => {
    // In a real app, this would show a confirmation dialog
    console.log("Delete collaboration:", collab.id)
  }

  const renderCollaborationCard = (collab: any, isOwner = false) => (
    <Card key={collab.id} className="overflow-hidden">
      <CardHeader className="p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="border-green-500 bg-green-500/10 text-green-500 text-xs">
            {collab.status}
          </Badge>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>{collab.applicantCount} applicants</span>
          </div>
        </div>
        <CardTitle className="mt-2 line-clamp-2 text-base sm:text-lg">{collab.title}</CardTitle>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <Avatar className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0">
              <AvatarImage src={collab.author.avatar || "/placeholder.svg"} alt={collab.author.name} />
              <AvatarFallback className="text-xs">{collab.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-xs text-muted-foreground truncate">
              {isOwner ? "You" : collab.author.name} • {collab.author.university}
            </div>
          </div>
          {isOwner && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleEditCollaboration(collab)}>
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                onClick={() => handleDeleteCollaboration(collab)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 pt-0">
        <CardDescription className="line-clamp-3 mb-3 min-h-[3rem] sm:min-h-[4.5rem] text-sm">
          {collab.description}
        </CardDescription>
        <div className="mb-3 flex flex-wrap gap-1">
          {collab.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="rounded-full text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1 h-3 w-3"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Timeframe: {collab.timeframe}
          </div>
          <div>Created {collab.createdAt}</div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Button
            variant="outline"
            className="flex-1 text-sm"
            onClick={() => {
              setSelectedCollaboration(collab)
              setIsCollabDetailOpen(true)
            }}
          >
            {isOwner ? "Manage" : "View Collaboration"}
          </Button>
          {!isOwner && (
            <Button
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm"
              onClick={() => {
                setSelectedCollab({
                  id: collab.id,
                  user: collab.author,
                  content: collab.description,
                  tags: collab.tags,
                })
                setIsCollabModalOpen(true)
              }}
            >
              Apply
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )

  return (
    <>
    <ProtectedRoute>
      <div className="container py-4 sm:py-6 md:py-8 px-4">
        <div className="mb-4 sm:mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Collaboration Board</h1>
            <p className="text-sm text-muted-foreground">Find projects to collaborate on or post your own</p>
          </div>
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white w-full sm:w-auto"
            onClick={() => setIsPostModalOpen(true)}
          >
            Post Collaboration
          </Button>
        </div>

        <div className="mb-4 sm:mb-6 grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-4">
          <div className="sm:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search collaborations..." className="w-full pl-10" />
            </div>
          </div>
          <div>
            <Button variant="outline" className="w-full justify-between">
              <span>Filter</span>
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-2 sm:grid-cols-5 h-auto">
            <TabsTrigger value="all" className="text-xs sm:text-sm px-2 py-2">
              All
            </TabsTrigger>
            <TabsTrigger value="my-collaborations" className="text-xs sm:text-sm px-2 py-2">
              My ({myCollaborations.length})
            </TabsTrigger>
            <TabsTrigger value="others" className="text-xs sm:text-sm px-2 py-2">
              Others ({otherCollaborations.length})
            </TabsTrigger>
            <TabsTrigger value="tech" className="text-xs sm:text-sm px-2 py-2">
              Tech
            </TabsTrigger>
            <TabsTrigger value="creative" className="text-xs sm:text-sm px-2 py-2">
              Creative
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-6 sm:space-y-8">
              {/* My Collaborations Section */}
              {myCollaborations.length > 0 && (
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-semibold">My Collaborations</h2>
                    <Badge variant="secondary" className="text-xs">
                      {myCollaborations.length}
                    </Badge>
                  </div>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {myCollaborations.map((collab) => renderCollaborationCard(collab, true))}
                  </div>
                </div>
              )}

              {/* Others' Collaborations Section */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-semibold">Available Collaborations</h2>
                  <Badge variant="secondary" className="text-xs">
                    {otherCollaborations.length}
                  </Badge>
                </div>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {otherCollaborations.map((collab) => renderCollaborationCard(collab, false))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="my-collaborations">
            <div>
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-semibold">My Collaborations</h2>
                  <Badge variant="secondary" className="text-xs">
                    {myCollaborations.length}
                  </Badge>
                </div>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white w-full sm:w-auto"
                  onClick={() => setIsPostModalOpen(true)}
                >
                  Create New
                </Button>
              </div>
              {myCollaborations.length > 0 ? (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {myCollaborations.map((collab) => renderCollaborationCard(collab, true))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6 sm:p-8 text-center">
                  <div className="rounded-full bg-muted p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium mb-2">No collaborations yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">Create your first collaboration to get started!</p>
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                    onClick={() => setIsPostModalOpen(true)}
                  >
                    Create Collaboration
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="others">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-semibold">Available Collaborations</h2>
                <Badge variant="secondary" className="text-xs">
                  {otherCollaborations.length}
                </Badge>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {otherCollaborations.map((collab) => renderCollaborationCard(collab, false))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tech">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {allCollabs
                .filter((collab) =>
                  collab.tags.some((tag) => ["Mobile App", "Programming", "Game Dev", "Web Dev"].includes(tag)),
                )
                .map((collab) => renderCollaborationCard(collab, collab.author.id === currentUser.id))}
            </div>
          </TabsContent>

          <TabsContent value="creative">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {allCollabs
                .filter((collab) =>
                  collab.tags.some((tag) =>
                    ["Film", "Sound Design", "Music", "Art", "Design", "Content Creation"].includes(tag),
                  ),
                )
                .map((collab) => renderCollaborationCard(collab, collab.author.id === currentUser.id))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <CollaborationModal
        isOpen={isCollabModalOpen}
        onClose={() => setIsCollabModalOpen(false)}
        post={selectedCollab}
      />

      <PostCollaborationModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} />
      <CollaborationDetailModal
        isOpen={isCollabDetailOpen}
        onClose={() => setIsCollabDetailOpen(false)}
        collaboration={selectedCollaboration}
        onApply={() => {
          setIsCollabDetailOpen(false)
          setSelectedCollab({
            id: selectedCollaboration.id,
            user: selectedCollaboration.author,
            content: selectedCollaboration.description,
            tags: selectedCollaboration.tags,
          })
          setIsCollabModalOpen(true)
        }}
      />
      </ProtectedRoute>
    </>
  )
}
