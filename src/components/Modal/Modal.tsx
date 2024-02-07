import { ReactNode } from 'react'

import { ModalProps } from '../../types'
import { cn } from '../../utils'
import CloseButton from '../CloseButton'
import ModalPortal from './ModalPortal'

const Modal = ({ name, children, onRequestClose, className }: ModalProps) => {
  return (
    <ModalPortal
      onRequestClose={onRequestClose}
      className={{
        overlay: 'flex items-center justify-center',
        modal: cn(
          'flex h-auto max-h-[60%] w-full max-w-3xl flex-col overflow-hidden rounded-md border-gray-200 bg-white text-black shadow-md outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:shadow-none lg:border',
          className
        )
      }}
    >
      <Modal.Header label={name} onRequestClose={onRequestClose} />
      {children}
    </ModalPortal>
  )
}

interface ModalHeaderProps {
  label: string
  onRequestClose: () => void
}

Modal.Header = ({ label, onRequestClose }: ModalHeaderProps) => {
  return (
    <header className="flex justify-between border-b border-gray-300 p-4 dark:border-neutral-700 dark:bg-neutral-800">
      <span className="text-lg font-medium">{label}</span>
      <CloseButton onClick={onRequestClose} className="-m-2" />
    </header>
  )
}

interface ModalPartsProps {
  children: ReactNode
  className?: string
}

Modal.Content = ({ children, className }: ModalPartsProps) => {
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

Modal.Footer = ({ children, className }: ModalPartsProps) => {
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

export default Modal
