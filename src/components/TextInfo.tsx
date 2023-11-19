import { FC, ReactNode } from 'react'
import { cn } from '../utils'

interface TextInfoProps {
  children: ReactNode
  className?: string
}

const TextInfo: FC<TextInfoProps> = ({ children, className }) => {
  return (
    <span className={cn('text-xs text-neutral-400', className)}>
      {children}
    </span>
  )
}

export default TextInfo
