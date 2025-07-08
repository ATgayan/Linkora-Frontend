"use client"

import type React from "react"
import { usePathname } from "next/navigation"

import { useAuth } from "@/lib/useAuth"
import { Loader2 } from "lucide-react"
import { NavigationBar } from "@/components/navigation-bar"
import { Toaster } from "@/components/ui/toaster"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth()
  const pathname = usePathname()

  // The auth pages have their own layout and don't need the navigation bar
  const isAuthPage = pathname.startsWith("/auth")

  if (isAuthPage) {
    return <>{children}</>
  }

  // While the auth state is loading, show a full-screen spinner.
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <NavigationBar />
      <main className="flex-1">{children}</main>
      <Toaster />
    </div>
  )
}