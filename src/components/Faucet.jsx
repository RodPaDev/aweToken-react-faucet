import { useState } from 'react'
import { ethers } from 'ethers'
import { requestAccount } from '../utils'


const Faucet = ({ tokenContract, tokenAddress, symbol}) => {
  const [faucetAmount] = useState(100)

  const onFaucet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const account = await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(
        tokenAddress,
        tokenContract.abi,
        signer
      )
      const stringAmount = (faucetAmount * 10 ** 18).toString(10)
      contract.faucet(account[0], stringAmount)
    }
  }

  return (
    <div className='flex justify-center items-center my-3'>
      <button className='gray-900 bg-yellow-500 p-1 px-3 rounded-sm' onClick={onFaucet}>
        Faucet {faucetAmount} {symbol}
      </button>
    </div>
  )
}

export default Faucet
