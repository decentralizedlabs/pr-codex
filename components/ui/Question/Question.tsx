"use client"

import QuestionMark from "@components/icons/QuestionMark"
import { useState } from "react"

type Props = {
  text: string | JSX.Element
  position?: string
}

export default function Question({ text, position }: Props) {
  const [show, setShow] = useState(false)

  return (
    <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <div
        className={`${
          !show ? "hidden " : ""
        }prose-sm xs:w-96 absolute z-10 w-[22rem] bg-white p-5 text-left shadow-xl ${
          position || "bottom-0 left-0"
        } mb-9 overflow-hidden rounded-sm border border-blue-600 border-opacity-50`}
      >
        {text}
      </div>
      <div className="p-2">
        <QuestionMark />
      </div>
    </div>
  )
}
