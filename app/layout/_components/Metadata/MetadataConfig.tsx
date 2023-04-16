import { accounts } from "app/layout/_components/Social/Social"

export const appName = "PR-Codex"
export const appTitle = "PR-Codex"
export const appDescription =
  "An AI bot that summarizes PR code diffs, directly on Github. Powered by ChatGPT"
export const appUrl = process.env.NEXT_PUBLIC_APP_URL
export const twitterAccount = accounts.twitter.split("twitter.com/").pop()
export const domain = appUrl.split("//").pop()
