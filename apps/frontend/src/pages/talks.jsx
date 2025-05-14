import { useEffect, useState } from "react"
import TalkList from "@/components/talk/TalkList"

export default function TalksPage() {
  const [talks, setTalks] = useState([])

  useEffect(() => {
    const storedTalks = JSON.parse(localStorage.getItem("talks") || "[]")
    const validatedTalks = storedTalks.filter((talk) => talk.validated)
    setTalks(validatedTalks)
  }, [])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Talks Validés</h1>
      <TalkList talks={talks} />
    </div>
  )
}
