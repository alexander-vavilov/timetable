import { FC } from 'react'
import { ReactSVG } from 'react-svg'

import CatSvg from '../../assets/angry-cat.svg'
import { ModalProps } from '../../types'
import { cn } from '../../utils'
import Button from '../Button'
import Modal from '../Modal/Modal'

interface WarningModalProps extends ModalProps {
  confirmHandler: () => void
  message?: string
  confirmButtonLabel: string
}

const WarningModal: FC<WarningModalProps> = ({
  confirmHandler,
  message,
  confirmButtonLabel,
  ...props
}) => {
  const confirm = () => {
    confirmHandler()
    props.onRequestClose()
  }

  return (
    <Modal
      className={cn('max-w-[300px] sm:max-w-sm', props.className)}
      {...props}
    >
      <div className="p-4">
        <div className="flex min-h-20 items-end">
          <span className="self-start pb-8">
            {message
              ? message
              : `Вы уверены, что хотите ${props.name.toLowerCase()}?`}
          </span>
          <ReactSVG src={CatSvg} className="w-full max-w-20" />
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={confirm}
            className="flex-auto bg-red-600 hover:bg-red-700"
          >
            {confirmButtonLabel}
          </Button>
          <Button
            onClick={props.onRequestClose}
            className="cancel-button flex-auto"
          >
            Отменить
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default WarningModal
