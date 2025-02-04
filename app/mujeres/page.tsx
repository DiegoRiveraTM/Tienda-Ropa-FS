"use client"

import { ProductCard } from "@/components/product-card"
import { SiteHeader } from "@/components/site-header"

const womensProducts = [
  {
    id: "w1",
    name: "Vestido de Noche",
    price: 899,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "mujeres",
  },
  {
    id: "w2",
    name: "Conjunto Ejecutivo",
    price: 1299,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "mujeres",
  },
  {
    id: "w3",
    name: "Abrigo de Diseñador",
    price: 1599,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "mujeres",
  },
  {
    id: "w4",
    name: "Blusa de Seda",
    price: 399,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "mujeres",
  },
  {
    id: "w5",
    name: "Falda Plisada",
    price: 299,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "mujeres",
  },
  {
    id: "w6",
    name: "Pantalón de Alta Costura",
    price: 599,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "mujeres",
  },
  {
    id: "w7",
    name: "Chaqueta Elegante",
    price: 799,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "mujeres",
  },
  {
    id: "w8",
    name: "Top de Diseñador",
    price: 459,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "mujeres",
  },
  {
    id: "w9",
    name: "Vestido Cocktail",
    price: 699,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png",
    category: "mujeres",
  },
]

export default function WomensPage() {
  return (
    <>
      <SiteHeader />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Ropa para Mujeres</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {womensProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </>
  )
}

