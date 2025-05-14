import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"

export default function TalkList({ talks = [] }) {
  if (talks.length === 0) {
    return <p className="text-muted-foreground">Aucun talk validé pour le moment.</p>
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {talks.map((talk, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">{talk.name}</h2>
            <p className="text-sm text-muted-foreground mb-1">
              Sujet : {talk.topic}
            </p>
            <p className="text-sm text-muted-foreground mb-1">
              Date : {format(new Date(talk.date), "dd/MM/yyyy")}
            </p>
            <p className="text-sm mt-2">{talk.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
