import { useEffect } from 'react'
import AweTokenContract from './artifacts/contracts/AweToken.sol/AweToken.json'
import AweSrc from './assets/AweSrc'
import Balance from './components/Balance'
import Faucet from './components/Faucet'
import TransferToken from './components/TransferToken'
import { metaMaskToken } from './utils'

const tokenAddress = process.env.REACT_APP_TOKEN_ADDRESS
const tokenSymbol = 'AWE'
const tokenDecimals = 18
const tokenImage =
  'https://raw.githubusercontent.com/RodPaDev/aweToken-react-faucet/main/src/assets/awesrc.png'

function App() {
  useEffect(() => {
    metaMaskToken({
      address: tokenAddress,
      symbol: tokenSymbol,
      decimals: tokenDecimals,
      image: tokenImage
    })
  }, [])

  return (
    AweTokenContract &&
    tokenSymbol && (
      <div className='min-h-screen bg-gray-900 flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center bg-gray-800 p-8 rounded-md'>
          <div className='flex gap-2'>
            <AweSrc width={40} height={40} />
            <h1 className='text-primary text-3xl'>AweSrc Token Faucet</h1>
          </div>
          <Balance
            tokenContract={AweTokenContract}
            tokenAddress={tokenAddress}
            symbol={tokenSymbol}
          />
          <Faucet
            tokenContract={AweTokenContract}
            tokenAddress={tokenAddress}
            symbol={tokenSymbol}
          />
          <div className='flex justify-center items-center w-full'>
            <div className='bg-gray-500 h-px w-full'></div>
            <div className='text-gray-500 p-2'>OR</div>
            <div className='bg-gray-500 h-px w-full'></div>
          </div>
          <TransferToken
            tokenContract={AweTokenContract}
            tokenAddress={tokenAddress}
            symbol={tokenSymbol}
          />
        </div>
      </div>
    )
  )
}

export default App
