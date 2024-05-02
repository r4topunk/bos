import { Box } from "@chakra-ui/react"
import type { Metadata } from "next"
import { Share_Tech_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "./navbar"
const share_tech_mono = Share_Tech_Mono({ subsets: ["latin"], weight: "400" })

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
        className={share_tech_mono.className}
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
