import { getInstallations } from "@utils/github/getInstallations"
import { getRepositories } from "@utils/github/getRepositories"
import Image from "next/image"
import { githubColors } from "@utils/githubColors"
import Star from "@components/icons/Star"
import Fork from "@components/icons/Fork"
import { ListIterator } from "@components/ui"

export async function TrustedByList() {
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
    <ListIterator initItems={6}>
      {topUsersRepos.map((repo) => (
        <a
          className="w-full p-4 border border-gray-700 rounded-md bg-[#0d1117] hover:bg-gray-800/60 h-48 flex flex-col justify-between"
          key={repo.id}
          target="_blank"
          rel="noreferrer"
          href={repo.html_url}
        >
          <div>
            <div className="flex items-center mb-4">
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
            <p className="text-sm text-gray-400 line-clamp-3">
              {repo.description}
            </p>
          </div>
          <div className="flex items-center gap-5">
            {repo.language && (
              <div className="flex items-center">
                <div
                  className="w-4 h-4 mr-2 rounded-full bg-red-50"
                  style={{
                    backgroundColor: githubColors[repo.language]?.color
                  }}
                />
                <p className="text-sm text-gray-400">{repo.language}</p>
              </div>
            )}
            <p className="flex items-center text-sm text-gray-400">
              <Star width="18" height="18" />
              <span className="ml-2">{repo.stargazers_count}</span>
            </p>

            <p className="flex items-center text-sm text-gray-400">
              <Fork width="18" height="18" />
              <span className="ml-2"> {repo.forks_count}</span>
            </p>
          </div>
        </a>
      ))}
    </ListIterator>
  )
}
