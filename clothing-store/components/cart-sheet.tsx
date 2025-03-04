"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { CartItem } from "./cart-item"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import axios from "axios"

export function CartSheet() {
  const { isOpen, setIsOpen, items, total, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("❌ No hay token, no se puede proceder al pago.");
        return;
      }

      const orderData = {
        products: items.map(item => ({
            productId: item._id.toString(),  // 🔥 Asegura que usas el _id correcto de MongoDB
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
        })),
      };

      console.log("📤 Enviando orden:", JSON.stringify(orderData, null, 2));

      const response = await api.post("/orders", orderData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });

      console.log("✅ Orden creada con éxito:", response.data);

      // ✅ Aquí token está bien declarado
      const chargeResponse = await api.post(
        "/api/coinbase/create-charge",
        {
          amount: total.toFixed(2),
          currency: "USD",
          redirect_url: "https://tutienda.com/success",
          cancel_url: "https://tutienda.com/cancel"
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (chargeResponse.status === 200) {
        console.log("✅ Cargo creado con éxito", chargeResponse.data);
        clearCart();  // Limpiar el carrito después de generar el pago
        window.location.href = chargeResponse.data.charge.data.hosted_url;
      } else {
        console.error("❌ Error al crear el cargo en Coinbase", chargeResponse.data);
      }
    } catch (error) {
      console.error("❌ Error al proceder al pago:", error);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Carrito de Compras</SheetTitle>
          <SheetDescription>
            Aquí se muestran los productos añadidos a tu carrito.
          </SheetDescription>
        </SheetHeader>

        {/* Contenedor principal */}
        <ScrollArea className="flex-1 -mx-6 px-6">
          {items.length === 0 ? (
            <div className="flex min-h-[150px] items-center justify-center">
              <p className="text-muted-foreground">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              {items.map((item, index) => (
                <CartItem key={item.productId ?? `cart-item-${index}`} item={{ ...item, id: item.productId }} />
              ))}
            </div>
          )}
        </ScrollArea>

        {/* 🔥 Sección del total y botón FIJA abajo */}
        <div className="sticky bottom-0 left-0 w-full bg-white py-0 space-y-4">
          <Separator />
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
          </div>
          <Button className="w-full" size="lg" onClick={handleCheckout}>
            Proceder al pago
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
