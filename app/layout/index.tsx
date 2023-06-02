import { AppLayout } from "./_components"
import { baseMetadata } from "./_components/Metadata"
import "../../styles/global/styles.css"
import { Space_Mono } from "@next/font/google"
import Script from "next/script"

const font = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono"
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${font.variable} font-mono`}>
      <body>
        <AppLayout>{children}</AppLayout>
        <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      </body>
    </html>
  )
}

export const metadata = baseMetadata
