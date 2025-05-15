"use client"

import { useEffect, useState } from "react"
import { getPendingTalks, getAvailableSlots, scheduleTalk } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function DashboardPendingTalks() {
  const [talks, setTalks] = useState([])
  const [slots, setSlots] = useState([])
  const [selectedTalkId, setSelectedTalkId] = useState("")
  const [selectedRoomId, setSelectedRoomId] = useState("")
  const [available, setAvailable] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)

  useEffect(() => {
    getPendingTalks().then(setTalks)
    getAvailableSlots().then(setSlots)
  }, [])

  useEffect(() => {
    setSelectedRoomId("")
    setSelectedSlot(null)
    setAvailable([])
  }, [selectedTalkId])

  useEffect(() => {
    if (selectedRoomId) {
      const filtered = slots.filter((s) => s.roomId === selectedRoomId)
      setAvailable(filtered)
      setSelectedSlot(null)
    }
  }, [selectedRoomId])

  const handleSchedule = async () => {
    if (!selectedTalkId || !selectedSlot) return
    await scheduleTalk(selectedTalkId, {
      startTime: selectedSlot.startTime,
      roomId: selectedSlot.roomId,
    })
    alert("Talk planifié avec succès")
    setSelectedTalkId("")
    setSelectedRoomId("")
    setSelectedSlot(null)
    const refreshedTalks = await getPendingTalks()
    setTalks(refreshedTalks)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Talks en attente</h1>
      <div className="grid gap-4 max-w-xl">
        <div>
          <Label>Choisir un talk</Label>
          <Select value={selectedTalkId} onValueChange={setSelectedTalkId}>
            <SelectTrigger>
              <SelectValue placeholder="Talk" />
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
        <div>
          <Label>Choisir une salle</Label>
          <Select value={selectedRoomId} onValueChange={setSelectedRoomId}>
            <SelectTrigger>
              <SelectValue placeholder="Salle" />
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
        <div>
          <Label>Choisir un créneau</Label>
          <Select value={selectedSlot?.startTime?.toString() || ""} onValueChange={(val) => {
            const found = available.find((s) => s.startTime.toString() === val)
            setSelectedSlot(found || null)
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Créneau disponible" />
            </SelectTrigger>
            <SelectContent>
              {available.map((slot) => (
                <SelectItem key={slot.startTime} value={slot.startTime.toString()}>
                  {new Date(slot.startTime).toLocaleString("fr-FR", { timeZone: "Europe/Paris" })} ({slot.duration}min)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSchedule}>Valider</Button>
      </div>
    </div>
  )
}
