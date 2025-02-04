"use client"

import { SiteHeader } from "@/components/site-header"
import { ProductDetail } from "@/components/product-detail"
import { useParams } from "next/navigation"

const womensProducts = [
  {
    id: "w1",
    name: "Vestido de Noche",
    price: 899,
    image: "/placeholder.svg",
    description: "Elegante vestido de noche con detalles en pedrería. Perfecto para eventos especiales.",
    category: "mujeres",
  },
  {
    id: "w2",
    name: "Conjunto Ejecutivo",
    price: 1299,
    image: "/placeholder.svg",
    description: "Conjunto ejecutivo de dos piezas. Ideal para el ambiente profesional.",
    category: "mujeres",
  },
  // ... Añade el resto de los productos aquí
]

export default function ProductPage() {
  const params = useParams()
  const product = womensProducts.find((p) => p.id === params.id)

  if (!product) return null

  return (
    <div className="min-h-screen bg-gray-100">
      <SiteHeader />
      <ProductDetail {...product} />
    </div>
  )
}

