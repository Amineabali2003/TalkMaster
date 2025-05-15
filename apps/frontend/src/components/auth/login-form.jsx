"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { loginUser } from "@/lib/auth"
import { useAuth } from "@/hooks/useAuth"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { refreshUser } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await loginUser(email, password)
      await refreshUser()
      router.push("/")
    } catch (err) {
      setError("Identifiants incorrects")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Connexion</h1>
        <p className="text-sm text-muted-foreground">Entrez votre email et mot de passe</p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Mot de passe</Label>
            <Link href="/forgot-password" className="ml-auto text-sm underline-offset-4 hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full">Se connecter</Button>
      </div>
      <div className="text-center text-sm">
        Pas de compte ?{" "}
        <Link href="/register" className="underline underline-offset-4">
          S'inscrire
        </Link>
      </div>
    </form>
  )
}