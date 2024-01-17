import { FC } from 'react'
import Modal from '../Modal/Modal'
import { ModalProps } from '../../types'
import Button from '../Button'
import { ReactSVG } from 'react-svg'
import CatSvg from '../../assets/angry-cat.svg'
import { cn } from '../../utils'

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
		props.handleClose()
	}

	return (
		<Modal
			className={cn('max-w-[300px] sm:max-w-sm', props.className)}
			variant='mobileCompact'
			{...props}
		>
			<div className='p-4'>
				<div className='flex items-end'>
					<span className='self-start pb-6'>
						{message
							? message
							: `Вы уверены, что хотите ${props.name.toLowerCase()}?`}
					</span>
					<ReactSVG src={CatSvg} className='max-w-24 w-full' />
				</div>
				<div className='flex items-center gap-4'>
					<Button
						onClick={confirm}
						className='flex-auto bg-red-600 hover:bg-red-700'
					>
						{confirmButtonLabel}
					</Button>
					<Button
						onClick={props.handleClose}
						className='cancel-button flex-auto'
					>
						Отменить
					</Button>
				</div>
			</div>
		</Modal>
	)
}

export default WarningModal
