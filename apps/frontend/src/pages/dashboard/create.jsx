"use client"

import { useEffect, useState } from "react"
import { getAllTalks, scheduleTalk } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SlotPicker from "@/components/talk/SlotPicker"

export default function ScheduleCreatePage() {
  const [talks, setTalks] = useState([])
  const [selectedTalk, setSelectedTalk] = useState("")
  const [selectedSlot, setSelectedSlot] = useState(null)

  useEffect(() => {
    getAllTalks().then((all) => {
      setTalks(all.filter((t) => t.status === "ACCEPTED"))
    })
  }, [])

  const handleSchedule = async () => {
    if (!selectedTalk || !selectedSlot) return
    await scheduleTalk(selectedTalk, {
      startTime: selectedSlot.startTime,
      roomId: selectedSlot.roomId,
    })
    alert("Talk planifié avec succès")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Planification Manuelle</h1>
      <div className="grid gap-6 max-w-xl">
        <div>
          <Label>Talk à planifier</Label>
          <Select onValueChange={setSelectedTalk}>
            <SelectTrigger>
              <SelectValue placeholder="Choisir un talk" />
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
        <SlotPicker onSelect={setSelectedSlot} />
        <Button onClick={handleSchedule}>Planifier</Button>
      </div>
    </div>
  )
}