"use client"

import { ProductCard } from "@/components/product-card"
import { SiteHeader } from "@/components/site-header"

const mensProducts = [
  {
    id: "m1",
    name: "Chaqueta de Cuero Premium",
    price: 1299,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "hombres",
  },
  {
    id: "m2",
    name: "Traje Ejecutivo Negro",
    price: 1599,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "hombres",
  },
  {
    id: "m3",
    name: "Abrigo de Lana Italiano",
    price: 899,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "hombres",
  },
  {
    id: "m4",
    name: "Camisa de Lino",
    price: 299,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "hombres",
  },
  {
    id: "m5",
    name: "Pantalón de Vestir",
    price: 459,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "hombres",
  },
  {
    id: "m6",
    name: "Sweater Cashmere",
    price: 699,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "hombres",
  },
  {
    id: "m7",
    name: "Blazer Azul Marino",
    price: 799,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "hombres",
  },
  {
    id: "m8",
    name: "Polo Premium",
    price: 199,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "hombres",
  },
  {
    id: "m9",
    name: "Gabardina Clásica",
    price: 899,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "hombres",
  },
]

export default function MensPage() {
  return (
    <>
      <SiteHeader />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Ropa para Hombres</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mensProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </>
  )
}

