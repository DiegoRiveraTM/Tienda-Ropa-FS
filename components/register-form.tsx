"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle } from "lucide-react"

export function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{
    type: "success" | "error" | "validation" | null
    message: string
  }>({ type: null, message: "" })

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
    if (password !== confirmPassword) {
      setStatus({
        type: "validation",
        message: "Las contraseñas no coinciden",
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
      // Simular una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simular registro exitoso
      if (email === "test@test.com") {
        setStatus({
          type: "error",
          message: "Este correo electrónico ya está registrado",
        })
      } else {
        setStatus({
          type: "success",
          message: "¡Registro exitoso! Ya puedes iniciar sesión.",
        })
        // Limpiar el formulario después de un registro exitoso
        setEmail("")
        setPassword("")
        setConfirmPassword("")
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
        <Label htmlFor="register-email">Correo electrónico</Label>
        <Input
          id="register-email"
          type="email"
          placeholder="tu@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={status.type === "validation" && !email.includes("@") ? "border-red-500" : ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-password">Contraseña</Label>
        <Input
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={status.type === "validation" && password.length < 6 ? "border-red-500" : ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirmar contraseña</Label>
        <Input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className={status.type === "validation" && password !== confirmPassword ? "border-red-500" : ""}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Registrarse
      </Button>
    </form>
  )
}
