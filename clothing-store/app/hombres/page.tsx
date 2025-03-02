"use client"

import { ProductCard } from "@/components/product-card"
import { SiteHeader } from "@/components/site-header"
import Image from "next/image";

const mensProducts = [
  {
    id: "m1",
    name: "Chaqueta de Cuero Premium",
    price: 60.00,
    image: "/Chaqueta-de-Cuero-Premium.jpg",
    category: "hombres",
  },
  {
    id: "m2",
    name: "Traje Ejecutivo Negro",
    price: 75.00,
    image: "/Traje-Ejecutivo-Negro.jpg",
    category: "hombres",
  },
  {
    id: "m3",
    name: "Abrigo de Lana Italiano",
    price: 40.00,
    image: "Abrigo-de-Lana-Italiano.jpg",
    category: "hombres",
  },
  {
    id: "m4",
    name: "Camisa de Lino",
    price: 25.00,
    image: "Camisa-de-Lino.jpg",
    category: "hombres",
  },
  {
    id: "m5",
    name: "Pantalón de Vestir",
    price: 22.99,
    image: "Pantalon-de-Vestir.jpg",
    category: "hombres",
  },
  {
    id: "m6",
    name: "Sweater Cashmere",
    price: 35.00,
    image: "Sweater-Cashmere.jpg",
    category: "hombres",
  },
  {
    id: "m7",
    name: "Blazer Azul Marino",
    price: 40.00,
    image: "Blazer-Azul-Marino.jpg",
    category: "hombres",
  },
  {
    id: "m8",
    name: "Polo Premium",
    price: 10.99,
    image: "Polo-Premium.jpg",
    category: "hombres",
  },
  {
    id: "m9",
    name: "Gabardina Clásica",
    price: 45.99,
    image: "Gabardina-Clasica.jpg",
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

