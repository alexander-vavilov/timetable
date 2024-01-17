import { FC, useState } from 'react'
import { IconType } from 'react-icons'
import WarningModal from '../Modals/WarningModal'
import { cn } from '../../utils'

interface MenuItemProps {
	label: string
	icon: IconType
	handler: () => void
	warning?: boolean
	permissions?: boolean
	handleClose: () => void
	styleVariant: 'standard' | 'shrink'
}

const MenuItem: FC<MenuItemProps> = ({
	label,
	icon: Icon,
	handler,
	warning = false,
	permissions = true,
	handleClose,
	styleVariant,
}) => {
	const [isWarningOpen, setIsWarningOpen] = useState(false)

	const handleClick = () => {
		if (warning) {
			setIsWarningOpen(true)
		} else {
			handler()
		}
		handleClose()
	}

	const handleCloseWarning = () => setIsWarningOpen(false)

	if (!permissions) return
	return (
		<li
			className={cn('rounded-md transition-background', {
				'hover:bg-red-400/10': warning,
				'hover:bg-gray-200/50 hover:dark:bg-neutral-700/70': !warning,
			})}
		>
			<button
				onClick={handleClick}
				className={cn('w-full cursor-pointer', {
					'p-2': styleVariant === 'standard',
					'p-1': styleVariant === 'shrink',
					'text-red-500': warning,
				})}
			>
				<div className='flex items-center gap-2'>
					<div
						className={cn({
							'flex items-center justify-center rounded-full p-2 shadow-sm dark:shadow-none':
								styleVariant === 'standard',
							'bg-red-400/20 text-red-500':
								styleVariant === 'standard' && warning,
							'bg-gray-300/50 text-gray-800 dark:bg-neutral-600 dark:text-white':
								styleVariant === 'standard' && !warning,
						})}
					>
						<Icon size={20} />
					</div>
					<span className='text-start'>{label}</span>
				</div>
			</button>
			{isWarningOpen && (
				<WarningModal
					handleClose={handleCloseWarning}
					name={label}
					confirmHandler={handler}
					confirmButtonLabel='Удалить'
				/>
			)}
		</li>
	)
}

export default MenuItem
