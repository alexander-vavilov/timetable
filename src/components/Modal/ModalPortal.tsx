import { FC, ReactNode, useRef } from 'react'
import { createPortal } from 'react-dom'

import { useKeyDown } from '../../hooks/useKeyDown'
import { cn } from '../../utils'
import Overlay from '../Overlay'

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
      // rootElement.lastChild - Element that contains modal with overlay. childNodes[0] - modal without overlay
      const lastModal = rootElement?.lastChild?.childNodes[0]
      const isLastModal = lastModal === ref.current

      isLastModal && onRequestClose()
    }
  })

  if (!rootElement) return null
  return createPortal(
    <Overlay
      onMouseDown={onRequestClose}
      className={cn('z-10', className?.overlay)}
    >
      <div
        ref={ref}
        onMouseDown={(e) => e.stopPropagation()}
        className={className?.modal}
      >
        {children}
      </div>
    </Overlay>,
    rootElement
  )
}

export default ModalPortal
