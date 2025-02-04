"use client"

import { SiteHeader } from "@/components/site-header"
import { ProductDetail } from "@/components/product-detail"
import { useParams } from "next/navigation"

const mensProducts = [
  {
    id: "m1",
    name: "Chaqueta de Cuero Premium",
    price: 1299,
    image: "/placeholder.svg",
    description: "Chaqueta de cuero genuino con acabados premium. Ideal para un look elegante y casual.",
    category: "hombres",
  },
  {
    id: "m2",
    name: "Traje Ejecutivo Negro",
    price: 1599,
    image: "/placeholder.svg",
    description: "Traje ejecutivo de corte moderno en negro elegante. Perfecto para ocasiones formales.",
    category: "hombres",
  },
  // ... Añade el resto de los productos aquí
]

export default function ProductPage() {
  const params = useParams()
  const product = mensProducts.find((p) => p.id === params.id)

  if (!product) return null

  return (
    <div className="min-h-screen bg-gray-100">
      <SiteHeader />
      <ProductDetail {...product} />
    </div>
  )
}

