import { FC } from 'react'

const LessonSkeleton: FC = () => {
  return (
    <div className='p-4'>
      <div className='flex flex-col gap-1'>
        <div className='skeleton h-2 w-16' />
        <div className='skeleton h-5 w-full' />
      </div>
      <div className='flex flex-col gap-4 pt-10'>
        <div className='flex flex-col gap-1'>
          <div className='skeleton h-2 w-16' />
          <div className='skeleton h-5 w-full' />
        </div>
        <div className='flex flex-col gap-1'>
          <div className='skeleton h-2 w-16' />
          <div className='skeleton h-5 w-full' />
        </div>
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
      </div>
    </div>
  )
}

export default LessonSkeleton
