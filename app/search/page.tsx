"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckIcon, SearchIcon, XIcon } from "lucide-react"
import { UserCard } from "@/components/user-card"

export default function SearchPage() {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")

  const allTags = [
    "Game Dev",
    "UI/UX",
    "Design",
    "Music",
    "Production",
    "Vocals",
    "Film",
    "Sound Design",
    "3D Art",
    "Programming",
    "Mobile App",
    "Web Development",
    "Photography",
    "Writing",
    "Marketing",
  ]

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const clearFilters = () => {
    setSelectedTags([])
    setSearchQuery("")
  }

  // Sample user data
  const users = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      university: "Stanford University",
      skills: ["Mobile App", "UI/UX", "Design"],
      status: "Find",
      lookingFor: "UI/UX Designer",
      bio: "Computer Science student specializing in mobile app development. Currently working on a campus events platform.",
    },
    {
      id: 2,
      name: "Jamie Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      university: "MIT",
      skills: ["Music", "Production", "Vocals"],
      status: "Have",
      lookingFor: "Vocalists, Songwriters",
      bio: "Music producer and audio engineer with 3 years of experience. Passionate about creating innovative sounds.",
    },
    {
      id: 3,
      name: "Taylor Reed",
      avatar: "/placeholder.svg?height=40&width=40",
      university: "NYU",
      skills: ["Film", "Sound Design", "Music"],
      status: "Find",
      lookingFor: "Sound Designer",
      bio: "Film student working on short films and documentaries. Interested in experimental storytelling.",
    },
    {
      id: 4,
      name: "Jordan Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      university: "UC Berkeley",
      skills: ["Game Dev", "3D Art", "Programming"],
      status: "Have",
      lookingFor: "Game Developers",
      bio: "3D artist and game developer with experience in Unity and Blender. Looking to join indie game projects.",
    },
    {
      id: 5,
      name: "Riley Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      university: "RISD",
      skills: ["UI/UX", "Design", "Web Development"],
      status: "Have",
      lookingFor: "Frontend Developers",
      bio: "UI/UX designer with a passion for creating intuitive and beautiful interfaces. Portfolio includes mobile and web projects.",
    },
    {
      id: 6,
      name: "Casey Morgan",
      avatar: "/placeholder.svg?height=40&width=40",
      university: "Carnegie Mellon",
      skills: ["Game Dev", "Programming", "Sound Design"],
      status: "Find",
      lookingFor: "3D Artists",
      bio: "Game developer focusing on indie projects. Currently working on a puzzle platformer game.",
    },
  ]

  // Filter users based on search query and selected tags
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.university.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => user.skills.includes(tag))

    return matchesSearch && matchesTags
  })

  const handleConnect = (userId: number) => {
    // In a real app, this would send a connection request
    console.log(`Connection request sent to user ${userId}`)
  }

  return (
    <div className="container py-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Discover</h1>
        <p className="text-muted-foreground">Find collaborators based on skills and interests</p>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <div className="md:col-span-3">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, skills, or university..."
              className="w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Button variant="outline" className="w-full justify-between" onClick={clearFilters}>
            <span>Clear Filters</span>
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 font-medium">Filter by Skills</h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className={`cursor-pointer rounded-full ${
                selectedTags.includes(tag) ? "bg-gradient-to-r from-purple-600 to-blue-500" : ""
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
              {selectedTags.includes(tag) && <CheckIcon className="ml-1 h-3 w-3" />}
            </Badge>
          ))}
        </div>
      </div>

      <Tabs defaultValue="people">
        <TabsList className="mb-4">
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="universities">Universities</TabsTrigger>
        </TabsList>
        <TabsContent value="people">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => <UserCard key={user.id} user={user} onConnect={handleConnect} />)
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <p className="mb-2 text-muted-foreground">No users match your search criteria</p>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="projects">
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <p className="mb-2 text-muted-foreground">Project search coming soon</p>
            <Button variant="outline" size="sm">
              View Collaboration Board
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="universities">
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <p className="mb-2 text-muted-foreground">University search coming soon</p>
            <Button variant="outline" size="sm">
              Browse People Instead
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
