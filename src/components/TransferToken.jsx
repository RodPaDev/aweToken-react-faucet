import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { requestAccount } from '../utils'
import { debounce } from 'debounce'
import Web3 from 'web3'
import { Fragment } from 'react'
import AutoResizeInput from './AutoResizeInput'
import CheckmarkCircle from '../assets/CheckmarkCircle'
import ErrorCircle from '../assets/ErrorCircle'

const TransferToken = ({ tokenContract, tokenAddress, symbol }) => {
  const [toAddress, setToAddress] = useState('')
  const [isAddressValid, setIsAddressValid] = useState(null)

  const [amount, setAmount] = useState('')

  const [inputFocused, setInputFocused] = useState({
    amount: false,
    'erc20-address': false
  })
  const [transactionOk, setTransactionOk] = useState(null)

  useEffect(() => {
    console.log(transactionOk)
  }, [transactionOk])

  const onTransferToken = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(
          tokenAddress,
          tokenContract.abi,
          signer
        )
        const transation = await contract.transfer(
          toAddress,
          amount.toString(10)
        )
        await transation.wait()
        setTransactionOk('ok')
      }
    } catch (error) {
      setTransactionOk('error')
    } finally {
      // setTimeout(() => {
      //   setTransactionOk(null)
      // }, 500)
      // debounceReset()
    }
  }

  const onChangeAmount = val => {
    setAmount(val)
  }

  const onChangeAddress = e => {
    e.preventDefault()
    setToAddress(e.currentTarget.value)
    debounceValidation(e.currentTarget.value)
  }

  const debounceValidation = debounce(address => {
    let isValid = Web3.utils.isAddress(address)
    console.log(isValid)
    setIsAddressValid(isValid)
  }, 1000)

  // const debounceReset = debounce(() => {
  //   setAmount('')
  //   setToAddress('')
  //   setInputFocused({
  //     amount: false,
  //     'erc20-address': false
  //   })
  //   setToAddress(null)
  // }, 2000)

  const onFocusInput = (e, isFocused) => {
    setInputFocused({ [e.currentTarget.name]: isFocused })
  }

  return (
    <div className='flex flex-col relative w-full'>
      <div
        className={`transition duration-1000 absolute justify-center items-center h-full w-full bg-gray-800 border-2 border-gray-700 rounded-lg ${
          transactionOk === 'ok' || transactionOk !== null
            ? 'flex flex-col z-10'
            : 'w-0 opacity-0 z-0'
        }`}
      >
        {transactionOk === 'ok' && (
          <Fragment>
            <h1 className='text-green-500 text-4xl text-center'>
              Transaction Successful
            </h1>
            <div className='flex'>
              <CheckmarkCircle
                className='text-green-500'
                height={90}
                width={90}
              />
            </div>
          </Fragment>
        )}
        {transactionOk === 'error' && (
          <Fragment>
            <h1 className='text-red-500 text-4xl text-center'>
              Transaction Rejected
            </h1>
            <div className='flex'>
              <ErrorCircle className='text-red-500' height={90} width={90} />
            </div>
          </Fragment>
        )}
      </div>
      <div
        className={`transition duration-1000 delay-300  ${
          transactionOk === 'ok' || transactionOk !== null ? 'z-0' : 'z-10'
        }`}
      >
        <h1 className='text-center text-gray-500'>Send {symbol}</h1>
        <div className='flex flex-col'>
          <label className='text-gray-500' htmlFor='erc20-address'>
            Recipient's address
          </label>
          <input
            className={`outline-none bg-transparent border-b-2 border-gray-700 text-gray-300 px-3 py-2 min-content transition ${
              inputFocused['erc20-address']
                ? 'border-green-500'
                : ' border-gray-700'
            }`}
            type='text'
            name='erc20-address'
            id='erc20-addresss'
            onChange={onChangeAddress}
            value={toAddress}
            onFocus={e => onFocusInput(e, true)}
            onBlur={e => onFocusInput(e, false)}
            placeholder='0x69420'
          />

          <p
            className={`text-red-500 py-2 ${
              isAddressValid || isAddressValid === null
                ? 'opacity-0 width-0'
                : 'opacity-1'
            }`}
          >
            The address you entered is not a valid ERC-20 address
          </p>
        </div>

        {isAddressValid && (
          <div className='flex flex-col justify-center items-center gap-3'>
            <div
              className={`flex border-b-2  gap-x-3 p-2 items-baseline transition ${
                inputFocused['amount'] ? 'border-green-500' : ' border-gray-700'
              } `}
            >
              <AutoResizeInput
                value={amount}
                name='amount'
                onChangeValue={onChangeAmount}
                onFocusInput={onFocusInput}
              />
              <div className='text-gray-300 text-2xl'>{symbol}</div>
            </div>

            <button
              className='text-white border-gray-700 border-2 rounded-md py-2 px-6 mt-6 hover:bg-green-600 transition hover:border-green-400'
              onClick={onTransferToken}
            >
              Confirm Transaction
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransferToken
