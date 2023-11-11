import { FC } from 'react'
import { useKeyDown } from '../hooks/useKeyDown'
import CloseButton from './CloseButton'
import Overlay from './Overlay'
import { IModal } from '../types'
import { createPortal } from 'react-dom'
import { cn } from '../utils'

const defaultStyles =
  'fixed z-20 flex w-full flex-col overflow-hidden bg-white text-black dark:bg-neutral-800 dark:text-white'

const styles = {
  mobileFullSize:
    'left-0 top-0 h-d-screen lg:left-1/2 lg:top-1/2 lg:h-auto lg:max-h-[50%] lg:max-w-4xl lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-md lg:shadow-md lg:dark:shadow-none',
  mobileCompact:
    'left-1/2 top-1/2 h-auto max-h-[60%] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-md shadow-md dark:shadow-none'
}

const Modal: FC<IModal> = ({
  isOpen = true,
  variant = 'mobileFullSize',
  className,
  ...props
}) => {
  useKeyDown((e) => {
    e.key === 'Escape' && props.handleClose()
  })

  const element = document.getElementById('modal')
  if (!element) return
  return (
    isOpen &&
    createPortal(
      <div className='absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center'>
        <div className={cn(defaultStyles, styles[variant], className)}>
          <div className='flex justify-between border-b border-gray-300 p-4 dark:border-neutral-700 dark:bg-neutral-800'>
            <span className='text-lg font-medium'>{props.name}</span>
            <CloseButton onClick={props.handleClose} />
          </div>
          {props.children}
        </div>
        <Overlay onClick={props.handleClose} className='bg-black/20' />
      </div>,
      element
    )
  )
}

export default Modal
