import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { IScheduleContext, IUserContext } from '../types/contexts'
import { useParams } from 'react-router-dom'
import { Timestamp, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { toast } from 'sonner'
import { ScheduleContext } from '../contexts/ScheduleContext'

const useLesson = (id: string) => {
  const { currentUser } = useContext(UserContext) as IUserContext
  const { scheduleId, lessonId } = useParams()

  const { lessons } = useContext(ScheduleContext) as IScheduleContext
  const initialLesson = lessons[id]

  const isEditable = scheduleId === currentUser?.uid
  // const isChanged = !isEqual(currentLesson, initialLesson)

  const handleSave = async (lessonData: {}) => {
    try {
      if (!scheduleId || !lessonId)
        throw new Error('Неизвестный идентификатор.')
      if (!isEditable)
        throw new Error('Вносить изменения может только владелец.')

      const docRef = doc(db, 'schedules', scheduleId, 'lessons', lessonId)
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

  return { handleSave, isEditable, initialLesson }
}

export default useLesson
