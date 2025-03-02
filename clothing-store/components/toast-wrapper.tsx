"use client"

import { Toast } from "@/components/ui/toast"
import { useCart } from "@/context/cart-context"

export function ToastWrapper() {
const { showToast } = useCart()
return <Toast message="¡Producto agregado al carrito!" show={showToast} />
}

