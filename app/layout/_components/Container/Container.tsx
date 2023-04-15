type Props = {
  page?: boolean
  size?: string
  children: React.ReactNode
}

export default function Container({
  size = "",
  page = false,
  children
}: Props) {
  return (
    <div
      className={`${
        size ? size : "max-w-screen-lg"
      } mx-auto w-full px-4 md:px-8 ${
        page && "pb-10 pt-16 text-center sm:pb-12 sm:pt-24"
      }`}
    >
      {children}
    </div>
  )
}
