import {
  Dispatch,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  SetStateAction,
  ReactNode
} from 'react'

export type lessonType = {
  course: string
  location?: string
  start: string
  end: string
  teacher?: string
  homework?: {
    [key: string]: string
  }
  id: string
}

export type lessonsType = {
  monday: lessonType[]
  tuesday: lessonType[]
  wednesday: lessonType[]
  thursday: lessonType[]
  friday: lessonType[]
  saturday: lessonType[]
  sunday: lessonType[]
}

export type handleSubmitFunction = {
  email: string
  password: string
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export type InputType = {
  type?: HTMLInputTypeAttribute
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  styleVariant?: 'outline' | 'flushed'
  className?: string
  resizable?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export interface IModal {
  children?: ReactNode
  mobileFullSize?: boolean
  handleClose: () => void
  name: string
  isOpen?: boolean
  className?: string
}

export type onChangeLessonFn = (field: keyof lessonType, value: string) => void
