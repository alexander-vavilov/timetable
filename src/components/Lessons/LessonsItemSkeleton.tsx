import { FC } from 'react'

const LessonsItemSkeleton: FC = () => {
	return (
		<div className='flex w-full items-center gap-4 bg-white p-4 dark:bg-neutral-900'>
			<div className='flex max-w-full flex-col gap-2'>
				<div className='h-2 w-8 skeleton' />
				<div className='h-2 w-8 skeleton' />
			</div>
			<div className='h-8 w-1 skeleton' />
			<div className='h-2 w-24 skeleton' />
		</div>
	)
}

export default LessonsItemSkeleton
