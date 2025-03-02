"use client"

import { SiteHeader } from "@/components/site-header"
import { ProductDetail } from "@/components/product-detail"
import { useParams } from "next/navigation"

const kidsProducts = [
  {
    id: "k1",
    name: "Conjunto Escolar",
    price: 15.99,
    image: "/Conjunto-Escolar.jpg",
    category: "ninos",
  },
  {
    id: "k2",
    name: "Abrigo Infantil Premium",
    price: 22.99,
    image: "/Abrigo-Infantil-Premium.jpg",
    category: "ninos",
  },
  {
    id: "k3",
    name: "Vestido de Fiesta Infantil",
    price: 18.99,
    image: "/Vestido-de-fiesta.jpg",
    category: "ninos",
  },
  {
    id: "k4",
    name: "Conjunto Deportivo Junior",
    price: 12.99,
    image: "/Conjunto-Deportivo.jpg",
    category: "ninos",
  },
  {
    id: "k5",
    name: "Pijama de Diseñador",
    price: 10.99,
    image: "/Pijama-de-disenador.jpg",
    category: "ninos",
  },
  {
    id: "k6",
    name: "Chaqueta Juvenil",
    price: 15.00,
    image: "/Chaqueta-Juvenil.jpg",
    category: "ninos",
  },
  {
    id: "k7",
    name: "Uniforme Deportivo",
    price: 17.99,
    image: "/Uniforme-Deportivo.jpg",
    category: "ninos",
  },
  {
    id: "k8",
    name: "Traje de Ceremonia",
    price: 23.99,
    image: "/Traje-de-Ceremonia.jpg",
    category: "ninos",
  },
  {
    id: "k9",
    name: "Conjunto Casual Premium",
    price: 18.99,
    image: "/Conjunto-Casual-Premium.jpg",
    category: "ninos",
  },
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

