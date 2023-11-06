import cn from 'classnames'
import { FC } from 'react'

interface IMenuButton {
	onClick: () => void
	isOpen: boolean
}

const MenuButton: FC<IMenuButton> = ({ onClick, isOpen }) => {
	return (
		<button className='p-1.5' onClick={onClick}>
			<div className='relative h-4 w-6'>
				<div
					className={cn(
						'absolute top-0 h-0.5 w-full rounded-full bg-black transition-all duration-300 dark:bg-white',
						isOpen && 'top-1/2 -translate-y-1/2 -rotate-45'
					)}
				/>
				<div
					className={cn(
						'absolute top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-black transition-all duration-300 dark:bg-white',
						isOpen && 'scale-0'
					)}
				/>
				<div
					className={cn(
						'absolute bottom-0 h-0.5 w-full rounded-full bg-black transition-all duration-300 dark:bg-white',
						isOpen && 'bottom-[calc(50%-2px)] -translate-y-1/2 rotate-45'
					)}
				/>
			</div>
		</button>
	)
}

export default MenuButton
