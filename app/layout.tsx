import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Project Dashboard'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="dark" style={{ colorScheme: 'dark' }}>
        {children}
      </body>
    </html>
  )
}
