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
  const params = useParams();
  const id = params?.id as string; // 🔥 Asegurar que sea un string válido
  console.log("🔍 ID recibido desde useParams:", id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      console.error("❌ No se recibió un ID en los parámetros.");
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/products/${id}`);
        if (!response.ok) throw new Error("Producto no encontrado");
        
        const data: Product = await response.json();
        console.log("📦 Producto recibido:", data);
        
        setProduct(data);
      } catch (error) {
        console.error("❌ Error al obtener producto:", error);
        setError("Producto no encontrado");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
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
