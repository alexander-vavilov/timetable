import { FC, useContext } from 'react'

import LessonViewModal from '../components/Modals/LessonViewModal'
import LessonViewModalPlaceholder from '../components/Modals/LessonViewModalPlaceholder'
import { ScheduleContext } from '../contexts/ScheduleContext'
import { IScheduleContext } from '../types/contexts'

const LessonView: FC = () => {
  const { isLoading } = useContext(ScheduleContext) as IScheduleContext

  return isLoading ? <LessonViewModalPlaceholder /> : <LessonViewModal />
}

export default LessonView
