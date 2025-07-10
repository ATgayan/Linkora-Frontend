"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, LogOut, MessageSquare, Search, User, Users, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { NotificationDropdown } from "@/components/notification-dropdown"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/useAuth"
import { useRouter } from "next/navigation"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/search", label: "Discover", icon: Search },
    { href: "/collab", label: "Collaborations", icon: Users },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
      try {
        await logout();
        router.push("/auth"); // Redirect after logout
      } catch (err) {
        console.error("Error logging out:", err);
      }
    };

  return (
    <div className="flex w-full items-center justify-between md:hidden">
      <Link href="/" className="flex items-center space-x-2">
        <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-xl font-bold text-transparent">
          Linkora
        </span>
      </Link>
      <div className="flex items-center gap-2">
        <NotificationDropdown />
        <ModeToggle />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary flex items-center gap-3 py-2",
                    pathname === item.href ? "text-primary" : "text-muted-foreground",
                  )}
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
              <Separator />
              <div
                className="flex items-center gap-3 py-2 text-sm font-medium text-red-500"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
