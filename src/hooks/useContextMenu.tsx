import { MouseEvent, useEffect, useRef, useState } from 'react'

type clickPositionType = { x: number | null; y: number | null }

export const useContextMenu = () => {
  const [clickPosition, setClickPosition] = useState<clickPositionType>({
    x: null,
    y: null
  })
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const open = (e: MouseEvent) => {
    e.preventDefault()

    setClickPosition({ x: e.pageX, y: e.pageY })
    setIsOpen(true)
  }

  const close = () => setIsOpen(false)

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
      // ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`

      ref.current.style.left = `${position.x}px`
      ref.current.style.top = `${position.y}px`
    }
  })

  return { isOpen, ref, open, close }
}
