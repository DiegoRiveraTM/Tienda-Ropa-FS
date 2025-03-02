"use client"

import { ProductCard } from "@/components/product-card"
import { SiteHeader } from "@/components/site-header"
import Image from "next/image";

const mensProducts = [
  {
    _id: "67c00ca7b63603a6b56d8966",
    name: "Chaqueta de Cuero Premium",
    price: 60.00,
    image: "/Chaqueta-de-Cuero-Premium.jpg",
    category: "hombres",
  },
  {
    _id: "67c00ca7b63603a6b56d8967",
    name: "Traje Ejecutivo Negro",
    price: 75.00,
    image: "/Traje-Ejecutivo-Negro.jpg",
    category: "hombres",
  },
  {
    _id: "67c00ca7b63603a6b56d8968",
    name: "Abrigo de Lana Italiano",
    price: 40.00,
    image: "/Abrigo-de-Lana-Italiano.jpg",
    category: "hombres",
  },
  {
    _id: "67c00ca7b63603a6b56d8969",
    name: "Camisa de Lino",
    price: 25.00,
    image: "/Camisa-de-Lino.jpg",
    category: "hombres",
  },
  {
    _id: "67c00ca7b63603a6b56d896a",
    name: "Pantalón de Vestir",
    price: 22.99,
    image: "/Pantalon-de-Vestir.jpg",
    category: "hombres",
  },
  {
    _id: "67c00ca7b63603a6b56d896b",
    name: "Sweater Cashmere",
    price: 35.00,
    image: "/Sweater-Cashmere.jpg",
    category: "hombres",
  },
  {
    _id: "67c00ca7b63603a6b56d896c",
    name: "Blazer Azul Marino",
    price: 40.00,
    image: "/Blazer-Azul-Marino.jpg",
    category: "hombres",
  },
  {
    _id: "67c00ca7b63603a6b56d896d",
    name: "Polo Premium",
    price: 10.99,
    image: "/Polo-Premium.jpg",
    category: "hombres",
  },
  {
    _id: "67c00ca7b63603a6b56d896e",
    name: "Gabardina Clásica",
    price: 45.99,
    image: "/Gabardina-Clasica.jpg",
    category: "hombres",
  },
];

export default function MensPage() {
  return (
    <>
      <SiteHeader />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Ropa para Hombres</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mensProducts.map((product) => (
            <ProductCard key={product._id} id={product._id} {...product} />
          ))}
        </div>
      </main>
    </>
  )
}

