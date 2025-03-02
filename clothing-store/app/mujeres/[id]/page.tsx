"use client"

import { SiteHeader } from "@/components/site-header"
import { ProductDetail } from "@/components/product-detail"
import { useParams } from "next/navigation"
import { ProductCard } from "@/components/product-card"

const womensProducts = [
  {
    _id: "67c00d40b63603a6b56d8984",
    name: "Vestido de Noche",
    price: 45.99,
    image: "/Vestido-de-Noche.jpg",
    category: "mujeres",
  },
  {
    _id: "67c00d40b63603a6b56d8985",
    name: "Conjunto Ejecutivo",
    price: 65.99,
    image: "/Conjunto-Ejecutivo.jpg",
    category: "mujeres",
  },
  {
    _id: "67c00d40b63603a6b56d8986",
    name: "Abrigo de Diseñador",
    price: 75.00,
    image: "/Abrigo-de-Disenador.jpg",
    category: "mujeres",
  },
  {
    _id: "67c00d40b63603a6b56d8987",
    name: "Vestido Largo",
    price: 20.00,
    image: "/Vestido-Largo.jpg",
    category: "mujeres",
  },
  {
    _id: "67c00d40b63603a6b56d8988",
    name: "Falda Plisada",
    price: 25.00,
    image: "/Falda-Plisada.jpg",
    category: "mujeres",
  },
  {
    _id: "67c00d40b63603a6b56d8989",
    name: "Pantalón de Alta Costura",
    price: 40.00,
    image: "/Pantalon-de-alta-custura.jpg",
    category: "mujeres",
  },
  {
    _id: "67c00d40b63603a6b56d898a",
    name: "Chaqueta Elegante",
    price: 45.00,
    image: "/Chaqueta-Elegante.jpg",
    category: "mujeres",
  },
  {
    _id: "67c00d40b63603a6b56d898b",
    name: "Top de Diseñador",
    price: 26.99,
    image: "/Top-De-Disenador.jpg",
    category: "mujeres",
  },
  {
    _id: "67c00d40b63603a6b56d898c",
    name: "Vestido Cocktail",
    price: 35.00,
    image: "/Vestido-Cocktail.jpg",
    category: "mujeres",
  },
];

export default function ProductPage() {
  const params = useParams()
  const product = womensProducts.find((p) => p._id === params.id)

  if (!product) return null

  return (
    <div className="min-h-screen bg-gray-100">
      <SiteHeader />
      <ProductCard key={product._id} id={product._id} {...product} />
      </div>
  )
}

