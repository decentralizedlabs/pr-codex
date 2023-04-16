import { TrustedByList } from "./TrustedByList"

export const revalidate = 60 * 60 * 3 // 3 hours

export function TrustedBy() {
  return (
    <div className="mx-auto max-w-lg px-4 pb-16 pt-24 md:max-w-screen-xl md:px-8">
      <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-gray-400">
        Trusted by
      </h2>
      {/* @ts-expect-error Async Server Component */}
      <TrustedByList />
    </div>
  )
}
