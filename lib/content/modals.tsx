import { ConnectButton } from "@rainbow-me/rainbowkit"
import saEvent from "@utils/saEvent"

export type View = {
  name: ViewNames
  cross?: boolean
  params?: object
}
type ViewNames = "" | "NETWORK_VIEW"

export const NETWORK_VIEW = () => {
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl">Pick the right chain</h1>
        <div className="py-8">
          <p>
            Connect to the{" "}
            <b>{chainId === "5" ? "Goerli Testnet" : "Ethereum Mainnet"}</b>{" "}
            Network
          </p>
        </div>
        <div
          className="flex justify-center"
          onClick={() => saEvent("connect_wallet_attempt")}
        >
          <ConnectButton
            accountStatus={{
              smallScreen: "address",
              largeScreen: "full"
            }}
            chainStatus="full"
            showBalance={false}
          />
        </div>
      </div>
    </>
  )
}
