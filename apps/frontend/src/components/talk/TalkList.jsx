import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { apiFetch } from "@/lib/api"
import { Download } from "lucide-react"

export default function TalkList({ talks: initialTalks = [], showActions = false }) {
  const [talks, setTalks] = useState(initialTalks)

  useEffect(() => {
    if (initialTalks.length === 0) {
      apiFetch("/talks/public")
        .then((res) => setTalks(res))
        .catch((err) => console.error(err))
    }
  }, [])

  const downloadIcal = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/talks/${id}/ical`, {
      credentials: "include"
    })
    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "talk.ics"
    a.click()
    a.remove()
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {talks.map((talk) => (
        <Card key={talk.id}>
          <CardHeader>
            <CardTitle>{talk.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{talk.subject}</p>
            <p className="mb-2">{talk.description}</p>
            <p className="text-sm mb-1">Niveau : {talk.level}</p>
            <p className="text-sm mb-1">Durée : {talk.duration} min</p>
            {talk.room?.name && (
              <p className="text-sm mb-1">
                Salle : {talk.room.name} <br />
                Début : {new Date(talk.startTime).toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}
              </p>
            )}
            {showActions && (
              <Button variant="outline" onClick={() => downloadIcal(talk.id)} className="mt-4 w-full">
                <Download className="mr-2 h-4 w-4" /> Télécharger iCal
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}