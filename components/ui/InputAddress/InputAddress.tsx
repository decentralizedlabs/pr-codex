"use client"

import resolveEns from "utils/resolveEns"
import React, {
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useEffect
} from "react"
import Input from "../Input/Input"
import { useProvider } from "wagmi"

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  address: string
  resolvedAddress: string
  setResolvedAddress: Dispatch<SetStateAction<string>>
  helptext?: string | JSX.Element
  question?: JSX.Element
  label?: string
  onChange?: (...args: any[]) => any
  placeholder?: string
  resolve?: boolean
}

export default function InputAddress({
  address,
  resolvedAddress,
  setResolvedAddress,
  helptext,
  question,
  label,
  onChange,
  placeholder = "0x… / vitalik.eth",
  ...rest
}: Props) {
  const provider = useProvider()

  const addressReduced = resolvedAddress
    ? resolvedAddress.substring(resolvedAddress.length - 4) !== ".eth" &&
      resolvedAddress !== "Invalid ENS name"
      ? resolvedAddress.replace(
          resolvedAddress.substring(5, resolvedAddress.length - 3),
          `___`
        )
      : resolvedAddress
    : null

  useEffect(() => {
    if (provider && address) {
      const timeout = setTimeout(
        () => resolveEns(provider, address, setResolvedAddress),
        200
      )
      return () => {
        clearTimeout(timeout)
        setResolvedAddress("")
      }
    }
  }, [provider, address, setResolvedAddress])

  return (
    <div className="relative mb-2">
      <Input
        type="string"
        value={address}
        placeholder={placeholder}
        label={label}
        error={resolvedAddress === "Invalid ENS name"}
        onChange={onChange}
        question={question}
        {...rest}
      />
      {resolvedAddress && (
        <p
          className={`${
            resolvedAddress === "Invalid ENS name"
              ? "text-red-500"
              : "text-blue-600"
          } absolute text-xs opacity-80 font-black left-0 bottom-[-23px]
          }`}
        >
          {addressReduced}
        </p>
      )}
    </div>
  )
}
