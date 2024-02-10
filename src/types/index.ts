import { UserCredential } from 'firebase/auth'
import { ReactNode } from 'react'

import { FirebaseFile } from './storage'

export interface Lesson {
  name: string
  location?: string
  teacher?: string
  start: string
  end: string
  homework?: {
    [key: string]: string
  }
  files: FirebaseFile[]
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
  name: string
  children?: ReactNode
  onRequestClose: () => void
  className?: string
}
