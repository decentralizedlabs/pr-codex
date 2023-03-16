import { DefaultHead } from "app/layout/components"
import {
  appDescription,
  appName,
  appTitle,
  appUrl
} from "./layout/components/DefaultHead/DefaultHead"

export default async function Head() {
  return (
    <>
      <DefaultHead />

      <title>{appTitle}</title>
      <meta content={appDescription} name="description" />
      <meta property="og:title" content={appTitle} />
      <meta property="og:description" content={appDescription} />
      <meta property="og:url" content={appUrl} />
      <meta property="og:image" content={`${appUrl}/og_image.png`} />
      <meta property="og:image:alt" content={`${appName} cover image`} />
      <meta name="twitter:image" content={`${appUrl}/twitter_card.png`} />
    </>
  )
}
