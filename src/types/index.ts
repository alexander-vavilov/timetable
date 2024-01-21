import { Dispatch, ReactNode, SetStateAction } from 'react'

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
  password: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => void

export interface ModalProps {
  children?: ReactNode
  variant?: 'mobileFullSize' | 'mobileCompact'
  handleClose: () => void
  name: string
  isOpen?: boolean
  className?: string
}
