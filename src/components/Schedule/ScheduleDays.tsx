import { FC } from 'react'
import ScheduleDay from './ScheduleDay'

const ScheduleDays: FC<{ days: Date[] }> = ({ days }) => {
  return (
    <div className='flex flex-col gap-4'>
      {days.map((dayDate) => (
        <ScheduleDay key={dayDate.toISOString()} dayDate={dayDate} />
      ))}
    </div>
  )
}

export default ScheduleDays
