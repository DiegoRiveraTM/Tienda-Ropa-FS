"use client"

import { ProductCard } from "@/components/product-card"
import { SiteHeader } from "@/components/site-header"

const kidsProducts = [
  {
    _id: "67c00d6cb63603a6b56d898d",
    name: "Conjunto Escolar",
    price: 15.99,
    image: "/Conjunto-Escolar.jpg",
    category: "ninos",
  },
  {
    _id: "67c00d6cb63603a6b56d898e",
    name: "Abrigo Infantil Premium",
    price: 22.99,
    image: "/Abrigo-Infantil-Premium.jpg",
    category: "ninos",
  },
  {
    _id: "67c00d6cb63603a6b56d898f",
    name: "Vestido de Fiesta Infantil",
    price: 18.99,
    image: "/Vestido-de-fiesta.jpg",
    category: "ninos",
  },
  {
    _id: "67c00d6cb63603a6b56d8990",
    name: "Conjunto Deportivo Junior",
    price: 12.99,
    image: "/Conjunto-Deportivo.jpg",
    category: "ninos",
  },
  {
    _id: "67c00d6cb63603a6b56d8991",
    name: "Pijama de Diseñador",
    price: 10.99,
    image: "/Pijama-de-disenador.jpg",
    category: "ninos",
  },
  {
    _id: "67c00d6cb63603a6b56d8992",
    name: "Chaqueta Juvenil",
    price: 15.00,
    image: "/Chaqueta-Juvenil.jpg",
    category: "ninos",
  },
  {
    _id: "67c00d6cb63603a6b56d8993",
    name: "Uniforme Deportivo",
    price: 17.99,
    image: "/Uniforme-Deportivo.jpg",
    category: "ninos",
  },
  {
    _id: "67c00d6cb63603a6b56d8994",
    name: "Traje de Ceremonia",
    price: 23.99,
    image: "/Traje-de-Ceremonia.jpg",
    category: "ninos",
  },
  {
    _id: "67c00d6cb63603a6b56d8995",
    name: "Conjunto Casual Premium",
    price: 18.99,
    image: "/Conjunto-Casual-Premium.jpg",
    category: "ninos",
  },
];


export default function KidsPage() {
  return (
    <>
      <SiteHeader />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Ropa para Niños</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kidsProducts.map((product) => (
            <ProductCard key={product._id} id={product._id} {...product} />
          ))}
        </div>
      </main>
    </>
  )
}

