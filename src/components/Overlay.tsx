import { FC, HTMLAttributes, ReactNode } from 'react'

import { cn } from '../utils'

interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  className?: string
}

const Overlay: FC<OverlayProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn('fixed left-0 top-0 h-full w-full bg-black/50', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export default Overlay
