import { useState } from 'react'

export const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState<string>(() => {
    return window.localStorage.getItem(key) || defaultValue
  })

  const set = (value: string) => {
    setValue(value)
    window.localStorage.setItem(key, value)
  }

  return { value, set }
}
