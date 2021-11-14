const SVGSend = ({ width = 24, height = 24, strokeWidth = 2, ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      fill='none'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z' />
    </svg>
  )
}

export default SVGSend
