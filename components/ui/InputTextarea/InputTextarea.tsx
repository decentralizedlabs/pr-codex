"use client"

import React, { InputHTMLAttributes, useState } from "react"
import { Question } from ".."

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value: string
  className?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  rows?: number
  previewBox?: string
  markdownView?: boolean
  question?: JSX.Element
  onChange?: (...args: any[]) => any
}

const Textarea: React.FC<Props> = ({
  value,
  className,
  label,
  placeholder,
  disabled,
  required,
  rows = 3,
  previewBox,
  markdownView = true,
  question,
  onChange
}) => {
  const [showPreview, setShowPreview] = useState(false)
  const [htmlContent, setHtmlContent] = useState("")

  const handleShowPreview = async () => {
    const { markdownToHtml } = await import("@lib/markdownToHtml")
    if (!showPreview) {
      setHtmlContent(await markdownToHtml(value))
    }
    setShowPreview((showPreview) => !showPreview)
  }

  const rootClassName = `bg-white rounded-sm py-3 pl-6 w-full appearance-none pr-4 border border-gray-400 text-black focus:outline-none focus:border-blue-600 placeholder-gray-500 disabled:text-gray-400 disabled:border-gray-700 disabled:bg-gray-900 ${
    className ? className : ""
  }`

  return (
    <label>
      {label && (
        <div className="relative flex items-center h-9">
          <p className={`text-sm text-left`}>{label}</p>

          {markdownView && !showPreview && (
            <Question
              text={
                <>
                  {question}
                  <p>
                    You can use{" "}
                    <a
                      className="highlight"
                      href="https://www.markdownguide.org/cheat-sheet/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      markdown syntax
                    </a>{" "}
                    to add elements such as headings, links or lists.{" "}
                  </p>
                </>
              }
            />
          )}
          {markdownView && value && (
            <a
              className="absolute top-0 right-0 flex items-center h-full mr-1 text-sm text-blue-600"
              onClick={async () => await handleShowPreview()}
            >
              {!showPreview ? "Show preview" : "Hide preview"}
            </a>
          )}
        </div>
      )}
      {!showPreview ? (
        <div className="mb-3 overflow-hidden rounded-t-sm">
          <textarea
            value={value}
            placeholder={placeholder}
            className={rootClassName}
            disabled={disabled}
            rows={rows}
            required={required}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      ) : (
        <div
          className={
            previewBox
              ? previewBox
              : "px-6 py-3 mt-2 prose shadow-md border border-gray-200 rounded-sm"
          }
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
    </label>
  )
}

export default Textarea
