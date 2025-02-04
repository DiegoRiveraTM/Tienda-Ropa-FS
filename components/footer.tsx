import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start pl-0 md:pl-0">
            <h3 className="font-bold text-lg mb-4 self-start">Nuestra Tienda</h3>
            <p className="text-left">Derechos Reservados Avance Proyecto Desarrollo Fullstack</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-lg mb-4">Atención al Cliente</h3>
            <Button variant="outline" className="bg-white text-black border-white transition-transform hover:scale-105">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contactar Soporte
            </Button>
          </div>
          <div className="flex flex-col items-end">
            <h3 className="font-bold text-lg mb-4">Redes Sociales</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white text-black border-white transition-transform hover:scale-105"
                >
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Button>
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white text-black border-white transition-transform hover:scale-105"
                >
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white text-black border-white transition-transform hover:scale-105"
                >
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">© 2023 Nuestra Tienda. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

