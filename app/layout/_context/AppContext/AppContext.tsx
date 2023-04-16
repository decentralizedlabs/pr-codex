"use client"

import { View } from "@lib/content/modals"
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react"

type Context = {
  modalView: View
  setModalView: Dispatch<SetStateAction<View>>
}

const AppContext = createContext<Context>({
  modalView: { name: "" },
  setModalView: null
})

export default function AppWrapper({
  children
}: {
  children: React.ReactNode
}) {
  // States
  const [modalView, setModalView] = useState<View>({ name: "" })

  return (
    <AppContext.Provider
      value={{
        modalView,
        setModalView
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
