import { CartProvider } from "@/context/cart-context"
import { AuthProvider } from "@/context/auth-context"
import { CartSheet } from "@/components/cart-sheet"
import { ToastWrapper } from "@/components/toast-wrapper"
import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Tienda de Ropa",
  description: "Tienda de ropa online",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <AuthProvider>
            {children}
            <CartSheet />
            <ToastWrapper />
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  )
}


import './globals.css'