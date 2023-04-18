import { Suspense } from "react"
import { TrustedByList, TrustedByListSkeleton } from "./TrustedByList"

export const revalidate = 3600 // 1 hour

export function TrustedBy() {
  return (
    <div className="mx-auto max-w-lg px-4 pb-16 pt-24 md:max-w-screen-xl md:px-8">
      <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-gray-400">
        Trusted by
      </h2>
      <Suspense fallback={<TrustedByListSkeleton />}>
        {/* @ts-expect-error Async Server Component */}
        <TrustedByList />
      </Suspense>
    </div>
  )
}
