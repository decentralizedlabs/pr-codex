const formatAddress = (address: string) =>
  address.substring(address.length - 4) !== ".eth"
    ? address.replace(address.substring(5, address.length - 3), `___`)
    : address

export default formatAddress
