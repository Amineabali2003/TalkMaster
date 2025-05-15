"use client"

import { useEffect, useState } from "react"
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { apiFetch } from "@/lib/api"

const localizer = momentLocalizer(moment)

export default function Calendar() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchTalks = async () => {
      const data = await apiFetch("/talks/public")
      const formatted = data.map((talk) => ({
        id: talk.id,
        title: talk.title,
        start: new Date(talk.startTime),
        end: new Date(new Date(talk.startTime).getTime() + talk.duration * 60000),
        resource: talk,
      }))
      setEvents(formatted)
    }

    fetchTalks()
  }, [])

  return (
    <div className="bg-white rounded-md shadow p-4">
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