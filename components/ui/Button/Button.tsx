"use client"

import Check from "@components/icons/Check"
import Spinner from "@components/icons/Spinner"
import saEvent from "@utils/saEvent"
import Link from "next/link"

interface Props {
  customClassName?: string
  customColor?: string
  wrapperClassName?: string
  type?: "button" | "submit" | "reset"
  label?: string | JSX.Element
  href?: string
  onClick?: any
  loading?: boolean
  loadingMessage?: string | JSX.Element
  success?: boolean
  external?: boolean
  targetBlank?: boolean
  secondary?: boolean
  disabled?: boolean
  saEventName?: string
}

export default function Button({
  customClassName,
  customColor,
  wrapperClassName,
  type = "button",
  label,
  href,
  onClick,
  loading,
  loadingMessage,
  success,
  external,
  targetBlank = true,
  secondary,
  disabled,
  saEventName
}: Props) {
  const className =
    customClassName ||
    "nightwind-prevent overflow-hidden text-sm sm:text-base font-bold tracking-wide px-6 rounded-sm h-[40px] min-w-[150px]"
  const color = !disabled
    ? customColor || secondary
      ? "text-blue-600 border-blue-600 border-2 hover:bg-blue-600 hover:text-white"
      : success
      ? "text-white bg-green-500"
      : "text-white bg-blue-600 hover:bg-blue-700"
    : "bg-gray-400 dark:!bg-gray-500 cursor-not-allowed"

  const rootClassName = `focus:outline-none ${color} ${className}`

  return (
    <div
      className={wrapperClassName}
      onClick={() => (saEventName ? saEvent(saEventName) : null)}
    >
      {href ? (
        !external ? (
          <Link href={href}>
            <button className={rootClassName}>{label}</button>
          </Link>
        ) : targetBlank ? (
          <a href={href} target="_blank" rel="noreferrer">
            <button className={rootClassName}>{label}</button>
          </a>
        ) : (
          <a href={href}>
            <button className={rootClassName}>{label}</button>
          </a>
        )
      ) : (
        <button
          className={rootClassName}
          type={type}
          disabled={disabled}
          onClick={!disabled && !loading && !success ? onClick : null}
        >
          <div className="flex items-center justify-center w-full">
            {success ? (
              <Check />
            ) : loading ? (
              <span className="flex items-center gap-2">
                {loadingMessage && <p>{loadingMessage}</p>}
                <Spinner />
              </span>
            ) : (
              <p>{label}</p>
            )}
          </div>
        </button>
      )}
    </div>
  )
}
