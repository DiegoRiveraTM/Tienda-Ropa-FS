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
      const newToken = response.data.token;
      localStorage.setItem("authToken", newToken);
      return newToken;
    }
  } catch (error) {
    console.error("❌ Error refrescando el token:", error);
  }
  return "";
}

interface CartItem {
  _id: string; // Asegúrate de que esta propiedad esté en la interfaz
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface ProductCardProps {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export function ProductCard({ _id, name, price, image, category }: ProductCardProps) {
  console.log("🛒 Recibiendo producto en ProductCard:", { _id, name, price, image });

  if (!_id) {
    console.error("⚠️ Producto sin _id recibido:", { name, price, image });
  }
  
  const router = useRouter();
  const { addItem } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    console.log("🛒 Intentando agregar al carrito:", { _id, name, price, image });
  
    if (!_id) {
      console.error("❌ Error: el producto no tiene un `_id` válido.");
      return;
    }
  
    e.stopPropagation();
    setIsAnimating(true);

    let token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No authentication token found. Redirecting to login...");
      router.push("/login");
      setIsAnimating(false);
      return;
    }

    try {
      console.log("🛒 Intentando agregar al carrito:", { _id, name, price, image });

      await addItem({
        _id, // Agrega _id aquí
        productId: _id,
        name,
        price,
        image,
        quantity: 1,
      });

    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        console.log("Token inválido, intentando refrescar el token...");
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            const newToken = await refreshAccessToken(refreshToken);
            if (newToken) {
              console.log("Token refrescado, reintentando agregar al carrito...");
              await addItem({
                _id, // Agrega _id aquí
                productId: _id,
                name,
                price,
                image,
                quantity: 1,
              });
            } else {
              console.error("No se pudo refrescar el token. Redirigiendo a login...");
              router.push("/login");
            }
          } catch (refreshError) {
            console.error("Error refrescando el token:", refreshError);
            router.push("/login");
          }
        } else {
          console.error("No se encontró refresh token. Redirigiendo a login...");
          router.push("/login");
        }
      } else {
        console.error("Error agregando producto al carrito:", error);
      }
    } finally {
      setIsAnimating(false);
    }
  };

  const handleClick = () => {
    router.push(`/${category}/${_id}`);
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