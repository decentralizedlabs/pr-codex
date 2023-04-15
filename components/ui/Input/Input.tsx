"use client"

import Arrow from "@components/icons/Arrow"
import Spinner from "@components/icons/Spinner"
import React, { InputHTMLAttributes } from "react"
import Question from "../Question"

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
  helpText?: string | JSX.Element
  prefix?: string
  after?: string
  error?: boolean
  loading?: boolean
  question?: JSX.Element
  questionPosition?: string
  onClickLabel?: string
  prefixAction?: (...args: any[]) => any
  onClick?: (...args: any[]) => any
  onChange?: (...args: any[]) => any
}

export default function Input({
  className,
  label,
  helpText,
  prefix = "",
  after,
  children,
  error,
  loading,
  disabled,
  question,
  questionPosition = "bottom-0 left-0",
  prefixAction,
  onClick,
  onClickLabel,
  onChange,
  ...rest
}: Props) {
  const rounded =
    !prefix && !onClick
      ? "rounded-sm"
      : prefix && onClick
      ? ""
      : prefix
      ? "rounded-r-sm"
      : "rounded-l-sm"
  const rootClassName = `peer bg-white py-2 pl-6 w-full appearance-none pr-4 border focus:outline-none placeholder-gray-400 disabled:text-gray-400 disabled:border-gray-200 disabled:bg-gray-200 disabled:cursor-not-allowed ${
    error
      ? "border-red-500 text-red-500 focus:border-red-500"
      : "border-gray-300 text-black focus:border-blue-600"
  } ${rounded} ${className}`

  const handleOnChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value)
    }
    return null
  }

  return (
    <label className="block text-left">
      {label && (
        <>
          <div className={!question ? "pb-2" : ""}>
            <div className="relative flex items-center">
              <p className="pr-1 text-sm font-semibold text-gray-700">
                {label}
              </p>
              {question && (
                <Question position={questionPosition} text={question} />
              )}
            </div>
            {helpText && (
              <p className={`${question ? "pb-2" : ""} text-sm text-gray-600`}>
                {helpText}
              </p>
            )}
          </div>
        </>
      )}
      <div className="mb-3 flex flex-row-reverse">
        {onClick && (
          <div
            className={`nightwind-prevent group relative flex items-center justify-center px-5 text-sm font-medium text-white ${
              error
                ? "cursor-pointer bg-red-500"
                : `bg-blue-600 ${
                    !disabled && !loading
                      ? "cursor-pointer hover:bg-blue-700"
                      : ""
                  }`
            }`}
            onClick={!disabled && !loading ? onClick : null}
          >
            {onClickLabel && (
              <span className={`mr-1 ${loading ? "-z-10" : ""}`}>
                {onClickLabel}
              </span>
            )}
            <div
              className={`nightwind-prevent h-[1.2rem] w-[1.2rem] text-white transition-transform duration-150 group-hover:translate-x-1 ${
                loading ? "-z-10" : ""
              }`}
            >
              <Arrow />
            </div>
            {loading && (
              <div className="absolute flex h-full w-full items-center justify-center">
                <Spinner color="text-white nightwind-prevent" />
              </div>
            )}
          </div>
        )}

        <input
          className={rootClassName}
          onChange={handleOnChange}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          disabled={disabled || loading}
          onWheel={(e) => e.currentTarget.blur()}
          {...rest}
        />

        {prefix && (
          <div
            className={`flex items-center justify-center rounded-l-sm bg-gray-200 px-5 text-gray-600 ${
              error ? "shadow-error" : !disabled && !loading ? "text-black" : ""
            } ${
              prefixAction && !disabled && !loading
                ? "cursor-pointer hover:bg-gray-100"
                : ""
            } ${disabled || loading ? "bg-gray-100 text-gray-400 " : ""}`}
            onClick={
              prefixAction && !disabled && !loading
                ? () => prefixAction()
                : null
            }
          >
            {prefix}
          </div>
        )}
      </div>
    </label>
  )
}
