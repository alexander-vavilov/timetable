import { forwardRef } from 'react'

import { MenuProps } from '../types/menu'
import Menu from './Menu/Menu'
import ModalPortal from './Modal/ModalPortal'

interface ContextMenuProps extends MenuProps {
  isOpen: boolean
}

const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ isOpen, items, onRequestClose }, ref) => {
    return (
      isOpen && (
        <ModalPortal
          onRequestClose={onRequestClose}
          className={{ overlay: 'bg-transparent' }}
        >
          <div ref={ref} className="absolute">
            <Menu
              items={items}
              onRequestClose={onRequestClose}
              variant="shrink"
            />
          </div>
        </ModalPortal>
      )
    )
  }
)

export default ContextMenu
