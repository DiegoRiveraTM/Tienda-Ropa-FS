"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { isAxiosError } from "axios";

async function refreshAccessToken(refreshToken: string): Promise<string> {
  try {
    const response = await api.post("/auth/refresh-token", { token: refreshToken });
    if (response.status === 200) {
      return response.data.token;
    } else {
      throw new Error("Failed to refresh access token");
    }
  } catch (error) {
    throw new Error("Failed to refresh access token");
  }
}
import type { AxiosError } from "axios";

interface CartItem {
  productId: string;  // 🔥 Asegúrate de que usa `productId` en vez de `id`
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export function ProductCard({ id, name, price, image, category }: ProductCardProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

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
        id,
        productId: id, // 🔥 Asegúrate de pasar `productId`
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
  
  const handleClick = () => {
    router.push(`/${category}/${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={handleClick}>
      <div className="relative h-64">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          className={`object-cover rounded-lg transition-transform duration-300 ${
            isAnimating ? "scale-105" : "scale-100"
          }`}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">${price.toFixed(2)}</p>
        <Button
          onClick={handleAddToCart}
          className={`w-full mt-4 transition-transform duration-300 ${
            isAnimating ? "scale-95" : "scale-100"
          }`}
        >
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
}