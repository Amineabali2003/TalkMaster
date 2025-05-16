"use client"

import { useEffect, useState } from "react"
import { getPendingTalks, getAvailableSlots, scheduleTalk } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function DashboardPendingTalks() {
  const [talks, setTalks] = useState([])
  const [slots, setSlots] = useState([])
  const [selectedTalkId, setSelectedTalkId] = useState("")
  const [selectedRoomId, setSelectedRoomId] = useState("")
  const [available, setAvailable] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [selectedTalk, setSelectedTalk] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    getPendingTalks().then(setTalks)
    getAvailableSlots().then(setSlots)
  }, [])

  useEffect(() => {
    const talk = talks.find((t) => t.id === selectedTalkId) || null
    setSelectedTalk(talk)
    setSelectedRoomId("")
    setSelectedSlot(null)
    setAvailable([])
  }, [selectedTalkId, talks])

  useEffect(() => {
    if (selectedRoomId && selectedTalk) {
      const filtered = slots.filter((s) =>
        s.roomId === selectedRoomId &&
        s.duration === selectedTalk.duration
      )
      setAvailable(filtered)
      setSelectedSlot(null)
    }
  }, [selectedRoomId, selectedTalk, slots])

  const handleSchedule = async () => {
    if (!selectedTalkId || !selectedSlot) return
    await scheduleTalk(selectedTalkId, {
      startTime: selectedSlot.startTime,
      roomId: selectedSlot.roomId,
    })
    setSelectedTalkId("")
    setSelectedRoomId("")
    setSelectedSlot(null)
    setSelectedTalk(null)
    setSuccessMessage("Talk planifié avec succès")
    setTimeout(() => setSuccessMessage(""), 3000)
    const refreshedTalks = await getPendingTalks()
    setTalks(refreshedTalks)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Talks en attente de validation</h1>
      <Card className="max-w-3xl mx-auto p-6 shadow-md">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 pb-10">
            <Label>Choisir un talk</Label>
            <Select value={selectedTalkId} onValueChange={setSelectedTalkId}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un talk" />
              </SelectTrigger>
              <SelectContent>
                {talks.map((talk) => (
                  <SelectItem key={talk.id} value={talk.id}>
                    {talk.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 pb-10">
            <Label>Choisir une salle</Label>
            <Select value={selectedRoomId} onValueChange={setSelectedRoomId}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une salle" />
              </SelectTrigger>
              <SelectContent>
                {[...new Set(slots.map((s) => s.roomId))].map((roomId) => {
                  const name = slots.find((s) => s.roomId === roomId)?.roomName
                  return (
                    <SelectItem key={roomId} value={roomId}>
                      {name}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {selectedTalk?.startTime && (
            <div className="md:col-span-2 flex flex-col gap-2">
              <Label>Date souhaitée par le conférencier</Label>
              <Input
                type="text"
                disabled
                value={new Date(selectedTalk.startTime).toLocaleString("fr-FR", {
                  timeZone: "Europe/Paris",
                })}
              />
            </div>
          )}

          <div className="flex flex-col gap-2 md:col-span-2 pb-20">
            <Label>Choisir un créneau</Label>
            <Select
              value={selectedSlot?.startTime?.toString() || ""}
              onValueChange={(val) => {
                const found = available.find((s) => s.startTime.toString() === val)
                setSelectedSlot(found || null)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Créneau disponible" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                {available.map((slot) => (
                  <SelectItem key={slot.startTime} value={slot.startTime.toString()}>
                    {new Date(slot.startTime).toLocaleString("fr-FR", { timeZone: "Europe/Paris" })} ({slot.duration} min)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Button className="w-full mt-2" onClick={handleSchedule}>
              Valider la planification
            </Button>
            {successMessage && (
              <p className="text-green-600 mt-4 text-center">{successMessage}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}