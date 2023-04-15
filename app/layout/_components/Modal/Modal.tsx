"use client"

import Cross from "@components/icons/Cross"
import { NETWORK_VIEW } from "@lib/content/modals"
import { useAppContext } from "app/layout/_context"
import { useEffect, useRef } from "react"

const Modal = () => {
  const { modalView, setModalView } = useAppContext()
  const { name, cross, params } = modalView
  let content: JSX.Element
  const modalRef = useRef<any>(null)

  switch (name) {
    case "NETWORK_VIEW":
      content = NETWORK_VIEW()
      break
  }

  useEffect(() => {
    function handleClick(event: any) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalView({ name: "" })
      }
    }

    if (cross) {
      // Bind the event listener
      document.addEventListener("mousedown", handleClick)
    }

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClick)
    }
  }, [cross, modalRef, setModalView])

  return (
    modalView.name && (
      <div className="xs:py-20 background-modal fixed top-0 z-50 h-screen w-screen overflow-y-scroll py-12">
        <div className="xs:mt-[-5rem] absolute mt-[-3rem] h-full w-full" />
        <div
          className="flex items-center justify-center"
          style={{ minHeight: "100%" }}
        >
          <div
            className="xs:py-20 xs:px-8 relative mx-2 w-full max-w-screen-md rounded-sm border border-gray-200 bg-white px-2 py-16 shadow-xl"
            ref={modalRef}
          >
            {cross && (
              <div className="absolute right-[24px] top-[24px]">
                <Cross
                  className="cursor-pointer text-right hover:text-red-500"
                  onClick={() => setModalView({ name: "" })}
                />
              </div>
            )}
            <div>{content}</div>
          </div>
        </div>
      </div>
    )
  )
}

export default Modal
