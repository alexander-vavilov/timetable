import { format, isSameDay } from 'date-fns'
import { ru } from 'date-fns/locale'
import { FC } from 'react'

import { cn } from '../../utils'

const ScheduleDayHeading: FC<{ date: Date }> = ({ date }) => {
  const isCurrentDay = isSameDay(new Date(), date)
  const dateString = format(date, 'eeee, dd MMM', {
    locale: ru
  })

  return (
    <h2
      className={cn(
        'sticky top-0 px-2 py-0.5 capitalize backdrop-blur-md transition-background',
        {
          'bg-green-700 text-white': isCurrentDay,
          'bg-gray-200/50 dark:bg-neutral-950/50': !isCurrentDay
        }
      )}
    >
      {dateString}
    </h2>
  )
}

export default ScheduleDayHeading
