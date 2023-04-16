"use client"

type Props = {
  label: string
  isActive: boolean
  setisActive: (args: any) => void
}

export default function Card({ label, isActive, setisActive }: Props) {
  return (
    <div
      className={`flex cursor-pointer items-center justify-center rounded-sm border border-gray-200 py-2 shadow-sm ${
        isActive
          ? "bg-blue-600 text-white dark:bg-blue-600 dark:text-white"
          : "hover:bg-gray-100"
      }`}
      onClick={() => setisActive(label)}
    >
      <p>{label}</p>
    </div>
  )
}
