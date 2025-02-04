import { CartProvider } from "@/context/cart-context"
import { CartSheet } from "@/components/cart-sheet"
import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Tienda de Ropa",
  description: "Tienda de ropa online",
}

// Separamos el ToastWrapper en su propio archivo cliente
import { ToastWrapper } from "@/components/toast-wrapper"

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          {children}
          <CartSheet />
          <ToastWrapper />
        </CartProvider>
      </body>
    </html>
  )
}


import './globals.css'