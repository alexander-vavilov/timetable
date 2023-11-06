import {
	Dispatch,
	HTMLInputTypeAttribute,
	InputHTMLAttributes,
	SetStateAction,
	ReactNode,
} from 'react'

export interface ILesson {
	name: string
	location?: string
	start: string
	end: string
	teacher?: string
	homework?: {
		[key: string]: string
	}
	weekDay: number
}

export interface ILessons {
	[key: string]: ILesson
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
	styleVariant?: 'outline' | 'flushed' | 'time'
	className?: string
	editable?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export interface IModal {
	children?: ReactNode
	variant?: 'mobileFullSize' | 'mobileCompact'
	handleClose: () => void
	name: string
	isOpen?: boolean
	className?: string
}

export type onChangeLessonFn = (field: keyof ILesson, value: string) => void
