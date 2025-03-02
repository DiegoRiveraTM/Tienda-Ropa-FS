"use client"

import { ProductCard } from "@/components/product-card"
import { SiteHeader } from "@/components/site-header"

const womensProducts = [
  {
    id: "w1",
    name: "Vestido de Noche",
    price: 45.99,
    image: "Vestido-de-Noche.jpg",
    category: "mujeres",
  },
  {
    id: "w2",
    name: "Conjunto Ejecutivo",
    price: 65.99,
    image: "Conjunto-Ejecutivo.jpg",
    category: "mujeres",
  },
  {
    id: "w3",
    name: "Abrigo de Diseñador",
    price: 75.00,
    image: "Abrigo-de-Disenador.jpg",
    category: "mujeres",
  },
  {
    id: "w4",
    name: "Vestido Largo",
    price: 20.00,
    image: "Vestido-Largo.jpg",
    category: "mujeres",
  },
  {
    id: "w5",
    name: "Falda Plisada",
    price: 25.00,
    image: "Falda-Plisada.jpg",
    category: "mujeres",
  },
  {
    id: "w6",
    name: "Pantalón de Alta Costura",
    price: 40.00,
    image: "Pantalon-de-alta-custura.jpg",
    category: "mujeres",
  },
  {
    id: "w7",
    name: "Chaqueta Elegante",
    price: 45.00,
    image: "Chaqueta-Elegante.jpg",
    category: "mujeres",
  },
  {
    id: "w8",
    name: "Top de Diseñador",
    price: 26.99,
    image: "Top-De-Disenador.jpg",
    category: "mujeres",
  },
  {
    id: "w9",
    name: "Vestido Cocktail",
    price: 35.00,
    image: "Vestido-Cocktail.jpg",
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

