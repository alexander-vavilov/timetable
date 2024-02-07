import { RefObject, useEffect } from 'react'

export const useClickAway = (
  callback: () => void,
  ref: RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    if (!ref) return

    const handleClickAway = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) callback()
    }

    document.addEventListener('mousedown', handleClickAway)
    return () => document.removeEventListener('mousedown', handleClickAway)
  }, [])
}
