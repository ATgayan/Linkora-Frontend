import { redirect } from "next/navigation"

export default function ProfilePage() {
  // Redirect to the user's own profile
  redirect("/profile/me")
}
