import { useContext } from 'react'
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { db } from '../../firebase'
import { lessonType, lessonsType } from '../types'
import { ScheduleContextType, UserContextType } from '../types/contexts'
import { UserContext } from '../contexts/UserContext'
import { ScheduleContext } from '../contexts/ScheduleContext'
import { isContainsNonEmptyArray } from '../utils'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const useSchedule = () => {
  const { currentUser } = useContext(UserContext) as UserContextType
  const { lessons } = useContext(ScheduleContext) as ScheduleContextType
  const { scheduleId } = useParams()
  const isOwner = currentUser && currentUser.uid === scheduleId

  const ownerValidation = () => {
    if (!isOwner) {
      toast.error('Только владелец может вносить изменения в расписание')
      return false
    }
    return true
  }

  const getLessonById = (lessonId: string) => {
    if (!isContainsNonEmptyArray(lessons)) return

    for (const lessonsKey in lessons) {
      const weekDayLessons = lessons[lessonsKey as keyof lessonsType]
      return weekDayLessons.find((lesson) => lesson.id === lessonId)
    }
  }

  const getWeekDayByLessonId = (lessonId: string) => {
    if (!isContainsNonEmptyArray(lessons)) return

    for (const lessonsKey in lessons) {
      const weekDayLessons = lessons[lessonsKey as keyof lessonsType]
      const isWeekDayContainsLesson = weekDayLessons.some((lesson) => {
        return lesson.id === lessonId
      })

      if (isWeekDayContainsLesson) return lessonsKey
    }
  }

  const addNewLesson = async (
    newLesson: lessonType,
    weekDay: keyof lessonsType
  ) => {
    if (!ownerValidation() || !scheduleId) return

    const docRef = doc(db, 'schedules', scheduleId)
    const docSnap = await getDoc(docRef)
    const docData = {
      [weekDay]: arrayUnion(newLesson)
    }

    try {
      if (docSnap.exists()) {
        await updateDoc(docRef, docData)
      } else {
        await setDoc(docRef, docData)
      }
    } catch (error) {
      throw error
    }
  }

  const editLesson = async (updatedLesson: lessonType, lessonId: string) => {
    if (!ownerValidation() || !scheduleId) return

    const weekDay = getWeekDayByLessonId(lessonId) as keyof lessonsType
    const dayLessons = [...lessons[weekDay]]
    const updatedDayLessons = dayLessons.map((lesson) => {
      return lesson.id === lessonId ? { ...lesson, ...updatedLesson } : lesson
    })

    const docRef = doc(db, 'schedules', scheduleId)
    try {
      await updateDoc(docRef, { [weekDay]: updatedDayLessons })
    } catch (error) {
      throw error
    }
  }

  const deleteLesson = async (lessonId: string) => {
    if (!ownerValidation() || !scheduleId) return

    const weekDay = getWeekDayByLessonId(lessonId) as keyof lessonsType
    const lesson = getLessonById(lessonId)

    const docRef = doc(db, 'schedules', scheduleId)
    try {
      await updateDoc(docRef, {
        [weekDay]: arrayRemove(lesson)
      })
    } catch (error) {
      throw error
    }
  }

  const deleteSchedule = async () => {
    if (!ownerValidation() || !scheduleId) return

    const docRef = doc(db, 'schedules', scheduleId)
    try {
      await deleteDoc(docRef)
      toast.success('Расписание успешно удалено')
    } catch (error) {
      throw error
    }
  }

  return {
    lessons,
    getLessonById,
    addNewLesson,
    editLesson,
    deleteLesson,
    deleteSchedule
  }
}

export default useSchedule
