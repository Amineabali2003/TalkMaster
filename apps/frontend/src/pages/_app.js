import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/context/AuthContext"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"] })

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <div className={`flex flex-col min-h-screen ${inter.className}`}>
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}