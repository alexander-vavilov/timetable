import { addMinutes, format, parse } from 'date-fns'
import { useContext } from 'react'

import { ScheduleContext } from '../../contexts/ScheduleContext'
import { IScheduleContext } from '../../types/contexts'

const useTimeCalc = (weekDay: number) => {
  const { lessons } = useContext(ScheduleContext) as IScheduleContext

  try {
    const currentDayLessons = Object.values(lessons).filter(
      (value) => value.weekDay === weekDay
    )
    const lastLesson = currentDayLessons[currentDayLessons?.length - 1]
    const lastCurrentDayLessonEndDate = parse(
      lastLesson?.end,
      'HH:mm',
      new Date()
    )

    const currentLessonStartDate = addMinutes(lastCurrentDayLessonEndDate, 10)
    const currentLessonEndDate = addMinutes(currentLessonStartDate, 45)
    const currentLessonStartString = format(currentLessonStartDate, 'HH:mm')
    const currentLessonEndString = format(currentLessonEndDate, 'HH:mm')

    return { start: currentLessonStartString, end: currentLessonEndString }
  } catch (error) {
    return { start: '08:30', end: '09:15' }
  }
}

export default useTimeCalc
