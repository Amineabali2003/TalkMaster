"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/hooks/useAuth"
import { getMyTalks, downloadIcal } from "@/lib/api"
import { Button } from "@/components/ui/button"

export default function SpeakerTalksPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [talks, setTalks] = useState([])

  useEffect(() => {
    if (user) {
      getMyTalks()
        .then(setTalks)
        .catch(() => setTalks([]))
    }
  }, [user])

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
      <h1 className="text-2xl font-bold mb-6 text-center">Mes Talks</h1>
      {talks.length === 0 ? (
        <p className="text-center text-muted-foreground">Aucun talk pour le moment.</p>
      ) : (
        <div className="grid gap-4">
          {talks.map((talk) => (
            <div key={talk.id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-bold">{talk.title}</h2>
              <p className="text-sm text-muted-foreground">{talk.subject}</p>
              <p>{talk.description}</p>
              <p className="mt-2">
                <strong>Durée:</strong> {talk.duration} minutes
              </p>
              <p>
                <strong>Niveau:</strong> {talk.level}
              </p>
              <p>
                <strong>Statut:</strong> {talk.status}
              </p>
              {talk.startTime && (
                <p>
                  <strong>Début:</strong>{" "}
                  {new Date(talk.startTime).toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}
                </p>
              )}
              {talk.room && (
                <p>
                  <strong>Salle:</strong> {talk.room.name}
                </p>
              )}
              {talk.status === "SCHEDULED" && (
                <Button className="mt-2" onClick={() => downloadIcal(talk.id)}>
                  Télécharger .ics
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}