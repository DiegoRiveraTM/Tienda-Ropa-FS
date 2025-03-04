"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { SiteHeader } from "@/components/site-header";
import api from "@/lib/api";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductPage() {
  const params = useParams(); // 🔍 Obtener parámetros de la URL
  const id = params?.id as string; // 🔥 Asegurar que sea un string válido
  console.log("🔍 ID recibido desde useParams:", id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await api.get<Product>(`/products/${id}`);
        console.log("📦 Producto recibido:", response.data);
        setProduct(response.data);
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

  return (
    <>
      <SiteHeader />
      {product ? <ProductDetail {...product} /> : <p className="text-center">No se encontró el producto</p>}
    </>
  );
}
