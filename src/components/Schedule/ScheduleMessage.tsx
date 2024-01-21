import { FC } from 'react'
import { ReactSVG } from 'react-svg'

import { cn } from '../../utils'

interface ScheduleMessageProps {
  image: string
  message: string
  className?: string
}

const ScheduleMessage: FC<ScheduleMessageProps> = ({
  image,
  message,
  className
}) => {
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <ReactSVG src={image} className="w-40 md:w-60" />
      <span className="text-center md:text-lg">{message}</span>
    </div>
  )
}

export default ScheduleMessage
