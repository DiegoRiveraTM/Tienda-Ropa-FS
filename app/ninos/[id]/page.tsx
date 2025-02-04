"use client"

import { SiteHeader } from "@/components/site-header"
import { ProductDetail } from "@/components/product-detail"
import { useParams } from "next/navigation"

const kidsProducts = [
  {
    id: "k1",
    name: "Conjunto Escolar",
    price: 299,
    image: "/placeholder.svg",
    description: "Conjunto escolar de alta calidad. Resistente y cómodo para el día a día.",
    category: "ninos",
  },
  {
    id: "k2",
    name: "Abrigo Infantil Premium",
    price: 399,
    image: "/placeholder.svg",
    description: "Abrigo infantil con forro térmico. Ideal para días fríos.",
    category: "ninos",
  },
  // ... Añade el resto de los productos aquí
]

export default function ProductPage() {
  const params = useParams()
  const product = kidsProducts.find((p) => p.id === params.id)

  if (!product) return null

  return (
    <div className="min-h-screen bg-gray-100">
      <SiteHeader />
      <ProductDetail {...product} />
    </div>
  )
}

