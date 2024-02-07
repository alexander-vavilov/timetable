import { createContext, FC, ReactNode, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'

import useSchedule from '../hooks/useSchedule'
import { IScheduleContext, IUserContext } from '../types/contexts'
import { UserContext } from './UserContext'

export const ScheduleContext = createContext<IScheduleContext | null>(null)

export const ScheduleContextProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const { lessons, isLoading } = useSchedule()

  const [isEditMode, setIsEditMode] = useState(false)
  const [date, setDate] = useState(new Date())

  const { scheduleId } = useParams()
  const { currentUser } = useContext(UserContext) as IUserContext
  const isOwner = scheduleId === currentUser?.uid

  const value = {
    lessons,
    isLoading,
    isOwner,
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
