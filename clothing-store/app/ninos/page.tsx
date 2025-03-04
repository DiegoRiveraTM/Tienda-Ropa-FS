"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { SiteHeader } from "@/components/site-header";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function KidsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/products") // 🔥 Ahora consulta la API
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })
      .then((data: Product[]) => {
        console.log("📦 Productos recibidos:", data);
        setProducts(data.filter((p) => p.category === "ninos")); // 🔥 Filtrar por categoría
      })
      .catch((err) => {
        console.error("❌ Error al obtener productos:", err);
        setError("No se pudieron cargar los productos");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SiteHeader />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Ropa para Niños</h1>

        {loading && <p className="text-center">🔄 Cargando productos...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </main>
    </>
  );
}
