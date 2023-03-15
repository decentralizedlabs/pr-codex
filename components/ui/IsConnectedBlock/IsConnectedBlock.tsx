"use client"

import { useAppContext } from "app/layout/context"

export default function IsConnectedBlock({
  children
}: {
  children: JSX.Element
}) {
  const { isConnected } = useAppContext()

  return isConnected && children
}
