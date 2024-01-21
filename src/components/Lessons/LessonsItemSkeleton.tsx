import { FC } from 'react'

const LessonsItemSkeleton: FC = () => {
  return (
    <div className="flex w-full items-center gap-4 bg-white p-4 dark:bg-neutral-900">
      <div className="flex max-w-full flex-col gap-2">
        <div className="skeleton h-2 w-8" />
        <div className="skeleton h-2 w-8" />
      </div>
      <div className="skeleton h-8 w-1" />
      <div className="skeleton h-2 w-24" />
    </div>
  )
}

export default LessonsItemSkeleton
