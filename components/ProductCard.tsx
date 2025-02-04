import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface ProductCardProps {
  image: string
  title: string
  category: string
}

export default function ProductCard({ image, title, category }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group cursor-pointer">
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{category}</p>
        </div>
      </CardContent>
    </Card>
  )
}

