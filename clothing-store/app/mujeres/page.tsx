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

export default function WomensPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })
      .then((data: Product[]) => {
        console.log("📦 Productos recibidos antes del filtro:", data);

        if (!Array.isArray(data)) {
          console.error("❌ Error: La API no devolvió un array.");
          return;
        }

        // 🔥 Filtrar solo productos de la categoría "mujeres"
        const womensProducts = data.filter((p) => p.category.trim().toLowerCase() === "mujeres");
        console.log("👗 Productos de mujeres filtrados:", womensProducts);

        if (womensProducts.length === 0) {
          console.warn("⚠️ No hay productos de mujeres después del filtro.");
        }

        setProducts(womensProducts);
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
        <h1 className="text-2xl font-bold mb-6">Ropa para Mujeres</h1>

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
