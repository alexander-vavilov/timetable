import { FC, useContext } from 'react'
import { getWeekDayByDate } from '../../utils'
import { lessonsType } from '../../types'
import { ScheduleContextType } from '../../types/contexts'
import { ScheduleContext } from '../../contexts/ScheduleContext'
import Lessons from '../Lessons/Lessons'
import { format, isSameDay } from 'date-fns'
import { ru } from 'date-fns/locale'
import clsx from 'clsx'

const ScheduleDay: FC<{ dayDate: Date }> = ({ dayDate }) => {
  const { lessons, isEditMode, date } = useContext(
    ScheduleContext
  ) as ScheduleContextType

  const dateString = format(dayDate, 'eeee, dd MMM', {
    locale: ru
  })
  const isCurrentDay = isSameDay(date, dayDate)
  const weekDay = getWeekDayByDate(dayDate) as keyof lessonsType
  const dayLessons = lessons[weekDay]

  if (!dayLessons?.length && !isEditMode) return
  return (
    <div key={dateString}>
      <h2
        className={clsx(
          'sticky top-0 px-2 py-1 capitalize backdrop-blur-md transition-background',
          isCurrentDay
            ? 'bg-green-700 text-white'
            : 'bg-gray-200/50 dark:bg-neutral-950/50'
        )}
      >
        {dateString}
      </h2>
      <Lessons date={dayDate} items={dayLessons} />
    </div>
  )
}

export default ScheduleDay
