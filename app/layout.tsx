import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  Image,
  Box,
  Text,
} from "@chakra-ui/react";
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
        <Box as="main" className={inter.className}>
          {children}
        </Box>
      </body>
    </html>
  );
}
