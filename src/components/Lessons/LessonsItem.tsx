import { deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, listAll, ref } from 'firebase/storage'
import { FC, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { db, storage } from '../../../firebase'
import { ScheduleContext } from '../../contexts/ScheduleContext'
import { Lesson } from '../../types'
import { IScheduleContext } from '../../types/contexts'
import TextInfo from '../TextInfo'
import LessonsItemDeleteButton from './LessonsItemDeleteButton'

interface LessonsItemProps extends Lesson {
  date: Date
  id: string
}

const LessonsItem: FC<LessonsItemProps> = ({ date, ...props }) => {
  const { isEditMode } = useContext(ScheduleContext) as IScheduleContext

  const { scheduleId } = useParams()

  const deleteLesson = async () => {
    if (!scheduleId) throw Error('Неверный идентификатор.')

    try {
      const docRef = doc(db, 'schedules', scheduleId, 'lessons', props.id)
      await deleteDoc(docRef)

      const listRef = ref(storage, `schedules/${scheduleId}/${props.id}`)
      const listResult = await listAll(listRef)

      if (listResult.items) {
        listResult.items.forEach(async ({ fullPath }) => {
          await deleteObject(ref(storage, fullPath))
        })
      }
    } catch (error) {
      toast.error('Что-то пошло не так в процессе удаления...')
    }
  }

  const currentHomework = props.homework?.[date.getTime()]

  return (
    <li className="flex w-full items-center transition-[background,_border-color] cursor:hover:bg-gray-100 cursor:hover:dark:bg-neutral-800">
      {isEditMode && <LessonsItemDeleteButton onClick={() => deleteLesson()} />}
      <Link
        to={`lesson/${props.id}?date=${date.getTime()}`}
        className="flex h-16 w-full cursor-pointer items-center p-4"
      >
        <div className="flex flex-col text-xs">
          <span>{props.start}</span>
          <span className="text-neutral-400">{props.end}</span>
        </div>
        <div className="mx-3 h-8 w-0.5 rounded-full bg-black/20 transition-background dark:bg-white" />
        <div className="flex max-w-[250px] flex-col">
          <span className="truncate">{props.name}</span>
          {currentHomework && (
            <TextInfo className="truncate">{currentHomework}</TextInfo>
          )}
        </div>
      </Link>
    </li>
  )
}

export default LessonsItem
