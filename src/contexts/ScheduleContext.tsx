import { FC, ReactNode, createContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { ILessons } from '../types'
import { IScheduleContext } from '../types/contexts'

export const ScheduleContext = createContext<IScheduleContext | null>(null)

export const ScheduleContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [lessons, setLessons] = useState<ILessons>({})
	const [isEditMode, setIsEditMode] = useState(false)
	const [date, setDate] = useState(new Date())
	const [isLoading, setIsLoading] = useState(true)

	const { scheduleId } = useParams()

	useEffect(() => {
		if (!scheduleId) return
		setIsLoading(true)

		const docRef = doc(db, 'schedules', scheduleId)
		const unsub = onSnapshot(docRef, doc => {
			if (doc.exists()) {
				setLessons(doc.data())
			} else {
				setLessons({})
			}
			setIsLoading(false)
		})

		return () => unsub()
	}, [scheduleId])

	const value = {
		lessons,
		isLoading,
		isEditMode,
		setIsEditMode,
		date,
		setDate,
	}

	return (
		<ScheduleContext.Provider value={value}>
			{children}
		</ScheduleContext.Provider>
	)
}
