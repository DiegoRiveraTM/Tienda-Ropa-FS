"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import api from "@/lib/api"; // Usa Axios o Fetch según tu setup
import axios from "axios";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  total: number;
  showToast: boolean;
  setShowToast: (show: boolean) => void;
  syncCart: (userId: string | null) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]); // 🔥 Siempre inicializamos con un array vacío
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // 📌 Obtener el token desde localStorage
  const getToken = () => localStorage.getItem("authToken");

  // 🔄 Sincronizar el carrito con el backend
  const syncCart = useCallback(async (userId: string | null) => {
    if (!userId) return;

    try {
      const token = getToken();
      if (!token) {
        console.warn("⚠️ No hay token, no se puede sincronizar el carrito.");
        return;
      }

      console.log("Making request to:", "https://f08c-2806-230-4043-c3d8-b449-a23b-540c-b848.ngrok-free.app/api/cart"); // Debugging
      const response = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Response from backend:", response.data); // Debugging

      if (response.status === 200) {
        const cartData = (response.data as { cart: CartItem[] }).cart ?? [];
        setItems(cartData);
      }
    } catch (error) {
      console.error("❌ Error al sincronizar el carrito:", error);
      if (axios.isAxiosError(error)) {
        console.error("Detalles del error:", error.response?.data);
      }
    }
  }, []);

  // 🚀 Agregar un producto al carrito
  const addItem = useCallback(async (item: CartItem) => {
    const token = getToken();
    if (!token) {
      console.warn("⚠️ No hay token, no se puede agregar productos al carrito.");
      return;
    }

    // 🔥 Verifica que `productId` y `quantity` existen antes de hacer la petición
    if (!item.productId || typeof item.quantity !== "number") {
      console.error("❌ Error: Producto o cantidad no válidos", item);
      return;
    }

    try {
      console.log("🛒 Enviando al carrito:", JSON.stringify(item, null, 2));
      const response = await api.post(
        "/cart",
        {
          productId: item.productId,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
          image: item.image
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("📦 Respuesta del backend:", response.data);

      if (response.status === 200) {
        const data = response.data as { cart: CartItem[] };
        console.log("✅ Carrito actualizado:", data.cart);
        setItems(data.cart ?? []); // 🔥 Aquí aseguramos que `cart` no sea undefined
      }
    } catch (error) {
      console.error("❌ Error agregando producto al carrito:", error);
      if (axios.isAxiosError(error)) {
        console.error("Detalles del error:", error.response?.data);
      }
    }
  }, []);

  // ❌ Eliminar un producto del carrito
  const removeItem = useCallback(async (productId: string) => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await api.delete(`/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Datos recibidos del backend:", response.data); // Debugging
      if (response.status === 200) {
        const data = response.data as { cart: CartItem[] };
        setItems(data.cart ?? []); // 🔥 Siempre un array
      }
    } catch (error) {
      console.error("❌ Error eliminando producto:", error);
    }
  }, []);

  // 🔄 Actualizar cantidad de un producto
  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await api.put(
        "/cart",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        const data = response.data as { cart: CartItem[] };
        setItems(data.cart ?? []);
      }
    } catch (error) {
      console.error("❌ Error actualizando la cantidad del producto:", error);
    }
  }, []);

  // 🛒 Vaciar el carrito
  const clearCart = useCallback(() => {
    setItems([]); // 🔥 Ahora seguro
    localStorage.removeItem("cart");
    setIsOpen(false);
  }, []);

  // 🔢 Calcula el total
  const total = items.length > 0 ? items.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0;

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
  );
}

// Hook para acceder al contexto del carrito
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}