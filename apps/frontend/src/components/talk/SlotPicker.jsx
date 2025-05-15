"use client"

import { useEffect, useState } from "react"
import { getAvailableSlots } from "@/lib/api"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function SlotPicker({ onSelect }) {
  const [slots, setSlots] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    getAvailableSlots().then(setSlots)
  }, [])

  const handleSelect = (value) => {
    const slot = slots.find((s) => s.startTime.toString() === value)
    setSelected(slot)
    onSelect(slot)
  }

  return (
    <div className="grid gap-2">
      <Label>Choisir un créneau disponible</Label>
      <Select onValueChange={handleSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Créneau disponible" />
        </SelectTrigger>
        <SelectContent>
          {slots.map((slot, i) => (
            <SelectItem key={i} value={slot.startTime.toString()}>
              {new Date(slot.startTime).toLocaleString()} – {slot.duration} min – {slot.roomName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
