"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { ReactNode } from "react"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  total: number
  showToast: boolean
  setShowToast: (show: boolean) => void
  syncCart: (userId: string | null) => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const syncCart = useCallback(async (userId: string | null) => {
    if (userId) {
      try {
        const response = await fetch("/api/cart")
        if (response.ok) {
          const data = await response.json()
          setItems(data.items)
        }
      } catch (error) {
        console.error("Error fetching cart:", error)
      }
    } else {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    }
  }, [])

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = useCallback((item: CartItem) => {
    setItems((current) => {
      const existingItem = current.find((i) => i.id === item.id)
      if (existingItem) {
        return current.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...current, { ...item, quantity: 1 }]
    })
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((current) => {
      if (quantity <= 0) {
        return current.filter((item) => item.id !== id)
      }
      return current.map((item) => (item.id === id ? { ...item, quantity } : item))
    })
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    localStorage.removeItem("cart")
    setIsOpen(false)
  }, [])

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        setIsOpen,
        total,
        showToast,
        setShowToast,
        syncCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
