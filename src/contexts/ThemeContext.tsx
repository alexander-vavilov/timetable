import { createContext, FC, ReactNode, useState } from 'react'
import { IThemeContext, ITheme } from '../types/contexts'

export const ThemeContext = createContext<IThemeContext | null>(null)

const getTheme = () => {
	const storedTheme = window.localStorage.getItem('theme')
	const htmlElement = document.documentElement

	if (storedTheme === 'dark' || storedTheme === 'light') {
		htmlElement.setAttribute('data-theme', storedTheme)
		return storedTheme
	}

	return 'dark'
}

export const ThemeContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [theme, setTheme] = useState<ITheme>(getTheme())

	const switchTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light'

		setTheme(newTheme)
		window.localStorage.setItem('theme', newTheme)
	}

	return (
		<ThemeContext.Provider value={{ theme, switchTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
