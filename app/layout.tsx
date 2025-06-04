import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { NavigationBar } from "@/components/navigation-bar"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/lib/useAuth';

export const metadata: Metadata = {
  title: "Linkora - Connect, Collaborate, Create",
  description: "A social platform for university students to connect based on shared interests and skills",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <NavigationBar />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
