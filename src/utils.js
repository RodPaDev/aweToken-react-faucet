export const metaMaskToken = async ({
  address,
  symbol,
  decimals = 18,
  image = null
}) => {
  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    console.log(address, symbol, decimals, image)
    const wasAdded = await window?.ethereum.request({
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

    if (wasAdded) {
      console.log('Thanks for your interest!')
    }
  } catch (error) {
    console.log(error)
  }
}

export const requestAccount = async () => {
  return await window.ethereum.request({ method: 'eth_requestAccounts' })
}
