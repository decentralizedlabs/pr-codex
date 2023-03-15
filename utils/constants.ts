import envConstants from "constants.json"

type Addresses = {}
type Constants = {}

export const constants: Constants = envConstants.values

export const addresses: Addresses =
  envConstants.addresses[process.env.NEXT_PUBLIC_CHAIN_ID]

export default constants
