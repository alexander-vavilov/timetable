import { FC, useState } from 'react'
import useClickAway from '../../hooks/useClickAway'
import MenuButton from './MenuButton'
import useKeyDown from '../../hooks/useKeyDown'
import MenuItems from './MenuItems'
import Overlay from '../Overlay'
import cn from 'classnames'

const Menu: FC = () => {
	const [isOpen, setIsOpen] = useState(false)

	const handleCloseMenu = () => setIsOpen(false)

	const ref = useClickAway(handleCloseMenu)
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
					<MenuItems handleCloseMenu={handleCloseMenu} />
				</div>
			</div>
			{isOpen && <Overlay />}
		</>
	)
}

export default Menu
