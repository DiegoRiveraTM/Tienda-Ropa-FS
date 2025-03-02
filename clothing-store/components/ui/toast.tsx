import { CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastProps {
  message: string
  show: boolean
}

export function Toast({ message, show }: ToastProps) {
  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform",
        show ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
      )}
    >
      <CheckCircle className="h-5 w-5 text-green-400" />
      {message}
    </div>
  )
}

