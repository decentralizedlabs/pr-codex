import {
  Twitter,
  Facebook,
  Instagram,
  Reddit,
  Linkedin,
  Mail,
  Github,
  Discord,
  Blog,
  Juicebox,
  Notion
} from "@components/icons/Social"

type Props = {
  altAccounts?: Record<string, string>
  className?: string
  wrapperClassName?: string
}

export const accounts: Record<string, string> = {
  twitter: "https://twitter.com/slice__so"
  // discord: "https://discord.gg/CdyHUzdZks",
  // notion: "https://slicedao.notion.site",
  // github: "https://github.com/slice-so",
  // blog: "/blog",
  // juicebox: "https://juicebox.money/#/p/slice"
}

export default function Social({ wrapperClassName, altAccounts }: Props) {
  const accountsToDisplay = altAccounts || accounts

  const components = {
    twitter: { color: "hover:text-blue-500", element: Twitter },
    discord: { color: "hover:text-indigo-500", element: Discord },
    github: { color: "hover:text-purple-500", element: Github },
    notion: { color: "hover:text-gray-500", element: Notion },
    blog: { color: "hover:text-green-500", element: Blog },
    juicebox: { color: "hover:text-yellow-600", element: Juicebox },
    facebook: { color: "hover:text-blue-700", element: Facebook },
    instagram: { color: "hover:text-pink-500", element: Instagram },
    reddit: { color: "hover:text-red-500", element: Reddit },
    linkedin: { color: "hover:text-blue-700", element: Linkedin },
    mail: { color: "hover:text-gray-500", element: Mail }
  }

  return (
    <div className={`${wrapperClassName} flex justify-center`}>
      {Object.keys(accountsToDisplay).map((key: string) => {
        const accountsKey = key
        const { element, color } = components[accountsKey]
        const DynamicComponent = element
        const componentColor = color
        return (
          <a
            key={key}
            className={`${componentColor} h-6 mx-[18px]`}
            href={accountsToDisplay[accountsKey]}
            target="_blank"
            rel="noreferrer"
            aria-label={`${accountsKey} logo`}
          >
            <DynamicComponent />
          </a>
        )
      })}
    </div>
  )
}
