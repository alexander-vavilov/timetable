import { getDay } from 'date-fns'
import { FC, useContext } from 'react'

import { ScheduleContext } from '../../contexts/ScheduleContext'
import { Lesson } from '../../types'
import { IScheduleContext } from '../../types/contexts'
import Lessons from '../Lessons/Lessons'
import ScheduleDayHeading from './ScheduleDayHeading'

interface ScheduleDayProps {
  lessons: Lesson[]
  date: Date
}

const ScheduleDay: FC<ScheduleDayProps> = ({ lessons, date }) => {
  const { isEditMode } = useContext(ScheduleContext) as IScheduleContext

  const currentDayLessons = lessons?.filter(
    ({ weekDay }) => weekDay === getDay(date)
  )

  if (!currentDayLessons?.length && !isEditMode) return
  return (
    <div className="flex flex-col">
      <ScheduleDayHeading date={date} />
      <Lessons date={date} items={currentDayLessons} />
    </div>
  )
}

export default ScheduleDay
