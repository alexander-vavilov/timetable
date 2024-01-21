import { doc, onSnapshot } from 'firebase/firestore'
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { useParams } from 'react-router-dom'

import { db } from '../../firebase'
import { IScheduleContext, IUserContext } from '../types/contexts'
import { UserContext } from './UserContext'

export const ScheduleContext = createContext<IScheduleContext | null>(null)

export const ScheduleContextProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const [lessons, setLessons] = useState({})
  const [isEditMode, setIsEditMode] = useState(false)
  const [date, setDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)

  const { scheduleId } = useParams()

  const { currentUser } = useContext(UserContext) as IUserContext
  const isOwner = scheduleId === currentUser?.uid

  useEffect(() => {
    if (!scheduleId) return
    setIsLoading(true)

    const docRef = doc(db, 'schedules', scheduleId)
    const unsub = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setLessons(docSnapshot.data())
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
