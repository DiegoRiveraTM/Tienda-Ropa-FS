"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{
    type: "success" | "error" | "validation" | null
    message: string
  }>({ type: null, message: "" })

  const { login } = useAuth()
  const router = useRouter()

  const validateForm = () => {
    if (!email.includes("@")) {
      setStatus({
        type: "validation",
        message: "Por favor, ingresa un correo electrónico válido",
      })
      return false
    }
    if (password.length < 6) {
      setStatus({
        type: "validation",
        message: "La contraseña debe tener al menos 6 caracteres",
      })
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: null, message: "" })

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const success = await login(email, password)
      if (success) {
        setStatus({
          type: "success",
          message: "¡Inicio de sesión exitoso!",
        })
        // Redirigir al usuario a la página de inicio después de un breve retraso
        setTimeout(() => {
          router.push("/")
        }, 1500)
      } else {
        setStatus({
          type: "error",
          message: "Credenciales incorrectas. Por favor, verifica tus datos.",
        })
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Ha ocurrido un error. Por favor, intenta nuevamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status.type && (
        <Alert
          className={`${
            status.type === "success"
              ? "bg-green-50 text-green-700 border-green-200"
              : status.type === "error"
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-yellow-50 text-yellow-700 border-yellow-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {status.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            <AlertDescription>{status.message}</AlertDescription>
          </div>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={status.type === "validation" && !email.includes("@") ? "border-red-500" : ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={status.type === "validation" && password.length < 6 ? "border-red-500" : ""}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Iniciar sesión
      </Button>
    </form>
  )
}
