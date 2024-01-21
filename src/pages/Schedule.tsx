import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns'
import { FC, useContext, useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'

import CryingCatSvg from '../assets/crying-cat.svg'
import ThoughtfulCatSVG from '../assets/thoughtful-cat.svg'
import LessonsItemSkeleton from '../components/Lessons/LessonsItemSkeleton'
import LessonViewModal from '../components/Modals/LessonViewModal'
import LessonViewModalPlaceholder from '../components/Modals/LessonViewModalPlaceholder'
import ShareModal from '../components/Modals/ShareModal'
import ScheduleCreateButton from '../components/Schedule/ScheduleCreateButton'
import ScheduleDays from '../components/Schedule/ScheduleDays'
import ScheduleMessage from '../components/Schedule/ScheduleMessage'
import ScheduleTabs from '../components/Schedule/ScheduleTabs'
import TextInfo from '../components/TextInfo'
import { ScheduleContext } from '../contexts/ScheduleContext'
import { IScheduleContext } from '../types/contexts'

const scheduleMessages = {
  empty: {
    image: ThoughtfulCatSVG,
    message: 'Похоже, что у вас еще нет расписания.'
  },
  notfound: {
    image: CryingCatSvg,
    message: 'Похоже, что данное расписание либо пустое, либо не существует.'
  }
}

const Schedule: FC = () => {
  const { lessons, isOwner, isLoading, isEditMode, date } = useContext(
    ScheduleContext
  ) as IScheduleContext

  const weekStart = startOfWeek(date, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 })
  const weekDays = useMemo(() => {
    return eachDayOfInterval({ start: weekStart, end: weekEnd })
  }, [date])

  return (
    <>
      <Routes>
        <Route
          path="lesson/:lessonId"
          element={
            isLoading ? <LessonViewModalPlaceholder /> : <LessonViewModal />
          }
        />
        <Route path="share" element={<ShareModal />} />
      </Routes>
      <div className="flex h-full flex-col overflow-hidden bg-gray-200 text-black transition-colors dark:bg-neutral-950 dark:text-white">
        <div className="flex flex-auto flex-col overflow-y-auto overflow-x-hidden pb-6">
          <div className="flex justify-center py-4 sm:justify-end sm:pr-4">
            <ScheduleTabs />
          </div>
          {!isOwner && !!Object.keys(lessons) && (
            <TextInfo className="pl-2">
              Расписание доступно только в режиме просмотра.
            </TextInfo>
          )}
          {isLoading ? (
            <div className="flex flex-col divide-y divide-gray-300 dark:divide-neutral-800">
              <div className="p-2">
                <div className="skeleton h-2 w-16" />
              </div>
              {Array.from({ length: 5 }).map((_, index) => (
                <LessonsItemSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="flex-auto">
              {Object.keys(lessons).length === 0 && !isEditMode ? (
                <div className="flex h-full w-full flex-auto flex-col items-center justify-center gap-2">
                  <ScheduleMessage
                    image={
                      isOwner
                        ? scheduleMessages.empty.image
                        : scheduleMessages.notfound.image
                    }
                    message={
                      isOwner
                        ? scheduleMessages.empty.message
                        : scheduleMessages.notfound.message
                    }
                  />
                  <ScheduleCreateButton />
                </div>
              ) : (
                <ScheduleDays days={weekDays} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Schedule
