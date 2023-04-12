export const runtime = "nodejs"

import { Homepage } from "./components/Homepage"

export default function Page() {
  // @ts-expect-error Async Server Component
  return <Homepage />
}
