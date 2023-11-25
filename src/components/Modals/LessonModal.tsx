import { FC, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from '../Modal/Modal'
import { IScheduleContext } from '../../types/contexts'
import { ScheduleContext } from '../../contexts/ScheduleContext'
import LessonContent from '../Lesson/LessonContent'
import LessonSkeleton from '../Lesson/LessonSkeleton'

const LessonModal: FC = () => {
  const { scheduleId } = useParams()

  const navigate = useNavigate()
  const handleClose = () => navigate(`/schedule/${scheduleId}`)

  const { isLoading } = useContext(ScheduleContext) as IScheduleContext

  return (
    <Modal handleClose={handleClose} name='Детали'>
      {isLoading ? <LessonSkeleton /> : <LessonContent />}
    </Modal>
  )
}

export default LessonModal
