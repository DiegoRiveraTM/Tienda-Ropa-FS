"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { SiteHeader } from "@/components/site-header";
import api from "@/lib/api";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function MensPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        console.log("📦 Respuesta de la API:", response.data);
  
        if (!Array.isArray(response.data)) {
          throw new Error("❌ La API no devolvió un array de productos.");
        }
  
        const filteredProducts = response.data.filter(
          (product) => product.category === "hombres"
        );
  
        setProducts(filteredProducts);
      } catch (error) {
        console.error("❌ Error al obtener productos:", error);
      }
    };
  
    fetchProducts();
  }, []);
  return (
    <>
      <SiteHeader />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Ropa para Hombres</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </main>
    </>
  );
}
