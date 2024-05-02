import { Box } from "@chakra-ui/react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "./navbar"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BOS wallet",
  description: "by Bos DAo",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundImage:
            "url(https://upload.wikimedia.org/wikipedia/commons/1/17/Digital_rain_animation_small_letters_clear.gif)",
            backgroundColor: "black"
        }}
      >
        <Navbar />
        <Box as="main">{children}</Box>
      </body>
    </html>
  )
}
