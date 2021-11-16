import { Fragment } from 'react'
import { useEffect, useState } from 'react'
import AweTokenContract from './artifacts/contracts/AweToken.sol/AweToken.json'
import AweSrc from './assets/AweSrc'
import ErrorCircle from './assets/ErrorCircle'
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
  const [error, setError] = useState(null)

  useEffect(() => {
    if (
      typeof window.ethereum !== 'undefined' ||
      typeof window.web3 !== 'undefined'
    ) {
      metaMaskToken({
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage
      })
    } else {
      setError(
        `This browser does not support Web3 or Metamask is not installed/enabled.`
      )
    }
  }, [])

  return (
    AweTokenContract &&
    tokenSymbol && (
      <div className='min-h-screen bg-gray-900 flex justify-center items-center'>
        <div className='relative flex flex-col justify-center items-center bg-gray-800 p-8 rounded-ls'>
          {error && (
            <div className='z-20 absolute flex flex-col justify-center items-center h-full w-full bg-gray-800 border-2 border-gray-700 rounded-lg'>
              <Fragment>
                <h1 className='text-red-500 text-2xl text-center'>{error}</h1>
                <div className='flex'>
                  <ErrorCircle
                    className='text-red-500'
                    height={90}
                    width={90}
                  />
                </div>
              </Fragment>
            </div>
          )}
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
