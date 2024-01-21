import { Dispatch, SetStateAction } from 'react'

import { Lessons } from '../types'

export interface ICurrentUser {
  uid: string
}
export interface IUserContext {
  currentUser: ICurrentUser | null
  setCurrentUser: React.Dispatch<React.SetStateAction<ICurrentUser | null>>
}

export interface IScheduleContext {
  lessons: Lessons
  isLoading: boolean
  isEditMode: boolean
  isOwner: boolean
  setIsEditMode: Dispatch<SetStateAction<boolean>>
  date: Date
  setDate: Dispatch<SetStateAction<Date>>
}

export type themeType = 'dark' | 'light'
export interface IThemeContext {
  theme: themeType
  switchTheme: () => void
}
