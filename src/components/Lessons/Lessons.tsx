import { FC, useContext } from 'react'

import { ScheduleContext } from '../../contexts/ScheduleContext'
import { Lesson } from '../../types'
import { IScheduleContext } from '../../types/contexts'
import LessonsAddButton from './LessonsAddButton'
import LessonsItem from './LessonsItem'

interface LessonsProps {
  items: Lesson[]
  date: Date
}

const Lessons: FC<LessonsProps> = ({ items, date }) => {
  const { isEditMode } = useContext(ScheduleContext) as IScheduleContext

  return (
    <ul className="divide-y divide-gray-200 bg-white shadow-md transition-background dark:divide-neutral-800 dark:bg-neutral-900 dark:shadow-none">
      {items?.map((item) => (
        <LessonsItem key={item.id} date={date} {...item} />
      ))}
      {isEditMode && <LessonsAddButton date={date} />}
    </ul>
  )
}

export default Lessons
