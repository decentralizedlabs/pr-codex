"use client"

import Alert from "@components/icons/Alert"
import Chevron from "@components/icons/Chevron"
import { useState } from "react"

type Props = {
  label: string
  detail: string | JSX.Element
  id?: string
  anchor?: string
  wrapperClassName?: string
  error?: boolean
  secondary?: boolean
}

export default function CollapsibleItem({
  label,
  detail,
  id,
  anchor,
  wrapperClassName,
  error,
  secondary
}: Props) {
  const [showDetail, setShowDetail] = useState(id && anchor == id)
  return (
    <li>
      <div
        className={`inline-flex items-center cursor-pointer group ${
          wrapperClassName || ""
        } ${secondary ? "opacity-50" : ""}`}
        onClick={() => setShowDetail((showDetail) => !showDetail)}
        id={id || undefined}
      >
        <div className={`flex-shrink-0 w-4 h-4 mr-4 ${showDetail && "pb-2"}`}>
          <Chevron
            className={`transition-transform duration-50 ease-out ${
              showDetail
                ? "group-hover:translate-x-[4px] translate-x-[8px]"
                : "rotate-180 group-hover:translate-x-[4px]"
            } `}
          />
        </div>
        <p>{label}</p>
        {error && (
          <div className="w-5 h-5 ml-2 text-red-500">
            <Alert />
          </div>
        )}
      </div>
      {showDetail && (
        <div className="px-3 py-5 mt-3 border border-gray-200 xs:px-5">
          {typeof detail == "string" ? <p className="">{detail}</p> : detail}
        </div>
      )}
    </li>
  )
}
