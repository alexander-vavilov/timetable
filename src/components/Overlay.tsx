import { FC } from 'react'
import { cn } from '../utils'

interface OverlayProps {
  className?: string
  onClick?: () => void
}

const Overlay: FC<OverlayProps> = ({ className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn('fixed left-0 top-0 z-10 h-full w-full', className)}
    />
  )
}

export default Overlay
