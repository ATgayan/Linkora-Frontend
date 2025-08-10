"use client"

import * as React from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckIcon, SearchIcon, XIcon } from "lucide-react";
import { Loader2 } from "lucide-react";

const UserCard = dynamic(() => import("@/components/user-card").then(mod => mod.UserCard), { ssr: false });
const ProtectedRoute = dynamic(() => import("@/components/ProtectedRoute").then(mod => mod.default), { ssr: false });

import { User } from "../../model/User";


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
  (typeof user.fullName === "string" && user.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
  (typeof user.whoAmI === "string" && user.whoAmI.toLowerCase().includes(searchQuery.toLowerCase())) ||
  (typeof user.university?.name === "string" && user.university.name.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => user.skills?.includes(tag))

    return matchesSearch && matchesTags
  })

  console.log(filteredUsers);
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
          className="border rounded-xl shadow-sm bg-white dark:bg-gray-950 p-5 transition-all hover:shadow-md hover:border-primary/40"
        >
          <UserCard
            user={{
              ...user,
              uid: user.uid,
              name: user.fullName,
              photoURL: user.profilePicture,
              bio: user.whoAmI,
              skills: user.skills,
              university: {
                name: user.university?.name,
                faculty: user.university?.faculty,
                degree: user.university?.degree
              }
            }}
            onConnect={handleConnect}
          />

          {user.achievements && (
            <p className="text-xs mt-3 italic text-primary/80">
              🏆 {user.achievements}
            </p>
          )}

          {Array.isArray(user.personality?.hobbies) &&
            user.personality.hobbies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {user.personality.hobbies.map((hobby, idx) => (
                  <Badge
                    key={idx}
                    className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
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

        </Tabs>
      </div>
    </ProtectedRoute>
  )
}}
