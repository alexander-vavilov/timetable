import { FC, useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getDay } from 'date-fns'
import isEqual from 'lodash.isequal'
import useLesson from '../../hooks/useLesson'
import useUploadFile from '../../hooks/useUploadFile'
import { toastError } from '../../toast'
import Input from '../Input'
import LessonAttachFiles from './LessonAttachFiles'
import LessonAttachments from './LessonAttachments'
import LessonTimeInputs from './LessonTimeInputs'
import ModalFooter from '../Modal/ModalFooter'
import Button from '../Button'
import { filesToURLs } from '../../utils'
import ModalContent from '../Modal/ModalContent'

const LessonContent: FC = () => {
  const { lessonId } = useParams()
  const searchParams = useSearchParams()[0]

  const unixTime = Number(searchParams.get('date'))
  const weekDay = getDay(new Date(unixTime))

  const {
    lessonData,
    saveLesson,
    getLessonTime,
    getLessonFilesURL,
    isEditable
  } = useLesson(lessonId || '')

  const { start, end } = getLessonTime()

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
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const attachedFilesURL = useMemo(
    () => filesToURLs(attachedFiles),
    [attachedFiles]
  )
  const filesURL = [...existingFilesURL, ...attachedFilesURL]

  useEffect(() => {
    getLessonFilesURL().then(setExistingFilesURL)
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
  const isNonUploadedFilesExist = attachedFiles.length > 0

  const { handleUpload } = useUploadFile()
  const [isLoading, setIsLoading] = useState(false)

  const handleUploadLessonFiles = async () => {
    for (const file of attachedFiles) {
      const downloadURL = await handleUpload(file)
      if (typeof downloadURL === 'string') {
        setExistingFilesURL((filesURL) => [...filesURL, downloadURL])
      }
    }
    setAttachedFiles([])
  }

  const handleSave = async () => {
    setIsLoading(true)

    try {
      if (isContentChanged) await saveLesson(currentLesson)
      if (attachedFiles.length > 0) await handleUploadLessonFiles()
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
          {isEditable && (
            <LessonAttachFiles setAttachedFiles={setAttachedFiles} />
          )}
          {filesURL.length > 0 && <LessonAttachments filesURL={filesURL} />}
        </div>
      </ModalContent>
      {isEditable && (isContentChanged || isNonUploadedFilesExist) && (
        <ModalFooter className='justify-end'>
          <Button onClick={handleSave} isLoading={isLoading}>
            Сохранить
          </Button>
        </ModalFooter>
      )}
    </>
  )
}

export default LessonContent
