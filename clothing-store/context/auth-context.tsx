"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useCart } from "./cart-context";
import api from "@/lib/api"; // 👈 Usa Axios o Fetch según tu setup

type User = {
  id: string;
  name: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<{ success: boolean; message: any }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const { clearCart, syncCart } = useCart();

  // 🔹 Recuperar usuario del localStorage al cargar la app
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.id) {
          setUser(parsedUser);
          syncCart(parsedUser.id); // 🔥 Sincroniza carrito al recuperar sesión
        }
      }
    } catch (error) {
      console.error("Error al parsear usuario del localStorage:", error);
      localStorage.removeItem("user"); // 🔹 Evita errores futuros eliminando datos corruptos
    }
  }, []);

  // 🔹 Sincronizar carrito cada vez que `user` cambia
  useEffect(() => {
    if (user) {
      syncCart(user.id);
    }
  }, [user]);

  // 🔹 Manejo de login con errores detallados
  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<{ token: string; user: User }>('/auth/login', { email, password });
  
      if (response.status === 200) {
        const { token, user } = response.data;
  
        if (!user || !user.id) {
          console.error('Invalid user data received from server');
          return { success: false, message: 'Invalid user data' };
        }
  
        localStorage.setItem('authToken', token); // Save the token
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        syncCart(user.id);
        return { success: true, message: 'Login successful' };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
    return { success: false, message: 'Login failed' };
  };
  

  // 🔹 Actualizar carrito del usuario autenticado
  const updateCart = async (cartItems: any[]) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("⚠️ Token no encontrado, usuario no autenticado.");
      return;
    }

    if (!user || !user.id) {
      console.error("⚠️ Usuario inválido, no se puede actualizar el carrito.");
      return;
    }

    try {
      const response = await api.put(
        "/api/cart",
        { userId: user.id, items: cartItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ Carrito actualizado:", response.data);
    } catch (error: any) {
      if (error.response) {
        console.error(`❌ Error ${error.response.status}: ${error.response.data.message}`);
      } else {
        console.error("❌ Error al actualizar el carrito:", error.message);
      }
    }
  };

  // 🔹 Logout que limpia sesión y carrito completamente
  const logout = () => {
    setUser(null);
    localStorage.clear(); // 🔥 Borra todos los datos de sesión
    clearCart();
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

// 🔹 Hook personalizado para acceder al contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
