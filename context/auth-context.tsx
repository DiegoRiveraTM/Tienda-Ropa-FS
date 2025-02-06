"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useCart } from "./cart-context"

type User = {
id: string
name: string
email: string
} | null

type AuthContextType = {
user: User
login: (email: string, password: string) => Promise<boolean>
logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
const [user, setUser] = useState<User>(null)
const { clearCart, syncCart } = useCart()

useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
    const parsedUser = JSON.parse(storedUser)
    setUser(parsedUser)
      // Only call syncCart if it's available
    if (typeof syncCart === "function") {
        syncCart(parsedUser.id)
    }
    }
}, [])

useEffect(() => {
    if (user && typeof syncCart === "function") {
    syncCart(user.id)
    }
}, [syncCart, user])

const login = async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === "test@test.com" && password === "123456") {
    const newUser = { id: "1", name: "Usuario de Prueba", email }
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    await syncCart(newUser.id)
    return true
    }
    return false
}

const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    clearCart()
}

return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
const context = useContext(AuthContext)
if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
}
return context
}
