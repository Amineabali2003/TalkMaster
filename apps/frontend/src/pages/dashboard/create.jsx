"use client"

import { useEffect, useState } from "react"
import { getAllTalks, scheduleTalk } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SlotPicker from "@/components/talk/SlotPicker"
import { Card, CardContent } from "@/components/ui/card"

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
      <h1 className="text-3xl font-bold mb-6 text-center">Planification Manuelle</h1>
      <Card className="max-w-xl mx-auto p-4 space-y-6">
        <CardContent className="space-y-4">
          <div>
            <Label className="mb-1 block">Talk à planifier</Label>
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

          <Button className="w-full mt-4" onClick={handleSchedule}>
            Planifier le Talk
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}