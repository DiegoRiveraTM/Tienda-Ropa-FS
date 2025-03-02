"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription, // Asegúrate de que esté disponible en tu librería
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { CartItem } from "./cart-item"
import { Separator } from "@/components/ui/separator"

export function CartSheet() {
  const { isOpen, setIsOpen, items, total } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Carrito de Compras</SheetTitle>
          <SheetDescription>
            Aquí se muestran los productos añadidos a tu carrito.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <ScrollArea className="flex-1 -mx-6 px-6">
            {items.length === 0 ? (
              <div className="flex h-[450px] items-center justify-center">
                <p className="text-muted-foreground">Tu carrito está vacío</p>
              </div>
            ) : (
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </ScrollArea>
          <div className="space-y-4 pt-4">
            <Separator />
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full" size="lg">
              Proceder al pago
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
