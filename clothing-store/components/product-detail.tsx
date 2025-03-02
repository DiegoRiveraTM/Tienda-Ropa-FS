"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { useCart } from "@/context/cart-context"

interface ProductDetailProps {
  id: string
  name: string
  price: number
  image: string
  description?: string
  category: string
}

export function ProductDetail({ id, name, price, image, description, category }: ProductDetailProps) {
  const router = useRouter()
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [isAnimating, setIsAnimating] = useState(false)

  const sizes = category === "ninos" ? ["4-5", "6-7", "8-9", "10-11", "12-13"] : ["XS", "S", "M", "L", "XL"]

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
  
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No authentication token found. Redirecting to login...");
      router.push("/login");
      setIsAnimating(false);
      return;
    }
  
    try {
      console.log("🛒 Intentando agregar al carrito:", { id, name, price, image });
  
      await addItem({
        productId: id, // Envía el ID como cadena (por ejemplo, "w1", "m1", etc.)
        name,
        price,
        image,
        quantity: 1,
      });
      
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setIsAnimating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Regresar
      </Button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="relative aspect-square">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover rounded-lg" />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{name}</h1>
              <p className="text-2xl font-semibold text-gray-900">${price}</p>
            </div>

            {description && <p className="text-gray-600">{description}</p>}

            <div className="space-y-4">
              <div>
                <Label htmlFor="size" className="text-base font-semibold mb-2 block">
                  Selecciona tu talla
                </Label>
                <RadioGroup
                  id="size"
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  className="grid grid-cols-5 gap-2"
                >
                  {sizes.map((size) => (
                    <Label
                      key={size}
                      htmlFor={`size-${size}`}
                      className="flex items-center justify-center p-2 border rounded-md cursor-pointer hover:bg-gray-50 [&:has(:checked)]:bg-black [&:has(:checked)]:text-white"
                    >
                      <RadioGroupItem id={`size-${size}`} value={size} className="sr-only" />
                      {size}
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <Button className="w-full" disabled={!selectedSize} onClick={handleAddToCart}>
                Agregar al carrito
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}