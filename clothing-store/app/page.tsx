"use client"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react";

export default function Home() {
  const [showThankYou, setShowThankYou] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = (e.target as HTMLFormElement).email.value
    if (email) {
      setShowThankYou(true)
      ;(e.target as HTMLFormElement).reset()
      setTimeout(() => setShowThankYou(false), 5000) // Oculta el mensaje después de 5 segundos
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <SiteHeader />
      {/* Hero Section */}
      <section className="bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto relative">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QwCpIYpHr47SKF4JqkbmUExZALggoJ.png"
              alt="Perro con disfraz de oso"
              width={600}
              height={600}
              className="w-full h-auto object-contain"
              priority
            />
            <div className="absolute left-8 bottom-12 space-y-3">
              <h1 className="text-xl font-bold text-gray-900">Notable Collection</h1>
              <p className="text-sm text-gray-700">Check out our notable collection </p>
              <Link href="/coleccion-destacada">
                <Button variant="secondary" size="default" className="bg-gray-200 hover:bg-gray-300 text-gray-900">
                  Explorar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Últimas Novedades</h2>
            <Link href="/coleccion-destacada" className="text-gray-600 hover:text-gray-900 flex items-center">
              Ver todo
              <span className="ml-2">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/hombres" className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png"
                  alt="Colección Hombres"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">Colección Hombres</h3>
                  <p className="text-sm text-gray-600">Hombres</p>
                </div>
              </div>
            </Link>
            <Link href="/mujeres" className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png"
                  alt="Colección Mujeres"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">Colección Mujeres</h3>
                  <p className="text-sm text-gray-600">Mujeres</p>
                </div>
              </div>
            </Link>
            <Link href="/ninos" className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png"
                  alt="Colección Niños"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">Colección Niños</h3>
                  <p className="text-sm text-gray-600">Niños</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Productos Destacados</h2>
            <Link href="/coleccion-destacada" className="text-gray-600 hover:text-gray-900 flex items-center">
              Ver todo
              <span className="ml-2">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/hombres" className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png"
                  alt="Colección Hombres"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">Colección Hombres</h3>
                  <p className="text-sm text-gray-600">Hombres</p>
                </div>
              </div>
            </Link>
            <Link href="/mujeres" className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png"
                  alt="Colección Mujeres"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">Colección Mujeres</h3>
                  <p className="text-sm text-gray-600">Mujeres</p>
                </div>
              </div>
            </Link>
            <Link href="/ninos" className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WvRkwRVfOfvo6bZq8DmyW0XRkGCmha.png"
                  alt="Colección Niños"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">Colección Niños</h3>
                  <p className="text-sm text-gray-600">Niños</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Suscríbete para recibir las últimas novedades</h2>
          <p className="text-gray-600 mb-6">
            ¡Sé el primero en conocer nuestras nuevas colecciones, ofertas exclusivas y recibe un 10% de descuento en tu
            primera compra!
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
            <div className="flex gap-4">
              <Input type="email" name="email" placeholder="Escribe tu correo" className="flex-1" required />
              <Button type="submit">Suscribirse</Button>
            </div>
            {showThankYou && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">¡Gracias por suscribirte!</strong>
                <span className="block sm:inline"> Te mantendremos informado de todas las novedades.</span>
              </div>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}