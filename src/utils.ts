import { set } from 'date-fns'
import { lessonsType } from './types'
import { toast } from 'sonner'

export const getWeekDayByDate = (date: Date) => {
  if (!date) return

  return date.toLocaleString('default', { weekday: 'long' }).toLowerCase()
}

export const convertStringTimeToDate = (
  stringTime: string,
  date: Date = new Date()
) => {
  const [hours, minutes] = stringTime.split(':').map(Number)

  return set(date, { hours, minutes })
}

export const convertDateTimeToString = (date: Date) => {
  return date.toLocaleTimeString('default', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  })
}

export const isContainsNonEmptyArray = (obj: lessonsType) => {
  return Object.values(obj).some((arr) => Array.isArray(arr) && arr.length > 0)
}

export const downloadJSON = (data: any, fileName: string) => {
  try {
    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json'
    })
    const url = window.URL.createObjectURL(blob)

    const element = document.createElement('a')
    element.style.display = 'none'
    element.href = url
    element.download = `${fileName}.json`
    element.click()

    window.URL.revokeObjectURL(url)
  } catch (error) {
    toast.error('Что-то пошло не так...')
  }
}

export const isEqual = (firstItem: any, secondItem: any) => {
  return JSON.stringify(firstItem) === JSON.stringify(secondItem)
}
