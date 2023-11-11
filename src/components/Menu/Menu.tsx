import { FC, useState } from 'react'
import MenuButton from './MenuButton'
import { useKeyDown } from '../../hooks/useKeyDown'
import MenuItems from './MenuItems'
import Overlay from '../Overlay'
import { cn } from '../../utils'
import { useClickAway } from '../../hooks/useClickAway'

const Menu: FC = () => {
	const [isOpen, setIsOpen] = useState(false)

	const handleClose = () => setIsOpen(false)

	const ref = useClickAway(handleClose)
	useKeyDown(e => {
		e.key === 'Escape' && setIsOpen(false)
	})

	return (
		<>
			<div ref={ref} className='z-20'>
				<MenuButton
					onClick={() => setIsOpen(prevState => !prevState)}
					isOpen={isOpen}
				/>
				<div
					className={cn(
						'fixed right-5 transition-[transform,_opacity,_visibility] ease-linear',
						!isOpen && 'invisible scale-75 opacity-0'
					)}
				>
					<MenuItems handleClose={handleClose} />
				</div>
			</div>
			{isOpen && <Overlay />}
		</>
	)
}

export default Menu
