import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/theme/mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white text-black dark:bg-gray-900 dark:text-white shadow-md px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-black dark:text-white">TalkMaster</h1>
        <nav className="flex items-center space-x-4">
          <Link href="/" className="hover:underline">Accueil</Link>
          <Link href="/talks" className="hover:underline">Talks</Link>
          {user?.role === "SPEAKER" && (
            <>
              <Link href="/talk" className="hover:underline">Proposer</Link>
              <Link href="/favoris" className="hover:underline">Mes Favoris</Link>
            </>
          )}
          {user?.role === "ORGANIZER" && (
            <Link href="/dashboard/talks" className="hover:underline">Dashboard</Link>
          )}
          {!user && (
            <Link href="/login" className="hover:underline">Se connecter</Link>
          )}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  {user.email}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={logout}>Déconnexion</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}