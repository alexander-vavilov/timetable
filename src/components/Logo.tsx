import { FC } from 'react'

const Logo: FC<{ size: number | string }> = ({ size }) => {
  return (
    <span
      className='select-none font-pacifico text-2xl font-medium text-green-500'
      style={{ fontSize: `${size}px` }}
    >
      HTimetable
    </span>
  )
}

export default Logo
