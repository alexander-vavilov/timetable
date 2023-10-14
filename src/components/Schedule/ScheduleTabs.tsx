import { FC, useContext } from 'react'
import { ScheduleContext } from '../../contexts/ScheduleContext'
import { ScheduleContextType } from '../../types/contexts'
import { addWeeks, isSameWeek, subWeeks } from 'date-fns'
import ScheduleTab from './ScheduleTab'

const ScheduleTabs: FC = () => {
  const { date, setDate } = useContext(ScheduleContext) as ScheduleContextType
  const currentDate = new Date()

  const items = [
    {
      label: 'Предыдущая',
      value: subWeeks(currentDate, 1),
      id: 'previous'
    },
    {
      label: 'Текущая неделя',
      value: currentDate,
      id: 'current'
    },
    {
      label: 'Следующая',
      value: addWeeks(currentDate, 1),
      id: 'next'
    }
  ]

  return (
    <div className='flex items-center gap-2 rounded-md bg-white p-1 text-neutral-800 transition-background dark:bg-neutral-800 dark:text-white'>
      {items.map(({ label, value, id }) => (
        <ScheduleTab
          key={label}
          onChange={() => setDate(value)}
          checked={isSameWeek(date, value)}
          label={label}
          id={id}
        />
      ))}
    </div>
  )
}

export default ScheduleTabs
