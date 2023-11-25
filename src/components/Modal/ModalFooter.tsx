import { FC, ReactNode } from 'react'
import { cn } from '../../utils'

interface ModalFooterProps {
  children: ReactNode
  className?: string
}

const ModalFooter: FC<ModalFooterProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'flex items-center gap-4 border-t border-gray-300 p-4 shadow-md dark:border-neutral-700 dark:shadow-none',
        className
      )}
    >
      {children}
    </div>
  )
}

export default ModalFooter
