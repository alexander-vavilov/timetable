import { FC, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getDay } from 'date-fns'
import isEqual from 'lodash.isequal'
import useLesson from '../../hooks/useLesson'
import { toastError } from '../../toast'
import Input from '../Input'
import LessonViewAttachFiles from './LessonViewAttachFiles'
import LessonViewAttachments from './LessonViewAttachments'
import LessonViewTimeInputs from './LessonViewTimeInputs'
import ModalFooter from '../Modal/ModalFooter'
import Button from '../Button'
import ModalContent from '../Modal/ModalContent'
import LessonViewUnprocessedFiles from './LessonViewUnprocessedFiles'
import invariant from 'tiny-invariant'
import useTime from './useTime'
import useUploadFiles from './useUploadFiles'
import useExtractFilesURL from './useExtractFilesURL'

const LessonView: FC = () => {
  const { lessonId } = useParams()
  const searchParams = useSearchParams()[0]
  invariant(lessonId, 'Lesson id needed.')

  const unixTime = Number(searchParams.get('date'))
  const weekDay = getDay(new Date(unixTime))

  const { lessonData, saveLesson, isEditable } = useLesson(lessonId)
  const extractFilesURL = useExtractFilesURL()
  const handleUploadLessonFiles = useUploadFiles()
  const { start, end } = useTime()

  const [name, setName] = useState(lessonData?.name || '')
  const [teacher, setTeacher] = useState(lessonData?.teacher || '')
  const [location, setLocation] = useState(lessonData?.location || '')
  const [time, setTime] = useState({
    start: lessonData?.start || start,
    end: lessonData?.end || end
  })
  const [homework, setHomework] = useState(
    lessonData?.homework?.[unixTime] || ''
  )

  const [existingFilesURL, setExistingFilesURL] = useState<string[]>([])
  const [unprocessedFiles, setUnprocessedFiles] = useState<File[]>([])

  useEffect(() => {
    extractFilesURL().then(setExistingFilesURL)
  }, [])

  const currentLesson = {
    name,
    teacher,
    location,
    weekDay,
    start: time.start,
    end: time.end,
    homework: {
      ...lessonData?.homework,
      ...(homework && { [unixTime]: homework })
    }
  }

  const isContentChanged = !isEqual(currentLesson, lessonData)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)

    try {
      if (isContentChanged) await saveLesson(currentLesson)

      if (unprocessedFiles.length > 0) {
        await handleUploadLessonFiles(unprocessedFiles)

        extractFilesURL().then(setExistingFilesURL)
        setUnprocessedFiles([])
      }
    } catch (error) {
      toastError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <ModalContent className='pt-6'>
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
          <LessonViewTimeInputs
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
          {isEditable && (
            <LessonViewAttachFiles setUnprocessedFiles={setUnprocessedFiles} />
          )}
          {unprocessedFiles.length > 0 && (
            <LessonViewUnprocessedFiles
              files={unprocessedFiles}
              setUnprocessedFiles={setUnprocessedFiles}
            />
          )}
          {existingFilesURL.length > 0 && (
            <LessonViewAttachments filesURL={existingFilesURL} />
          )}
        </div>
      </ModalContent>
      {isEditable && (isContentChanged || unprocessedFiles.length > 0) && (
        <ModalFooter className='justify-end'>
          <Button onClick={handleSave} isLoading={isLoading}>
            Сохранить
          </Button>
        </ModalFooter>
      )}
    </>
  )
}

export default LessonView
