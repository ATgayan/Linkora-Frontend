"use client"

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckIcon, SearchIcon, XIcon } from "lucide-react";
import { UserCard } from "@/components/user-card";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Loader2 } from "lucide-react"

import {User} from "../../model/User";


export default function SearchPage() {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")
  const [loading, setLoading] = React.useState(true)
  const [users, setUsers] = React.useState<User[]>([])

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
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSelectedTags([])
    setSearchQuery("")
  }

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/friends/`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        })

        if (!res.ok) throw new Error("Failed to fetch users")

        const data = await res.json()
        setUsers(data.friends || [])
      } catch (err: any) {
        console.error("Error fetching users:", err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.whoAmI?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof user.university === "string"
        ? user.university.toLowerCase().includes(searchQuery.toLowerCase())
        : user.university?.name?.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => user.skills?.includes(tag))

    return matchesSearch && matchesTags
  })

  const handleConnect = (userId: string) => {
    console.log(`Connection request sent to user ${userId}`)
  }

  if(loading){
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
    )
  }else{

  return (
    <ProtectedRoute>
      <div className="container py-6 md:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Discover</h1>
          <p className="text-muted-foreground">
            Find collaborators based on skills and interests
          </p>
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
                  selectedTags.includes(tag)
                    ? "bg-gradient-to-r from-purple-600 to-blue-500"
                    : ""
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
              {loading ? (
                <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.uid}
                    className=" border p-4 rounded-xl shadow-sm bg-white dark:bg-gray-950"
                  >
                    <UserCard user={user} onConnect={handleConnect} />

                    {user.personality?.achievements && (
                      <p className="text-xs mt-3 italic text-green-500">
                        🏆 {user.personality.achievements}
                      </p>
                    )}

                    {Array.isArray(user.personality?.hobbies) &&
                      user.personality.hobbies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {user.personality.hobbies.map((hobby, idx) => (
                            <Badge
                              key={idx}
                              className="rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            >
                              {hobby}
                            </Badge>
                          ))}
                        </div>
                      )}
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <p className="mb-2 text-muted-foreground">
                    No users match your search criteria
                  </p>
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
              <Button variant="outline" size="sm">View Collaboration Board</Button>
            </div>
          </TabsContent>

          <TabsContent value="universities">
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <p className="mb-2 text-muted-foreground">University search coming soon</p>
              <Button variant="outline" size="sm">Browse People Instead</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}}
