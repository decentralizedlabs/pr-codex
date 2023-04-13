import { TrustedByList } from "./TrustedByList"

export const revalidate = 60 * 60 * 3 // 3 hours

export function TrustedBy() {
  return (
    <div className="max-w-lg px-4 pt-24 pb-16 mx-auto md:max-w-screen-xl md:px-8">
      <h2 className="mb-12 text-2xl font-bold tracking-tight text-center text-gray-400">
        Trusted by
      </h2>
      {/* @ts-expect-error Async Server Component */}
      <TrustedByList />
    </div>
  )
}
