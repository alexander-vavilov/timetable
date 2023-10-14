import { FC, useContext } from 'react'
import { lessonType } from '../../types'
import { ScheduleContextType } from '../../types/contexts'
import LessonsItem from './LessonsItem'
import LessonsAddButton from './LessonsAddButton'
import useSchedule from '../../hooks/useSchedule'
import { ScheduleContext } from '../../contexts/ScheduleContext'

interface ILessons {
  items: lessonType[]
  date: Date
}

const Lessons: FC<ILessons> = ({ items, date }) => {
  const { deleteLesson } = useSchedule()
  const { isEditMode } = useContext(ScheduleContext) as ScheduleContextType

  return (
    <ul className='divide-y divide-gray-200 bg-white shadow-md transition-background dark:divide-neutral-800 dark:bg-neutral-900 dark:shadow-none'>
      {items?.map((item) => (
        <LessonsItem
          key={item.id}
          {...item}
          date={date}
          deleteLesson={deleteLesson}
        />
      ))}
      {isEditMode && <LessonsAddButton date={date} />}
    </ul>
  )
}

export default Lessons
