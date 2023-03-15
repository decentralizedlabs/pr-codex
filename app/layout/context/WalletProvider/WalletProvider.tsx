"use client"

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { chain, createClient, configureChains, WagmiConfig } from "wagmi"
import "@rainbow-me/rainbowkit/styles.css"
import { appName } from "app/layout/components/DefaultHead/DefaultHead"

const env = String(process.env.NEXT_PUBLIC_ENV)
const alchemyId = String(process.env.NEXT_PUBLIC_ALCHEMY_ID)

const customChains = [chain[env]]
const { chains, provider } = configureChains(customChains, [
  alchemyProvider({ apiKey: alchemyId }),
  publicProvider()
])

const { connectors } = getDefaultWallets({
  appName,
  chains
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export default function WalletProvider({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        coolMode
        showRecentTransactions={true}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
