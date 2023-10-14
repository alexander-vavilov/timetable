import { FC } from 'react'
import Modal from './Modal'
import { IModal } from '../types'
import clsx from 'clsx'
import Button from './Button'
import { ReactSVG } from 'react-svg'
import CatSvg from '../assets/angry-cat.svg'

interface IWarningModal extends IModal {
  confirmHandler: () => void
}

const WarningModal: FC<IWarningModal> = ({ confirmHandler, ...props }) => {
  const confirm = () => {
    confirmHandler()
    props.handleClose()
  }

  return (
    <Modal
      className={clsx('!max-w-[300px] sm:!max-w-sm', props.className)}
      mobileFullSize={false}
      {...props}
    >
      <div className='p-4'>
        <div className='flex items-end'>
          <span className='self-start pb-4'>
            Вы уверены, что хотите {props.name}?
          </span>
          <ReactSVG src={CatSvg} className='w-24' />
        </div>
        <div className='flex items-center gap-4'>
          <Button
            variant='button'
            onClick={confirm}
            className='flex-auto bg-red-500 text-white'
          >
            Удалить
          </Button>
          <Button
            variant='button'
            onClick={props.handleClose}
            className='flex-auto !bg-gray-400 text-white transition-background hover:!bg-gray-400/80 dark:!bg-neutral-600 hover:dark:!bg-neutral-500'
          >
            Отменить
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default WarningModal
