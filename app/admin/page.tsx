"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Clock, Search, Filter, Eye, MessageSquare, Users, UserCheck, UserX } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface PendingUser {
  id: number
  fullName: string
  nickname: string
  email: string
  university: string
  profilePicture: string
  submittedAt: string
  status: "pending" | "approved" | "rejected"
  facultyName: string
  degreeName: string
  universityYear: string
  whoAmI: string
  thingsYouLikeToDo: string[]
  abilities: string[]
}

export default function AdminPage() {
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Sample pending users data
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([
    {
      id: 1,
      fullName: "Alex Johnson",
      nickname: "Alex_J",
      email: "alex.johnson@stanford.edu",
      university: "Stanford University",
      profilePicture: "/placeholder.svg?height=80&width=80",
      submittedAt: "2024-01-15T10:30:00Z",
      status: "pending",
      facultyName: "Computer Science",
      degreeName: "Bachelor of Science",
      universityYear: "3rd Year (Junior)",
      whoAmI: "I'm a passionate computer science student who loves creating innovative solutions.",
      thingsYouLikeToDo: ["Photography", "Hiking", "Chess", "Coding"],
      abilities: ["Web Development", "UI/UX Design", "Public Speaking"],
    },
    {
      id: 2,
      fullName: "Jamie Smith",
      nickname: "Jamie_S",
      email: "jamie.smith@mit.edu",
      university: "MIT",
      profilePicture: "/placeholder.svg?height=80&width=80",
      submittedAt: "2024-01-14T15:45:00Z",
      status: "pending",
      facultyName: "Music Technology",
      degreeName: "Bachelor of Arts",
      universityYear: "4th Year (Senior)",
      whoAmI: "Music technology student passionate about sound design and audio engineering.",
      thingsYouLikeToDo: ["Music Production", "DJing", "Vinyl Collecting"],
      abilities: ["Audio Engineering", "Music Production", "Mixing"],
    },
    {
      id: 3,
      fullName: "Taylor Reed",
      nickname: "Taylor_R",
      email: "taylor.reed@nyu.edu",
      university: "NYU",
      profilePicture: "/placeholder.svg?height=80&width=80",
      submittedAt: "2024-01-13T09:20:00Z",
      status: "pending",
      facultyName: "Film Studies",
      degreeName: "Bachelor of Fine Arts",
      universityYear: "2nd Year (Sophomore)",
      whoAmI: "Film student interested in documentary filmmaking and storytelling.",
      thingsYouLikeToDo: ["Filmmaking", "Photography", "Writing"],
      abilities: ["Video Editing", "Cinematography", "Screenwriting"],
    },
  ])

  const handleApprove = (userId: number) => {
    setPendingUsers((users) =>
      users.map((user) => (user.id === userId ? { ...user, status: "approved" as const } : user)),
    )
    setIsReviewDialogOpen(false)
    setSelectedUser(null)
  }

  const handleReject = (userId: number) => {
    if (!rejectionReason.trim()) return

    setPendingUsers((users) =>
      users.map((user) => (user.id === userId ? { ...user, status: "rejected" as const } : user)),
    )
    setIsReviewDialogOpen(false)
    setSelectedUser(null)
    setRejectionReason("")
  }

  const openReviewDialog = (user: PendingUser) => {
    setSelectedUser(user)
    setIsReviewDialogOpen(true)
  }

  const filteredUsers = pendingUsers.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.university.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const pendingCount = pendingUsers.filter((user) => user.status === "pending").length
  const approvedCount = pendingUsers.filter((user) => user.status === "approved").length
  const rejectedCount = pendingUsers.filter((user) => user.status === "rejected").length

  return (
    <div className="container py-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage user profile approvals and platform oversight</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
              </div>
              <UserX className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{pendingUsers.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">Pending Approval ({pendingCount})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedCount})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedCount})</TabsTrigger>
        </TabsList>

        {/* Search and Filter */}
        <div className="mb-4 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or university..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <TabsContent value="pending">
          <div className="grid gap-4">
            {filteredUsers
              .filter((user) => user.status === "pending")
              .map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={user.profilePicture || "/placeholder.svg"} alt={user.fullName} />
                          <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <div>
                            <h3 className="text-lg font-semibold">{user.fullName}</h3>
                            <p className="text-sm text-muted-foreground">@{user.nickname}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">{user.university}</Badge>
                            <Badge variant="outline">{user.facultyName}</Badge>
                            <Badge variant="outline">{user.universityYear}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Submitted: {new Date(user.submittedAt).toLocaleDateString()} at{" "}
                            {new Date(user.submittedAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openReviewDialog(user)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          Review
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(user.id)}
                          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="approved">
          <div className="grid gap-4">
            {filteredUsers
              .filter((user) => user.status === "approved")
              .map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={user.profilePicture || "/placeholder.svg"} alt={user.fullName} />
                          <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <div>
                            <h3 className="text-lg font-semibold">{user.fullName}</h3>
                            <p className="text-sm text-muted-foreground">@{user.nickname}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          <Badge className="bg-green-500/10 text-green-500 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approved
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected">
          <div className="grid gap-4">
            {filteredUsers
              .filter((user) => user.status === "rejected")
              .map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={user.profilePicture || "/placeholder.svg"} alt={user.fullName} />
                          <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <div>
                            <h3 className="text-lg font-semibold">{user.fullName}</h3>
                            <p className="text-sm text-muted-foreground">@{user.nickname}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          <Badge className="bg-red-500/10 text-red-500 border-red-200">
                            <XCircle className="h-3 w-3 mr-1" />
                            Rejected
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Profile Application</DialogTitle>
            <DialogDescription>Review the user's profile information before making a decision.</DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUser.profilePicture || "/placeholder.svg"} alt={selectedUser.fullName} />
                  <AvatarFallback>{selectedUser.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedUser.fullName}</h3>
                  <p className="text-sm text-muted-foreground">@{selectedUser.nickname}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">University</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.university}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Faculty</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.facultyName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Degree</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.degreeName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Year</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.universityYear}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">About</p>
                <p className="text-sm text-muted-foreground">{selectedUser.whoAmI}</p>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Interests</p>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.thingsYouLikeToDo.map((item, index) => (
                    <Badge key={index} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Abilities</p>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.abilities.map((item, index) => (
                    <Badge key={index} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Rejection Reason (if rejecting)</p>
                <Textarea
                  placeholder="Provide a reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedUser && handleReject(selectedUser.id)}
              disabled={!rejectionReason.trim()}
              className="flex items-center gap-1"
            >
              <XCircle className="h-4 w-4" />
              Reject
            </Button>
            <Button
              onClick={() => selectedUser && handleApprove(selectedUser.id)}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
            >
              <CheckCircle className="h-4 w-4" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
