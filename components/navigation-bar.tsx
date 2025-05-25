"use client"
import { usePathname } from "next/navigation"
import { DesktopNav } from "@/components/desktop-nav"
import { MobileNav } from "@/components/mobile-nav"

export function NavigationBar() {
  const pathname = usePathname()

  // Don't show navigation on auth pages
  if (pathname?.startsWith("/auth")) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  )
}
