import { FC, useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useSchedule from '../hooks/useSchedule'
import Modal from '../components/Modal'
import { getWeekDayByDate, isEqual } from '../utils'
import { onChangeLessonFn, lessonType, lessonsType } from '../types'
import { UserContextType } from '../types/contexts'
import { UserContext } from '../contexts/UserContext'
import PrivateInput from '../components/PrivateInput'
import LessonTimeInputs from '../components/Lesson/LessonTimeInputs'
import { toast } from 'sonner'
import Button from '../components/Button'

const Lesson: FC = () => {
  const { state, search } = useLocation()
  const navigate = useNavigate()
  const { scheduleId, lessonId } = useParams()

  const { currentUser } = useContext(UserContext) as UserContextType
  const editable = scheduleId === currentUser?.uid

  const timestamp = new URLSearchParams(search).get('date')
  const date = new Date(Number(timestamp))

  const { addNewLesson, editLesson, getLessonById } = useSchedule()
  const lessonData = lessonId && getLessonById(lessonId)

  const [newLesson, setNewLesson] = useState({
    course: '',
    location: '',
    teacher: '',
    start: '08:30',
    end: '09:15',
    homework: {
      [date.toISOString()]: ''
    },
    id: lessonId,
    ...state?.lessonData
  })
  const initialLessonRef = useRef(newLesson)
  const changed = !isEqual(initialLessonRef.current, newLesson)

  useEffect(() => {
    if (!lessonData || isSaveLoading) return

    setNewLesson((prevState: lessonType) => {
      initialLessonRef.current = { ...prevState, ...lessonData }
      return { ...prevState, ...lessonData }
    })
  }, [lessonId, lessonData])

  const handleClose = () => navigate(`/schedule/${scheduleId}`)

  const [isSaveLoading, setIsSaveLoading] = useState(false)
  const handleSave = async () => {
    if (!lessonId) return
    setIsSaveLoading(true)

    const weekDay = getWeekDayByDate(date) as keyof lessonsType
    try {
      if (lessonData || state?.lessonData) {
        await editLesson(newLesson, lessonId)
      } else {
        await addNewLesson(newLesson, weekDay)
      }
      initialLessonRef.current = newLesson
    } catch (error) {
      toast.error('Не удалось сохранить изменения')
      console.log(error)
    } finally {
      setIsSaveLoading(false)
    }
  }

  const onChangeLesson: onChangeLessonFn = (field, value) => {
    setNewLesson((prevState: lessonType) => ({
      ...prevState,
      [field]: value
    }))
  }

  return (
    <Modal handleClose={handleClose} name='Детали'>
      <div className='mt-3 h-full flex-auto overflow-y-auto overflow-x-hidden p-4'>
        <PrivateInput
          condition={editable}
          value={newLesson.course}
          onChange={(e) => onChangeLesson('course', e.target.value)}
          placeholder='предмет'
          styleVariant='flushed'
          className='text-3xl'
          required
        />
        <div className='flex flex-col gap-4 pt-10'>
          <PrivateInput
            condition={editable}
            value={newLesson.location}
            onChange={(e) => onChangeLesson('location', e.target.value)}
            placeholder='кабинет'
          />
          <PrivateInput
            condition={editable}
            value={newLesson.teacher}
            onChange={(e) => onChangeLesson('teacher', e.target.value)}
            placeholder='учитель'
          />
          <LessonTimeInputs
            start={newLesson.start}
            end={newLesson.end}
            editable={editable}
            onChangeLesson={onChangeLesson}
          />
          <PrivateInput
            condition={editable}
            value={newLesson.homework[date.toISOString()]}
            onChange={(e) =>
              onChangeLesson('homework', {
                ...newLesson.homework,
                [date.toISOString()]: e.target.value
              })
            }
            placeholder='домашнее задание'
          />
        </div>
      </div>
      {changed && editable && (
        <div className='flex justify-end border-t border-gray-300 p-4 text-white shadow-md dark:border-neutral-700 dark:shadow-none'>
          <Button
            variant='button'
            onClick={handleSave}
            isLoading={isSaveLoading}
          >
            Сохранить
          </Button>
        </div>
      )}
    </Modal>
  )
}

export default Lesson
