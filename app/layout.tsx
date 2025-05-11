import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { DndProvider } from "@/lib/dnd-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kanban Task Board",
  description: "Project-based Kanban Task Board with drag and drop functionality"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <DndProvider>{children}</DndProvider>
      </body>
    </html>
  )
}
