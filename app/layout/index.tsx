import { AppLayout } from "./_components"
import { baseMetadata } from "./_components/Metadata"
import "../../styles/global/styles.css"
import { GeistMono } from "geist/font/mono"
import Script from "next/script"

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistMono.className}`}>
      <body>
        <AppLayout>{children}</AppLayout>
        <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      </body>
    </html>
  )
}

export const metadata = baseMetadata
