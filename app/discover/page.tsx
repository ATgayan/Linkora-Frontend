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

  // Get all unique hobbies from users for filter options
  const allTags = React.useMemo(() => {
    const hobbiesSet = new Set<string>()
    users.forEach(user => {
      if (user.personality?.hobbies && Array.isArray(user.personality.hobbies)) {
        user.personality.hobbies.forEach(hobby => hobbiesSet.add(hobby))
      }
    })
    return Array.from(hobbiesSet).sort()
  }, [users])

  // Fallback static tags if no users loaded yet
  const staticTags = [
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

  // Fixed filtering logic - now filters by hobbies
  const filteredUsers = React.useMemo(() => {
    return users.filter((user) => {
      // Search filter - check name, university name, skills, and hobbies
      const matchesSearch = 
        searchQuery === "" ||
        (user.fullName && user.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.university?.name && user.university.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.personality?.skills && user.personality.skills.some(skill => 
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )) ||
        (user.personality?.hobbies && user.personality.hobbies.some(hobby => 
          hobby.toLowerCase().includes(searchQuery.toLowerCase())
        ))

      // Tag filter - if no tags selected, show all; otherwise check if user has any of the selected hobbies
      const matchesTags = 
        selectedTags.length === 0 ||
        (user.personality?.hobbies && Array.isArray(user.personality.hobbies) && 
         selectedTags.some(tag => user?.personality?.hobbies?.includes(tag)))

      return matchesSearch && matchesTags
    })
  }, [users, searchQuery, selectedTags])

  const handleConnect = (userId: string) => {
    console.log(`Connection request sent to user ${userId}`)
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container py-6 md:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Discover</h1>
          <p className="text-muted-foreground">
            Find collaborators based on skills and interests
          </p>
        </div>

        {/* Search and Clear Filters */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="md:col-span-3">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, hobbies, or university..."
                className="w-full pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Button 
              variant="outline" 
              className="w-full justify-between" 
              onClick={clearFilters}
              disabled={selectedTags.length === 0 && searchQuery === ""}
            >
              <span>Clear Filters</span>
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Active Filters Display */}
        {(selectedTags.length > 0 || searchQuery) && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: "{searchQuery}"
                <XIcon 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSearchQuery("")}
                />
              </Badge>
            )}
            {selectedTags.map(tag => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <XIcon 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => toggleTag(tag)}
                />
              </Badge>
            ))}
          </div>
        )}

        {/* Hobbies Filter */}
        <div className="mb-6">
          <h2 className="mb-2 font-medium">Filter by Hobbies</h2>
          <div className="flex flex-wrap gap-2">
            {(allTags.length > 0 ? allTags : staticTags).map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer rounded-full transition-all ${
                  selectedTags.includes(tag)
                    ? "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                    : "hover:bg-muted"
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
                {selectedTags.includes(tag) && <CheckIcon className="ml-1 h-3 w-3" />}
              </Badge>
            ))}
          </div>
          {allTags.length > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              Showing hobbies from {users.length} users
            </p>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredUsers.length} {filteredUsers.length === 1 ? 'person' : 'people'} found
          </p>
        </div>

        <Tabs defaultValue="people">
          <TabsList className="mb-4">
            <TabsTrigger value="people">People</TabsTrigger>
          </TabsList>

          <TabsContent value="people">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredUsers.length > 0 ? (
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
                        photoURL: user.profilePicture || undefined,
                        bio: user.personality?.whoAmI || undefined,
                        skills: user.personality?.skills,
                        university: {
                          name: user.university?.name || undefined,
                          faculty: user.university?.faculty || undefined,
                          degree: user.university?.degree || undefined,
                        },
                        location: user.location ?? undefined,
                      }}
                      onConnect={handleConnect}
                    />

                    {user.personality?.achievements && (
                      <p className="text-xs mt-3 italic text-primary/80">
                        🏆 {user.personality.achievements.map(a => a.title).join(', ')}
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
                    {searchQuery || selectedTags.length > 0 
                      ? "No users match your search criteria" 
                      : "No users found"
                    }
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
}