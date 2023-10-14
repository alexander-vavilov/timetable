import { Dispatch, SetStateAction } from 'react'
import { lessonsType } from '../types'

export interface ICurrentUser {
  uid: string
}
export type UserContextType = {
  currentUser: ICurrentUser | null
  setCurrentUser: React.Dispatch<React.SetStateAction<ICurrentUser | null>>
}

export type ScheduleContextType = {
  lessons: lessonsType
  setLessons: Dispatch<SetStateAction<lessonsType>>
  isLoading: boolean
  isEditMode: boolean
  setIsEditMode: Dispatch<SetStateAction<boolean>>
  date: Date
  setDate: Dispatch<SetStateAction<Date>>
}

export type themeType = 'dark' | 'light'
export type ThemeContextType = {
  theme: themeType
  switchTheme: () => void
}
