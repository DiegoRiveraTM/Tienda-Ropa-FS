"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
}

export function ProductCard({ id, name, price, image, category }: ProductCardProps) {
  const router = useRouter()
  const { addItem } = useCart()
  const [isAnimating, setIsAnimating] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsAnimating(true)
    addItem({ id, name, price, image, quantity: 1 })
    setTimeout(() => setIsAnimating(false), 300)
  }

  const handleClick = () => {
    router.push(`/${category}/${id}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={handleClick}>
      <div className="relative h-64 cursor-pointer" onClick={() => router.push(`/${category}/${id}`)}>
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className={`object-cover transition-transform duration-300 ${isAnimating ? "scale-105" : "scale-100"}`}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">${price.toFixed(2)}</p>
        <Button
          onClick={handleAddToCart}
          className={`w-full mt-4 transition-transform duration-300 ${isAnimating ? "scale-95" : "scale-100"}`}
        >
          Agregar al carrito
        </Button>
      </div>
    </div>
  )
}
