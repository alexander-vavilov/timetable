import { FC, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getDay } from 'date-fns'
import isEqual from 'lodash.isequal'
import Input from '../Input'
import LessonTimeInputs from './LessonTimeInputs'
import LessonFooter from './LessonFooter'
import LessonAttachments from './LessonAttachments'
import LessonAttachFiles from './LessonAttachFiles'
import useLesson from '../../hooks/useLesson'
import useUploadFile from '../../hooks/useUploadFile'

const LessonContent: FC = () => {
  const { lessonId } = useParams()
  const searchParams = useSearchParams()[0]

  const date = new Date(Number(searchParams.get('date')))
  const weekDay = getDay(date)

  const { initialLesson, saveLesson, getLessonFilesURL, isEditable } =
    useLesson(lessonId || '')

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

  const [existingFilesURL, setExistingFilesURL] = useState<string[]>([])
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const attachedFilesURL = attachedFiles.map((file) => {
    return URL.createObjectURL(file)
  })
  const filesURL = [...existingFilesURL, ...attachedFilesURL]

  useEffect(() => {
    getLessonFilesURL().then(setExistingFilesURL)
  }, [])

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
      ...(homework && { [date.toISOString()]: homework })
    }
  }

  const isChanged = !isEqual(currentLesson, initialLesson)
  const isNonUploadedFilesExist = attachedFiles.length > 0

  const { handleUpload, progress: fileUploadProgress } = useUploadFile()

  const handleUploadLessonFiles = () => {
    attachedFiles.forEach(async (file) => await handleUpload(file))

    setExistingFilesURL(filesURL)
    setAttachedFiles([])
  }

  const handleSave = () => {
    if (isChanged) saveLesson(currentLesson)
    if (attachedFiles.length > 0) handleUploadLessonFiles()
  }

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
          {isEditable && (
            <LessonAttachFiles setAttachedFiles={setAttachedFiles} />
          )}
          {filesURL.length > 0 && <LessonAttachments filesURL={filesURL} />}
        </div>
      </div>
      {/* {isEditable && isChanged && <LessonFooter handleSave={handleSave} />} */}
      {isEditable && (isChanged || isNonUploadedFilesExist) && (
        <LessonFooter handleSave={handleSave} progress={fileUploadProgress} />
      )}
    </>
  )
}

export default LessonContent
