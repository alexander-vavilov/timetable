import { FC, useContext, useMemo } from 'react'
import { startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
import { ScheduleContextType, UserContextType } from '../types/contexts'
import { isContainsNonEmptyArray } from '../utils'
import { ScheduleContext } from '../contexts/ScheduleContext'
import ScheduleEmptyMessage from '../components/Schedule/ScheduleEmptyMessage'
import ScheduleDays from '../components/Schedule/ScheduleDays'
import ScheduleTabs from '../components/Schedule/ScheduleTabs'
import { UserContext } from '../contexts/UserContext'
import { useParams } from 'react-router-dom'
import ScheduleNotExistMessage from '../components/Schedule/ScheduleNotExistMessage'
import LessonsItemSkeleton from '../components/Lessons/LessonsItemSkeleton'

const Schedule: FC = () => {
  const { lessons, isLoading, isEditMode, date } = useContext(
    ScheduleContext
  ) as ScheduleContextType
  const { currentUser } = useContext(UserContext) as UserContextType
  const { scheduleId } = useParams()

  const weekStart = startOfWeek(date, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 })
  const weekDays = useMemo(
    () => eachDayOfInterval({ start: weekStart, end: weekEnd }),
    [date]
  )

  return (
    <div className='flex h-full flex-col overflow-hidden bg-gray-200 text-black transition-colors dark:bg-neutral-950 dark:text-white'>
      <div className='flex flex-auto flex-col overflow-y-auto overflow-x-hidden pb-6'>
        <div className='flex justify-center py-4 sm:justify-end sm:pr-4'>
          <ScheduleTabs />
        </div>
        {isLoading ? (
          <div className='mt-6 flex flex-col divide-y divide-gray-300 dark:divide-neutral-800'>
            {Array.from({ length: 5 }).map((_, index) => (
              <LessonsItemSkeleton key={index} />
            ))}
          </div>
        ) : (
          /* className='animate-slide-in' */
          <div className='flex-auto'>
            <ScheduleDays days={weekDays} />
            {!isContainsNonEmptyArray(lessons) && !isEditMode && (
              <div className='flex h-full w-full flex-auto items-center justify-center'>
                {currentUser?.uid === scheduleId ? (
                  <ScheduleEmptyMessage />
                ) : (
                  <ScheduleNotExistMessage />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Schedule
