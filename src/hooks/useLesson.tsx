import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { IScheduleContext, IUserContext } from '../types/contexts'
import { useParams, useSearchParams } from 'react-router-dom'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { ScheduleContext } from '../contexts/ScheduleContext'
import { toastError } from '../toast'

const useLesson = (id: string) => {
	const { currentUser } = useContext(UserContext) as IUserContext
	const { scheduleId } = useParams()

	const searchParams = useSearchParams()[0]
	const unixDateTime = Number(searchParams.get('date'))

	const { lessons } = useContext(ScheduleContext) as IScheduleContext
	const lessonData = lessons?.[id] || null

	const isEditable = scheduleId === currentUser?.uid

	const saveLesson = async (lessonData: {}) => {
		try {
			if (!scheduleId || !id) throw new Error('Неизвестный идентификатор.')
			if (!isEditable)
				throw new Error('Вносить изменения может только владелец.')

			const docRef = doc(db, 'schedules', scheduleId)
			const docSnap = await getDoc(docRef)

			if (docSnap.exists()) {
				await updateDoc(docRef, { [id]: lessonData })
			} else {
				await setDoc(docRef, { [id]: lessonData })
			}
		} catch (error) {
			toastError(error)
		}
	}

	return { lessonData, isEditable, saveLesson, unixDateTime }
}

export default useLesson
