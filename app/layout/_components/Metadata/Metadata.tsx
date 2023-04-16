import { Metadata } from "next"
import {
  appDescription,
  appName,
  appTitle,
  appUrl,
  twitterAccount
} from "./MetadataConfig"

export const baseMetadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: { default: appTitle, template: `%s | ${appName}` },
  description: appDescription,
  openGraph: {
    title: appTitle,
    description: appDescription,
    url: "/",
    siteName: appName,
    locale: "en-US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: appTitle,
    description: appDescription,
    site: twitterAccount,
    creator: twitterAccount
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ]
}
