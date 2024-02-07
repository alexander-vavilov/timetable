import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { db } from '../../firebase'
import { Lessons } from '../types'

const useSchedule = () => {
  const { scheduleId } = useParams()

  const [lessons, setLessons] = useState<Lessons>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!scheduleId) return

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
  }, [])

  return { lessons, isLoading }
}

export default useSchedule
