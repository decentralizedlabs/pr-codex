"use client"

import { DropdownMenuElement } from "../"
import { Dispatch, SetStateAction, useEffect, useRef } from "react"
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
    <div className="absolute top-0 right-0" ref={dropdownRef}>
      <div
        className={`z-20 absolute text-sm top-0 right-0 w-56 mt-20 border border-gray-200 space-y-1 bg-white rounded-sm shadow-base`}
      >
        <div onClick={() => setShowDropdown(false)}>
          <DropdownMenuElement
            href="/"
            image={
              <div className="w-5 h-5 border-2 border-blue-600 rounded-full group-hover:border-white" />
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
