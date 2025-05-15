import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { ThemeProvider } from "@/components/theme-provider"

export default function Layout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}