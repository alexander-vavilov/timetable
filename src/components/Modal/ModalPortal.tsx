import { FC, ReactNode, useRef } from 'react'
import { createPortal } from 'react-dom'

import { useKeyDown } from '../../hooks/useKeyDown'
import { cn } from '../../utils'

interface ModalPortalProps {
  children: ReactNode
  onRequestClose: () => void
  className?: {
    overlay?: string
    modal?: string
  }
}

const ModalPortal: FC<ModalPortalProps> = ({
  children,
  onRequestClose,
  className
}) => {
  const rootElement = document.getElementById('modal-root')
  const ref = useRef(null)

  useKeyDown((e) => {
    if (e.key === 'Escape') {
      const lastModal = rootElement?.lastChild
      const isLastModal = lastModal === ref.current

      isLastModal && onRequestClose()
    }
  })

  if (!rootElement) return null
  return createPortal(
    <div
      ref={ref}
      onClick={onRequestClose}
      className={cn(
        'fixed left-0 top-0 z-10 h-full w-full bg-black/50',
        className?.overlay
      )}
    >
      <div onClick={(e) => e.stopPropagation()} className={className?.modal}>
        {children}
      </div>
    </div>,
    rootElement
  )
}

export default ModalPortal
