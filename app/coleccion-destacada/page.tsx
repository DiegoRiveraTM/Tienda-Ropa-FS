"use client"

import { ProductCard } from "@/components/product-card"
import { SiteHeader } from "@/components/site-header"

const featuredProducts = [
  { id: "f1", name: "Abrigo de Invierno", price: 899, image: "/placeholder.svg" },
  { id: "f2", name: "Vestido de Gala", price: 799, image: "/placeholder.svg" },
  { id: "f3", name: "Conjunto Deportivo", price: 599, image: "/placeholder.svg" },
  { id: "f4", name: "Bolso de Diseñador", price: 499, image: "/placeholder.svg" },
  { id: "f5", name: "Zapatos de Edición Limitada", price: 699, image: "/placeholder.svg" },
  { id: "f6", name: "Accesorios Premium", price: 299, image: "/placeholder.svg" },
]

export default function FeaturedCollectionPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Colección Destacada</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </div>
  )
}

