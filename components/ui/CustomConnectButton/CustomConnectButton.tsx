"use client"

import Logout from "@components/icons/Logout"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import saEvent from "@utils/saEvent"
import { signMessage } from "@utils/signMessage"
import { useAppContext } from "app/layout/context"
import { useDisconnect } from "wagmi"
import Button from "../Button"

export default function CustomConnectButton({
  signable = false,
  disconnectLabel = false
}) {
  const { isSigned, setIsSigned, signMessageAsync, isSignatureLoading } =
    useAppContext()

  const { disconnect } = useDisconnect()

  return (
    <div onClick={() => saEvent("connect_wallet_attempt")}>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted
        }) => {
          return (
            <div
              {...(!mounted && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none"
                }
              })}
            >
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <Button
                      label="Connect Wallet"
                      onClick={openConnectModal}
                      secondary
                    />
                  )
                }

                if (chain.unsupported) {
                  return (
                    <Button
                      label="Wrong network"
                      onClick={openChainModal}
                      secondary
                    />
                  )
                }

                if (signable && !isSigned) {
                  return (
                    <div
                      className={`${
                        !disconnectLabel
                          ? "flex items-center space-x-4"
                          : "space-y-4 text-center"
                      }`}
                    >
                      <Button
                        label="Log in"
                        onClick={() =>
                          signMessage(
                            account.address,
                            signMessageAsync,
                            setIsSigned
                          )
                        }
                        loading={isSignatureLoading}
                        loadingMessage="Sign message"
                        secondary
                      />
                      {!isSignatureLoading && (
                        <span
                          className="block text-red-500 underline cursor-pointer hover:text-red-700"
                          onClick={() => disconnect()}
                        >
                          {disconnectLabel ? (
                            "Disconnect wallet"
                          ) : (
                            <Logout className="w-6 h-6 rotate-180" />
                          )}
                        </span>
                      )}
                    </div>
                  )
                }

                return (
                  <ConnectButton
                    accountStatus={{
                      smallScreen: "avatar",
                      largeScreen: "full"
                    }}
                    chainStatus={{ smallScreen: "none", largeScreen: "full" }}
                    showBalance={false}
                  />
                )
              })()}
            </div>
          )
        }}
      </ConnectButton.Custom>
    </div>
  )
}
