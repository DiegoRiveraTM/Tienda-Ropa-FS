"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { ProductDetail } from "@/components/product-detail";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:4000/api/products/${id}`) // 👈 Ahora usa la API en vez del array local
      .then((res) => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
      })
      .then((data: Product) => {
        console.log("📌 Producto recibido:", data);
        setProduct(data);
      })
      .catch((err) => {
        console.error("❌ Error al obtener el producto:", err);
        setError("No se pudo cargar el producto");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center">🔄 Cargando producto...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product) return <p className="text-center py-20">❌ Producto no encontrado</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <SiteHeader />
      <ProductDetail {...product} />
    </div>
  );
}
