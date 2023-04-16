"use client"

import { Dispatch, SetStateAction } from "react"
import MySwitch from "../MySwitch"
import Question from "../Question"

type Props = {
  label: string
  questionText?: string | JSX.Element
  position?: string
  enabled: boolean
  setEnabled: Dispatch<SetStateAction<boolean>>
}

export default function InputSwitch({
  label,
  questionText,
  position,
  enabled,
  setEnabled
}: Props) {
  return (
    <div className="relative flex items-center justify-end py-2 ">
      <div className="mr-3 flex items-center">
        <p className="pr-1">{label}</p>
        {questionText && <Question text={questionText} position={position} />}
      </div>
      <MySwitch enabled={enabled} setEnabled={setEnabled} />
    </div>
  )
}
