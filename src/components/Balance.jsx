import { useState } from 'react'
import { ethers, utils } from 'ethers'
import SVGEye from '../assets/SVGEye'
import SVGEyeOff from '../assets/SVGEyeOff'
import { requestAccount } from '../utils'

const Balance = ({ tokenContract, symbol, tokenAddress, ...props }) => {
  const [balance, setBalance] = useState()
  const [showBalance, setShowBalance] = useState(false)

  const onGetBalance = async () => {
    if (showBalance) {
      return setShowBalance(false)
    }
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      const contract = new ethers.Contract(
        tokenAddress,
        tokenContract.abi,
        provider
      )
      const balance = await contract.balanceOf(account)
      setBalance(balance.toString())
      setShowBalance(true)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <button className='text-gray-300 py-3' onClick={onGetBalance}>
        {showBalance ? <SVGEyeOff /> : <SVGEye />}
      </button>
      <div className='flex justify-center items-baseline pb-2'>
        <p className='text-gray-300 text-4xl leading-none'>
          {showBalance ? utils.formatEther(balance) : '***'}{' '}
        </p>
        {showBalance && (
          <div className='text-2xl text-gray-300 ml-3'>{symbol}</div>
        )}
      </div>
    </div>
  )
}

export default Balance
