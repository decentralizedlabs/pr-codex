import { NewTransaction } from "@rainbow-me/rainbowkit/dist/transactions/transactionStore"
import { ContractReceipt, ContractTransaction } from "ethers"
import { Dispatch, SetStateAction } from "react"

export type TxData = {
  transactionHash?: string
}

const executeTransaction = async (
  promise: () => Promise<ContractTransaction>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  txDescription?: string,
  addRecentTransaction?: (transaction: NewTransaction) => void,
  onSuccess?: (waitData: ContractReceipt) => Promise<any>,
  confetti?: boolean
) => {
  setLoading(true)

  try {
    const tx = await promise()

    if (addRecentTransaction) {
      addRecentTransaction({
        hash: tx.hash,
        description: txDescription || "Transaction executed"
      })
    }

    const waitData = await tx.wait()

    if (confetti) {
      // const launchConfetti = (await import("./launchConfetti")).default
      // launchConfetti()
    }

    if (onSuccess) {
      return await onSuccess(waitData)
    }
  } catch (err) {
    console.log(err)
  }
  setLoading(false)
}

export default executeTransaction
