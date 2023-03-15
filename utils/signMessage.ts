import { Dispatch, SetStateAction } from "react"
import { verifyMessage } from "ethers/lib/utils.js"

export const messageToSign = `Sign this message to prove you have access to the connected wallet. This won't cost you any Ether.

Timestamp: ${Date.now()}`

export async function signMessage(
  accountAddress: string,
  signMessage: (args?: any) => Promise<`0x${string}`>,
  setIsSigned: Dispatch<SetStateAction<boolean>>
) {
  const signature = await signMessage()

  if (verifyMessage(messageToSign, signature) == accountAddress) {
    setIsSigned(true)
    localStorage.setItem("isSigned", accountAddress)
  }
}
