import { deleteDoc, doc } from 'firebase/firestore'
import { toast } from 'sonner'

import { db } from '../../firebase'
import { toastError } from '../toast'

const useSchedule = () => {
  const deleteSchedule = async (scheduleId: string | null) => {
    if (!scheduleId) throw Error('Неизвестный идентификатор.')

    try {
      const docRef = doc(db, 'schedules', scheduleId)
      await deleteDoc(docRef)

      toast.success('Расписание успешно удалено!')
    } catch (error) {
      toastError(error)
    }
  }

  return { deleteSchedule }
}

export default useSchedule
