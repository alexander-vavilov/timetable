import { FC } from 'react'

const LessonSkeleton: FC = () => {
	return (
		<div className='p-4'>
			<div className='flex flex-col gap-1'>
				<div className='w-16 skeleton h-2' />
				<div className='w-full skeleton h-5' />
			</div>
			<div className='flex flex-col gap-4 pt-10'>
				<div className='flex flex-col gap-1'>
					<div className='w-16 skeleton h-2' />
					<div className='w-full skeleton h-5' />
				</div>
				<div className='flex flex-col gap-1'>
					<div className='w-16 skeleton h-2' />
					<div className='w-full skeleton h-5' />
				</div>
				<div className='flex flex-col gap-2'>
					<div className='flex gap-2 items-center'>
						<div className='w-16 skeleton h-3' />
						<div className='w-16 skeleton h-5' />
					</div>
					<div className='flex gap-2 items-center'>
						<div className='w-16 skeleton h-3' />
						<div className='w-16 skeleton h-5' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default LessonSkeleton
