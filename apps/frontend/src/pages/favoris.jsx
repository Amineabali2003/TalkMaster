"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/hooks/useAuth"
import { getFavoriteTalks, downloadIcal, toggleFavorite } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export default function FavorisPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [talks, setTalks] = useState([])

  useEffect(() => {
    if (user) {
      getFavoriteTalks()
        .then((data) =>
          data.map((talk) => ({ ...talk, isFavorite: true }))
        )
        .then(setTalks)
        .catch(() => setTalks([]))
    }
  }, [user])

  const handleToggleFavorite = async (id) => {
    await toggleFavorite(id)
    const updated = await getFavoriteTalks()
    const withFlag = updated.map((talk) => ({ ...talk, isFavorite: true }))
    setTalks(withFlag)
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-xl font-semibold mb-4">Vous n'êtes pas connecté</h1>
        <Button onClick={() => router.push("/login")}>Se connecter</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Mes Favoris</h1>
      {talks.length === 0 ? (
        <p className="text-center text-muted-foreground">Aucun favori pour le moment.</p>
      ) : (
        <div className="grid gap-4">
          {talks.map((talk) => (
            <div key={talk.id} className="border p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">{talk.title}</h2>
                <Button variant="ghost" onClick={() => handleToggleFavorite(talk.id)}>
                  <Heart
                    className="h-5 w-5"
                    fill={talk.isFavorite ? "red" : "none"}
                    stroke={talk.isFavorite ? "red" : "currentColor"}
                  />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{talk.subject}</p>
              <p>{talk.description}</p>
              <p className="mt-2"><strong>Durée:</strong> {talk.duration} minutes</p>
              <p><strong>Niveau:</strong> {talk.level}</p>
              <p><strong>Statut:</strong> {talk.status}</p>
              {talk.startTime && (
                <p><strong>Début:</strong> {new Date(talk.startTime).toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</p>
              )}
              {talk.room && (
                <p><strong>Salle:</strong> {talk.room.name}</p>
              )}
              {talk.status === "SCHEDULED" && (
                <Button className="mt-2" onClick={() => downloadIcal(talk.id)}>Télécharger .ics</Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}