"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { getCurrentUser, logoutUser as logoutApi } from "@/lib/auth"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const publicPaths = ["/", "/login", "/register", "/forgot-password", "/reset-password"]
  const isPublicPage = publicPaths.some((path) => pathname.startsWith(path))

  const refreshUser = async () => {
    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshUser()
  }, [pathname])

  const logout = async () => {
    await logoutApi()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout, refreshUser }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}