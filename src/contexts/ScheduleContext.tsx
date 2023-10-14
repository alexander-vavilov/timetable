import { FC, ReactNode, createContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { lessonsType } from '../types'
import { ScheduleContextType } from '../types/contexts'
import { lessonsObj } from '../consts'

export const ScheduleContext = createContext<ScheduleContextType | null>(null)

export const ScheduleContextProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const [lessons, setLessons] = useState<lessonsType>(lessonsObj)
  const [isEditMode, setIsEditMode] = useState(false)
  const [date, setDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)

  const { scheduleId } = useParams()

  useEffect(() => {
    if (!scheduleId) return
    setIsLoading(true)

    const docRef = doc(db, 'schedules', scheduleId)
    const unsub = onSnapshot(docRef, (doc) => {
      setLessons({ ...lessonsObj, ...(doc.data() as lessonsType) })
      setIsLoading(false)
    })

    return () => unsub()
  }, [scheduleId])

  const value = {
    lessons,
    setLessons,
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
