import { FC, ReactNode } from 'react'

import { cn } from '../../utils'

interface ModalContentProps {
  children: ReactNode
  className?: string
}

const ModalContent: FC<ModalContentProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'h-full flex-auto overflow-y-auto overflow-x-hidden p-4',
        className
      )}
    >
      {children}
    </div>
  )
}

export default ModalContent
