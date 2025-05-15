import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { apiFetch } from "@/lib/api"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await apiFetch("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      })
      setMessage("Email envoyé.")
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-20">
      <h1 className="text-xl font-bold">Mot de passe oublié</h1>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
      <Button type="submit" className="w-full">Envoyer</Button>
    </form>
  )
}