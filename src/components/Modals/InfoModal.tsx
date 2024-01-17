import { FC } from 'react'
import Modal from '../Modal/Modal'
import { cn } from '../../utils'

interface InfoModalProps {}

const InfoModal: FC<InfoModalProps> = props => {
	return (
		<Modal
			className={cn('max-w-[300px] sm:max-w-sm', props.className)}
			variant='mobileCompact'
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
						onClick={confirm}
						className='flex-auto bg-red-600 hover:bg-red-700'
					>
						Удалить
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

export default InfoModal
