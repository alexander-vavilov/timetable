import { getDay } from 'date-fns'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import isEqual from 'lodash.isequal'
import { useContext, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { db } from '../../firebase'
import useFiles from '../components/LessonView/useFiles'
import useTimeCalc from '../components/LessonView/useTimeCalc'
import { ScheduleContext } from '../contexts/ScheduleContext'
import { toastError } from '../toast'
import { IScheduleContext } from '../types/contexts'

const useLesson = (id: string) => {
  const { scheduleId } = useParams()

  const searchParams = useSearchParams()[0]
  const unixDateTime = Number(searchParams.get('date'))

  const { lessons, isOwner } = useContext(ScheduleContext) as IScheduleContext
  const lessonData = lessons?.[id] || null

  const weekDay = getDay(new Date(unixDateTime))
  const { start, end } = useTimeCalc(weekDay)

  // Form state
  const [name, setName] = useState(lessonData?.name || '')
  const [teacher, setTeacher] = useState(lessonData?.teacher || '')
  const [location, setLocation] = useState(lessonData?.location || '')
  const [time, setTime] = useState({
    start: lessonData?.start || start,
    end: lessonData?.end || end
  })
  const [homework, setHomework] = useState(
    lessonData?.homework?.[unixDateTime] || ''
  )

  const {
    existingFilesURL,
    unprocessedFiles,
    setUnprocessedFiles,
    processFiles
  } = useFiles()

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
      ...(!!homework.length && { [unixDateTime]: homework }) // homework length > 0 => this field added to homework object
    }
  }

  const isNewLesson = lessonData === null
  const isContentChanged = !isEqual(currentLesson, lessonData)
  const isUnprocessed = isContentChanged || !!unprocessedFiles.length

  const [isSavingInProgress, setIsSavingInProgress] = useState(false)
  const handleSave = async () => {
    setIsSavingInProgress(true)

    try {
      if (isContentChanged) {
        if (!scheduleId || !id) throw Error('Неизвестный идентификатор.')
        if (!isOwner) throw Error('Вносить изменения может только владелец.')

        const docRef = doc(db, 'schedules', scheduleId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          await updateDoc(docRef, { [id]: lessonData })
        } else {
          await setDoc(docRef, { [id]: lessonData })
        }
      }

      if (unprocessedFiles) await processFiles(unprocessedFiles)
    } catch (error) {
      toastError(error)
    } finally {
      setIsSavingInProgress(false)
    }
  }

  return {
    state: { isNewLesson, isUnprocessed, isSavingInProgress },
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
      existingFilesURL,
      unprocessedFiles,
      setUnprocessedFiles
    },
    functions: { handleSave }
  }
}

export default useLesson
