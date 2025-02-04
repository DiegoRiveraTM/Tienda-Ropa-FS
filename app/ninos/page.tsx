"use client"

import { ProductCard } from "@/components/product-card"
import { SiteHeader } from "@/components/site-header"

const kidsProducts = [
  {
    id: "k1",
    name: "Conjunto Escolar",
    price: 299,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "ninos",
  },
  {
    id: "k2",
    name: "Abrigo Infantil Premium",
    price: 399,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "ninos",
  },
  {
    id: "k3",
    name: "Vestido de Fiesta Infantil",
    price: 349,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "ninos",
  },
  {
    id: "k4",
    name: "Conjunto Deportivo Junior",
    price: 259,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "ninos",
  },
  {
    id: "k5",
    name: "Pijama de Diseñador",
    price: 199,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "ninos",
  },
  {
    id: "k6",
    name: "Chaqueta Juvenil",
    price: 299,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "ninos",
  },
  {
    id: "k7",
    name: "Uniforme Deportivo",
    price: 279,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "ninos",
  },
  {
    id: "k8",
    name: "Traje de Ceremonia",
    price: 459,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "ninos",
  },
  {
    id: "k9",
    name: "Conjunto Casual Premium",
    price: 329,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "ninos",
  },
]

export default function KidsPage() {
  return (
    <>
      <SiteHeader />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Ropa para Niños</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kidsProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </>
  )
}

