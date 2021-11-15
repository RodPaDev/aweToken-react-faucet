import * as React from 'react'

const AweSrc = ({ width = 90, height = 90, strokeWidth = 2, ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 90 90'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <rect width={width} height={height} rx={45} fill='none' />
    <path
      d='M45 86.5c22.92 0 41.5-18.58 41.5-41.5S67.92 3.5 45 3.5 3.5 22.08 3.5 45 22.08 86.5 45 86.5z'
      stroke='#fff'
      strokeOpacity={0.15}
      strokeWidth={4}
    />
    <path
      d='M38.5 44.8h12.8m-6.4.2l5.8-10.1h11.5L68.1 45l-5.8 10.1H50.8L44.9 45zm-5.7-10.1H27.7L21.9 45l5.8 10.1h11.5L45.1 45l-5.9-10.1z'
      stroke='#00FFCE'
      strokeWidth={2}
      strokeDasharray='262 262'
    />
    <path
      d='M45 86.5c22.92 0 41.5-18.58 41.5-41.5S67.92 3.5 45 3.5 3.5 22.08 3.5 45 22.08 86.5 45 86.5z'
      stroke='#00FFCE'
      strokeWidth={2}
      strokeDasharray='262 262'
    />
  </svg>
)

export default AweSrc
