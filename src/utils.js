export const metaMaskToken = async ({
  address,
  symbol,
  decimals = 18,
  image = null
}) => {
  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    await window?.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address, // The address that the token is at.
          symbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals, // The number of decimals in the token
          image // A string url of the token logo
        }
      }
    })
  } catch (error) {
    console.error(error)
  }
}

export const requestAccount = async () => {
  return await window.ethereum.request({ method: 'eth_requestAccounts' })
}
