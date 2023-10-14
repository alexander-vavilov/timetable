import { FC } from 'react'
import { MdClose } from 'react-icons/md'

const CloseButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className='-m-2 flex items-center gap-1 p-2 text-gray-800/70 transition-colors duration-300 hover:text-gray-800 dark:text-white/70 hover:dark:text-white'
    >
      <MdClose size={24} />
      <span className='touch:hidden'>ESC</span>
    </button>
  )
}

export default CloseButton
