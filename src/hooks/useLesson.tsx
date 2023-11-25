import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { IScheduleContext, IUserContext } from '../types/contexts'
import { useParams, useSearchParams } from 'react-router-dom'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../firebase'
import { ScheduleContext } from '../contexts/ScheduleContext'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { toastError } from '../toast'
import { addMinutes, format, getDay, parse } from 'date-fns'

const useLesson = (id: string) => {
  const { currentUser } = useContext(UserContext) as IUserContext
  const { scheduleId } = useParams()
  const searchParams = useSearchParams()[0]

  const date = new Date(Number(searchParams.get('date')))
  const weekDay = getDay(date)

  const { lessons } = useContext(ScheduleContext) as IScheduleContext
  const initialLesson = lessons[id]

  const isEditable = scheduleId === currentUser?.uid

  const getLessonFilesURL = async () => {
    const listRef = ref(storage, `schedules/${scheduleId}/${id}`)
    const listResult = await listAll(listRef)
    const lessonFilesPromises = listResult.items.map(
      async (file) => await getDownloadURL(ref(storage, file.fullPath))
    )
    return await Promise.all(lessonFilesPromises)
  }

  const saveLesson = async (lessonData: {}) => {
    try {
      if (!scheduleId || !id) throw new Error('Неизвестный идентификатор.')
      if (!isEditable)
        throw new Error('Вносить изменения может только владелец.')

      const docRef = doc(db, 'schedules', scheduleId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        await updateDoc(docRef, { [id]: lessonData })
      } else {
        await setDoc(docRef, { [id]: lessonData })
      }
    } catch (error) {
      toastError(error)
    }
  }

  const getLessonTime = () => {
    try {
      const currentDayLessons = Object.values(lessons).filter((value) => {
        return value.weekDay === weekDay
      })
      const lastLesson = currentDayLessons[currentDayLessons?.length - 1]

      const lastCurrentDayLessonEndDate = parse(
        lastLesson?.end,
        'HH:mm',
        new Date()
      )

      const currentLessonStartDate = addMinutes(lastCurrentDayLessonEndDate, 10)
      const currentLessonEndDate = addMinutes(currentLessonStartDate, 45)
      const currentLessonStartString = format(currentLessonStartDate, 'HH:mm')
      const currentLessonEndString = format(currentLessonEndDate, 'HH:mm')

      return { start: currentLessonStartString, end: currentLessonEndString }
    } catch (error) {
      return { start: '08:30', end: '09:15' }
    }
  }

  return {
    saveLesson,
    getLessonFilesURL,
    getLessonTime,
    isEditable,
    initialLesson
  }
}

export default useLesson
