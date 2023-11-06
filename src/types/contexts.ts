import { Dispatch, SetStateAction } from 'react'
import { ILessons } from '../types'

export interface ICurrentUser {
	uid: string
}
export interface IUserContext {
	currentUser: ICurrentUser | null
	setCurrentUser: React.Dispatch<React.SetStateAction<ICurrentUser | null>>
}

export interface IScheduleContext {
	lessons: ILessons
	isLoading: boolean
	isEditMode: boolean
	setIsEditMode: Dispatch<SetStateAction<boolean>>
	date: Date
	setDate: Dispatch<SetStateAction<Date>>
}

export type ITheme = 'dark' | 'light'
export type IThemeContext = {
	theme: ITheme
	switchTheme: () => void
}
