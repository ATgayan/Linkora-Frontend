"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, CheckCircle, XCircle, RefreshCw, LogOut } from "lucide-react"
import Link from "next/link"

export default function PendingApprovalPage() {
  const [approvalStatus, setApprovalStatus] = useState<"pending" | "approved" | "rejected">("pending")
  const [isChecking, setIsChecking] = useState(false)

  // Sample user data for pending approval
  const userData = {
    fullName: "Alex Johnson",
    nickname: "Alex_J",
    email: "alex.johnson@stanford.edu",
    university: "Stanford University",
    profilePicture: "/placeholder.svg?height=80&width=80",
    submittedAt: "2024-01-15T10:30:00Z",
  }

  const checkApprovalStatus = async () => {
    setIsChecking(true)
    // Simulate API call to check approval status
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo purposes, randomly set status
    const statuses: ("pending" | "approved" | "rejected")[] = ["pending", "approved", "rejected"]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
    setApprovalStatus(randomStatus)
    setIsChecking(false)
  }

  const getStatusColor = () => {
    switch (approvalStatus) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-200"
      case "approved":
        return "bg-green-500/10 text-green-500 border-green-200"
      case "rejected":
        return "bg-red-500/10 text-red-500 border-red-200"
    }
  }

  const getStatusIcon = () => {
    switch (approvalStatus) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
    }
  }

  const getStatusText = () => {
    switch (approvalStatus) {
      case "pending":
        return "Pending Review"
      case "approved":
        return "Approved"
      case "rejected":
        return "Rejected"
    }
  }

  if (approvalStatus === "approved") {
    return (
      <div className="container flex h-screen max-w-md flex-col items-center justify-center space-y-6 py-12">
        <div className="flex w-full flex-col space-y-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-green-600">Profile Approved!</h1>
          <p className="text-muted-foreground">
            Congratulations! Your profile has been approved by our admin team. You can now access all features of
            Linkora.
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white" asChild>
            <Link href="/feed">Continue to Linkora</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (approvalStatus === "rejected") {
    return (
      <div className="container flex h-screen max-w-md flex-col items-center justify-center space-y-6 py-12">
        <div className="flex w-full flex-col space-y-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
            <XCircle className="h-10 w-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-red-600">Profile Rejected</h1>
          <p className="text-muted-foreground">
            Unfortunately, your profile was not approved. This could be due to incomplete information or policy
            violations. Please contact support for more details.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/auth">Try Again</Link>
            </Button>
            <Button variant="outline">Contact Support</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container flex h-screen max-w-2xl flex-col items-center justify-center space-y-6 py-12">
      <div className="w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/10 mb-4">
              <Clock className="h-10 w-10 text-yellow-500" />
            </div>
            <CardTitle className="text-2xl">Profile Under Review</CardTitle>
            <CardDescription>
              Your profile is currently being reviewed by our admin team. This usually takes 24-48 hours.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center">
              <Badge variant="outline" className={`${getStatusColor()} flex items-center gap-2 px-4 py-2`}>
                {getStatusIcon()}
                {getStatusText()}
              </Badge>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-center">Submitted Profile Information</h3>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={userData.profilePicture || "/placeholder.svg"} alt={userData.fullName} />
                  <AvatarFallback>{userData.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{userData.fullName}</p>
                  <p className="text-sm text-muted-foreground">@{userData.nickname}</p>
                  <p className="text-sm text-muted-foreground">{userData.email}</p>
                  <p className="text-sm text-muted-foreground">{userData.university}</p>
                </div>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Submitted on {new Date(userData.submittedAt).toLocaleDateString()} at{" "}
                {new Date(userData.submittedAt).toLocaleTimeString()}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-center">What happens next?</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <span>Admin team reviews your profile information</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-muted"></div>
                  <span>Verification of university email and details</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-muted"></div>
                  <span>Profile approval and access granted</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={checkApprovalStatus} disabled={isChecking}>
                {isChecking ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Check Status
                  </>
                )}
              </Button>
              <Button variant="outline" asChild>
                <Link href="/auth" className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
