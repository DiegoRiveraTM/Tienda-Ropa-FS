"use client"

import Image from "next/image"
import { Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

interface CartItemProps {
  item: {
    id: string
    name: string
    price: number
    image: string
    quantity: number
  }
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart()

  // Ajusta la URL de la imagen si es necesario
  const imageUrl = item.image ? (item.image.startsWith("http") ? item.image : `/${item.image}`) : "/placeholder.svg";

  return (
    <div className="flex gap-4 py-2">
      <div className="relative aspect-square h-24">
        {item.image ? (
          <Image 
            src={imageUrl} 
            alt={item.name || "Imagen de producto"} 
            fill 
            className="object-cover rounded-md" 
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gray-200 rounded-md">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-gray-500">${item.price}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeItem(item.id)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-auto">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}