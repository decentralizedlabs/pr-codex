import { Button } from "@components/ui"
import { getInstallations } from "@utils/github/getInstallations"
import { getRepositories } from "@utils/github/getRepositories"
import { Footer } from "app/layout/components"
import Image from "next/image"
import { githubColors } from "@utils/githubColors"
import Star from "@components/icons/Star"
import Fork from "@components/icons/Fork"

export const revalidate = 60 * 60 * 3 // 3 hours

export default async function Homepage() {
  const installations = await getInstallations()
  const ids = installations.map((installation) => Number(installation.id))
  const repositories = await getRepositories(ids)
  const publicRepos = repositories.filter((repo) => !repo.private)
  const reposByStars = publicRepos.sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  )
  const topUsersRepos = reposByStars.filter(
    (repo, index) =>
      reposByStars.findIndex((r) => r.owner.id === repo.owner.id) === index
  )

  return (
    <div className="overflow-hidden">
      <div className="relative isolate pt-14">
        <div className="absolute inset-x-0 overflow-hidden -top-40 -z-10 transform-gpu blur-3xl sm:-top-80">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#f4773080-2a16-4ab4-9fd7-579fec69a4f7)"
              fillOpacity=".2"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="f4773080-2a16-4ab4-9fd7-579fec69a4f7"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#fde047" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="pt-24 pb-16 sm:pt-32">
          <div className="px-6 mx-auto max-w-7xl lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                PR-Codex
              </h1>
              <p className="max-w-[40rem] mx-auto mt-6 text-lg leading-8 text-gray-300">
                A github app to summarize code diffs in pull requests. Powered
                by ChatGPT.
              </p>
              <div className="mt-10">
                <Button
                  label="Install on your repo"
                  href="https://github.com/apps/pr-codex/installations/new"
                  external
                />
              </div>
              <p className="pt-4 text-sm text-gray-400">It&apos;s free</p>
            </div>

            <video
              className="mt-16 rounded-xl ring-1 ring-white/10 sm:mt-24"
              width={1920}
              height={1244}
              autoPlay
              loop
              muted
              controls
              controlsList="nodownload"
            >
              <source src="/demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="pt-24 pb-16 sm:pt-32">
          <div className="px-6 mx-auto max-w-7xl lg:px-8">
            {/* <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Trusted by
              </h2>
              <div className="flex flex-wrap justify-between mt-16">
                {topUsersRepos.map((repo) => (
                  <a
                    href={repo.owner.html_url}
                    key={repo.id}
                    className="flex flex-col items-center justify-center w-1/2 mb-8 sm:w-1/3 md:w-1/4"
                  >
                    <Image
                      src={repo.owner.avatar_url}
                      alt="Github"
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                    <p className="mt-2 text-sm text-gray-300">
                      {repo.owner.login}
                    </p>
                  </a>
                ))}
              </div>
            </div> */}
            <div className="max-w-2xl mx-auto">
              <h2 className="mb-16 text-4xl font-bold tracking-tight text-center text-white sm:text-6xl">
                Trusted by
              </h2>
              <div className="flex flex-wrap justify-between">
                {topUsersRepos.map((repo) => (
                  <div className="w-full mb-8 md:w-[48%]" key={repo.id}>
                    <div className="p-4 border border-gray-700 rounded bg-[#0d1117] h-48 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center mb-4">
                          <Image
                            src={repo.owner.avatar_url}
                            alt="Github avatar"
                            width={40}
                            height={40}
                            className="mr-2 rounded-full"
                          />
                          <a
                            className="font-bold text-white hover:text-blue-400"
                            href={repo.html_url}
                          >
                            {repo.full_name}
                          </a>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-3">
                          {repo.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-5 mt-3">
                        <div className="flex items-center">
                          <div
                            className="w-4 h-4 mr-2 rounded-full bg-red-50"
                            style={{
                              backgroundColor:
                                githubColors[repo.language]?.color
                            }}
                          >
                            {" "}
                          </div>
                          <p className="text-sm text-gray-400">
                            {repo.language}
                          </p>
                        </div>
                        <p className="flex items-center text-sm text-gray-400">
                          <Star width="18" height="18" />
                          <span className="ml-2">{repo.stargazers_count}</span>
                        </p>

                        <p className="flex items-center text-sm text-gray-400">
                          <Fork width="18" height="18" />
                          <span className="ml-2"> {repo.forks_count}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <svg
            className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#ee0717bf-3e43-49df-b1bd-de36422ed3d3)"
              fillOpacity=".2"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="ee0717bf-3e43-49df-b1bd-de36422ed3d3"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#fde047" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <Footer />
    </div>
  )
}
