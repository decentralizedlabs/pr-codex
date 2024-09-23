import { getInstallations } from "@utils/github/getInstallations"
import { getRepositories } from "@utils/github/getRepositories"
import { Suspense } from "react"
import { TrustedByList, TrustedByListSkeleton } from "./TrustedByList"

export const revalidate = 3600 // 1 hour

export async function TrustedBy() {
  const installations = await getInstallations()
  const ids = installations.map((installation) => Number(installation.id))
  const repositories = await getRepositories(ids)
  const publicRepos = repositories.filter((repo) => !repo.private)
  const reposByStars = publicRepos.sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  )

  return (
    <div className="mx-auto max-w-lg px-4 pb-16 pt-24 md:max-w-screen-xl md:px-8">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-400">
        Trusted by {reposByStars?.length} repositories
      </h2>
      <Suspense fallback={<TrustedByListSkeleton />}>
        {/* @ts-expect-error Async Server Component */}
        <TrustedByList repos={reposByStars} />
      </Suspense>
    </div>
  )
}
