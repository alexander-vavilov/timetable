import { FC } from 'react'

const LessonViewPlaceholder: FC = () => {
	return (
		<div className='p-4'>
			<div className='flex flex-col gap-1'>
				<div className='skeleton h-2 w-16' />
				<div className='skeleton h-5 w-full' />
			</div>
			<div className='flex flex-col gap-4 pt-10'>
				<div className='skeleton h-5 w-full' />
				<div className='skeleton h-5 w-full' />
				<div className='flex flex-col gap-2'>
					<div className='flex items-center gap-2'>
						<div className='skeleton h-3 w-16' />
						<div className='skeleton h-5 w-16' />
					</div>
					<div className='flex items-center gap-2'>
						<div className='skeleton h-3 w-16' />
						<div className='skeleton h-5 w-16' />
					</div>
				</div>
				<div className='skeleton h-5 w-full' />
				<div className='skeleton h-7 w-[232px]' />
			</div>
			<div className='flex gap-2 pt-4'>
				<div className='skeleton w-32 h-32'></div>
				<div className='skeleton w-32 h-32'></div>
				<div className='skeleton w-32 h-32'></div>
			</div>
		</div>
	)
}

export default LessonViewPlaceholder
