import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'



const monsterrat = Montserrat({
  subsets:['latin'],
  style: ['italic', 'normal'],
  weight: ['400', '700'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Buime',
  description: 'Find whatever you want in one site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={monsterrat.className}>{children}</body>
    </html>
  )
}
