import { useState } from 'react'

const AutoResizeInput = ({ value, onChangeValue, onFocusInput, name }) => {
  const [width, setWidth] = useState(1.2)

  const onHandleValue = e => {
    setWidth(e.currentTarget.value.length)
    onChangeValue(e.currentTarget.value)
  }

  return (
    <div>
      <input
        type='text'
        name={name}
        className='p-0 bg-transparent text-gray-300 outline-none text-4xl'
        style={{ width: width + 'ch' }}
        onChange={onHandleValue}
        onFocus={e => onFocusInput(e, true)}
        onBlur={e => onFocusInput(e, false)}
        placeholder='0'
        value={value}
      />
    </div>
  )
}

export default AutoResizeInput
