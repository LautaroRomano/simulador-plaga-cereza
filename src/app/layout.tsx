import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Simulador de Control de Plagas",
  description: "Simulador interactivo para el control de plagas en cultivos",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className+" flex flex-col min-h-screen min-w-screen items-center justify-center bg-gray-100"}>
          {children}
      </body>
    </html>
  )
}
