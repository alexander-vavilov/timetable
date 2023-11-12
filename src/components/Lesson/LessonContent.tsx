import { FC, useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { IScheduleContext, IUserContext } from '../../types/contexts'
import { useParams, useSearchParams } from 'react-router-dom'
import { ScheduleContext } from '../../contexts/ScheduleContext'
import { getDay } from 'date-fns'
import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { db } from '../../../firebase'
import { nanoid } from 'nanoid'
import isEqual from 'lodash.isequal'
import Input from '../Input'
import { toast } from 'sonner'
import LessonTimeInputs from './LessonTimeInputs'
import LessonFooter from './LessonFooter'
import LessonAttachments from './LessonAttachments'
import LessonAttachFiles from './LessonAttachFiles'
import useLesson from '../../hooks/useLesson'

const LessonContent: FC = () => {
  const { currentUser } = useContext(UserContext) as IUserContext
  const { lessons } = useContext(ScheduleContext) as IScheduleContext

  const { scheduleId, lessonId } = useParams()
  const searchParams = useSearchParams()[0]

  const date = new Date(Number(searchParams.get('date')))
  const weekDay = getDay(date)

  // const initialLesson = lessons[lessonId || nanoid()]

  const { initialLesson, handleSave, isEditable } = useLesson(lessonId || '')

  const [name, setName] = useState(initialLesson?.name || '')
  const [teacher, setTeacher] = useState(initialLesson?.teacher || '')
  const [location, setLocation] = useState(initialLesson?.location || '')
  const [time, setTime] = useState({
    start: initialLesson?.start || '08:30',
    end: initialLesson?.end || '09:15'
  })
  const [homework, setHomework] = useState(
    initialLesson?.homework?.[date.toISOString()] || ''
  )

  const currentLesson = {
    ...initialLesson,
    name,
    teacher,
    location,
    weekDay,
    start: time.start,
    end: time.end,
    homework: {
      ...initialLesson?.homework,
      [date.toISOString()]: homework
    }
  }

  // const handleSave = async (fileURL?: string) => {
  //   if (!currentUser) return

  //   try {
  //     if (!lessonId) throw new Error('Неизвестный идентификатор')

  //     const docRef = doc(db, 'schedules', currentUser.uid, 'lessons', lessonId)
  //     const docSnap = await getDoc(docRef)

  //     if (docSnap.exists()) {
  //       await updateDoc(docRef, {
  //         ...currentLesson,
  //         ...(fileURL?.length && { files: arrayUnion(fileURL) })
  //       })
  //     } else {
  //       await setDoc(docRef, {
  //         ...currentLesson,
  //         ...(fileURL?.length && { files: arrayUnion(fileURL) }),
  //         timestamp: Timestamp.now()
  //       })
  //     }
  //   } catch (error) {
  //     toast.error(error instanceof Error && error.message)
  //     toast.error('Не удалось сохранить изменения.')
  //     console.log(error)
  //   }
  // }

  // const isEditable = scheduleId === currentUser?.uid
  const isChanged = !isEqual(currentLesson, initialLesson)

  return (
    <>
      <div className='h-full flex-auto overflow-y-auto overflow-x-hidden p-4 pt-6'>
        <Input
          type='text'
          editable={isEditable}
          styleVariant='flushed'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='text-3xl'
          placeholder='предмет'
        />
        <div className='flex flex-col gap-4 pt-10'>
          <Input
            type='text'
            editable={isEditable}
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            placeholder='учитель'
          />
          <Input
            type='text'
            editable={isEditable}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='кабинет'
          />
          <LessonTimeInputs
            time={time}
            setTime={setTime}
            isEditable={isEditable}
          />
          <Input
            type='text'
            editable={isEditable}
            value={homework}
            onChange={(e) => setHomework(e.target.value)}
            placeholder='Домашнее задание'
          />
          {isEditable && <LessonAttachFiles />}
          {initialLesson?.files && (
            <LessonAttachments filesURL={initialLesson.files} />
          )}
        </div>
      </div>
      {isEditable && isChanged && (
        <LessonFooter handleSave={() => handleSave(currentLesson)} />
      )}
    </>
  )
}

export default LessonContent
