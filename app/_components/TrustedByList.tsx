import Fork from "@components/icons/Fork"
import Star from "@components/icons/Star"
import { ListIterator } from "@components/ui"
import { githubColors } from "@utils/githubColors"
import Image from "next/image"

const initItems = 12

export async function TrustedByList({ repos }: { repos: any[] }) {
  {
    /*
    <div className="max-w-2xl mx-auto text-center">
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
    </div>
    */
  }

  return (
    <ListIterator initItems={initItems}>
      {repos.map((repo) => (
        <a
          className="flex h-48 w-full flex-col justify-between rounded-md border border-gray-700 bg-[#0d1117] p-4 hover:bg-gray-800/60"
          key={repo.id}
          target="_blank"
          rel="noreferrer"
          href={repo.html_url}
        >
          <div>
            <div className="mb-4 flex items-center">
              <div
              //target="_blank" rel="noreferrer" href={repo.owner.html_url}
              >
                <Image
                  src={repo.owner.avatar_url}
                  alt="Github avatar"
                  width={40}
                  height={40}
                  className="mr-2 rounded-full"
                />
              </div>
              <p className="text-sm font-semibold text-gray-300">
                {repo.full_name}
              </p>
            </div>
            <p className="text-sm text-gray-400">{repo.description}</p>
          </div>
          <div className="flex items-center gap-5">
            {repo.language && (
              <div className="flex items-center">
                <div
                  className="mr-2 h-4 w-4 rounded-full bg-red-50"
                  style={{
                    backgroundColor: githubColors[repo.language]?.color
                  }}
                />
                <p className="text-xs text-gray-400">{repo.language}</p>
              </div>
            )}
            <p className="flex items-center text-xs text-gray-400">
              <Star width="18" height="18" />
              <span className="ml-2">{repo.stargazers_count}</span>
            </p>

            <p className="flex items-center text-xs text-gray-400">
              <Fork width="18" height="18" />
              <span className="ml-2"> {repo.forks_count}</span>
            </p>
          </div>
        </a>
      ))}
    </ListIterator>
  )
}

export function TrustedByListSkeleton() {
  return (
    <div className="grid animate-pulse grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(initItems).keys()].map((key) => (
        <div
          className="flex h-48 w-full flex-col justify-between rounded-md border border-gray-700 bg-[#0d1117] p-4 hover:bg-gray-800/60"
          key={key}
        >
          <div>
            <div className="mb-4 flex items-center">
              <div className="mr-2 h-10 w-10 rounded-full bg-gray-700" />
              <div className="h-4 w-32 rounded-md bg-gray-700" />
            </div>
            <div className="space-y-3">
              <div className="h-3 rounded-md bg-gray-700" />
              <div className="h-3 rounded-md bg-gray-700" />
              <div className="h-3 rounded-md bg-gray-700" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
