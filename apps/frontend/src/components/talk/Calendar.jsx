"use client"

import { useEffect, useState } from "react"
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { apiFetch } from "@/lib/api"

const localizer = momentLocalizer(moment)

export default function Calendar() {
  const [events, setEvents] = useState([])
  const [allTalks, setAllTalks] = useState([])
  const [selectedRoom, setSelectedRoom] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedDate, setSelectedDate] = useState("")

  useEffect(() => {
    const fetchTalks = async () => {
      const data = await apiFetch("/talks/public")
      setAllTalks(data)
    }
    fetchTalks()
  }, [])

  useEffect(() => {
    let filtered = allTalks

    if (selectedRoom) {
      filtered = filtered.filter((talk) => talk.room?.id === selectedRoom)
    }

    if (selectedSubject) {
      filtered = filtered.filter((talk) => talk.subject === selectedSubject)
    }

    if (selectedDate) {
      filtered = filtered.filter((talk) => {
        const talkDate = new Date(talk.startTime).toISOString().split("T")[0]
        return talkDate === selectedDate
      })
    }

    const formatted = filtered.map((talk) => ({
      id: talk.id,
      title: talk.title,
      start: new Date(talk.startTime),
      end: new Date(new Date(talk.startTime).getTime() + talk.duration * 60000),
      resource: talk,
    }))
    setEvents(formatted)
  }, [allTalks, selectedRoom, selectedSubject, selectedDate])

  const roomMap = new Map()
  allTalks.forEach((talk) => {
    if (talk.room) {
      roomMap.set(talk.room.id, talk.room)
    }
  })
  const roomOptions = Array.from(roomMap.values())

  const subjectOptions = Array.from(new Set(allTalks.map((t) => t.subject))).filter(Boolean)

  const resetFilters = () => {
    setSelectedRoom("")
    setSelectedSubject("")
    setSelectedDate("")
  }

  return (
    <div className="bg-white rounded-md shadow p-4 space-y-4">
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block mb-1 font-medium">Salle</label>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Toutes</option>
            {roomOptions.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Sujet</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Tous</option>
            {subjectOptions.map((subject, i) => (
              <option key={i} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Jour</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <button onClick={resetFilters} className="ml-auto bg-gray-200 px-3 py-1 rounded">
          Réinitialiser les filtres
        </button>
      </div>

      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        views={["month", "week", "day"]}
        eventPropGetter={() => ({
          style: {
            backgroundColor: "#4f46e5",
            color: "#fff",
            borderRadius: "6px",
            border: "none",
          },
        })}
      />
    </div>
  )
}