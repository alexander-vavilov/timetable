import { FC } from 'react'

const LessonsItemSkeleton: FC = () => {
  return (
    <div className='flex w-full animate-pulse items-center gap-4 bg-white p-4 dark:bg-neutral-900'>
      <div className='flex max-w-full flex-col gap-2'>
        <div className='h-2 w-8 rounded-full bg-gray-300 dark:bg-neutral-700' />
        <div className='h-2 w-8 rounded-full bg-gray-300 dark:bg-neutral-700' />
      </div>
      <div className='h-8 w-1 rounded-full bg-gray-300 dark:bg-neutral-700' />
      <div className='h-2 w-24 rounded-full bg-gray-300 dark:bg-neutral-700' />
    </div>
  )
}

export default LessonsItemSkeleton
