"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { apiFetch } from "@/lib/api"

export default function TalkForm() {
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState(30)
  const [level, setLevel] = useState("Débutant")
  const [startTime, setStartTime] = useState("")
  const [dateOptions, setDateOptions] = useState([])
  const [message, setMessage] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const today = new Date()
    const options = []
    for (let i = 0; i < 3; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() + i)
      options.push(d.toISOString().split("T")[0])
    }
    setDateOptions(options)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const timestamp = new Date(startTime).getTime()
      await apiFetch("/talks/propose", {
        method: "POST",
        body: JSON.stringify({
          title,
          subject,
          description,
          duration,
          level,
          startTime: timestamp
        }),
      })
      setMessage("Talk proposé avec succès")
      setTimeout(() => router.push("/talks"), 1000)
    } catch (err) {
      setMessage("Erreur : " + err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto p-6 border rounded-xl shadow-sm bg-white">
      <div>
        <Label htmlFor="title">Titre</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="subject">Sujet</Label>
        <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="duration">Durée (minutes)</Label>
        <select id="duration" value={duration} onChange={(e) => setDuration(+e.target.value)} className="w-full border p-2 rounded">
          <option value={30}>30</option>
          <option value={60}>60</option>
          <option value={90}>90</option>
        </select>
      </div>
      <div>
        <Label htmlFor="level">Niveau</Label>
        <select id="level" value={level} onChange={(e) => setLevel(e.target.value)} className="w-full border p-2 rounded">
          <option value="Débutant">Débutant</option>
          <option value="Intermédiaire">Intermédiaire</option>
          <option value="Avancé">Avancé</option>
        </select>
      </div>
      <div>
        <Label htmlFor="startTime">Date et Heure souhaitée</Label>
        <Input
          id="startTime"
          type="datetime-local"
          value={startTime}
          min={dateOptions[0] + "T09:00"}
          max={dateOptions[2] + "T19:00"}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      {message && <p className="text-sm text-center text-green-600">{message}</p>}
      <Button type="submit" className="w-full">Soumettre</Button>
    </form>
  )
}