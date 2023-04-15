"use client"

import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import { DropdownMenuElement } from ".."

// import { useTheme } from "next-themes"
// import nightwind from "nightwind/helper"
// import Nightwind from "@components/icons/Nightwind"

export default function DropdownMenu({
  setShowDropdown
}: {
  setShowDropdown: Dispatch<SetStateAction<boolean>>
}) {
  // const { theme, setTheme } = useTheme()
  // const toggle = () => {
  //   nightwind.beforeTransition()
  //   if (theme !== "dark") {
  //     setTheme("dark")
  //   } else {
  //     setTheme("light")
  //   }
  // }

  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClick)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClick)
    }
  }, [dropdownRef, setShowDropdown])

  return (
    <div className="absolute right-0 top-0" ref={dropdownRef}>
      <div
        className={`shadow-base absolute right-0 top-0 z-20 mt-20 w-56 space-y-1 rounded-sm border border-gray-200 bg-white text-sm`}
      >
        <div onClick={() => setShowDropdown(false)}>
          <DropdownMenuElement
            href="/"
            image={
              <div className="h-5 w-5 rounded-full border-2 border-blue-600 group-hover:border-white" />
            }
            label="My profile"
          />
        </div>
        {/* <div className="xs:hidden">
        <DropdownMenuElement
          image={<Nightwind size="h-5" onClick={null} />}
          label="Toggle dark mode"
          onClick={() => {
            toggle()
            setShowDropdown(false)
          }}
        />
      </div> */}
      </div>
    </div>
  )
}
