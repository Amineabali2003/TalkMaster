import Calendar from "@/components/talk/Calendar"

export default function HomePage() {
  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Planning des Talks</h1>
      <Calendar />
    </div>
  )
}