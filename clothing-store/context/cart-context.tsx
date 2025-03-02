"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import api from "@/lib/api"; // Usa Axios o Fetch según tu setup

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
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

      console.log("Making request to:", "https://2673-2886-230-4043-c368-b449-a23b-540c-b848.ngrok-free.app/api/cart"); // Debugging
      const response = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Response from backend:", response.data); // Debugging

      if (response.status === 200) {
        const cartData = (response.data as { items: CartItem[] }).items ?? [];
        setItems(cartData);
      }
    } catch (error) {
      console.error("❌ Error al sincronizar el carrito:", error);
    }
  }, []);

  // 🚀 Agregar un producto al carrito
  const addItem = useCallback(async (item: CartItem) => {
    const token = getToken();
    if (!token) {
      console.warn("⚠️ No hay token, no se puede agregar productos al carrito.");
      return;
    }

    try {
      const response = await api.post(
        "/cart",
        { productId: item.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Response from backend:", response.data); // Debugging

      if (response.status === 200) {
        const data = response.data as { items: CartItem[] };
        setItems(data.items ?? []); // Update the cart state
        syncCart(item.id); // Sync the cart with the backend
      }

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("❌ Error agregando producto al carrito:", error);
    }
  }, []);

  // ❌ Eliminar un producto del carrito
  const removeItem = useCallback(async (id: string) => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await api.delete(`/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const data = response.data as { items: CartItem[] };
        setItems(data.items ?? []); // 🔥 Siempre un array
      }
    } catch (error) {
      console.error("❌ Error eliminando producto:", error);
    }
  }, []);

  // 🔄 Actualizar cantidad de un producto
  const updateQuantity = useCallback(async (id: string, quantity: number) => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await api.put(
        "/cart",
        { id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        const data = response.data as { items: CartItem[] };
        setItems(data.items ?? []);
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