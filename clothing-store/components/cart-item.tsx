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
    _id: string; // 🔥 Agregamos _id para evitar el error

  }
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart()

  // Ajusta la URL de la imagen si es necesario
  const imageUrl = item.image ? (item.image.startsWith("/") ? item.image : `/${item.image}`) : "/placeholder.png";

  // Función para manejar la disminución de la cantidad
  const handleDecreaseQuantity = () => {
    if (item.quantity === 1) {
      // Si la cantidad es 1, elimina el producto
      removeItem(item.id);
    } else {
      // Si la cantidad es mayor que 1, disminuye la cantidad
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="flex gap-4 py-2">
      <div className="relative aspect-square h-24">
        {item.image ? (
          <Image 
            src={imageUrl} 
            alt={item.name || "Imagen de producto"} 
            width={96} 
            height={96} 
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
            <p className="text-sm text-gray-500">${typeof item.price === 'number' ? item.price.toFixed(2) : "N/A"}</p>
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
            onClick={handleDecreaseQuantity} // Usar la nueva función
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