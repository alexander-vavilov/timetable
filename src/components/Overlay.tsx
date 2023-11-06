import cn from 'classnames'
import { FC } from 'react'

const Overlay: FC<{ className?: string }> = ({ className }) => {
	return (
		<div className={cn('fixed left-0 top-0 z-10 h-full w-full', className)} />
	)
}

export default Overlay
