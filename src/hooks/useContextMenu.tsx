import { MouseEvent, useEffect, useState } from 'react'
import { useClickAway } from './useClickAway'

type clickPositionType = { x: number | null; y: number | null }

const useContextMenu = () => {
  const [clickPosition, setClickPosition] = useState<clickPositionType>({
    x: null,
    y: null
  })
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickAway(() => setIsOpen(false))

  const open = (e: MouseEvent) => {
    e.preventDefault()
    const { pageX, pageY } = e

    setClickPosition({ x: pageX, y: pageY })
    setIsOpen(true)
  }

  const calculatePosition = () => {
    if (!ref.current || !clickPosition.x || !clickPosition.y) return

    const contextMenuWidth = ref.current.clientWidth
    const contextMenuHeight = ref.current.clientHeight

    const horizontalPosition =
      clickPosition.x + contextMenuWidth > window.innerWidth
        ? clickPosition.x - contextMenuWidth
        : clickPosition.x
    const verticalPosition =
      clickPosition.y + contextMenuHeight > window.innerHeight
        ? clickPosition.y - contextMenuHeight
        : clickPosition.y

    return { x: horizontalPosition, y: verticalPosition }
  }

  useEffect(() => {
    if (!ref.current) return

    const position = calculatePosition()
    if (position) {
      ref.current.style.left = `${position.x}px`
      ref.current.style.top = `${position.y}px`
    }
  })

  return { isOpen, ref, open }
}

export default useContextMenu
