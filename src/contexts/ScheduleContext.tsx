import { FC, ReactNode, createContext, useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { IScheduleContext } from '../types/contexts'

export const ScheduleContext = createContext<IScheduleContext | null>(null)

export const ScheduleContextProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const [lessons, setLessons] = useState({})
  const [isEditMode, setIsEditMode] = useState(false)
  const [date, setDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)

  const { scheduleId } = useParams()

  useEffect(() => {
    if (!scheduleId) return
    setIsLoading(true)

    const q = query(
      collection(db, 'schedules', scheduleId, 'lessons'),
      orderBy('timestamp')
    )
    const unsub = onSnapshot(q, (querySnapshot) => {
      const lessons: { [key: string]: {} } = {}

      querySnapshot.forEach((doc) => {
        const { timestamp, ...lesson } = doc.data()
        lessons[doc.id] = { ...lesson }
      })

      setLessons(lessons)
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
    setDate
  }

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  )
}
