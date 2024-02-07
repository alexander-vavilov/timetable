import { forwardRef } from 'react'

import { IMenu } from '../types/menu'
import Menu from './Menu/Menu'
import ModalPortal from './Modal/ModalPortal'

interface ContextMenuProps extends IMenu {
  isOpen: boolean
}

const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ isOpen, items, handleClose }, ref) => {
    return (
      isOpen && (
        <ModalPortal onRequestClose={handleClose}>
          <div ref={ref} className="absolute">
            <Menu items={items} handleClose={handleClose} />
          </div>
        </ModalPortal>
      )
    )
  }
)

export default ContextMenu
