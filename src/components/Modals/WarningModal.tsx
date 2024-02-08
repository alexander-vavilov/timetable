import { FC } from 'react'
import { ReactSVG } from 'react-svg'

import CatSvg from '../../assets/angry-cat.svg'
import { ModalProps } from '../../types'
import { cn } from '../../utils'
import Button from '../Button'
import Modal from '../Modal/Modal'

interface WarningModalProps extends ModalProps {
  message?: string
  confirm: {
    action: () => void
    label: string
  }
}

const WarningModal: FC<WarningModalProps> = ({
  confirm,
  message,
  className,
  ...props
}) => {
  const handleConfirm = () => {
    confirm.action()
    props.onRequestClose()
  }

  return (
    <Modal className={cn('max-w-[300px] sm:max-w-sm', className)} {...props}>
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
            onClick={handleConfirm}
            className="flex-auto bg-red-600 hover:bg-red-700"
          >
            {confirm.label}
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
