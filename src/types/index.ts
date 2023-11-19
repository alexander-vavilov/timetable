import {
  Dispatch,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  SetStateAction,
  ReactNode
} from 'react'

export interface IFile {
  URL: string
  timestamp: Date
}

export interface ILesson {
  name: string
  location?: string
  start: string
  end: string
  teacher?: string
  homework?: {
    [key: string]: string
  }
  files: IFile[]
  weekDay: number
  id: string
}

export interface ILessons {
  [id: string]: Omit<ILesson, 'id'>
}

export type handleSubmitFn = (
  email: string,
  password: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => void

export type InputType = {
  type?: HTMLInputTypeAttribute
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  styleVariant?: 'outline' | 'flushed' | 'time'
  className?: string
  editable?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export interface ModalProps {
  children?: ReactNode
  variant?: 'mobileFullSize' | 'mobileCompact'
  handleClose: () => void
  name: string
  isOpen?: boolean
  className?: string
}

export type onChangeLessonFn = (field: keyof ILesson, value: string) => void
