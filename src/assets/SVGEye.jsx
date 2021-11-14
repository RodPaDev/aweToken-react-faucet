const SVGEye = ({ width = 24, height = 24, strokeWidth = 2, ...props }) => {
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
      className='prefix__feather prefix__feather-eye'
      {...props}
    >
      <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
      <circle cx={12} cy={12} r={3} />
    </svg>
  )
}

export default SVGEye
