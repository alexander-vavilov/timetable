import { FC, useContext } from 'react'

import { ScheduleContext } from '../../contexts/ScheduleContext'
import { IScheduleContext } from '../../types/contexts'
import ScheduleDay from './ScheduleDay'

const ScheduleDays: FC<{ days: Date[] }> = ({ days }) => {
  const { lessons } = useContext(ScheduleContext) as IScheduleContext

  const lessonsArr = Object.keys(lessons)
    .map((id) => ({ ...lessons[id], id }))
    .sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0))

  return (
    <div className="flex flex-col gap-4">
      {days.map((date) => (
        <ScheduleDay
          key={date.toISOString()}
          lessons={lessonsArr}
          date={date}
        />
      ))}
    </div>
  )
}

export default ScheduleDays
