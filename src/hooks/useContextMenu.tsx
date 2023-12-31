import { MouseEvent, useEffect, useRef, useState } from 'react'

type clickPositionType = { x: number | null; y: number | null }

const useContextMenu = () => {
  const [clickPosition, setClickPosition] = useState<clickPositionType>({
    x: null,
    y: null
  })
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const open = (e: MouseEvent) => {
    e.preventDefault()
    const { pageX, pageY } = e

    setClickPosition({ x: pageX, y: pageY })
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
      ref.current.style.left = `${position.x}px`
      ref.current.style.top = `${position.y}px`
    }
  })

  return { isOpen, ref, open, close }
}

export default useContextMenu
