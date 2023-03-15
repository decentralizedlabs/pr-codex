"use client"

import { useAppContext } from "app/layout/context"

export default function IsConnectedBlock({
  children
}: {
  children: JSX.Element
}) {
  const { isConnected, isSigned } = useAppContext()

  return isConnected && isSigned && children
}
