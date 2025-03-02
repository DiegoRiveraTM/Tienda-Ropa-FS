"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, User, LogOut } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const { setIsOpen, clearCart } = useCart()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    clearCart() // Limpiamos el carrito al cerrar sesión
  }

  return (
    <header className="bg-black text-white">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Proyecto.jpg-QB9FFSMtgrFFjBHusCyslghUmY6Uy7.png"
            alt="Logo de la tienda"
            width={40}
            height={40}
            className="object-contain"
          />
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-300">
            Inicio
          </Link>
          <Link href="/hombres" className="hover:text-gray-300">
            Hombres
          </Link>
          <Link href="/mujeres" className="hover:text-gray-300">
            Mujeres
          </Link>
          <Link href="/ninos" className="hover:text-gray-300">
            Niños
          </Link>
        </div>
        <div className="flex space-x-4">
          <button onClick={() => setIsOpen(true)} className="hover:text-gray-300 flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Carrito
          </button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" className="hover:text-gray-300 flex items-center gap-2">
              <User className="h-5 w-5" />
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
