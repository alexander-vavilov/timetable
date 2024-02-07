import { FC } from 'react'
import { MdClose } from 'react-icons/md'

import { cn } from '../utils'

interface CloseButtonProps {
  onClick: () => void
  className?: string
}

const CloseButton: FC<CloseButtonProps> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1 p-2 text-gray-800/70 transition-colors duration-300 hover:text-gray-800 dark:text-white/70 hover:dark:text-white',
        className
      )}
    >
      <MdClose size={24} />
      <span className="touch:hidden">ESC</span>
    </button>
  )
}

export default CloseButton
