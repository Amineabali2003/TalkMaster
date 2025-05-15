import { useState } from "react"
import { useRouter } from "next/router"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { apiFetch } from "@/lib/api"

export default function ResetPasswordPage() {
  const router = useRouter()
  const { token } = router.query
  const [newPassword, setNewPassword] = useState("")
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await apiFetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, newPassword }),
      })
      setMessage("Mot de passe réinitialisé")
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-20">
      <h1 className="text-xl font-bold">Réinitialiser le mot de passe</h1>
      <div>
        <Label htmlFor="new-password">Nouveau mot de passe</Label>
        <Input
          id="new-password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
      <Button type="submit" className="w-full">Réinitialiser</Button>
    </form>
  )
}