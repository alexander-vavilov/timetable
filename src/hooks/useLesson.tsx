import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { IScheduleContext, IUserContext } from '../types/contexts'
import { useParams } from 'react-router-dom'
import { Timestamp, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../firebase'
import { toast } from 'sonner'
import { ScheduleContext } from '../contexts/ScheduleContext'
import { getDownloadURL, listAll, ref } from 'firebase/storage'

const useLesson = (id: string) => {
  const { currentUser } = useContext(UserContext) as IUserContext
  const { scheduleId } = useParams()

  const { lessons } = useContext(ScheduleContext) as IScheduleContext
  const initialLesson = lessons[id]

  const isEditable = scheduleId === currentUser?.uid
  // const isChanged = !isEqual(currentLesson, initialLesson)

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

      const docRef = doc(db, 'schedules', scheduleId, 'lessons', id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        await updateDoc(docRef, lessonData)
      } else {
        await setDoc(docRef, { ...lessonData, timestamp: Timestamp.now() })
      }
    } catch (error) {
      toast.error(error instanceof Error && error.message)
      toast.error('Не удалось сохранить изменения.')
      console.log(error)
    }
  }

  return { saveLesson, getLessonFilesURL, isEditable, initialLesson }
}

export default useLesson
