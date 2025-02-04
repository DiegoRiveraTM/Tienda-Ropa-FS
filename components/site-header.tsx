"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, User } from "lucide-react"
import { useCart } from "@/context/cart-context"

export function SiteHeader() {
  const { setIsOpen } = useCart()

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
          <Link href="/login" className="hover:text-gray-300 flex items-center gap-2">
            <User className="h-5 w-5" />
            Login
          </Link>
        </div>
      </nav>
    </header>
  )
}

