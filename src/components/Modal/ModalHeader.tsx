import { FC } from 'react'
import CloseButton from '../CloseButton'

interface ModalHeaderProps {
  label: string
  handleClose: () => void
}

const ModalHeader: FC<ModalHeaderProps> = ({ label, handleClose }) => {
  return (
    <header className='flex justify-between border-b border-gray-300 p-4 dark:border-neutral-700 dark:bg-neutral-800'>
      <span className='text-lg font-medium'>{label}</span>
      <CloseButton onClick={handleClose} />
    </header>
  )
}

export default ModalHeader
