import { createContext, FC, ReactNode, useEffect, useState } from 'react'

import { IThemeContext, themeType } from '../types/contexts'

export const ThemeContext = createContext<IThemeContext | null>(null)

export const ThemeContextProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const [theme, setTheme] = useState<themeType>(() => {
    const storedTheme = window.localStorage.getItem('theme')
    if (storedTheme === 'dark' || storedTheme === 'light') return storedTheme

    return 'dark'
  })

  useEffect(() => {
    const htmlElement = document.documentElement
    htmlElement.setAttribute('data-theme', theme)
  }, [theme])

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
