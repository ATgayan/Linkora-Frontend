"use client"

import { AuthProvider } from "@/lib/useAuth"
import React from "react"

export const ClientAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>
}
