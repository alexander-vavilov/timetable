import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
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
import { Lesson, Lessons } from '../types'
import { IScheduleContext, IUserContext } from '../types/contexts'
import { UserContext } from './UserContext'

export const ScheduleContext = createContext<IScheduleContext | null>(null)

export const ScheduleContextProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const [lessons, setLessons] = useState<Lessons>({})
  const [isLoading, setIsLoading] = useState(true)

  const [isEditMode, setIsEditMode] = useState(false)
  const [date, setDate] = useState(new Date())

  const { scheduleId } = useParams()
  const { currentUser } = useContext(UserContext) as IUserContext
  const isOwner = scheduleId === currentUser?.uid

  useEffect(() => {
    if (!scheduleId) return

    const lessonsRef = collection(db, 'schedules', scheduleId, 'lessons')
    const q = query(lessonsRef, orderBy('start'))
    const unsub = onSnapshot(q, (snapshot) => {
      const lessonsObj: Lessons = {}
      snapshot.docs.forEach((doc) => {
        lessonsObj[doc.id] = doc.data() as Lesson
      })

      setLessons(lessonsObj)
      setIsLoading(false)
    })

    return () => unsub()
  }, [])

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
