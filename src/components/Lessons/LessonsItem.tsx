import { FC, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IScheduleContext, IUserContext } from '../../types/contexts'
import { ILesson } from '../../types'
import { ScheduleContext } from '../../contexts/ScheduleContext'
import LessonsItemDeleteButton from './LessonsItemDeleteButton'
import { UserContext } from '../../contexts/UserContext'
import { db, storage } from '../../../firebase'
import { toast } from 'sonner'
import { deleteObject, ref } from 'firebase/storage'
import { deleteDoc, doc } from 'firebase/firestore'
import TextInfo from '../TextInfo'

interface LessonsItemProps extends ILesson {
  date: Date
  id: string
}

const LessonsItem: FC<LessonsItemProps> = ({ date, ...props }) => {
  const { currentUser } = useContext(UserContext) as IUserContext
  const { isEditMode } = useContext(ScheduleContext) as IScheduleContext

  const { scheduleId } = useParams()

  const deleteLesson = async () => {
    if (!currentUser || !scheduleId) return

    try {
      const docRef = doc(db, 'schedules', currentUser.uid, 'lessons', props.id)
      await deleteDoc(docRef)

      const storageRef = ref(storage, `${scheduleId}/${props.id}`)
      await deleteObject(storageRef)
      // if (!props.files.length) return

      // for (const fileURL of props.files) {
      //   const storageRef = ref(storage, fileURL)
      //   await deleteObject(storageRef)
      // }
    } catch (error) {
      toast.error('Что-то пошло не так...')
    }
  }

  const currentHomework = props.homework?.[date.toISOString()]

  return (
    <li className='flex w-full items-center transition-[background,_border-color] cursor:hover:bg-gray-100 cursor:hover:dark:bg-neutral-800'>
      {isEditMode && <LessonsItemDeleteButton onClick={() => deleteLesson()} />}
      <Link
        to={`lesson/${props.id}?date=${date.getTime()}`}
        className='flex w-full cursor-pointer items-center p-4'
      >
        <div className='flex flex-col text-xs'>
          <span>{props.start}</span>
          <span className='text-neutral-400'>{props.end}</span>
        </div>
        <div className='mx-3 h-8 w-0.5 rounded-full bg-black/20 transition-background dark:bg-white' />
        <div className='flex max-w-[250px] flex-col leading-none'>
          <span className='truncate'>{props.name}</span>
          {currentHomework && (
            <TextInfo className='truncate'>{currentHomework}</TextInfo>
          )}
        </div>
      </Link>
    </li>
  )
}

export default LessonsItem
