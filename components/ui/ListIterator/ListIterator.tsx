"use client"

import { useState } from "react"

export default function ListIterator({
  initItems,
  wrapperClassname = "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3",
  children
}: {
  initItems: number
  children: JSX.Element[]
  wrapperClassname?: string
}) {
  const [items, setItems] = useState(initItems)

  return (
    <>
      <div className={wrapperClassname}>{children.slice(0, items)}</div>
      <p className="mt-12 text-sm font-bold text-center text-gray-300/60">
        <span
          className="cursor-pointer hover:text-gray-300/100"
          onClick={() => setItems((items) => (items += initItems))}
        >
          Load more
        </span>
      </p>
    </>
  )
}
