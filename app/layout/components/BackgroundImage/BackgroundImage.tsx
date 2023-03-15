import Image from "next/image"

export interface Props {
  className?: string
}

export default function BackgroundImage({ className }: Props) {
  const rootClassName = `${className} absolute w-full h-full -z-10 bg-white`

  return (
    <div className={rootClassName}>
      <div className="opacity-20">
        <Image
          src="/background.jpg"
          alt={`Background image`}
          quality="85"
          fill={true}
          priority
        />
      </div>
    </div>
  )
}
