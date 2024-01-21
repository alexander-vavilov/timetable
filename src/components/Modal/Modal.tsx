import { FC } from 'react'
import ReactModal from 'react-modal'

import { ModalProps } from '../../types'
import { cn } from '../../utils'
import ModalHeader from './ModalHeader'

const defaultStyles =
  'flex w-full flex-col overflow-hidden bg-white text-black outline-none dark:bg-neutral-800 dark:text-white'

const styles = {
  mobileFullSize:
    'h-d-screen lg:h-auto lg:max-h-[50%] lg:max-w-[812px] lg:rounded-md lg:shadow-md lg:dark:shadow-none',
  mobileCompact:
    'h-auto max-h-[60%] max-w-[812px] rounded-md shadow-md dark:shadow-none'
}

const Modal: FC<ModalProps> = ({
  isOpen = true,
  variant = 'mobileFullSize',
  className,
  ...props
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={props.handleClose}
      className={cn(defaultStyles, styles[variant], className)}
      overlayClassName="fixed top-0 left-0 bg-black/30 w-full h-full flex items-center justify-center z-20"
      ariaHideApp={false}
    >
      <ModalHeader label={props.name} handleClose={props.handleClose} />
      {props.children}
    </ReactModal>
  )
}

export default Modal
