// src/components/layout/Navbar.jsx
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">TalkMaster</h1>
        <nav className="space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/modifier" className="hover:underline">Modifier talk</Link>
          <Link href="/talks" className="hover:underline">Talks</Link>
          <Link href="/talk" className="hover:underline">Créer talk</Link>
        </nav>
      </div>
    </header>
  );
}
