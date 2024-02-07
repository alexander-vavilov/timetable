import { UserCredential } from 'firebase/auth'
import { ReactNode } from 'react'

export interface Lesson {
  name: string
  location?: string
  teacher?: string
  start: string
  end: string
  homework?: {
    [key: string]: string
  }
  weekDay: number
  id: string
}

export interface Lessons {
  [id: string]: Omit<Lesson, 'id'>
}

export type handleSubmitFn = (
  email: string,
  password: string
) => Promise<UserCredential>

export interface ModalProps {
  children?: ReactNode
  onRequestClose: () => void
  name: string
  className?: string
}
