import { getDay } from 'date-fns'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import isEqual from 'lodash.isequal'
import { useContext, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { db } from '../../../firebase'
import { ScheduleContext } from '../../contexts/ScheduleContext'
import { toastError } from '../../toast'
import { Lesson } from '../../types'
import { IScheduleContext } from '../../types/contexts'
import { useTimeCalc } from './useTimeCalc'
import { useUnprocessedFiles } from './useUnprocessedFiles'

export const useLesson = (id: string) => {
  const { scheduleId } = useParams()

  const searchParams = useSearchParams()[0]
  const unixDateTime = Number(searchParams.get('date'))

  const weekDay = getDay(new Date(unixDateTime))
  const { start, end } = useTimeCalc(weekDay)

  const { lessons, isOwner } = useContext(ScheduleContext) as IScheduleContext

  const defaultLessonData: Required<Omit<Lesson, 'id'>> = {
    name: '',
    location: '',
    teacher: '',
    start,
    end,
    weekDay,
    homework: {
      [unixDateTime]: ''
    },
    files: []
  }

  const lessonData = { ...defaultLessonData, ...lessons[id] }

  // Form state
  const [name, setName] = useState(lessonData.name)
  const [teacher, setTeacher] = useState(lessonData.teacher)
  const [location, setLocation] = useState(lessonData.location)
  const [time, setTime] = useState({
    start: lessonData.start,
    end: lessonData.end
  })
  const [homework, setHomework] = useState(
    lessonData.homework[unixDateTime] || ''
  )

  const files = lessonData.files
  const { unprocessedFiles, setUnprocessedFiles, processFiles } =
    useUnprocessedFiles()

  // Lesson object to be saved in the db
  const currentLesson = {
    name,
    location,
    teacher,
    start: time.start,
    end: time.end,
    weekDay,
    homework: {
      ...lessonData?.homework,
      ...(!!homework?.length && { [unixDateTime]: homework })
    },
    files
  }

  const isContentChanged = !isEqual(currentLesson, lessonData)
  const isUnprocessed = isContentChanged || !!unprocessedFiles.length

  const [isSavingInProgress, setIsSavingInProgress] = useState(false)
  const handleSave = async () => {
    setIsSavingInProgress(true)

    try {
      if (isContentChanged) {
        if (!scheduleId || !id) throw Error('Неизвестный идентификатор.')
        if (!isOwner) throw Error('Вносить изменения может только владелец.')

        const docRef = doc(db, 'schedules', scheduleId, 'lessons', id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          await updateDoc(docRef, currentLesson)
        } else {
          await setDoc(docRef, currentLesson)
        }
      }
      if (unprocessedFiles) await processFiles()

      toast.success('Изменения успешно сохранены!')
    } catch (error) {
      toast.error('Что-то пошло не так в процессе сохранения...')
      toastError(error)
    } finally {
      setIsSavingInProgress(false)
    }
  }

  return {
    state: { isUnprocessed, isSavingInProgress },
    formState: {
      name,
      setName,
      teacher,
      setTeacher,
      location,
      setLocation,
      time,
      setTime,
      homework,
      setHomework,
      files,
      unprocessedFiles,
      setUnprocessedFiles
    },
    functions: { handleSave }
  }
}
