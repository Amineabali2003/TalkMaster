"use client"

import { useEffect, useState } from "react"
import { getPendingTalks, getAvailableSlots, scheduleTalk } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"

export default function DashboardPendingTalks() {
  const [talks, setTalks] = useState([])
  const [selectedTalk, setSelectedTalk] = useState(null)
  const [slots, setSlots] = useState([])
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)

  useEffect(() => {
    getPendingTalks().then(setTalks)
    getAvailableSlots().then(setSlots)
  }, [])

  const handleSelectTalk = (talk) => {
    setSelectedTalk(talk)
    setSelectedSlot(null)
  }

  const handleSchedule = async () => {
    if (!selectedTalk || !selectedSlot) return
    await scheduleTalk(selectedTalk.id, {
      startTime: selectedSlot.startTime,
      roomId: selectedSlot.roomId,
    })
    setSelectedTalk(null)
    setSelectedSlot(null)
    const updatedTalks = await getPendingTalks()
    setTalks(updatedTalks)
  }

  const availableRooms = [...new Set(slots.map(s => s.roomName))]
  const filteredSlots = selectedRoom ? slots.filter(s => s.roomName === selectedRoom) : []

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Talks en attente</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Liste des Talks</h2>
          <ul className="space-y-2">
            {talks.map(talk => (
              <li
                key={talk.id}
                className={`p-4 border rounded cursor-pointer ${selectedTalk?.id === talk.id ? "bg-blue-100" : ""}`}
                onClick={() => handleSelectTalk(talk)}
              >
                <div className="font-medium">{talk.title}</div>
                <div className="text-sm text-muted-foreground">{talk.speaker.email}</div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Planification</h2>
          {selectedTalk && (
            <div className="space-y-4">
              <div>
                <Label>Salle</Label>
                <Select onValueChange={setSelectedRoom}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une salle" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRooms.map(room => (
                      <SelectItem key={room} value={room}>{room}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedRoom && (
                <div>
                  <Label>Créneau disponible</Label>
                  <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto">
                    {filteredSlots.map(slot => (
                      <button
                        key={slot.startTime + slot.roomId}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2 border rounded text-left ${selectedSlot?.startTime === slot.startTime && selectedSlot?.roomId === slot.roomId ? "bg-green-100" : ""}`}
                      >
                        {format(new Date(slot.startTime), "eeee dd MMM yyyy - HH:mm")} ({slot.duration} min)
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedSlot && (
                <div className="border p-4 rounded shadow">
                  <h3 className="font-semibold">Récapitulatif</h3>
                  <p><strong>Talk:</strong> {selectedTalk.title}</p>
                  <p><strong>Salle:</strong> {selectedSlot.roomName}</p>
                  <p><strong>Début:</strong> {format(new Date(selectedSlot.startTime), "dd/MM/yyyy HH:mm")}</p>
                  <Button className="mt-4" onClick={handleSchedule}>Valider</Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}