import {
  Box
} from "@chakra-ui/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BOS wallet",
  description: "by Bos DAo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Box as="main">
          {children}
        </Box>
      </body>
    </html>
  );
}
