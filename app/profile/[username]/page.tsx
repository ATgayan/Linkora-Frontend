"use client"

import { useParams } from "next/navigation"
import OtherProfileView from "@/other-profile-view"
import ProfileViewEnhanced from "@/profile-view-enhanced"

export default function ProfilePage() {
  const params = useParams()
  const username = params?.username as string

  // In a real app, you would fetch the user data based on the username
  // and check if it's the current user's profile or someone else's

  // For demo purposes, we'll just check if there's a username parameter
  const isOwnProfile = !username || username === "me"

  return isOwnProfile ? <ProfileViewEnhanced /> : <OtherProfileView />
}
