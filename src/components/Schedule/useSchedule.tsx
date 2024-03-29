import { collection, deleteDoc, doc } from 'firebase/firestore'
import { toast } from 'sonner'

import { db } from '../../../firebase'
import { useFirebase } from '../../hooks/useFirebase'

export const useSchedule = () => {
  const { deleteCollection } = useFirebase()

  const deleteSchedule = async (scheduleId: string | null) => {
    if (!scheduleId) throw Error('Неизвестный идентификатор.')

    try {
      const scheduleRef = doc(db, 'schedules', scheduleId)

      await deleteDoc(scheduleRef)
      await deleteCollection(collection(scheduleRef, 'lessons'))

      toast.success('Расписание успешно удалено!')
    } catch (error) {
      toast.error('Что-то пошло не так в процессе удаления расписания...')
    }
  }

  return { deleteSchedule }
}
