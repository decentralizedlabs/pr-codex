import { ConnectBlock } from "@components/ui"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ConnectBlock signable>
      <>{children}</>
    </ConnectBlock>
  )
}
