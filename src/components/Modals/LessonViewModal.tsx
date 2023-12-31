import { FC, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from '../Modal/Modal'
import { IScheduleContext } from '../../types/contexts'
import { ScheduleContext } from '../../contexts/ScheduleContext'
import LessonView from '../LessonView'
import LessonViewSkeleton from '../LessonView/LessonViewSkeleton'

const LessonViewModal: FC = () => {
  const { scheduleId } = useParams()

  const navigate = useNavigate()
  const handleClose = () => navigate(`/schedule/${scheduleId}`)

  const { isLoading } = useContext(ScheduleContext) as IScheduleContext

  return (
    <Modal handleClose={handleClose} name='Детали'>
      {isLoading ? <LessonViewSkeleton /> : <LessonView />}
    </Modal>
  )
}

export default LessonViewModal
