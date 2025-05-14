"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function TalkForm() {
  const [title, setTitle] = useState("")
  const [topic, setTopic] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ title, topic, date, description })
    router.push("/") // Redirection après soumission
  }

  const handleCancel = () => {
    router.push("/") // Annulation = retour à l'accueil
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto p-6 border rounded-xl shadow-sm bg-white">
      <div>
        <Label htmlFor="title">Nom du Talk</Label>
        <Input
          id="title"
          placeholder="Ex: Introduction à l'IA"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="topic">Sujet</Label>
        <Input
          id="topic"
          placeholder="Ex: Intelligence Artificielle"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Décris ton talk en quelques lignes..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 pt-4">
        <Button type="submit" className="w-full md:w-1/2">
            Valider
        </Button>
        <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="w-full md:w-1/2"
        >
            Annuler
        </Button>
        </div>

            </form>
        )
}
