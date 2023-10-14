import { FC, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ScheduleContextType } from '../../types/contexts'
import { lessonType } from '../../types'
import { ScheduleContext } from '../../contexts/ScheduleContext'
import LessonsItemDeleteButton from './LessonsItemDeleteButton'

interface ILessonsItem extends lessonType {
  date: Date
  deleteLesson: (id: string) => void
}

const LessonsItem: FC<ILessonsItem> = ({ date, deleteLesson, ...props }) => {
  const { isEditMode } = useContext(ScheduleContext) as ScheduleContextType
  const dayHomework = props.homework?.[date.toISOString()]

  return (
    <li className='flex w-full items-center transition-[background,_border-color] cursor:hover:bg-gray-100 cursor:hover:dark:bg-neutral-800'>
      {isEditMode && (
        <LessonsItemDeleteButton onClick={() => deleteLesson(props.id)} />
      )}
      <Link
        to={`lesson/${props.id}?date=${date.getTime()}`}
        state={{ lessonData: { ...props } }}
        className='flex w-full cursor-pointer items-center p-4'
      >
        <div className='flex flex-col text-xs'>
          <span>{props.start}</span>
          <span className='text-neutral-400'>{props.end}</span>
        </div>
        <div className='mx-3 h-8 w-0.5 rounded-full bg-black/20 transition-background dark:bg-white' />
        <div className='flex flex-col'>
          <span>{props.course}</span>
          {dayHomework && (
            <span className='line-clamp-1 text-xs text-neutral-400'>
              {dayHomework}
            </span>
          )}
        </div>
      </Link>
    </li>
  )
}

export default LessonsItem
